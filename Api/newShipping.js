import axiosInstance from '@/lib/axiosInstance';
import Cookies from 'js-cookie'; 
// ==================== CUSTOMER SHIPMENT APIS ====================

// Get all shipments for logged in customer
export const getMyNewShipments = async (params = {}) => {
  try {
    console.log('📦 Fetching my shipments with params:', params);

    // URL query params
    const queryParams = new URLSearchParams({
      page: params.page || 1,
      limit: params.limit || 20,
      ...(params.search && { search: params.search }),
      ...(params.status && params.status !== 'all' && { status: params.status }),
      ...(params.startDate && { startDate: params.startDate }),
      ...(params.endDate && { endDate: params.endDate }),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortOrder && { sortOrder: params.sortOrder }),
      timestamp: Date.now() // cache bypass
    });

    // API call
    const response = await axiosInstance.get(`/my-new-shipments?${queryParams}`);

    if (response.data.success) {
      const shipments = Array.isArray(response.data.data) ? response.data.data : [];

      return {
        success: true,
        data: shipments,
        summary: response.data.summary || {
          total: shipments.length,
          active: 0,
          delivered: 0,
          cancelled: 0,
          pending: 0,
          inTransit: 0
        },
        pagination: response.data.pagination || {
          total: shipments.length,
          page: params.page || 1,
          limit: params.limit || 20,
          pages: Math.ceil(shipments.length / (params.limit || 20))
        },
        message: response.data.message || 'Shipments fetched successfully'
      };
    }

    throw new Error(response.data.message || 'Failed to fetch shipments');

  } catch (error) {
    console.error('❌ Get my shipments error:', error);

    return {
      success: false,
      data: [],
      message: error.response?.data?.error || error.message || 'Failed to fetch shipments',
      error: error.response?.data || null,
      pagination: {
        total: 0,
        page: params.page || 1,
        limit: params.limit || 20,
        pages: 0
      },
      summary: {
        total: 0,
        active: 0,
        delivered: 0,
        cancelled: 0,
        pending: 0,
        inTransit: 0
      }
    };
  }
};

// Get single shipment details for customer
export const getMyShipmentById = async (shipmentId) => {
  try {
    const response = await axiosInstance.get(`/shipments/my-shipments/${shipmentId}`);
    
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    }
    
    throw new Error(response.data.message || 'Failed to fetch shipment');
  } catch (error) {
    console.error('❌ Get my shipment error:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.error || error.message || 'Failed to fetch shipment'
    };
  }
};

// Get tracking info for customer shipment
export const getMyShipmentTracking = async (shipmentId) => {
  try {
    const response = await axiosInstance.get(`/shipments/my-shipments/${shipmentId}/tracking`);
    
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    }
    
    throw new Error(response.data.message || 'Failed to fetch tracking info');
  } catch (error) {
    console.error('❌ Get tracking error:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.error || error.message || 'Failed to fetch tracking info'
    };
  }
};

// Get shipment summary for customer
export const getMyShipmentSummary = async () => {
  try {
    const response = await axiosInstance.get('/shipments/my-shipments/summary');
    
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    }
    
    throw new Error(response.data.message || 'Failed to fetch summary');
  } catch (error) {
    console.error('❌ Get summary error:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.error || error.message || 'Failed to fetch summary'
    };
  }
};

// Request return for a shipment (customer)
export const requestReturn = async (shipmentId, returnData) => {
  try {
    const response = await axiosInstance.post(`/shipments/my-shipments/${shipmentId}/return-request`, returnData);
    
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Return request submitted successfully'
      };
    }
    
    throw new Error(response.data.message || 'Failed to submit return request');
  } catch (error) {
    console.error('❌ Return request error:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.error || error.message || 'Failed to submit return request'
    };
  }
};

// Cancel return request (customer)
export const cancelReturnRequest = async (returnRequestId) => {
  try {
    const response = await axiosInstance.put(`/shipments/return-requests/${returnRequestId}/cancel`);
    
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Return request cancelled'
      };
    }
    
    throw new Error(response.data.message || 'Failed to cancel return request');
  } catch (error) {
    console.error('❌ Cancel return error:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.error || error.message || 'Failed to cancel return request'
    };
  }
};