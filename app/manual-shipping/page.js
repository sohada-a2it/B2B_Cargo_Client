// components/myShipping/myShipping.js - Combined Shipments from Both APIs

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  getMyShipments,
  getMyShipmentById,
  getMyShipmentTimeline,
  trackShipmentByNumber,
  getShipmentStatusDisplayText,
  getShipmentProgress,
  formatShipmentDate,
  formatWeight,
  formatVolume,
  calculateTotalWeight,
  calculateTotalVolume,
  getShipmentSummary,
  requestReturn,
  getReturnRequestStatus,
  canRequestReturn,
  getReturnReasonText,
  getReturnStatusText,
  customerConfirmReturn,
  customerRejectReturn,
  formatReturnCost
} from '@/Api/shipping';

// Second API imports
import {
  getMyNewShipments,
  getMyShipmentTracking,
} from '@/Api/newShipping';

// Icons
import {
  Package, Search, Filter, ChevronDown, ChevronLeft, ChevronRight,
  Eye, Download, Plus, Calendar, MapPin, User,
  Truck, Ship, Plane, Clock, CheckCircle, XCircle,
  AlertCircle, RefreshCw, Loader2, MoreVertical,
  ArrowUpDown, Filter as FilterIcon,
  X, Globe, Hash, DollarSign,
  ChevronsLeft, ChevronsRight,
  FileText, Box, Activity, Navigation,
  CheckCircle as CheckCircleSolid,
  XCircle as XCircleSolid, Clock as ClockSolid,
  Send, Flag, Shield, Award, Pause, RotateCcw,
  Layers, Train, Undo2, MessageCircle, ThumbsUp, ThumbsDown, Info,
  Building2, FileCheck, Home, TrendingUp
} from 'lucide-react';
// Second API এর স্ট্যাটাসের জন্য প্রগ্রেস ক্যালকুলেটর
const getSecondApiProgress = (status) => {
  const progressMap = {
    'booking_requested': 5,
    'pending': 10,
    'received_at_warehouse': 20,
    'picked_up_from_warehouse': 30,
    'departed_port_of_origin': 50,
    'in_transit': 60,
    'arrived_at_destination_port': 70,
    'customs_clearance': 80,
    'out_for_delivery': 90,
    'delivered': 100,
    'cancelled': 0
  };
  return progressMap[status] || 10;
};

// Second API এর স্ট্যাটাসের জন্য লেবেল
const getSecondApiStatusLabel = (status) => {
  const labelMap = {
    'booking_requested': 'Booking Requested',
    'pending': 'Pending',
    'received_at_warehouse': 'Received at Warehouse',
    'picked_up_from_warehouse': 'Picked Up',
    'departed_port_of_origin': 'Departed Origin',
    'in_transit': 'In Transit',
    'arrived_at_destination_port': 'Arrived at Port',
    'customs_clearance': 'Customs Clearance',
    'out_for_delivery': 'Out for Delivery',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  };
  return labelMap[status] || status?.replace(/_/g, ' ') || 'Unknown';
};
// ==================== COLOR CONSTANTS ====================
const COLORS = {
  primary: '#E67E22',
  primaryDark: '#d35400',
  primaryLight: '#fef2e6',
  secondary: '#3C719D',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  purple: '#8b5cf6',
  orange: '#f97316',
  cyan: '#06b6d4',
  emerald: '#10b981',
  teal: '#14b8a6'
};

// ==================== COMPLETE STATUS CONFIGURATION ====================
const STATUS_CONFIG = {
  // First API statuses
  pending: {
    label: 'Pending',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    icon: Clock,
    progress: 10
  },
  received_at_warehouse: {
    label: 'Received at Warehouse',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: Building2,
    progress: 20
  },
  picked_up_from_warehouse: {
    label: 'Picked Up',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Truck,
    progress: 15
  },
  inspected: {
    label: 'Inspected',
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: CheckCircle,
    progress: 22
  },
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
  arrived_at_destination_port: {
    label: 'Arrived at Port',
    color: 'bg-green-100 text-green-700 border-green-200',
    icon: Flag,
    progress: 70
  },
  customs_cleared: {
    label: 'Customs Cleared',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Shield,
    progress: 80
  },
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
  },
  // Second API statuses
  booking_requested: {
    label: 'Booking Requested',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Clock,
    progress: 5
  },
  customs_clearance: {
    label: 'Customs Clearance',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: FileText,
    progress: 80
  }
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
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  onClick, 
  className = '', 
  icon: Icon,
  disabled 
}) => {
  const variants = {
    primary: `bg-[${COLORS.primary}] text-white hover:bg-[#d35400]`,
    secondary: `bg-[${COLORS.secondary}] text-white hover:bg-[#2c5a8c]`,
    outline: `border-2 border-[${COLORS.primary}] text-[${COLORS.primary}] hover:bg-[#fef2e6]`,
    ghost: 'text-gray-600 hover:bg-gray-100',
    success: `bg-[${COLORS.success}] text-white hover:bg-[#0d9488]`,
    danger: `bg-[${COLORS.danger}] text-white hover:bg-[#dc2626]`,
    light: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  const IconComponent = Icon && typeof Icon === 'function' ? Icon : null;

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center ${variants[variant]} ${sizes[size]} ${className} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
          {children}
        </>
      )}
    </button>
  );
};

