// services/returnApi.js - Complete Return Request API Service

import axiosInstance from '@/lib/axiosInstance';

// ==================== CUSTOMER API FUNCTIONS ====================

/**
 * 1. REQUEST RETURN (Customer)
 * POST /api/v1/shipments/:id/return-request
 * 
 * @param {string} shipmentId - Shipment ID
 * @param {object} returnData - { reason, description, items, images }
 * @returns {Promise<object>} - Return request response with cost
 */
export const requestReturn = async (shipmentId, returnData) => {
  try {
    console.log('🔄 Requesting return for shipment:', shipmentId);
    console.log('📦 Return Data:', returnData);

    const response = await axiosInstance.post(`/shipments/${shipmentId}/return-request`, returnData);

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Return request submitted successfully'
      };
    }

    throw new Error(response.data.message || 'Failed to submit return request');

  } catch (error) {
    console.error('❌ Request return error:', error);
    console.error('Error Response:', error.response?.data);
    
    return {
      success: false,
      message: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to submit return request',
      error: error.response?.data,
      status: error.response?.status
    };
  }
};

/**
 * 2. GET RETURN REQUEST STATUS (Customer)
 * GET /api/v1/shipments/:id/return-status
 * 
 * @param {string} shipmentId - Shipment ID
 * @returns {Promise<object>} - Return status with cost details
 */
export const getReturnRequestStatus = async (shipmentId) => {
  try {
    console.log('📊 Getting return status for shipment:', shipmentId);

    const response = await axiosInstance.get(`/shipments/${shipmentId}/return-status`);

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Return status fetched successfully'
      };
    }

    throw new Error(response.data.message || 'Failed to fetch return status');

  } catch (error) {
    console.error('❌ Get return status error:', error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || 'Failed to fetch return status',
      error: error.response?.data
    };
  }
};

/**
 * 3. CUSTOMER CONFIRM RETURN (With Cost) - Complete হবে
 * PUT /api/v1/shipments/:id/return-confirm
 * 
 * @param {string} shipmentId - Shipment ID
 * @param {object} confirmData - { notes, acceptCost }
 * @returns {Promise<object>} - Return completion response
 */
export const customerConfirmReturn = async (shipmentId, confirmData) => {
  try {
    console.log('✅ Customer confirming return for shipment:', shipmentId);
    console.log('Confirm Data:', confirmData);

    const response = await axiosInstance.put(`/shipments/${shipmentId}/return-confirm`, confirmData);

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Return confirmed and completed successfully'
      };
    }

    throw new Error(response.data.message || 'Failed to confirm return');

  } catch (error) {
    console.error('❌ Customer confirm return error:', error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || 'Failed to confirm return',
      error: error.response?.data
    };
  }
};

/**
 * 4. CUSTOMER REJECT/CANCEL RETURN
 * PUT /api/v1/shipments/:id/return-reject-customer
 * 
 * @param {string} shipmentId - Shipment ID
 * @param {object} rejectData - { reason }
 * @returns {Promise<object>} - Return cancellation response
 */
export const customerRejectReturn = async (shipmentId, rejectData) => {
  try {
    console.log('❌ Customer rejecting return for shipment:', shipmentId);
    console.log('Reject Data:', rejectData);

    const response = await axiosInstance.put(`/shipments/${shipmentId}/return-reject-customer`, rejectData);

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Return cancelled successfully'
      };
    }

    throw new Error(response.data.message || 'Failed to cancel return');

  } catch (error) {
    console.error('❌ Customer reject return error:', error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || 'Failed to cancel return',
      error: error.response?.data
    };
  }
};

// ==================== ADMIN API FUNCTIONS ====================

/**
 * 5. GET ALL RETURN REQUESTS (Admin)
 * GET /api/v1/admin/return-requests
 * 
 * @param {object} params - { page, limit, status }
 * @returns {Promise<object>} - List of return requests
 */
export const getAllReturnRequests = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page: params.page || 1,
      limit: params.limit || 20,
      ...(params.status && params.status !== 'all' && { status: params.status }),
      timestamp: Date.now()
    });

    const response = await axiosInstance.get(`/admin/return-requests?${queryParams}`);

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        summary: response.data.summary,
        pagination: response.data.pagination,
        message: response.data.message || 'Return requests fetched successfully'
      };
    }

    throw new Error(response.data.message || 'Failed to fetch return requests');

  } catch (error) {
    console.error('❌ Get all return requests error:', error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.error || error.message || 'Failed to fetch return requests',
      error: error.response?.data,
      pagination: { total: 0, page: 1, limit: 20, pages: 0 }
    };
  }
};

/**
 * 6. ADMIN APPROVE RETURN REQUEST
 * PUT /api/v1/admin/return-requests/:id/approve
 * 
 * @param {string} returnId - Return request ID (Shipment ID)
 * @param {object} data - { returnTrackingNumber, notes, adjustCost }
 * @returns {Promise<object>} - Approval response with cost
 */
