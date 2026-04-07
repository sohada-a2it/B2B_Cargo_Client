'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Search, Package, MapPin, Calendar, Clock, Ship, Truck,
  Weight, Box, Layers, ChevronDown, ChevronUp, FileText,
  Container, User, Building, Phone, Mail, CheckCircle,
  AlertCircle, XCircle, Download, QrCode, Shield,
  Award, Send, Play, Pause, Ban, RotateCcw, Flag, Home,
  RefreshCw, Undo2, Copy, Share2
} from 'lucide-react';
import { toast } from 'react-toastify';
import { trackByNumber } from '@/Api/booking'; 
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TrackingPDF } from '@/components/trackingPdf';

// ==================== STATUS CONFIG ====================
const STATUS_CONFIG = {
  // Initial statuses
  'booking_requested': { label: 'Booking Requested', color: 'bg-gray-100 text-gray-600', icon: Package, progress: 5, order: 0, stage: 'pending' },
  'pending': { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Package, progress: 10, order: 1, stage: 'pending' },
  'picked_up_from_warehouse': { label: 'Picked Up', color: 'bg-blue-100 text-blue-800', icon: Truck, progress: 20, order: 2, stage: 'warehouse' },
  'received_at_warehouse': { label: 'Picked Up from Warehouse', color: 'bg-purple-100 text-purple-800', icon: Building, progress: 25, order: 3, stage: 'warehouse' }, 
  
  // Consolidation statuses
  'pending_consolidation': { label: 'Pending Consolidation', color: 'bg-indigo-100 text-indigo-800', icon: Layers, progress: 28, order: 4, stage: 'queue' },
  'consolidating': { label: 'Consolidating', color: 'bg-indigo-200 text-indigo-800', icon: Layers, progress: 29, order: 5, stage: 'queue' },
  'consolidated': { label: 'In Queue', color: 'bg-indigo-100 text-indigo-800', icon: Layers, progress: 30, order: 6, stage: 'queue' },
  'ready_for_dispatch': { label: 'Preparing Documents', color: 'bg-blue-100 text-blue-800', icon: Package, progress: 35, order: 7, stage: 'dispatch' },
  'loaded_in_container': { label: 'Loaded In Container', color: 'bg-blue-200 text-blue-800', icon: Container, progress: 38, order: 8, stage: 'dispatch' },
  'dispatched': { label: 'Departed Port of Origin', color: 'bg-orange-100 text-orange-800', icon: Truck, progress: 40, order: 9, stage: 'transit' },
  
  // Departure/transit statuses
  'departed_port_of_origin': { label: 'Departed Origin Port', color: 'bg-orange-100 text-orange-800', icon: Ship, progress: 45, order: 10, stage: 'transit' },
  'in_transit_sea_freight': { label: 'In Transit (Sea)', color: 'bg-amber-100 text-amber-800', icon: Ship, progress: 50, order: 11, stage: 'transit' },
  'in_transit_air_freight': { label: 'In Transit (Air)', color: 'bg-amber-100 text-amber-800', icon: Truck, progress: 50, order: 12, stage: 'transit' },
  'in_transit': { label: 'In Transit (Sea Freight)', color: 'bg-amber-100 text-amber-800', icon: Truck, progress: 50, order: 13, stage: 'transit' },
  
   // Arrival statuses
  'arrived_at_destination_port': { label: 'Arrived at Destination Port', color: 'bg-green-100 text-green-800', icon: Flag, progress: 70, order: 14, stage: 'arrival' },
  'arrived': { label: 'Arrived at Destination Port', color: 'bg-green-100 text-green-800', icon: Flag, progress: 70, order: 14, stage: 'arrival' },
  
  // Customs statuses
  'under_customs_cleared': { label: 'Under Customs Clearance', color: 'bg-blue-100 text-blue-800', icon: Shield, progress: 75, order: 15, stage: 'customs' },
  'customs_cleared': { label: 'Customs Cleared', color: 'bg-emerald-100 text-emerald-800', icon: Shield, progress: 80, order: 16, stage: 'customs' },
  'customs_held': { label: 'Customs Held', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle, progress: 75, order: 17, stage: 'customs' },
  'customs_inspection': { label: 'Customs Inspection', color: 'bg-orange-100 text-orange-800', icon: AlertCircle, progress: 75, order: 18, stage: 'customs' },
  
  // Delivery statuses
  'out_for_delivery': { label: 'Out for Delivery', color: 'bg-sky-100 text-sky-800', icon: Truck, progress: 90, order: 19, stage: 'delivery' },
  'delivery_attempted': { label: 'Delivery Attempted', color: 'bg-yellow-100 text-yellow-800', icon: Truck, progress: 92, order: 20, stage: 'delivery' },
  'delivered': { label: 'Delivered', color: 'bg-green-600 text-white', icon: CheckCircle, progress: 100, order: 21, stage: 'delivery' },
  'completed': { label: 'Completed', color: 'bg-emerald-600 text-white', icon: Award, progress: 100, order: 22, stage: 'delivery' },
  
  // Return statuses
  'return_requested': { label: 'Return Requested', color: 'bg-orange-100 text-orange-800', icon: RefreshCw, progress: 85, order: 23, stage: 'return' },
  'return_approved': { label: 'Return Approved', color: 'bg-blue-100 text-blue-800', icon: CheckCircle, progress: 90, order: 24, stage: 'return' },
  'return_in_transit': { label: 'Return In Transit', color: 'bg-amber-100 text-amber-800', icon: Undo2, progress: 95, order: 25, stage: 'return' },
  'return_completed': { label: 'Return Completed', color: 'bg-purple-600 text-white', icon: RefreshCw, progress: 100, order: 26, stage: 'return' },
  
  // Problem statuses
  'on_hold': { label: 'Shipment On Hold', color: 'bg-gray-100 text-gray-800', icon: Pause, progress: 50, order: 99, stage: 'hold' },
  'cancelled': { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: Ban, progress: 0, order: 99, stage: 'cancelled' },
  'returned': { label: 'Returned', color: 'bg-red-100 text-red-800', icon: RotateCcw, progress: 100, order: 27, stage: 'return' }
};