// ==================== INPUT COMPONENT ====================
const Input = ({ type = 'text', label, value, onChange, placeholder, icon: Icon, error, required, className = '', textarea = false }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
      )}
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows="3"
          className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${COLORS.primary}] focus:border-transparent ${Icon ? 'pl-10' : ''} ${error ? 'border-red-300' : 'border-gray-300'} ${className}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${COLORS.primary}] focus:border-transparent ${Icon ? 'pl-10' : ''} ${error ? 'border-red-300' : 'border-gray-300'} ${className}`}
        />
      )}
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
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
  const config = SHIPMENT_MODE_CONFIG[mode] || { icon: Package, label: mode || 'Standard', color: COLORS.secondary };
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
const ActionMenu = ({ shipment, onAction, source = 'first' }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // For second API shipments, check if return can be requested based on status
  const canReturn = source === 'first' 
    ? canRequestReturn(shipment)
    : shipment.shipmentStatus === 'delivered';
    
  const hasReturnRequest = source === 'first' 
    ? (shipment.returnRequest && shipment.returnRequest.status !== 'none')
    : (shipment.returnRequest);

  const actions = [
    { label: 'View Details', icon: Eye, action: 'view', color: 'text-blue-600' },
    { label: 'Track Shipment', icon: Navigation, action: 'track', color: 'text-green-600' },
  ];

  if (canReturn && !hasReturnRequest) {
    actions.push({ label: 'Request Return', icon: Undo2, action: 'return', color: 'text-orange-600' });
  }

  if (hasReturnRequest) {
    const returnStatus = shipment.returnRequest?.status;
    let returnLabel = 'Return Request';
    if (returnStatus === 'pending') returnLabel = 'Return Pending';
    else if (returnStatus === 'approved') returnLabel = 'Return Approved';
    else if (returnStatus === 'completed') returnLabel = 'Return Completed';
    else if (returnStatus === 'rejected') returnLabel = 'Return Rejected';
    
    actions.push({ 
      label: returnLabel, 
      icon: returnStatus === 'approved' ? ThumbsUp : returnStatus === 'rejected' ? ThumbsDown : Undo2, 
      action: 'viewReturn', 
      color: returnStatus === 'approved' ? 'text-green-600' : returnStatus === 'rejected' ? 'text-red-600' : 'text-orange-600' 
    });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-gray-100 rounded-lg">
        <MoreVertical className="h-4 w-4 text-gray-500" />
      </button>
      {showMenu && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 py-1">
          {actions.map(action => (
            <button key={action.action} onClick={() => { onAction(action.action, shipment, source); setShowMenu(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
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
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        <div className={`relative bg-white rounded-2xl ${sizes[size]} w-full max-h-[90vh] overflow-y-auto`}>
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

// ==================== RETURN REQUEST MODAL ====================
const ReturnRequestModal = ({ isOpen, onClose, shipment, onSuccess, source = 'first' }) => {
  const [formData, setFormData] = useState({
    reason: '',
    description: '',
    items: []
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [calculatedCost, setCalculatedCost] = useState(null);

  const returnReasons = [
    { value: 'damaged_product', label: 'Damaged Product', costNote: 'Free return - No cost to you' },
    { value: 'wrong_product', label: 'Wrong Product Received', costNote: 'Free return - No cost to you' },
    { value: 'missing_items', label: 'Missing Items', costNote: 'Free return - No cost to you' },
    { value: 'delayed_delivery', label: 'Delayed Delivery', costNote: 'Free return - No cost to you' },
    { value: 'customer_cancellation', label: 'Customer Cancellation', costNote: '15% restocking fee (minimum $50)' },
    { value: 'other', label: 'Other Reason', costNote: 'Standard return charges apply (10% of product value)' }
  ];

  useEffect(() => {
    if (formData.reason && shipment) {
      let packages = [];
      if (source === 'first') {
        packages = shipment.packages || [];
      } else {
        packages = shipment.shipmentDetails?.packageDetails || [];
      }
      
      const totalValue = packages.reduce((sum, pkg) => {
        return sum + ((pkg.value?.amount || pkg.value || 0) * (pkg.quantity || 1));
      }, 0) || 0;

      let cost = 0;
      let isFree = false;
      let breakdown = {};

      switch (formData.reason) {
        case 'damaged_product':
        case 'wrong_product':
        case 'missing_items':
        case 'delayed_delivery':
          isFree = true;
          cost = 0;
          breakdown = { note: 'No charges for this return reason' };
          break;
        case 'customer_cancellation':
          cost = Math.max(50, totalValue * 0.15);
          breakdown = {
            shippingCost: 25,
            handlingFee: 15,
            restockingFee: Math.max(10, totalValue * 0.1),
            total: cost,
            note: 'Customer cancellation charges'
          };
          break;
        default:
          cost = Math.max(35, totalValue * 0.1);
          breakdown = {
            shippingCost: 20,
            handlingFee: 10,
            restockingFee: Math.max(5, totalValue * 0.05),
            total: cost,
            note: 'Standard return charges'
          };
          break;
      }

      setCalculatedCost({ amount: cost, isFree, breakdown, currency: 'USD' });
    }
  }, [formData.reason, shipment, source]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.reason) newErrors.reason = 'Please select a reason';
    if (!formData.description) newErrors.description = 'Please provide details';
    else if (formData.description.length < 10) newErrors.description = 'Please provide at least 10 characters';
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await requestReturn(shipment._id, {
        reason: formData.reason,
        description: formData.description,
        items: formData.items
      });

      if (result.success) {
        toast.success(result.message || 'Return request submitted successfully');
        onSuccess?.();
        onClose();
      } else {
        toast.error(result.message || 'Failed to submit return request');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const selectedReason = returnReasons.find(r => r.value === formData.reason);
  const shipmentNumber = source === 'first' 
    ? (shipment?.shipmentNumber || shipment?._id?.slice(-8))
    : (shipment?.shipmentNumber || shipment?._id?.slice(-8));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Return" size="md">
      <div className="space-y-5">
        <div className="bg-orange-50 p-3 rounded-lg">
          <p className="text-sm text-orange-700">
            <AlertCircle className="h-4 w-4 inline mr-1" />
            You have 14 days from delivery date to request a return.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shipment #{shipmentNumber}
          </label>
          <p className="text-xs text-gray-500">
            Delivered on: {formatShipmentDate(shipment?.deliveredAt || shipment?.updatedAt, 'short')}
          </p>
        </div>

        <Select
          label="Return Reason"
          value={formData.reason}
          onChange={(e) => handleChange('reason', e.target.value)}
          options={returnReasons}
          placeholder="Select a reason"
          required
        />

        {selectedReason && (
          <div className="bg-blue-50 p-2 rounded-lg">
            <p className="text-xs text-blue-700">
              <Info className="h-3 w-3 inline mr-1" />
              {selectedReason.costNote}
            </p>
          </div>
        )}

        {calculatedCost && formData.reason && (
          <div className={`p-3 rounded-lg ${calculatedCost.isFree ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Estimated Return Cost:</span>
              <span className={`font-bold ${calculatedCost.isFree ? 'text-green-700' : 'text-yellow-700'}`}>
                {calculatedCost.isFree ? 'FREE' : `${calculatedCost.currency} ${calculatedCost.amount.toFixed(2)}`}
              </span>
            </div>
            {!calculatedCost.isFree && calculatedCost.breakdown && (
              <div className="mt-2 text-xs text-gray-600">
                <p>Breakdown:</p>
                <ul className="list-disc list-inside ml-2">
                  {calculatedCost.breakdown.shippingCost > 0 && <li>Shipping: ${calculatedCost.breakdown.shippingCost}</li>}
                  {calculatedCost.breakdown.handlingFee > 0 && <li>Handling: ${calculatedCost.breakdown.handlingFee}</li>}
                  {calculatedCost.breakdown.restockingFee > 0 && <li>Restocking: ${calculatedCost.breakdown.restockingFee}</li>}
                </ul>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              *Final cost will be confirmed by admin upon approval
            </p>
          </div>
        )}

        <Input
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Please describe the issue in detail..."
          textarea
          required
          error={errors.description}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="light" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={loading}>
            Submit Return Request
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// ==================== RETURN STATUS MODAL ====================
const ReturnStatusModal = ({ isOpen, onClose, shipment, onSuccess }) => {
  const [returnStatus, setReturnStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  useEffect(() => {
    if (isOpen && shipment) {
      fetchReturnStatus();
    }
  }, [isOpen, shipment]);

  const fetchReturnStatus = async () => {
    setLoading(true);
    try {
      const result = await getReturnRequestStatus(shipment._id);
      if (result.success) {
        setReturnStatus(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch return status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReturn = async () => {
    setConfirmLoading(true);
    try {
      const result = await customerConfirmReturn(shipment._id, {
        notes: 'I confirm the return with the associated cost',
        acceptCost: true
      });

      if (result.success) {
        toast.success(result.message || 'Return confirmed and completed successfully!');
        onSuccess?.();
        onClose();
        setShowConfirmDialog(false);
      } else {
        toast.error(result.message || 'Failed to confirm return');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleRejectReturn = async () => {
    if (!rejectReason.trim()) {
      toast.warning('Please provide a reason for cancellation');
      return;
    }

    setRejectLoading(true);
    try {
      const result = await customerRejectReturn(shipment._id, {
        reason: rejectReason
      });

      if (result.success) {
        toast.success(result.message || 'Return cancelled successfully');
        onSuccess?.();
        onClose();
        setShowRejectDialog(false);
        setRejectReason('');
      } else {
        toast.error(result.message || 'Failed to cancel return');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setRejectLoading(false);
    }
  };

  if (!isOpen) return null;

  const returnRequest = returnStatus?.returnRequest || shipment?.returnRequest;
  
  if (!returnRequest || returnRequest.status === 'none') {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Return Status" size="sm">
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No return request found for this shipment.</p>
        </div>
      </Modal>
    );
  }

  const returnCost = returnRequest.returnCost || 0;
  const isFreeReturn = returnRequest.isFreeReturn || false;
  const costBreakdown = returnRequest.returnCostBreakdown;

  const statusConfig = {
    pending: {
      title: 'Pending Admin Approval',
      description: 'Your return request has been submitted and is waiting for admin review.',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      icon: Clock,
      actions: null
    },
    approved: {
      title: 'Return Approved - Action Required',
      description: 'Your return request has been approved. Please review the return cost below and confirm or cancel.',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: ThumbsUp,
      actions: 'confirm'
    },
    rejected_by_admin: {
      title: 'Return Rejected',
      description: `Your return request has been rejected. Reason: ${returnRequest.rejectionReason || 'Not specified'}`,
      color: 'bg-red-50 text-red-700 border-red-200',
      icon: ThumbsDown,
      actions: null
    },
    rejected_by_customer: {
      title: 'Return Cancelled',
      description: `You have cancelled this return request. Reason: ${returnRequest.customerRejectionReason || 'Not specified'}`,
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: XCircle,
      actions: null
    },
    completed: {
      title: 'Return Completed',
      description: 'Your return has been completed successfully.',
      color: 'bg-green-50 text-green-700 border-green-200',
      icon: CheckCircleSolid,
      actions: null
    }
  };

  const config = statusConfig[returnRequest.status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Return Request Status" size="md">
        <div className="space-y-5">
          <div className={`p-4 rounded-lg border ${config.color}`}>
            <div className="flex items-center space-x-3">
              <StatusIcon className="h-6 w-6" />
              <div>
                <p className="font-semibold">{config.title}</p>
                <p className="text-xs opacity-75">
                  Requested on: {formatShipmentDate(returnRequest.requestedAt, 'long')}
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h5 className="text-sm font-medium mb-3">Return Details</h5>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Reason</p>
                <p className="text-sm font-medium">{getReturnReasonText(returnRequest.reason)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Description</p>
                <p className="text-sm text-gray-600">{returnRequest.description}</p>
              </div>
              {returnRequest.returnTrackingNumber && (
                <div>
                  <p className="text-xs text-gray-500">Return Tracking Number</p>
                  <p className="text-sm font-medium">{returnRequest.returnTrackingNumber}</p>
                </div>
              )}
              {returnRequest.returnNotes && (
                <div>
                  <p className="text-xs text-gray-500">Admin Notes</p>
                  <p className="text-sm text-gray-600">{returnRequest.returnNotes}</p>
                </div>
              )}
            </div>
          </div>

          {returnRequest.status === 'approved' && (
            <div className="border rounded-lg p-4">
              <h5 className="text-sm font-medium mb-3 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" style={{ color: COLORS.primary }} />
                Return Cost Details
              </h5>
              
              {isFreeReturn ? (
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-green-700 font-semibold">FREE RETURN</p>
                  <p className="text-xs text-green-600 mt-1">No charges apply for this return</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {costBreakdown && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Shipping Cost:</span>
                          <span className="font-medium">${costBreakdown.shippingCost || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Handling Fee:</span>
                          <span className="font-medium">${costBreakdown.handlingFee || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Restocking Fee:</span>
                          <span className="font-medium">${costBreakdown.restockingFee || 0}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total Return Cost:</span>
                            <span style={{ color: COLORS.primary }}>${returnCost} USD</span>
                          </div>
                        </div>
                        {costBreakdown.note && (
                          <p className="text-xs text-gray-500 mt-2">{costBreakdown.note}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {!costBreakdown && (
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <p className="text-blue-700 font-semibold">Total Return Cost: ${returnCost} USD</p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 flex space-x-3">
                <Button 
                  variant="success" 
                  size="sm" 
                  onClick={() => setShowConfirmDialog(true)}
                  className="flex-1"
                >
                  Confirm Return
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => setShowRejectDialog(true)}
                  className="flex-1"
                >
                  Cancel Return
                </Button>
              </div>
            </div>
          )}

          {returnRequest.status !== 'approved' && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">{config.description}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="primary" onClick={onClose}>Close</Button>
          </div>
        </div>
      </Modal>

      {showConfirmDialog && (
        <Modal isOpen={showConfirmDialog} onClose={() => setShowConfirmDialog(false)} title="Confirm Return" size="sm">
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Are you sure you want to confirm this return?
                  </p>
                  {!isFreeReturn && (
                    <p className="text-xs text-yellow-700 mt-1">
                      You will be charged ${returnCost} USD for this return.
                    </p>
                  )}
                  <p className="text-xs text-yellow-700 mt-1">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
              <Button variant="success" onClick={handleConfirmReturn} isLoading={confirmLoading}>
                Yes, Confirm Return
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showRejectDialog && (
        <Modal isOpen={showRejectDialog} onClose={() => setShowRejectDialog(false)} title="Cancel Return" size="md">
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Are you sure you want to cancel this return?
                  </p>
                  <p className="text-xs text-red-700 mt-1">
                    This action cannot be undone. You will need to submit a new return request if you change your mind.
                  </p>
                </div>
              </div>
            </div>
            
            <Input
              label="Cancellation Reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please tell us why you want to cancel the return..."
              textarea
              required
            />

            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={() => setShowRejectDialog(false)}>Go Back</Button>
              <Button variant="danger" onClick={handleRejectReturn} isLoading={rejectLoading}>
                Yes, Cancel Return
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

// ==================== SHIPMENT DETAILS MODAL (First API) ====================
const ShipmentDetailsModal = ({ isOpen, onClose, shipment, source = 'first' }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  useEffect(() => {
    if (isOpen && shipment) {
      if (source === 'first') {
        fetchTimeline();
        fetchTrackingData();
      } else {
        // For second API shipments, we might have timeline in the shipment object
        if (shipment.timeline) {
          setTimeline(shipment.timeline);
        }
      }
    }
  }, [isOpen, shipment, source]);

  const fetchTrackingData = async () => {
    if (!shipment?.trackingNumber) return;
    setTrackingLoading(true);
    try {
      const result = await trackShipmentByNumber(shipment.trackingNumber);
      if (result.success) {
        setTrackingData(result.data);
      }
    } catch (error) {
      console.error('Tracking fetch error:', error);
    } finally {
      setTrackingLoading(false);
    }
  };

  const fetchTimeline = async () => {
    setLoading(true);
    try {
      const result = await getMyShipmentTimeline(shipment._id);
      if (result.success) setTimeline(result.data?.timeline || result.data || []);
    } catch (error) {
      toast.error('Failed to fetch timeline');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !shipment) return null;

  // Handle data structure differences
  let totalWeight = 0;
  let totalVolume = 0;
  let packages = [];
  let status = '';
  let trackingNum = '';
  let origin = '';
  let destination = '';
  let shipmentType = '';
  let createdAt = '';
  let updatedAt = '';

  if (source === 'first') {
    totalWeight = calculateTotalWeight(shipment.packages);
    totalVolume = calculateTotalVolume(shipment.packages);
    packages = shipment.packages || [];
    status = trackingData?.status || shipment.status;
    trackingNum = shipment.trackingNumber;
    origin = shipment.shipmentDetails?.origin;
    destination = shipment.shipmentDetails?.destination;
    shipmentType = shipment.shipmentDetails?.shipmentType;
    createdAt = shipment.createdAt;
    updatedAt = shipment.updatedAt;
  } else {
    totalWeight = shipment.shipmentDetails?.totalWeight || 0;
    packages = shipment.shipmentDetails?.packageDetails || [];
    status = shipment.shipmentStatus;
    trackingNum = shipment.trackingNumber;
    origin = shipment.shipmentDetails?.origin;
    destination = shipment.shipmentDetails?.destination;
    shipmentType = shipment.shipmentDetails?.shippingMode;
    createdAt = shipment.createdAt;
    updatedAt = shipment.updatedAt;
  }

  const progress = trackingData?.progress || getShipmentProgress(status);
  const currentStatus = trackingData?.status || status;
  const currentLocation = trackingData?.currentLocation || 'In Transit';

  const tabs = [
    { id: 'details', label: 'Details', icon: Package },
    { id: 'packages', label: 'Packages', icon: Box },
    { id: 'transport', label: 'Transport', icon: Truck },
    { id: 'timeline', label: 'Timeline', icon: Activity }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Shipment Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold">#{shipment.shipmentNumber || shipment._id?.slice(-8)}</h4>
            {trackingNum && (
              <p className="text-sm text-gray-500">Tracking: {trackingNum}</p>
            )}
          </div>
          <StatusBadge status={currentStatus} size="lg" />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Current Status</span>
            <span className="text-xs text-gray-500">Last updated: {formatShipmentDate(updatedAt, 'short')}</span>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{currentLocation}</span>
          </div>
          <ProgressBar progress={progress} showLabel />
        </div>

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
                    <p className="text-sm font-medium">{origin || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="text-sm font-medium">{destination || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mode</p>
                    <ModeBadge mode={shipmentType} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-sm font-medium">{formatShipmentDate(createdAt, 'short')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Packages</p>
                  <p className="text-2xl font-semibold" style={{ color: COLORS.primary }}>{packages.length || 0}</p>
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
              {packages.length > 0 ? (
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
                      {packages.map((pkg, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm">{pkg.packageType || pkg.description || 'Package'}</td>
                          <td className="px-4 py-2 text-sm">{pkg.quantity || 1}</td>
                          <td className="px-4 py-2 text-sm">{formatWeight(pkg.weight)}</td>
                          <td className="px-4 py-2 text-sm">
                            {pkg.dimensions?.length && pkg.dimensions?.width && pkg.dimensions?.height 
                              ? `${pkg.dimensions.length}×${pkg.dimensions.width}×${pkg.dimensions.height} cm`
                              : pkg.length && pkg.width && pkg.height ? `${pkg.length}×${pkg.width}×${pkg.height} cm` : 'N/A'}
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
                    <p className="text-sm font-medium">{shipment.transport?.carrierName || shipment.courier?.company || 'Not assigned'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Vessel/Flight</p>
                    <p className="text-sm font-medium">{shipment.transport?.vesselName || shipment.transport?.flightNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Container Number</p>
                    <p className="text-sm font-medium">{shipment.transport?.containerNumber || shipment.containerInfo?.containerNumber || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {loading || trackingLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" style={{ color: COLORS.primary }} />
                </div>
              ) : (trackingData?.timeline?.length > 0 || timeline.length > 0) ? (
                <div className="relative">
                  {(trackingData?.timeline || timeline).map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 mb-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          event.status === 'delivered' || event.status === 'completed' ? 'bg-green-100' :
                          event.status === 'arrived_at_destination_port' ? 'bg-teal-100' :
                          event.status === 'customs_cleared' ? 'bg-emerald-100' :
                          event.status === 'out_for_delivery' ? 'bg-pink-100' :
                          event.status === 'in_transit' ? 'bg-cyan-100' :
                          event.status === 'dispatched' ? 'bg-orange-100' :
                          'bg-gray-100'
                        }`}>
                          {event.status === 'delivered' && <CheckCircleSolid className="h-4 w-4 text-green-600" />}
                          {event.status === 'arrived_at_destination_port' && <Flag className="h-4 w-4 text-teal-600" />}
                          {event.status === 'customs_cleared' && <Shield className="h-4 w-4 text-emerald-600" />}
                          {event.status === 'out_for_delivery' && <Truck className="h-4 w-4 text-pink-600" />}
                          {event.status === 'in_transit' && <Truck className="h-4 w-4 text-cyan-600" />}
                          {event.status === 'dispatched' && <Send className="h-4 w-4 text-orange-600" />}
                          {(!event.status || event.status === 'pending') && <Clock className="h-4 w-4 text-gray-600" />}
                        </div>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {event.statusLabel || getShipmentStatusDisplayText(event.status) || event.title || 'Update'}
                            </p>
                            {event.description && (
                              <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                            )}
                            {event.location && (
                              <p className="text-xs text-gray-500 mt-1 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.location}
                              </p>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">
                            {formatShipmentDate(event.timestamp || event.date, 'long')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No timeline events yet</p>
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

  const progress = trackingData?.progress || 0;
  const currentLocation = trackingData?.currentLocation || 'In Transit';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Track Shipment" size="md">
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
              <StatusBadge status={trackingData.status} size="lg" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Origin</p>
                <p className="text-sm font-medium">{trackingData.origin || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Destination</p>
                <p className="text-sm font-medium">{trackingData.destination || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Current Status</span>
              <span className="text-xs text-blue-600">{progress}% Complete</span>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">{currentLocation}</span>
            </div>
            <ProgressBar progress={progress} />
          </div>

          <div>
            <h5 className="text-sm font-medium mb-3">Tracking History</h5>
            <div className="space-y-3">
              {trackingData.timeline?.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                    event.status === 'delivered' ? 'bg-green-100' :
                    event.status === 'arrived_at_destination_port' ? 'bg-teal-100' :
                    event.status === 'customs_cleared' ? 'bg-emerald-100' :
                    event.status === 'out_for_delivery' ? 'bg-pink-100' :
                    'bg-gray-100'
                  }`}>
                    {event.status === 'delivered' && <CheckCircleSolid className="h-3 w-3 text-green-600" />}
                    {event.status === 'arrived_at_destination_port' && <Flag className="h-3 w-3 text-teal-600" />}
                    {event.status === 'customs_cleared' && <Shield className="h-3 w-3 text-emerald-600" />}
                    {event.status === 'out_for_delivery' && <Truck className="h-3 w-3 text-pink-600" />}
                    {(!event.status || event.status === 'pending') && <Clock className="h-3 w-3 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{event.statusLabel || getShipmentStatusDisplayText(event.status)}</p>
                      <p className="text-xs text-gray-400">{formatShipmentDate(event.timestamp, 'short')}</p>
                    </div>
                    {event.location && <p className="text-xs text-gray-500 mt-0.5">{event.location}</p>}
                    {event.description && <p className="text-xs text-gray-400 mt-0.5">{event.description}</p>}
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
  const [firstApiShipments, setFirstApiShipments] = useState([]);
  const [secondApiShipments, setSecondApiShipments] = useState([]);
  const [allShipments, setAllShipments] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, pages: 1 });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: '',
    search: '',
    sort: '-createdAt'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedShipmentSource, setSelectedShipmentSource] = useState('first');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showReturnStatusModal, setShowReturnStatusModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [activeStat, setActiveStat] = useState('all');

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    delivered: 0,
    pending: 0,
    inTransit: 0
  });

  // Fetch both APIs
  const fetchAllShipments = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch from first API
      const firstParams = {
        page: 1,
        limit: 100, // Get more to combine
        status: filters.status,
        search: filters.search,
        sort: filters.sort
      };
      
      const firstResponse = await getMyShipments(firstParams);
      let firstData = [];
      if (firstResponse.success) {
        firstData = firstResponse.data || [];
      }

      // Fetch from second API
      const secondParams = {
        page: 1,
        limit: 100,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        status: filters.status === 'cancelled' ? 'cancelled' : (filters.status === 'delivered' ? 'delivered' : '')
      };
      
      const secondResponse = await getMyNewShipments(secondParams);
      let secondData = [];
      if (secondResponse.success) {
        secondData = secondResponse.data || [];
        // Add source identifier to second API shipments
        secondData = secondData.map(s => ({ ...s, _apiSource: 'second' }));
      }

      // Combine both
      let combined = [...firstData, ...secondData];
      
      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        combined = combined.filter(shipment => 
          (shipment.shipmentNumber || shipment._id || '').toLowerCase().includes(searchLower) ||
          (shipment.trackingNumber || '').toLowerCase().includes(searchLower)
        );
      }

      // Apply status filter
      if (filters.status) {
        combined = combined.filter(shipment => {
          const status = shipment.status || shipment.shipmentStatus;
          return status === filters.status;
        });
      }

      // Apply sorting
      const sortField = filters.sort.startsWith('-') ? filters.sort.substring(1) : filters.sort;
      const sortOrder = filters.sort.startsWith('-') ? 'desc' : 'asc';
      
      combined.sort((a, b) => {
        let aVal = a[sortField] || a.createdAt;
        let bVal = b[sortField] || b.createdAt;
        if (sortField === 'createdAt') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });

      // Pagination
      const startIndex = (filters.page - 1) * filters.limit;
      const endIndex = startIndex + filters.limit;
      const paginatedData = combined.slice(startIndex, endIndex);

      setAllShipments(paginatedData);
      setFirstApiShipments(firstData);
      setSecondApiShipments(secondData);
      
      setPagination({
        total: combined.length,
        page: filters.page,
        limit: filters.limit,
        pages: Math.ceil(combined.length / filters.limit)
      });

      // Calculate combined stats
      const combinedStats = {
        total: combined.length,
        active: combined.filter(s => {
          const status = s.status || s.shipmentStatus;
          return status !== 'delivered' && status !== 'completed' && status !== 'cancelled';
        }).length,
        delivered: combined.filter(s => {
          const status = s.status || s.shipmentStatus;
          return status === 'delivered' || status === 'completed';
        }).length,
        pending: combined.filter(s => {
          const status = s.status || s.shipmentStatus;
          return status === 'pending' || status === 'booking_requested';
        }).length,
        inTransit: combined.filter(s => {
          const status = s.status || s.shipmentStatus;
          return status === 'in_transit' || status === 'in_transit_sea_freight' || status === 'departed_port_of_origin';
        }).length
      };
      setStats(combinedStats);

    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch shipments');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAllShipments();
  }, [fetchAllShipments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
    if (name === 'status') setActiveStat(value || 'all');
  };

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleSort = (field) => {
    const sortOrder = filters.sort === field ? `-${field}` : field;
    setFilters(prev => ({ ...prev, sort: sortOrder, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ page: 1, limit: 10, status: '', search: '', sort: '-createdAt' });
    setActiveStat('all');
    toast.info('Filters cleared');
  };

  const handleAction = async (action, shipment, source) => {
    setSelectedShipment(shipment);
    setSelectedShipmentSource(source);
    switch (action) {
      case 'view':
        setShowDetailsModal(true);
        break;
      case 'track':
        if (shipment.trackingNumber) {
          setTrackingNumber(shipment.trackingNumber);
          setShowTrackingModal(true);
        } else {
          toast.warning('No tracking number available');
        }
        break;
      case 'return':
        setShowReturnModal(true);
        break;
      case 'viewReturn':
        setShowReturnStatusModal(true);
        break;
    }
  };

  const handleManualRefresh = async () => {
    await fetchAllShipments();
    toast.info('Shipments refreshed');
  };

  const filterByStatus = (statusKey) => {
    setActiveStat(statusKey);
    setFilters(prev => ({ 
      ...prev, 
      status: statusKey === 'all' ? '' : statusKey,
      page: 1 
    }));
  };

  const statusOptions = Object.keys(STATUS_CONFIG).map(key => ({ 
    value: key, 
    label: STATUS_CONFIG[key].label 
  }));

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
                variant="light" 
                size="sm" 
                onClick={handleManualRefresh}
                icon={RefreshCw}
              >
                Refresh
              </Button>
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
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 mb-6 border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Welcome Back!</h2>
              <p className="text-sm text-gray-600 mt-1">Track and manage all your shipments from one place</p>
            </div>
            <div className="hidden sm:block">
              <Award className="h-12 w-12 text-orange-300" />
            </div>
          </div>
        </div>

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
            </div>

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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('createdAt')}>
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packages</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead> 

<tbody className="bg-white divide-y divide-gray-200">
  {loading ? (
    <tr>
      <td colSpan="6" className="px-4 py-8 text-center">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: COLORS.primary }} />
          <span className="ml-2 text-sm text-gray-500">Loading your shipments...</span>
        </div>
      </td>
    </tr>
  ) : allShipments.length === 0 ? (
    <tr>
      <td colSpan="6" className="px-4 py-8 text-center">
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
    allShipments.map((shipment) => {
      const source = shipment._apiSource || 'first';
      
      // সঠিক স্ট্যাটাস পাওয়া
      let status = '';
      let progress = 0;
      
      if (source === 'first') {
        status = shipment.status;
        progress = getShipmentProgress(status);
      } else {
        // Second API - সঠিক স্ট্যাটাস ব্যবহার করুন
        status = shipment.shipmentStatus;
        // Second API এর স্ট্যাটাসের জন্য প্রগ্রেস ক্যালকুলেট করুন
        progress = getSecondApiProgress(status);
      }
      
      const hasReturnRequest = source === 'first' 
        ? (shipment.returnRequest && shipment.returnRequest.status !== 'none')
        : (shipment.returnRequest);
      
      let packages = [];
      let totalWeight = 0;
      
      if (source === 'first') {
        packages = shipment.packages || [];
        totalWeight = calculateTotalWeight(packages);
      } else {
        packages = shipment.shipmentDetails?.packageDetails || [];
        totalWeight = shipment.shipmentDetails?.totalWeight || 0;
      }
      
      // স্ট্যাটাসের জন্য লেবেল নির্ধারণ
      const statusLabel = getSecondApiStatusLabel(status);
      
      return (
        <tr key={`${source}-${shipment._id}`} className="hover:bg-gray-50 transition-colors">
          <td className="px-4 py-3">
            <div>
              <div 
                className="text-sm font-medium cursor-pointer hover:underline" 
                style={{ color: COLORS.primary }} 
                onClick={() => { setSelectedShipment(shipment); setSelectedShipmentSource(source); setShowDetailsModal(true); }}
              >
                #{shipment.shipmentNumber || shipment._id?.slice(-8)}
              </div>
              {shipment.trackingNumber && (
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <Hash className="h-3 w-3 mr-1" />
                  {shipment.trackingNumber}
                </div>
              )}
              {source === 'second' && (
                <div className="text-xs mt-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                    {shipment.shipmentDetails?.shippingMode || 'Standard'}
                  </span>
                </div>
              )}
              {hasReturnRequest && source === 'first' && (
                <div className="text-xs mt-1">
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs ${
                    shipment.returnRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    shipment.returnRequest.status === 'approved' ? 'bg-green-100 text-green-700' :
                    shipment.returnRequest.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    <Undo2 className="h-2.5 w-2.5 mr-1" />
                    Return {shipment.returnRequest.status}
                  </span>
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
            <div className="text-xs text-gray-500 mt-1">
              {shipment.shipmentDetails?.shipmentType || shipment.shipmentDetails?.shippingMode || 'Standard'}
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="text-xs text-gray-500">
              {formatShipmentDate(shipment.createdAt, 'short')}
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="text-xs">
              <span className="font-medium">{packages.length || 0}</span>
              <span className="text-gray-500 ml-1">pkgs</span>
              <div className="text-gray-500">{formatWeight(totalWeight)}</div>
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="flex flex-col space-y-1">
              {/* Second API এর জন্য কাস্টম স্ট্যাটাস ব্যাজ */}
              {source === 'second' ? (
                <span className={`inline-flex items-center rounded-full font-medium border px-2.5 py-1 text-xs ${
                  status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                  status === 'in_transit' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                  status === 'departed_port_of_origin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                  status === 'arrived_at_destination_port' ? 'bg-teal-50 text-teal-700 border-teal-200' :
                  status === 'out_for_delivery' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                  status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  status === 'booking_requested' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  status === 'received_at_warehouse' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                  status === 'picked_up_from_warehouse' ? 'bg-green-50 text-green-700 border-green-200' :
                  status === 'customs_clearance' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                  status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                  'bg-gray-50 text-gray-700 border-gray-200'
                }`}>
                  {status === 'delivered' && <CheckCircleSolid className="h-3 w-3 mr-1" />}
                  {status === 'in_transit' && <Truck className="h-3 w-3 mr-1" />}
                  {status === 'departed_port_of_origin' && <Ship className="h-3 w-3 mr-1" />}
                  {status === 'arrived_at_destination_port' && <Flag className="h-3 w-3 mr-1" />}
                  {status === 'out_for_delivery' && <Navigation className="h-3 w-3 mr-1" />}
                  {status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                  {status === 'booking_requested' && <Clock className="h-3 w-3 mr-1" />}
                  {status === 'received_at_warehouse' && <Building2 className="h-3 w-3 mr-1" />}
                  {status === 'picked_up_from_warehouse' && <Truck className="h-3 w-3 mr-1" />}
                  {status === 'customs_clearance' && <Shield className="h-3 w-3 mr-1" />}
                  {status === 'cancelled' && <XCircleSolid className="h-3 w-3 mr-1" />}
                  {statusLabel}
                </span>
              ) : (
                <StatusBadge status={status} size="sm" />
              )}
              <div className="w-24">
                <ProgressBar progress={progress} />
              </div>
            </div>
          </td>
          <td className="px-4 py-3">
            <ActionMenu shipment={shipment} onAction={handleAction} source={source} />
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
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-600">
                  Showing {(pagination.page - 1) * filters.limit + 1} to {Math.min(pagination.page * filters.limit, pagination.total)} of {pagination.total} results
                </span>
                <Select 
                  value={filters.limit} 
                  onChange={(e) => setFilters(prev => ({ ...prev, limit: Number(e.target.value), page: 1 }))} 
                  options={[
                    { value: 10, label: '10 / page' }, 
                    { value: 20, label: '20 / page' }, 
                    { value: 50, label: '50 / page' }
                  ]} 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setFilters(prev => ({ ...prev, page: 1 }))}
                  disabled={pagination.page === 1}
                  icon={ChevronsLeft}
                />
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  icon={ChevronLeft}
                />
                <span className="text-sm text-gray-600 px-3">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.pages}
                  icon={ChevronRight}
                />
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setFilters(prev => ({ ...prev, page: pagination.pages }))}
                  disabled={pagination.page === pagination.pages}
                  icon={ChevronsRight}
                />
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
        source={selectedShipmentSource}
      />
      
      <TrackingModal 
        isOpen={showTrackingModal} 
        onClose={() => setShowTrackingModal(false)} 
        trackingNumber={trackingNumber} 
      />

      <ReturnRequestModal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        shipment={selectedShipment}
        source={selectedShipmentSource}
        onSuccess={fetchAllShipments}
      />

      <ReturnStatusModal
        isOpen={showReturnStatusModal}
        onClose={() => setShowReturnStatusModal(false)}
        shipment={selectedShipment}
        onSuccess={fetchAllShipments}
      />
    </div>
  );
}