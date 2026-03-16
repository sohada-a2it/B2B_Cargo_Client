// components/shipments/ShipmentsPage.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  // Main APIs
  getMyShipments,
  getMyShipmentById,
  getMyShipmentTimeline,
  getMyShipmentsSummary,
  trackShipmentByNumber,
  
  // Helper functions
  getShipmentStatusColor,
  getShipmentStatusDisplayText,
  getShipmentModeDisplay,
  getShipmentProgress,
  formatShipmentDate,
  formatShipmentCurrency,
  formatWeight,
  formatVolume,
  calculateTotalWeight,
  calculateTotalVolume,
  getDaysInTransit,
  getShipmentSummary,
  groupShipmentsByStatus,
  exportShipmentsToCSV
} from '@/Api/shipping';

// Icons
import {
  Package, Search, Filter, ChevronDown, ChevronLeft, ChevronRight,
  Eye, Download, Plus, Calendar, MapPin, User,
  Truck, Ship, Plane, Clock, CheckCircle, XCircle,
  AlertCircle, RefreshCw, Loader2, MoreVertical,
  ArrowUpDown, Download as ExportIcon, Filter as FilterIcon,
  X, Globe, Hash, DollarSign,
  ChevronsLeft, ChevronsRight,
  Home, Briefcase, Tag, Calendar as CalendarIcon,
  FileText, Box, Activity, Navigation,
  CheckCircle as CheckCircleSolid,
  XCircle as XCircleSolid, Clock as ClockSolid,
  TrendingUp, PieChart, BarChart3,
  Train,
  Layers,
  Send,
  Flag,
  Shield,
  Award,
  Pause,
  RotateCcw
} from 'lucide-react';

// ==================== COLOR CONSTANTS ====================
const COLORS = {
  primary: '#E67E22',
  secondary: '#3C719D',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  purple: '#8b5cf6',
  orange: '#f97316'
};

// ==================== STATUS CONFIGURATION ====================
const STATUS_CONFIG = {
  // Initial statuses
  pending: {
    label: 'Pending',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    icon: Clock,
    progress: 10
  },
  received_at_warehouse: {
    label: 'Received at Warehouse',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: Package,
    progress: 20
  },
  picked_up_from_warehouse: {
    label: 'Picked Up',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Truck,
    progress: 15
  },
  
  // Inspection statuses
  inspected: {
    label: 'Inspected',
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: CheckCircle,
    progress: 22
  },
  
  // Consolidation statuses
  consolidating: {
    label: 'Consolidating',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: Layers,
    progress: 25
  },
  consolidated: {
    label: 'Consolidated',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    icon: Layers,
    progress: 30
  },
  ready_for_dispatch: {
    label: 'Ready for Dispatch',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: CheckCircle,
    progress: 35
  },
  loaded_in_container: {
    label: 'Loaded in Container',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    icon: Package,
    progress: 40
  },
  dispatched: {
    label: 'Dispatched',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    icon: Send,
    progress: 45
  },
  
  // Transit statuses
  departed_port_of_origin: {
    label: 'Departed Origin Port',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Ship,
    progress: 50
  },
  in_transit_sea_freight: {
    label: 'In Transit (Sea)',
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    icon: Ship,
    progress: 55
  },
  in_transit: {
    label: 'In Transit',
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    icon: Truck,
    progress: 60
  },
  
  // Arrival statuses
  arrived_at_destination_port: {
    label: 'Arrived at Destination Port',
    color: 'bg-green-100 text-green-700 border-green-200',
    icon: Flag,
    progress: 70
  },
  
  // Customs statuses
  customs_cleared: {
    label: 'Customs Cleared',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Shield,
    progress: 80
  },
  
  // Delivery statuses
  out_for_delivery: {
    label: 'Out for Delivery',
    color: 'bg-pink-50 text-pink-700 border-pink-200',
    icon: Navigation,
    progress: 90
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: CheckCircleSolid,
    progress: 100
  },
  completed: {
    label: 'Completed',
    color: 'bg-emerald-600 text-white border-emerald-600',
    icon: Award,
    progress: 100
  },
  
  // Problem statuses
  damage_reported: {
    label: 'Damage Reported',
    color: 'bg-red-50 text-red-700 border-red-200',
    icon: AlertCircle,
    progress: 0
  },
  on_hold: {
    label: 'On Hold',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    icon: Pause,
    progress: 0
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-50 text-red-700 border-red-200',
    icon: XCircleSolid,
    progress: 0
  },
  returned: {
    label: 'Returned',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: RotateCcw,
    progress: 0
  }
};