// Progress Bar Stages
const PROGRESS_STAGES = [
  { label: 'Pending', key: 'pending', minProgress: 0, maxProgress: 15 },
  { label: 'Warehouse', key: 'warehouse', minProgress: 16, maxProgress: 40 },
  { label: 'In Queue', key: 'queue', minProgress: 41, maxProgress: 55 },
  { label: 'Transit', key: 'transit', minProgress: 56, maxProgress: 70 },
  { label: 'Customs', key: 'customs', minProgress: 71, maxProgress: 85 },
  { label: 'Delivery', key: 'delivery', minProgress: 86, maxProgress: 100 },
  { label: 'Return', key: 'return', minProgress: 86, maxProgress: 100 }
];

export default function TrackingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [activeTab, setActiveTab] = useState('timeline');
  const [timelineView, setTimelineView] = useState('oldToNew');
  const [shareSuccess, setShareSuccess] = useState(false);

  // Get tracking number from URL on load
  useEffect(() => {
    const trackingParam = searchParams.get('tracking');
    if (trackingParam) {
      setTrackingNumber(trackingParam.toUpperCase());
      // Auto-search if tracking number exists in URL
      handleTrackFromUrl(trackingParam.toUpperCase());
    }
  }, [searchParams]);

  const handleTrackFromUrl = async (trackingNum) => {
    setLoading(true);
    setError(null);
    setTrackingData(null);
    
    try {
      const result = await trackByNumber(trackingNum);
      
      if (result.success) {
        const processedData = processTimelineForHoldResume(result.data);
        setTrackingData(processedData);
        toast.success('Tracking data found');
      } else {
        setError(result.message || 'No shipment found with this tracking number');
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch tracking data');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      toast.warning('Please enter a tracking number');
      return;
    }

    // Update URL with tracking number
    const params = new URLSearchParams(searchParams);
    params.set('tracking', trackingNumber.toUpperCase());
    router.push(`/tracking-number?${params.toString()}`, { scroll: false });

    setLoading(true);
    setError(null);
    setTrackingData(null);
    
    try {
      const result = await trackByNumber(trackingNumber);
      
      if (result.success) {
        const processedData = processTimelineForHoldResume(result.data);
        setTrackingData(processedData);
        toast.success('Tracking data found');
      } else {
        setError(result.message || 'No shipment found with this tracking number');
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch tracking data');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Copy shareable link to clipboard
  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/tracking-number?tracking=${trackingNumber}`;
    navigator.clipboard.writeText(shareUrl);
    setShareSuccess(true);
    toast.success('Shareable link copied to clipboard!');
    setTimeout(() => setShareSuccess(false), 3000);
  };

  // Share using Web Share API (mobile)
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/tracking-number?tracking=${trackingNumber}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shipment Tracking',
          text: `Track your shipment: ${trackingNumber}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
        handleCopyShareLink();
      }
    } else {
      handleCopyShareLink();
    }
  };

  // Process hold/resume events
  const processTimelineForHoldResume = (data) => {
    if (!data?.timeline) return data;
    
    let timeline = [...data.timeline];
    let processedEvents = [];
    let currentStatus = null;
    let statusBeforeHold = null;
    let isOnHold = false;
    let holdEventEncountered = false;
    let originalStatusBeforeHold = null;
    
    // Sort timeline chronologically
    timeline.sort((a, b) => {
      const dateA = new Date(a.date || a.timestamp || a.createdAt || 0);
      const dateB = new Date(b.date || b.timestamp || b.createdAt || 0);
      return dateA - dateB;
    });
    
    // First pass: Find the status BEFORE any hold event
    for (let i = 0; i < timeline.length; i++) {
      const event = timeline[i];
      const status = event.status?.toLowerCase() || '';
      const description = event.description?.toLowerCase() || '';
      
      if (status === 'on_hold' || description.includes('on hold')) {
        if (!holdEventEncountered && currentStatus && currentStatus !== 'pending') {
          statusBeforeHold = currentStatus;
          originalStatusBeforeHold = currentStatus;
          holdEventEncountered = true;
        }
      } 
      else if (status !== 'on_hold' && !status.includes('hold')) {
        if (!(isOnHold && status === 'pending')) {
          currentStatus = status;
        }
      }
      
      if (status === 'on_hold' || description.includes('on hold')) {
        isOnHold = true;
      } else if (description.includes('resumed') || status.includes('resumed')) {
        isOnHold = false;
      }
    }
    
    // Reset for second pass
    currentStatus = null;
    isOnHold = false;
    holdEventEncountered = false;
    let restoredStatus = null;
    let pendingEvent = null;
    let bookingRequestedEvent = null;
    
    // Second pass: Process events for display
    for (let i = 0; i < timeline.length; i++) {
      const event = timeline[i];
      const status = event.status?.toLowerCase() || '';
      const description = event.description?.toLowerCase() || '';
      
      // Booking Requested event
      if (status === 'booking_requested') {
        bookingRequestedEvent = {
          ...event,
          mappedStatus: 'booking_requested',
          originalStatus: event.status,
          isHoldEvent: false,
          date: event.date || event.timestamp || event.createdAt || new Date().toISOString()
        };
        continue;
      }
      
      // On Hold event
      if (status === 'on_hold' || description.includes('on hold')) {
        if (!holdEventEncountered) {
          if (currentStatus && currentStatus !== 'pending') {
            statusBeforeHold = currentStatus;
          }
          isOnHold = true;
          holdEventEncountered = true;
          
          processedEvents.push({
            ...event,
            isHoldEvent: true,
            statusBeforeHold: statusBeforeHold,
            originalStatus: event.status,
            mappedStatus: 'on_hold'
          });
        }
        continue;
      }
      
      // Resume event
      else if (description.includes('resumed from hold') || status.includes('resumed')) {
        isOnHold = false;
        
        if (statusBeforeHold && statusBeforeHold !== 'pending') {
          restoredStatus = statusBeforeHold;
          
          const restoredEvent = {
            ...event,
            status: statusBeforeHold,
            displayStatus: statusBeforeHold,
            mappedStatus: statusBeforeHold,
            description: `Shipment resumed from hold. Status restored to ${statusBeforeHold.replace(/_/g, ' ')}. ${event.description || ''}`,
            isResumeEvent: true,
            restoredFromHold: true,
            originalStatus: statusBeforeHold
          };
          processedEvents.push(restoredEvent);
          currentStatus = statusBeforeHold;
          statusBeforeHold = null;
        } else if (originalStatusBeforeHold) {
          restoredStatus = originalStatusBeforeHold;
          const restoredEvent = {
            ...event,
            status: originalStatusBeforeHold,
            displayStatus: originalStatusBeforeHold,
            mappedStatus: originalStatusBeforeHold,
            description: `Shipment resumed from hold. Status restored to ${originalStatusBeforeHold.replace(/_/g, ' ')}. ${event.description || ''}`,
            isResumeEvent: true,
            restoredFromHold: true,
            originalStatus: originalStatusBeforeHold
          };
          processedEvents.push(restoredEvent);
          currentStatus = originalStatusBeforeHold;
          originalStatusBeforeHold = null;
        }
        continue;
      }
      
      // Normal events
      else {
        if (status === 'pending' && currentStatus && currentStatus !== 'pending') {
          continue;
        }
        
        if (status === 'pending' && !currentStatus) {
          pendingEvent = event;
          continue;
        }
        
        currentStatus = status;
        
        processedEvents.push({
          ...event,
          mappedStatus: status,
          originalStatus: event.status,
          isHoldEvent: false
        });
      }
    }
    
    // Add booking_requested at the beginning
    if (bookingRequestedEvent) {
      let earliestDate = new Date();
      if (processedEvents.length > 0) {
        const firstEventDate = processedEvents[0].date || processedEvents[0].timestamp || processedEvents[0].createdAt;
        if (firstEventDate) {
          earliestDate = new Date(firstEventDate);
        }
      }
      const bookingDate = new Date(earliestDate);
      bookingDate.setMinutes(bookingDate.getMinutes() - 2);
      
      processedEvents.unshift({
        ...bookingRequestedEvent,
        date: bookingDate.toISOString(),
        timestamp: bookingDate.toISOString(),
        mappedStatus: 'booking_requested',
        isBookingRequest: true
      });
    }
    
    // Add pending event ONLY at the very beginning if no other events exist
    if (pendingEvent && processedEvents.length === 0) {
      processedEvents.unshift({
        ...pendingEvent,
        mappedStatus: 'pending',
        originalStatus: pendingEvent.status
      });
    }
    
    // Clean up: Remove any 'pending' events that appear after real statuses
    processedEvents = processedEvents.filter((event, index) => {
      const mappedStatus = event.mappedStatus || event.status?.toLowerCase() || '';
      if (mappedStatus === 'pending' && index > 0) {
        const hasNonPendingBefore = processedEvents.slice(0, index).some(e => {
          const s = e.mappedStatus || e.status?.toLowerCase() || '';
          return s !== 'pending' && s !== 'booking_requested';
        });
        if (hasNonPendingBefore) {
          return false;
        }
      }
      return true;
    });
    
    return {
      ...data,
      timeline: processedEvents,
      originalTimeline: timeline,
      status: restoredStatus || data.status
    };
  };
  
  const findLastNonHoldStatus = (events) => {
    for (let i = events.length - 1; i >= 0; i--) {
      const status = events[i].status?.toLowerCase() || '';
      if (status !== 'on_hold' && !status.includes('hold')) {
        return status;
      }
    }
    return null;
  };

  const getStatusConfig = (status) => {
    if (!status) {
      return { label: 'Unknown', color: 'bg-gray-100 text-gray-800', icon: Package, progress: 0, order: 999, stage: 'unknown' };
    }

    if (STATUS_CONFIG[status]) {
      return STATUS_CONFIG[status];
    }

    if (status === 'arrived') {
      return STATUS_CONFIG['arrived_at_destination_port'];
    }

    if (status.toLowerCase().includes('customs') && status.toLowerCase().includes('clear')) {
      return STATUS_CONFIG['customs_cleared'];
    }

    if (status.toLowerCase().includes('out') && status.toLowerCase().includes('delivery')) {
      return STATUS_CONFIG['out_for_delivery'];
    }

    if (status.toLowerCase().includes('return')) {
      return STATUS_CONFIG['return_completed'];
    }

    return {
      label: status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      color: 'bg-gray-100 text-gray-800',
      icon: Package,
      progress: 50,
      order: 50,
      stage: 'unknown'
    };
  };

  const hasReturnStatus = () => {
    if (!trackingData?.timeline) return false;
    return trackingData.timeline.some(event => {
      const status = event.status?.toLowerCase() || '';
      return status.includes('return');
    });
  };

  const getCurrentStage = () => {
    const status = trackingData?.status?.toLowerCase() || '';
    
    if (status.includes('return')) {
      return 'return';
    }
    if (status.includes('delivered') || status.includes('completed')) {
      return 'delivery';
    }
    if (status.includes('customs_cleared') || 
        status.includes('under_customs_cleared') || 
        status.includes('customs_inspection') || 
        status.includes('customs_held')) {
      return 'customs';
    }
    if (status.includes('transit') || status.includes('departed') || status.includes('in_transit')) {
      return 'transit';
    }
    if (status.includes('queue') || status.includes('consolidat')) {
      return 'queue';
    }
    if (status.includes('warehouse') || status.includes('received') || status.includes('dispatch') || status.includes('loaded')) {
      return 'warehouse';
    }
    if (status.includes('pending') || status.includes('picked') || status.includes('booking')) {
      return 'pending';
    }
    
    const timeline = getTimelineOldToNew();
    if (timeline.length > 0) {
      const lastEvent = timeline[timeline.length - 1];
      const config = getStatusConfig(lastEvent.mappedStatus || lastEvent.status);
      if (config.stage === 'customs') return 'customs';
      if (config.stage === 'return') return 'return';
      if (config.stage === 'delivery') return 'delivery';
    }
    
    return 'pending';
  };

  const getTimelineOldToNew = () => {
    if (!trackingData?.timeline) return [];
    
    let timeline = [...trackingData.timeline];
    
    const HIDDEN_STATUSES = [
      'inspected', 'damage_reported', 'damaged', 'in_progress',
      'delivery_attempted', 'loaded', 'removed_from_queue', 'removed', 'queue_removed'
    ];
    
    const STATUS_MAPPING = {
      'in_progress': 'consolidating',
      'loaded': 'loaded_in_container',
      'pending_consolidation': 'pending_consolidation',
      'arrived': 'arrived_at_destination_port'
    };
    
    // Sort by date
    timeline.sort((a, b) => {
      const dateA = new Date(a.date || a.timestamp || a.createdAt || 0);
      const dateB = new Date(b.date || b.timestamp || b.createdAt || 0);
      return dateA - dateB;
    });
    
    let seenStatuses = new Set();
    let filteredTimeline = [];
    let hasOnHold = false;
    
    for (const event of timeline) {
      let status = event.displayStatus || event.status?.toLowerCase() || '';
      const description = event.description?.toLowerCase() || '';
      
      if (event.isResumeEvent) {
        continue;
      }
      
      if (HIDDEN_STATUSES.includes(status)) {
        continue;
      }
      
      if (description.includes('removed from consolidation') || 
          description.includes('removed from queue')) {
        continue;
      }
      
      let mappedStatus = STATUS_MAPPING[status] || status;
      
      if (event.isHoldEvent) {
        mappedStatus = 'on_hold';
      }
      
      if (mappedStatus === 'on_hold') {
        if (!hasOnHold) {
          hasOnHold = true;
          filteredTimeline.push({
            ...event,
            mappedStatus: mappedStatus,
            originalStatus: event.status,
            isHoldEvent: true
          });
        }
        continue;
      }
      
      if (seenStatuses.has(mappedStatus) && 
          !mappedStatus.includes('return') && 
          !mappedStatus.includes('customs') &&
          mappedStatus !== 'under_customs_cleared') {
        continue;
      }
      seenStatuses.add(mappedStatus);
      
      filteredTimeline.push({
        ...event,
        mappedStatus: mappedStatus,
        originalStatus: event.status,
        isHoldEvent: false
      });
    }
    
    return filteredTimeline;
  };
  
  const getTimelineNewToOld = () => {
    const timeline = getTimelineOldToNew();
    return [...timeline].reverse();
  };
  
  const getTimeline = () => {
    return timelineView === 'oldToNew' ? getTimelineOldToNew() : getTimelineNewToOld();
  };

  const getDisplayLocation = (event) => {
    if (!event) return 'Unknown';
    
    const status = event.mappedStatus || event.status?.toLowerCase() || '';
    const destination = trackingData?.destination || 'USA';
    
    if (status === 'return_completed') {
      return 'Customer Location';
    }
    
    if (status === 'return_approved') {
      return 'System';
    }
    
    if (status === 'arrived_at_destination_port' || status === 'arrived') {
      return destination;
    }
    
    if (status === 'customs_cleared' || status.includes('customs')) {
      return destination;
    }
    
    if (status === 'out_for_delivery' || status.includes('delivery')) {
      return destination;
    }
    
    if (status === 'delivered' || status === 'completed') {
      return destination;
    }
    
    if (event.location) return event.location;
    
    if (event.isHoldEvent) {
      return event.location || 'Thailand Warehouse';
    }
    
    if (event.vesselName && event.vesselName !== 'Not assigned') {
      return `Sea - ${event.vesselName}`;
    }
    
    return event.location || 'In Transit';
  };

  const getEventDescription = (event) => {
    if (event.description) {
      if (event.isResumeEvent) {
        return `Shipment resumed from hold. ${event.description}`;
      }
      return event.description;
    }
    
    const status = event.mappedStatus || event.status?.toLowerCase() || '';
    const date = formatDate(event.date || event.timestamp || event.createdAt);
    
    if (event.isHoldEvent) {
      return `Shipment placed on hold at ${getDisplayLocation(event)} on ${date}.`;
    }
    
    if (status === 'return_completed') {
      return `Return confirmed and completed by customer on ${date}.`;
    }
    
    if (status === 'return_approved') {
      return `Return request approved on ${date}.`;
    }
    
    if (status === 'out_for_delivery') {
      return `Out for delivery on ${date}.`;
    }
    
    if (status === 'customs_cleared') {
      return `Customs cleared on ${date}.`;
    }
    
    if (status === 'arrived_at_destination_port' || status === 'arrived') {
      return `Shipment arrived at ${getDisplayLocation(event)} on ${date}.`;
    }
    
    if (status === 'loaded_in_container') {
      return `Loaded into container on ${date}.`;
    }
    
    if (status === 'dispatched') {
      return `Dispatched on ${date}.`;
    }
    
    if (status === 'delivered') {
      return `Delivered on ${date}.`;
    }
    
    return event.message || `Status updated to ${status.replace(/_/g, ' ')}`;
  };

  const getRouteOrigin = () => {
    return trackingData?.route?.origin || 
           trackingData?.origin || 
           trackingData?.shipmentDetails?.origin || 
           'China';
  };

  const getRouteDestination = () => {
    return trackingData?.route?.destination || 
           trackingData?.destination || 
           trackingData?.shipmentDetails?.destination || 
           'USA';
  };

  const getCurrentLocation = () => {
    const status = trackingData?.status?.toLowerCase() || '';
    const destination = trackingData?.destination || 'USA';
    
    if (status.includes('return_completed')) return 'Customer Location';
    if (status.includes('return_approved')) return 'System';
    if (trackingData?.hasArrived) return destination;
    if (status.includes('delivered')) return destination;
    if (status.includes('out_for_delivery')) return destination;
    if (status.includes('customs_cleared')) return destination;
    if (status.includes('arrived')) return destination;
    
    const timeline = getTimelineOldToNew();
    if (timeline.length > 0) {
      const latestEvent = timeline[timeline.length - 1];
      const location = getDisplayLocation(latestEvent);
      if (location !== 'Unknown') return location;
    }
    
    return trackingData?.origin || 'In Transit';
  };

  const calculateOverallProgress = () => {
    const timeline = getTimelineOldToNew();
    if (timeline.length === 0) return 0;
    
    const lastEvent = timeline[timeline.length - 1];
    
    if (lastEvent.isHoldEvent) {
      return 50;
    }
    
    const config = getStatusConfig(lastEvent.mappedStatus || lastEvent.status);
    
    if (lastEvent.mappedStatus === 'return_completed' || lastEvent.status?.toLowerCase() === 'return_completed') {
      return 100;
    }
    
    return config.progress;
  };

  const formatAddress = (address) => {
    if (!address) return 'N/A';
    if (typeof address === 'string') return address;
    
    const parts = [];
    if (address.addressLine1) parts.push(address.addressLine1);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.country) parts.push(address.country);
    
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  const formatStatus = (status) => {
    const config = getStatusConfig(status);
    return config.label;
  };

  const getStatusColor = (status) => {
    return getStatusConfig(status).color;
  };

  const getStatusIcon = (status) => {
    const IconComponent = getStatusConfig(status).icon;
    return IconComponent;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getEstimatedDeparture = () => {
    return trackingData?.dates?.estimatedDeparture || 
           trackingData?.estimatedDeparture || 
           null;
  };

  const getEstimatedArrival = () => {
    return trackingData?.dates?.estimatedArrival || 
           trackingData?.estimatedArrival || 
           trackingData?.eta || 
           null;
  };

  const getLastUpdate = () => {
    const timeline = getTimelineNewToOld();
    if (timeline.length > 0) {
      return timeline[0].formattedDate || formatDate(timeline[0].date || timeline[0].timestamp);
    }
    return formatDate(new Date());
  };

  const StatusIcon = ({ status }) => {
    const IconComponent = getStatusIcon(status);
    return <IconComponent className="h-4 w-4" />;
  };

  const currentStatusConfig = getStatusConfig(trackingData?.status);
  const currentStage = getCurrentStage();
  const hasReturn = hasReturnStatus();
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/tracking-number?tracking=${trackingNumber}` : '';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Track Your Shipment</h1>
          <p className="text-xl opacity-90">
            Enter your tracking number to get real-time updates
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-3xl mx-auto px-4 -mt-8">
        <form onSubmit={handleTrack} className="bg-white rounded-xl shadow-xl p-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center px-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                placeholder="Enter tracking number (e.g., CLG-BC6944CD)"
                className="w-full px-3 py-4 focus:outline-none"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-[#E67E22] text-white rounded-lg hover:bg-[#d35400] disabled:bg-gray-300 font-medium min-w-[120px]"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-red-800 mb-2">Shipment Not Found</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">
              Please check your tracking number and try again
            </p>
          </div>
        )}

        {trackingData && !error && (
          <div className="space-y-6">
            {/* Share Button */}
            <div className="flex justify-end">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                <Share2 className="h-4 w-4" />
                Share Tracking
              </button>
            </div>

            {/* ===== HEADER SECTION ===== */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{trackingData.trackingNumber || 'N/A'}</h2>
                  <p className="text-gray-500">
                    Booking: {trackingData.bookingNumber || 'N/A'} | Shipment: {trackingData.shipmentNumber || 'N/A'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${currentStatusConfig.color}`}>
                    <StatusIcon status={trackingData.status} />
                    <span className="ml-2">{currentStatusConfig.label}</span>
                  </span>
                  <button
                    onClick={handleCopyShareLink}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title="Copy shareable link"
                  >
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span className={currentStage === 'pending' ? 'font-bold text-orange-600' : ''}>Pending</span>
                  <span className={currentStage === 'warehouse' ? 'font-bold text-orange-600' : ''}>Warehouse</span>
                  <span className={currentStage === 'queue' ? 'font-bold text-orange-600' : ''}>In Queue</span>
                  <span className={currentStage === 'transit' ? 'font-bold text-orange-600' : ''}>Transit</span>
                  <span className={currentStage === 'customs' ? 'font-bold text-orange-600' : ''}>Customs</span>
                  <span className={currentStage === 'delivery' ? 'font-bold text-orange-600' : ''}>Delivery</span>
                  {hasReturn && (
                    <span className={currentStage === 'return' ? 'font-bold text-purple-600' : 'text-purple-500'}>
                      Return
                    </span>
                  )}
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${calculateOverallProgress()}%` }}
                  />
                  <div className="absolute top-0 left-[16.6%] h-full w-0.5 bg-white opacity-30" />
                  <div className="absolute top-0 left-[33.3%] h-full w-0.5 bg-white opacity-30" />
                  <div className="absolute top-0 left-[50%] h-full w-0.5 bg-white opacity-30" />
                  <div className="absolute top-0 left-[66.6%] h-full w-0.5 bg-white opacity-30" />
                  <div className="absolute top-0 left-[83.3%] h-full w-0.5 bg-white opacity-30" />
                  {hasReturn && (
                    <div className="absolute top-0 left-[91.6%] h-full w-0.5 bg-white opacity-50" />
                  )}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Last Update: {getLastUpdate()}
                  </span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    hasReturn && currentStage === 'return' ? 'bg-purple-100 text-purple-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {calculateOverallProgress()}% Complete
                  </span>
                </div>
              </div>

              {/* Route Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">FROM</p>
                  <p className="font-medium text-lg">{getRouteOrigin()}</p>
                  {getEstimatedDeparture() && (
                    <p className="text-xs text-gray-400">
                      Dep: {formatDate(getEstimatedDeparture())}
                    </p>
                  )}
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">CURRENT</p>
                  <p className="font-medium text-lg">{getCurrentLocation()}</p>
                  <p className="text-xs text-gray-400">{getLastUpdate()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">TO</p>
                  <p className="font-medium text-lg">{getRouteDestination()}</p>
                  {getEstimatedArrival() && (
                    <p className="text-xs text-gray-400">
                      ETA: {formatDate(getEstimatedArrival())}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Rest of your tabs and content remain the same */}
            {/* ===== TABS ===== */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex border-b overflow-x-auto">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'timeline' 
                      ? 'text-orange-600 border-b-2 border-orange-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('packages')}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'packages' 
                      ? 'text-orange-600 border-b-2 border-orange-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Packages ({trackingData.packages?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'overview' 
                      ? 'text-orange-600 border-b-2 border-orange-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'details' 
                      ? 'text-orange-600 border-b-2 border-orange-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Details
                </button>
              </div>

              {/* ===== TIMELINE TAB ===== */}
              {activeTab === 'timeline' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Tracking Timeline</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTimelineView('oldToNew')}
                        className={`px-3 py-1 text-xs rounded-lg ${
                          timelineView === 'oldToNew' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        Old → New
                      </button>
                      <button
                        onClick={() => setTimelineView('newToOld')}
                        className={`px-3 py-1 text-xs rounded-lg ${
                          timelineView === 'newToOld' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        New → Old
                      </button>
                    </div>
                  </div>
                  
                  {(() => {
                    const timeline = getTimeline();
                    
                    if (timeline.length === 0) {
                      return <p className="text-gray-400 text-center py-4">No timeline events to display</p>;
                    }
                    
                    return (
                      <div className="space-y-4">
                        {timeline.map((event, index) => {
                          const displayStatus = event.mappedStatus || event.status;
                          const StatusIconComponent = getStatusIcon(displayStatus);
                          const statusConfig = getStatusConfig(displayStatus);
                          const progress = statusConfig.progress;
                          const location = getDisplayLocation(event);
                          const isCurrentStep = timelineView === 'oldToNew' 
                            ? index === timeline.length - 1 
                            : index === 0;
                          const isCompleted = progress === 100;
                          const isHold = event.isHoldEvent === true;
                          const isReturn = displayStatus?.includes('return');
                          const isCustoms = displayStatus?.includes('customs');
                          const isBookingRequest = displayStatus === 'booking_requested';
                          const displayProgress = displayStatus === 'return_completed' ? 100 : progress;
                          
                          // Special styling for booking requested
                          if (isBookingRequest) {
                            return (
                              <div key={index} className="flex items-start gap-4 opacity-70">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                                    <Package className="h-5 w-5 text-gray-400" />
                                  </div>
                                  {index < timeline.length - 1 && (
                                    <div className="absolute top-10 left-4 w-0.5 h-16 bg-gray-200" />
                                  )}
                                </div>
                                
                                <div className="flex-1 pb-6">
                                  <div className="flex justify-between items-start flex-wrap gap-2">
                                    <div className="flex-1">
                                      <p className="font-semibold text-gray-500">
                                        Booking Requested
                                      </p>
                                      <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                                        <MapPin className="h-3 w-3 text-gray-400" />
                                        System
                                      </p>
                                      {getEventDescription(event) && (
                                        <p className="text-xs mt-1 p-2 rounded text-gray-400 bg-gray-50">
                                          {getEventDescription(event)}
                                        </p>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-400 whitespace-nowrap">
                                      {formatDate(event.date || event.timestamp || event.createdAt)}
                                    </p>
                                  </div>
                                  <div className="mt-2 w-full max-w-xs h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full bg-gray-300" style={{ width: '5%' }} />
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          
                          return (
                            <div key={index} className="flex items-start gap-4">
                              <div className="relative">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isCurrentStep 
                                  ? isReturn ? 'bg-purple-100 border-2 border-purple-500' 
                                    : isCustoms ? 'bg-blue-100 border-2 border-blue-500'
                                    : 'bg-orange-100 border-2 border-orange-500'
                                  : isCompleted 
                                    ? 'bg-green-100' 
                                    : isHold
                                      ? 'bg-gray-200 border-2 border-gray-400'
                                      : 'bg-gray-100'
                              }`}>
                                  {isCompleted && !isCurrentStep && !isReturn ? (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                  ) : (
                                    <StatusIconComponent className={`h-5 w-5 ${
                                      isCurrentStep && !isHold ? (isReturn ? 'text-purple-600' : 'text-orange-600') : 
                                      isHold ? 'text-gray-600' : 'text-gray-500'
                                    }`} />
                                  )}
                                </div>
                                {index < timeline.length - 1 && (
                                  <div className={`absolute top-10 left-4 w-0.5 h-16 ${isHold ? 'bg-gray-300' : 'bg-gray-200'}`} />
                                )}
                              </div>
                              
                              <div className="flex-1 pb-6">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className={`font-semibold ${
                                        isCurrentStep && !isHold ? (isReturn ? 'text-purple-600' : 'text-orange-600') : 
                                        isHold ? 'text-gray-600' : 'text-gray-900'
                                      }`}>
                                        {statusConfig.label}
                                      </p>
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        displayProgress === 100 ? 'bg-green-100 text-green-700' : 
                                        isHold ? 'bg-gray-100 text-gray-600' : 
                                        isReturn ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'
                                      }`}>
                                        {displayProgress}%
                                      </span>
                                      {isCurrentStep && !isHold && !isReturn && (
                                        <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                                          Current
                                        </span>
                                      )}
                                      {isCurrentStep && isReturn && (
                                        <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                                          Return
                                        </span>
                                      )}
                                      {isHold && isCurrentStep && (
                                        <span className="text-xs bg-gray-500 text-white px-2 py-0.5 rounded-full">
                                          On Hold
                                        </span>
                                      )}
                                    </div>
                                    
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                      <MapPin className="h-3 w-3 text-gray-400" />
                                      {location}
                                    </p>
                                    
                                    {getEventDescription(event) && (
                                      <p className={`text-xs mt-1 p-2 rounded ${
                                        isHold ? 'text-gray-500 bg-gray-50' : 
                                        isReturn ? 'text-purple-600 bg-purple-50' : 'text-gray-400 bg-gray-50'
                                      }`}>
                                        {getEventDescription(event)}
                                      </p>
                                    )}
                                    
                                    {event.vesselName && event.vesselName !== 'Not assigned' && (
                                      <p className="text-xs text-blue-600 mt-1">
                                        🚢 Vessel: {event.vesselName}
                                      </p>
                                    )}
                                    {event.containerNumber && (
                                      <p className="text-xs text-blue-600">
                                        📦 Container: {event.containerNumber}
                                      </p>
                                    )}
                                  </div>
                                  
                                  <p className="text-xs text-gray-400 whitespace-nowrap">
                                    {formatDate(event.date || event.timestamp || event.createdAt)}
                                  </p>
                                </div>
                                
                                <div className="mt-2 w-full max-w-xs h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      displayProgress === 100 ? 'bg-green-500' : 
                                      isHold ? 'bg-gray-400' : 
                                      isReturn ? 'bg-purple-500' : 'bg-orange-500'
                                    }`}
                                    style={{ width: `${displayProgress}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ===== PACKAGES TAB ===== */}
              {activeTab === 'packages' && (
                <div className="p-6">
                  <h3 className="font-medium mb-4">Package Details</h3>
                  {trackingData.packages && trackingData.packages.length > 0 ? (
                    <div className="space-y-3">
                      {(showAllPackages ? trackingData.packages : trackingData.packages.slice(0, 3)).map((pkg, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <span className="font-medium">Package #{index + 1}</span>
                              <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                                {pkg.packagingType || pkg.type || 'Carton'}
                              </span>
                            </div>
                            {pkg.hazardous === 'Yes' && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                Hazardous
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{pkg.description || pkg.goodsDescription || 'No description'}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <p className="text-xs text-gray-500">Quantity</p>
                              <p className="font-medium">{pkg.quantity || 1}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Weight</p>
                              <p className="font-medium">{pkg.weight || 0} kg</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Volume</p>
                              <p className="font-medium">{pkg.volume || 0} m³</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {trackingData.packages.length > 3 && (
                        <button
                          onClick={() => setShowAllPackages(!showAllPackages)}
                          className="w-full py-2 text-orange-500 text-sm flex items-center justify-center"
                        >
                          {showAllPackages ? 'Show Less' : `Show All (${trackingData.packages.length} packages)`}
                          {showAllPackages ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No package information available</p>
                  )}
                </div>
              )}

              {/* ===== OVERVIEW TAB ===== */}
              {activeTab === 'overview' && (
                <div className="p-6">
                  <div className="grid grid-cols-1">
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <Package className="h-4 w-4 text-orange-500 mr-2" />
                        Shipment Summary
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-gray-500">Total Packages</span>
                          <span className="font-medium">{trackingData.shipmentDetails?.totalPackages || trackingData.totalPackages || 0}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-gray-500">Total Weight</span>
                          <span className="font-medium">{trackingData.shipmentDetails?.totalWeight || trackingData.totalWeight || 0} kg</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-gray-500">Total Volume</span>
                          <span className="font-medium">{trackingData.shipmentDetails?.totalVolume || trackingData.totalVolume || 0} m³</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-gray-500">Shipping Mode</span>
                          <span className="font-medium">{trackingData.shipmentDetails?.shippingMode || trackingData.shippingMode || 'DDU'}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Service Type</span>
                          <span className="font-medium capitalize">{trackingData.shipmentDetails?.serviceType || 'standard'}</span>
                        </div>
                      </div>
                    </div>

                    {trackingData.consolidation && (
                     <div className="md:col-span-2 mt-6">
                        <h3 className="font-medium mb-3 flex items-center">
                          <Layers className="h-4 w-4 text-orange-500 mr-2" />
                          Consolidation Information
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-orange-50 p-4 rounded-lg">
                          <div>
                            <p className="text-xs text-gray-500">Queue Number</p>
                            <p className="font-medium">{trackingData.consolidation.number || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Container</p>
                            <p className="font-medium">{trackingData.consolidation.containerNumber || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Origin</p>
                            <p className="font-medium">{trackingData.consolidation.originWarehouse || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Destination</p>
                            <p className="font-medium">{trackingData.consolidation.destinationPort || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ===== DETAILS TAB ===== */}
              {activeTab === 'details' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trackingData.sender && (
                      <div>
                        <h3 className="font-medium mb-3 flex items-center">
                          <User className="h-4 w-4 text-orange-500 mr-2" />
                          Sender Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                          <p className="font-medium">{trackingData.sender.name || 'N/A'}</p>
                          {trackingData.sender.companyName && (
                            <p className="text-sm text-gray-600">{trackingData.sender.companyName}</p>
                          )}
                          <p className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" /> {trackingData.sender.email || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" /> {trackingData.sender.phone || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500">
                            <MapPin className="h-3 w-3 inline mr-1" /> {formatAddress(trackingData.sender.address)}
                          </p>
                        </div>
                      </div>
                    )}

                    {trackingData.receiver && (
                      <div>
                        <h3 className="font-medium mb-3 flex items-center">
                          <User className="h-4 w-4 text-orange-500 mr-2" />
                          Receiver Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                          <p className="font-medium">{trackingData.receiver.name || 'N/A'}</p>
                          {trackingData.receiver.companyName && (
                            <p className="text-sm text-gray-600">{trackingData.receiver.companyName}</p>
                          )}
                          <p className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" /> {trackingData.receiver.email || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" /> {trackingData.receiver.phone || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500">
                            <MapPin className="h-3 w-3 inline mr-1" /> {formatAddress(trackingData.receiver.address)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {(trackingData.shipmentDetails?.notes || trackingData.notes) && (
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Notes</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">
                          {trackingData.shipmentDetails?.notes || trackingData.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* PDF Download Button */}
            <div className="flex justify-end">
              <PDFDownloadLink
                document={<TrackingPDF data={trackingData} />}
                fileName={`tracking-${trackingData?.trackingNumber || 'shipment'}.pdf`}
                className="px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#d35400] text-sm flex items-center"
              >
                {({ loading }) => (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    {loading ? 'Generating PDF...' : 'Download PDF'}
                  </>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}