export const approveReturnRequest = async (returnId, data) => {
  try {
    console.log('✅ Approving return request:', returnId);
    console.log('Approve Data:', data);

    const response = await axiosInstance.put(`/admin/return-requests/${returnId}/approve`, {
      returnTrackingNumber: data.returnTrackingNumber,
      notes: data.notes,
      adjustCost: data.adjustCost
    });

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Return request approved successfully'
      };
    }

    throw new Error(response.data.message || 'Failed to approve return request');

  } catch (error) {
    console.error('❌ Approve return error:', error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || 'Failed to approve return request',
      error: error.response?.data
    };
  }
};

/**
 * 7. ADMIN REJECT RETURN REQUEST
 * PUT /api/v1/admin/return-requests/:id/reject
 * 
 * @param {string} returnId - Return request ID (Shipment ID)
 * @param {string} rejectionReason - Reason for rejection
 * @returns {Promise<object>} - Rejection response
 */
export const rejectReturnRequest = async (returnId, rejectionReason) => {
  try {
    console.log('❌ Rejecting return request:', returnId);
    console.log('Rejection Reason:', rejectionReason);

    const response = await axiosInstance.put(`/admin/return-requests/${returnId}/reject`, {
      rejectionReason: rejectionReason
    });

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Return request rejected'
      };
    }

    throw new Error(response.data.message || 'Failed to reject return request');

  } catch (error) {
    console.error('❌ Reject return error:', error);
    return {
      success: false,
      message: error.response?.data?.error || error.message || 'Failed to reject return request',
      error: error.response?.data
    };
  }
};

/**
 * 8. GET RETURN REQUEST STATISTICS (Admin)
 * GET /api/v1/admin/return-requests/stats
 * 
 * @returns {Promise<object>} - Return statistics
 */
export const getReturnStats = async () => {
  try {
    console.log('📊 Getting return statistics');

    const response = await axiosInstance.get('/admin/return-requests/stats');

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Statistics fetched successfully'
      };
    }

    throw new Error(response.data.message || 'Failed to fetch statistics');

  } catch (error) {
    console.error('❌ Get return stats error:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.error || error.message || 'Failed to fetch statistics',
      error: error.response?.data
    };
  }
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Check if shipment is eligible for return
 */
export const canRequestReturn = (shipment) => {
  if (!shipment) return false;
  
  const eligibleStatuses = ['delivered', 'completed'];
  if (!eligibleStatuses.includes(shipment.status)) return false;
  
  if (shipment.returnRequest && 
      shipment.returnRequest.status !== 'none' && 
      shipment.returnRequest.status !== 'rejected_by_admin' &&
      shipment.returnRequest.status !== 'rejected_by_customer') {
    return false;
  }
  
  const deliveryDate = shipment.dates?.delivered || shipment.courier?.actualDeliveryDate || shipment.updatedAt;
  if (deliveryDate) {
    const daysSinceDelivery = Math.floor((Date.now() - new Date(deliveryDate)) / (1000 * 60 * 60 * 24));
    if (daysSinceDelivery > 14) return false;
  }
  
  return true;
};

/**
 * Get return reason display text
 */
export const getReturnReasonText = (reason) => {
  const reasonTexts = {
    'damaged_product': 'Damaged Product',
    'wrong_product': 'Wrong Product Received',
    'missing_items': 'Missing Items',
    'delayed_delivery': 'Delayed Delivery',
    'customer_cancellation': 'Customer Cancellation',
    'other': 'Other Reason'
  };
  return reasonTexts[reason] || reason || 'Not specified';
};

/**
 * Get return status display text
 */
export const getReturnStatusText = (status) => {
  const statusTexts = {
    'none': 'No Return',
    'pending': 'Pending Admin Approval',
    'approved': 'Admin Approved - Awaiting Your Confirmation',
    'rejected_by_admin': 'Rejected by Admin',
    'rejected_by_customer': 'Cancelled by You',
    'completed': 'Return Completed'
  };
  return statusTexts[status] || status || 'Unknown';
};

/**
 * Get return status color for UI
 */
export const getReturnStatusColor = (status) => {
  const statusColors = {
    'pending': 'yellow',
    'approved': 'blue',
    'rejected_by_admin': 'red',
    'rejected_by_customer': 'orange',
    'completed': 'green'
  };
  return statusColors[status] || 'gray';
};

/**
 * Get return status icon name
 */
export const getReturnStatusIcon = (status) => {
  const statusIcons = {
    'pending': 'Clock',
    'approved': 'ThumbsUp',
    'rejected_by_admin': 'ThumbsDown',
    'rejected_by_customer': 'XCircle',
    'completed': 'CheckCircle'
  };
  return statusIcons[status] || 'AlertCircle';
};

/**
 * Format return cost for display
 */
export const formatReturnCost = (cost, currency = 'USD', isFree = false) => {
  if (isFree) return 'FREE';
  if (!cost && cost !== 0) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(cost);
};

/**
 * Get return cost breakdown display
 */
export const getReturnCostBreakdown = (breakdown) => {
  if (!breakdown) return null;
  
  return {
    shippingCost: breakdown.shippingCost || 0,
    handlingFee: breakdown.handlingFee || 0,
    restockingFee: breakdown.restockingFee || 0,
    total: breakdown.total || 0,
    note: breakdown.note || ''
  };
};