// Progress বার জন্য ফাংশন
const getProgressForStatus = (status) => {
  const config = STATUS_CONFIG[status];
  if (config) return config.progress;
  
  const progressMap = {
    'pending': 10,
    'received_at_warehouse': 20,
    'inspected': 22,
    'consolidating': 25,
    'consolidated': 30,
    'ready_for_dispatch': 35,
    'loaded_in_container': 40,
    'dispatched': 45,
    'departed_port_of_origin': 50,
    'in_transit_sea_freight': 55,
    'in_transit': 60,
    'arrived_at_destination_port': 70,
    'customs_cleared': 80,
    'out_for_delivery': 90,
    'delivered': 100,
    'completed': 100
  };
  
  return progressMap[status] || 0;
};

// ==================== SHIPMENT MODE CONFIG ====================
const SHIPMENT_MODE_CONFIG = {
  air_freight: { icon: Plane, label: 'Air Freight', color: COLORS.info },
  sea_freight: { icon: Ship, label: 'Sea Freight', color: COLORS.secondary },
  road_freight: { icon: Truck, label: 'Road Freight', color: COLORS.success },
  rail_freight: { icon: Train, label: 'Rail Freight', color: COLORS.purple },
  express_courier: { icon: Package, label: 'Express', color: COLORS.orange }
};

// ==================== BUTTON COMPONENT ====================
const Button = ({ children, variant = 'primary', size = 'md', isLoading, onClick, className = '', icon: Icon, disabled }) => {
  const variants = {
    primary: `bg-[${COLORS.primary}] text-white hover:bg-[#d35400]`,
    secondary: `bg-[${COLORS.secondary}] text-white hover:bg-[#2c5a8c]`,
    outline: `border-2 border-[${COLORS.primary}] text-[${COLORS.primary}] hover:bg-[#fef2e6]`,
    ghost: 'text-gray-600 hover:bg-gray-100',
    success: `bg-[${COLORS.success}] text-white hover:bg-[#0d9488]`,
    danger: `bg-[${COLORS.danger}] text-white hover:bg-[#dc2626]`
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center ${variants[variant]} ${sizes[size]} ${className} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4 mr-2" />}
          {children}
        </>
      )}
    </button>
  );
};

// ==================== INPUT COMPONENT ====================
const Input = ({ type = 'text', label, value, onChange, placeholder, icon: Icon, error, required, className = '' }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${COLORS.primary}] focus:border-transparent ${Icon ? 'pl-10' : ''} ${error ? 'border-red-300' : 'border-gray-300'} ${className}`}
      />
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

// ==================== SELECT COMPONENT ====================
const Select = ({ label, value, onChange, options, placeholder, icon: Icon, required, className = '' }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 text-sm border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[${COLORS.primary}] focus:border-transparent ${Icon ? 'pl-10' : 'pl-3'} pr-10 ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  </div>
);

// ==================== STATUS BADGE ====================
const StatusBadge = ({ status, size = 'md' }) => {
  const config = STATUS_CONFIG[status];
  
  const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-xs', lg: 'px-3 py-1.5 text-sm' };
  
  if (!config) {
    const formattedLabel = status?.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Unknown';
    
    return (
      <span className={`inline-flex items-center rounded-full font-medium border bg-gray-50 text-gray-700 border-gray-200 ${sizes[size]}`}>
        <Clock className={`${size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} mr-1`} />
        {formattedLabel}
      </span>
    );
  }

  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${config.color} ${sizes[size]}`}>
      <Icon className={`${size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} mr-1`} />
      {config.label}
    </span>
  );
};

// ==================== MODE BADGE ====================
const ModeBadge = ({ mode }) => {
  const config = SHIPMENT_MODE_CONFIG[mode] || { icon: Package, label: mode, color: COLORS.secondary };
  const Icon = config.icon;

  return (
    <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: `${config.color}15`, color: config.color }}>
      <Icon className="h-3.5 w-3.5 mr-1" />
      {config.label}
    </span>
  );
};

// ==================== PROGRESS BAR ====================
const ProgressBar = ({ progress, showLabel = false }) => (
  <div className="w-full">
    {showLabel && (
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">Progress</span>
        <span className="text-xs font-medium" style={{ color: COLORS.primary }}>{progress}%</span>
      </div>
    )}
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: progress === 100 ? COLORS.success : COLORS.primary }} />
    </div>
  </div>
);

// ==================== STAT CARD ====================
const StatCard = ({ title, value, icon: Icon, color, onClick, active }) => (
  <div onClick={onClick} className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${active ? `border-[${COLORS.primary}] ring-2 ring-[${COLORS.primary}]/20` : 'border-gray-200'}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500 mb-1">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

// ==================== ACTION MENU ====================
const ActionMenu = ({ shipment, onAction }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const actions = [
    { label: 'View Details', icon: Eye, action: 'view', color: 'text-blue-600' },
    // { label: 'View Timeline', icon: Activity, action: 'timeline', color: 'text-purple-600' },
    // { label: 'Track Shipment', icon: Navigation, action: 'track', color: 'text-green-600' },
    // { label: 'Download Documents', icon: Download, action: 'download', color: 'text-gray-600' }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-gray-100 rounded-lg">
        <MoreVertical className="h-4 w-4 text-gray-500" />
      </button>
      {showMenu && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 py-1">
          {actions.map(action => (
            <button key={action.action} onClick={() => { onAction(action.action, shipment); setShowMenu(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
              <action.icon className={`h-4 w-4 mr-3 ${action.color}`} />
              <span className="text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ==================== MODAL ====================
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b sticky top-0 bg-white flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

// ==================== SHIPMENT DETAILS MODAL ====================
const ShipmentDetailsModal = ({ isOpen, onClose, shipment }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && shipment) fetchTimeline();
  }, [isOpen, shipment]);

  const fetchTimeline = async () => {
    setLoading(true);
    try {
      const result = await getMyShipmentTimeline(shipment._id);
      if (result.success) setTimeline(result.data || []);
    } catch (error) {
      toast.error('Failed to fetch timeline');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !shipment) return null;

  const totalWeight = calculateTotalWeight(shipment.packages);
  const totalVolume = calculateTotalVolume(shipment.packages);
  const daysInTransit = getDaysInTransit(shipment.transport?.actualDeparture);

  const tabs = [
    { id: 'details', label: 'Details', icon: Package },
    { id: 'packages', label: 'Packages', icon: Box },
    { id: 'transport', label: 'Transport', icon: Truck },
    // { id: 'timeline', label: 'Timeline', icon: Activity }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Shipment Details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold">#{shipment.shipmentNumber || shipment._id?.slice(-8)}</h4>
            {shipment.trackingNumber && <p className="text-sm text-gray-500">Tracking: {shipment.trackingNumber}</p>}
          </div>
          <div className="flex items-center space-x-2">
            {/* <StatusBadge status={shipment.status} size="lg" /> */}
            {/* <ModeBadge mode={shipment.shipmentDetails?.shipmentType} /> */}
          </div>
        </div>

        {/* Progress */}
        {/* <div className="bg-gray-50 p-4 rounded-lg">
          <ProgressBar progress={getShipmentProgress(shipment.status)} showLabel />
        </div> */}

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex space-x-4">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-2 text-sm font-medium border-b-2 flex items-center ${activeTab === tab.id ? `border-[${COLORS.primary}] text-[${COLORS.primary}]` : 'border-transparent text-gray-500'}`}>
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h5 className="text-sm font-medium mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" style={{ color: COLORS.primary }} />
                  Shipment Information
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Origin</p>
                    <p className="text-sm font-medium">{shipment.shipmentDetails?.origin || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="text-sm font-medium">{shipment.shipmentDetails?.destination || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mode</p>
                    <ModeBadge mode={shipment.shipmentDetails?.shipmentType} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-sm font-medium">{formatShipmentDate(shipment.createdAt, 'short')}</p>
                  </div>
                </div>
                {shipment.specialInstructions && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Special Instructions</p>
                    <p className="text-sm bg-gray-50 p-2 rounded">{shipment.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Packages</p>
                  <p className="text-2xl font-semibold" style={{ color: COLORS.primary }}>{shipment.packages?.length || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Weight</p>
                  <p className="text-2xl font-semibold" style={{ color: COLORS.secondary }}>{formatWeight(totalWeight)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Volume</p>
                  <p className="text-2xl font-semibold" style={{ color: COLORS.success }}>{formatVolume(totalVolume)}</p>
                </div>
              </div>

              {shipment.packages?.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Weight</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Dimensions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {shipment.packages.map((pkg, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm">{pkg.packageType}</td>
                          <td className="px-4 py-2 text-sm">{pkg.quantity}</td>
                          <td className="px-4 py-2 text-sm">{formatWeight(pkg.weight)}</td>
                          <td className="px-4 py-2 text-sm">
                            {pkg.length && pkg.width && pkg.height 
                              ? `${pkg.length}×${pkg.width}×${pkg.height} cm`
                              : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No package details</p>
              )}
            </div>
          )}

          {activeTab === 'transport' && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h5 className="text-sm font-medium mb-3">Transport Details</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Carrier</p>
                    <p className="text-sm font-medium">{shipment.transport?.carrierName || 'Not assigned'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Route</p>
                    <p className="text-sm font-medium">{shipment.transport?.route || 'Direct'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Vessel/Flight</p>
                    <p className="text-sm font-medium">{shipment.transport?.vesselName || shipment.transport?.flightNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Container</p>
                    <p className="text-sm font-medium">{shipment.transport?.containerNumber || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="text-sm font-medium mb-3">Schedule</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Est. Departure</p>
                    <p className="text-sm font-medium">{shipment.transport?.estimatedDeparture ? formatShipmentDate(shipment.transport.estimatedDeparture, 'short') : 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Est. Arrival</p>
                    <p className="text-sm font-medium">{shipment.transport?.estimatedArrival ? formatShipmentDate(shipment.transport.estimatedArrival, 'short') : 'Not set'}</p>
                  </div>
                </div>
                {shipment.transport?.estimatedArrival && !shipment.actualDeliveryDate && (
                  <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Days in Transit: <span className="font-medium">{daysInTransit} days</span></p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" style={{ color: COLORS.primary }} />
                </div>
              ) : timeline.length > 0 ? (
                timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      event.type === 'status' ? 'bg-blue-100' : 
                      event.type === 'tracking' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {event.type === 'status' && <Activity className="h-4 w-4 text-blue-600" />}
                      {event.type === 'tracking' && <MapPin className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{event.title || getShipmentStatusDisplayText(event.status)}</p>
                        <p className="text-xs text-gray-400">{formatShipmentDate(event.timestamp || event.createdAt, 'short')}</p>
                      </div>
                      {event.description && <p className="text-xs text-gray-600 mt-1">{event.description}</p>}
                      {event.location && <p className="text-xs text-gray-500 mt-1 flex items-center"><MapPin className="h-3 w-3 mr-1" />{event.location}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No timeline events</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="primary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

// ==================== TRACKING MODAL ====================
const TrackingModal = ({ isOpen, onClose, trackingNumber }) => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && trackingNumber) fetchTracking();
  }, [isOpen, trackingNumber]);

  const fetchTracking = async () => {
    setLoading(true);
    try {
      const result = await trackShipmentByNumber(trackingNumber);
      if (result.success) setTrackingData(result.data);
      else toast.error(result.message);
    } catch (error) {
      toast.error('Failed to fetch tracking');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Track Shipment">
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: COLORS.primary }} />
        </div>
      ) : trackingData ? (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Tracking Number</p>
                <p className="text-lg font-semibold">{trackingData.trackingNumber}</p>
              </div>
              <StatusBadge status={trackingData.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Origin</p>
                <p className="text-sm font-medium">{trackingData.origin}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Destination</p>
                <p className="text-sm font-medium">{trackingData.destination}</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-3">Tracking History</h5>
            <div className="space-y-4">
              {trackingData.trackingHistory?.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{event.status}</p>
                      <p className="text-xs text-gray-400">{formatShipmentDate(event.timestamp, 'short')}</p>
                    </div>
                    <p className="text-xs text-gray-600">{event.location}</p>
                    {event.description && <p className="text-xs text-gray-500 mt-1">{event.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">No tracking information found</p>
      )}
    </Modal>
  );
};

// ==================== MAIN COMPONENT ====================
export default function ShipmentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [myShipments, setMyShipments] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, pages: 1 });

  // Filter State
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: '',
    search: '',
    sort: '-createdAt'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [activeStat, setActiveStat] = useState('all');

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    delivered: 0,
    pending: 0,
    inTransit: 0
  });

  // Fetch My Shipments
  const fetchMyShipments = async () => {
    setLoading(true);
    try {
      const response = await getMyShipments(filters);
      if (response.success) {
        setMyShipments(response.data || []);
        setPagination(response.pagination || { total: 0, page: 1, limit: 10, pages: 1 });
        
        // Calculate stats
        const summary = getShipmentSummary(response.data || []);
        setStats(summary);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to fetch your shipments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyShipments();
  }, [filters.page, filters.status, filters.sort]);

  // Handle Filter Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
    
    if (name === 'status') {
      setActiveStat(value || 'all');
    }
  };

  // Handle Search
  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  // Handle Sort
  const handleSort = (field) => {
    const sortOrder = filters.sort === field ? `-${field}` : field;
    setFilters(prev => ({ ...prev, sort: sortOrder, page: 1 }));
  };

  // Clear Filters
  const clearFilters = () => {
    setFilters({ page: 1, limit: 10, status: '', search: '', sort: '-createdAt' });
    setActiveStat('all');
    toast.info('Filters cleared');
  };

  // Handle Actions
  const handleAction = async (action, shipment) => {
    setSelectedShipment(shipment);
    switch (action) {
      case 'view':
        setShowDetailsModal(true);
        break;
      case 'timeline':
        setShowDetailsModal(true); // Will open details modal with timeline tab
        break;
      case 'track':
        if (shipment.trackingNumber) {
          setTrackingNumber(shipment.trackingNumber);
          setShowTrackingModal(true);
        } else {
          toast.warning('No tracking number available');
        }
        break;
      case 'download':
        toast.info('Download feature coming soon');
        break;
    }
  };

  // Handle Export
  const handleExport = () => {
    if (myShipments.length === 0) {
      toast.warning('No shipments to export');
      return;
    }
    exportShipmentsToCSV(myShipments);
    toast.success(`${myShipments.length} shipments exported`);
  };

  // Filter by status
  const filterByStatus = (statusKey) => {
    setActiveStat(statusKey);
    setFilters(prev => ({ 
      ...prev, 
      status: statusKey === 'all' ? '' : statusKey,
      page: 1 
    }));
  };

  // Options
  const statusOptions = Object.keys(STATUS_CONFIG).map(key => ({ 
    value: key, 
    label: STATUS_CONFIG[key].label 
  }));

  // Stats for display
  const visibleStats = [
    { key: 'all', label: 'All Shipments', value: stats.total, icon: Package, color: 'bg-gray-100 text-gray-600' },
    { key: 'active', label: 'Active', value: stats.active, icon: Activity, color: 'bg-blue-100 text-blue-600' },
    { key: 'pending', label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
    { key: 'inTransit', label: 'In Transit', value: stats.inTransit, icon: Truck, color: 'bg-cyan-100 text-cyan-600' },
    { key: 'delivered', label: 'Delivered', value: stats.delivered, icon: CheckCircleSolid, color: 'bg-green-100 text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fef2e6' }}>
                  <Package className="h-4 w-4" style={{ color: COLORS.primary }} />
                </div>
                <h1 className="ml-2 text-lg font-semibold text-gray-900">My Shipments</h1>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {stats.total} Total
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => router.push('/Bookings/my_bookings')} 
                icon={Plus}
              >
                Create New Booking
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {visibleStats.map(stat => (
            <StatCard 
              key={stat.key} 
              title={stat.label} 
              value={stat.value} 
              icon={stat.icon} 
              color={stat.color}
              active={activeStat === stat.key}
              onClick={() => filterByStatus(stat.key)}
            />
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by shipment number, tracking number..."
                  value={filters.search}
                  onChange={handleSearch}
                  icon={Search}
                />
              </div>
              <Button 
                variant={showFilters ? 'primary' : 'light'} 
                size="md" 
                onClick={() => setShowFilters(!showFilters)} 
                icon={FilterIcon}
              >
                Filters
                {(filters.status || filters.search) && (
                  <span className="ml-2 bg-white text-[#E67E22] rounded-full px-2 py-0.5 text-xs">
                    {Object.values(filters).filter(v => v && v !== '' && v !== 10 && v !== 1).length}
                  </span>
                )}
              </Button>
              {(filters.search || filters.status) && (
                <Button variant="light" size="md" onClick={clearFilters} icon={X}>
                  Clear
                </Button>
              )}
              <Button variant="light" size="md" onClick={fetchMyShipments} icon={RefreshCw} isLoading={loading} />
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select 
                  name="status" 
                  value={filters.status} 
                  onChange={handleFilterChange} 
                  options={statusOptions} 
                  placeholder="All Statuses" 
                  label="Filter by Status" 
                  icon={Activity} 
                />
              </div>
            )}
          </div>
        </div>

        {/* Shipments Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('shipmentNumber')}>
                    <div className="flex items-center">
                      Shipment Info
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th> */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('createdAt')}>
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packages</th>
                  {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> */}
                  {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th> */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin" style={{ color: COLORS.primary }} />
                        <span className="ml-2 text-sm text-gray-500">Loading your shipments...</span>
                      </div>
                    </td>
                  </tr>
                ) : myShipments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center">
                      <div className="flex flex-col items-center">
                        <Package className="h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500">No shipments found</p>
                        <p className="text-xs text-gray-400 mt-1">Create a booking to start shipping</p>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => router.push('/Bookings/my_bookings')} 
                          className="mt-3" 
                          icon={Plus}
                        >
                          Create New Booking
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  myShipments.map((shipment) => {
                    const totalWeight = calculateTotalWeight(shipment.packages);
                    const progress = getShipmentProgress(shipment.status);
                    
                    return (
                      <tr key={shipment._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <div 
                              className="text-sm font-medium cursor-pointer hover:underline" 
                              style={{ color: COLORS.primary }} 
                              onClick={() => { setSelectedShipment(shipment); setShowDetailsModal(true); }}
                            >
                              #{shipment.shipmentNumber || shipment._id?.slice(-8)}
                            </div>
                            {shipment.trackingNumber && (
                              <div className="text-xs text-gray-500 flex items-center mt-1">
                                <Hash className="h-3 w-3 mr-1" />
                                {shipment.trackingNumber}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-xs">
                            <span className="font-medium">{shipment.shipmentDetails?.origin || 'N/A'}</span>
                            <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
                            <span className="font-medium">{shipment.shipmentDetails?.destination || 'N/A'}</span>
                          </div>
                        </td>
                        {/* <td className="px-4 py-3">
                          <ModeBadge mode={shipment.shipmentDetails?.shipmentType} />
                        </td> */}
                        <td className="px-4 py-3">
                          <div className="text-xs text-gray-500">
                            {formatShipmentDate(shipment.createdAt, 'short')}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-xs">
                            <span className="font-medium">{shipment.packages?.length || 0}</span>
                            <span className="text-gray-500 ml-1">pkgs</span>
                            <div className="text-gray-500">{formatWeight(totalWeight)}</div>
                          </div>
                        </td>
                        {/* <td className="px-4 py-3">
                          <StatusBadge status={shipment.status} size="sm" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="w-24">
                            <ProgressBar progress={progress} />
                          </div>
                        </td> */}
                        <td className="px-4 py-3">
                          <ActionMenu shipment={shipment} onAction={handleAction} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {(pagination.page - 1) * pagination.limit + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="p-2 text-gray-400 hover:text-[#E67E22] disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-600">Page {pagination.page} of {pagination.pages}</span>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.pages}
                  className="p-2 text-gray-400 hover:text-[#E67E22] disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ShipmentDetailsModal 
        isOpen={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)} 
        shipment={selectedShipment} 
      />
      
      <TrackingModal 
        isOpen={showTrackingModal} 
        onClose={() => setShowTrackingModal(false)} 
        trackingNumber={trackingNumber} 
      />
    </div>
  );
}