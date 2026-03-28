import axiosInstance from '@/lib/axiosInstance';
import Cookies from 'js-cookie';

// ==================== AUTHENTICATION ====================

// Login (All Roles)
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    
    if (response.data.success && response.data.token) {
      // Store in cookies
      Cookies.set('token', response.data.token, { expires: 7 });
      Cookies.set('user', JSON.stringify(response.data.data), { expires: 7 });
      
      // Also store in localStorage for compatibility
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_details', JSON.stringify(response.data.data));
      }
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// ==================== GOOGLE LOGIN ====================

// Google Login
export const googleLogin = async (idToken, email, name, photoURL, uid) => {
  try {
    const response = await axiosInstance.post('/auth/google', {
      idToken,
      email,
      name,
      photoURL,
      uid
    });
    
    console.log('🔍 Google Login Response:', response.data);
    
    if (response.data.success && response.data.token) {
      const userData = response.data.user;
      
      // Clear old data first
      Cookies.remove('token');
      Cookies.remove('user');
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_details');
        localStorage.removeItem('user');
      }
      
      // Store new data in cookies
      Cookies.set('token', response.data.token, { expires: 7 });
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });
      
      // Also store in localStorage for compatibility
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_details', JSON.stringify(userData));
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      console.log('✅ Google login data stored:', userData.email);
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Google login error:', error);
    throw error.response?.data || { message: 'Google login failed' };
  }
};

// ==================== CUSTOMER REGISTRATION ====================

// Customer Registration with OTP
export const registerCustomer = async (userData) => {
  try {
    const response = await axiosInstance.post('/customer/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Verify OTP
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axiosInstance.post('/customer/verify-otp', { email, otp });
    
    if (response.data.success && response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 });
      Cookies.set('user', JSON.stringify(response.data.data), { expires: 7 });
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_details', JSON.stringify(response.data.data));
      }
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'OTP verification failed' };
  }
};

// Resend OTP
export const resendOTP = async (email) => {
  try {
    const response = await axiosInstance.post('/customer/resend-otp', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to resend OTP' };
  }
};

// Forgot Password (All Roles)
export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post('/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to process request' };
  }
};

// Reset Password (All Roles)
export const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await axiosInstance.post('/users/reset-password', { 
      email, 
      otp, 
      newPassword 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to reset password' };
  }
};

// Verify Reset OTP
export const verifyResetOTP = async (email, otp) => {
  try {
    const response = await axiosInstance.post('/verify-reset-otp', { email, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'OTP verification failed' };
  }
};

// Resend Reset OTP
export const resendResetOTP = async (email) => {
  try {
    const response = await axiosInstance.post('/resend-reset-otp', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to resend OTP' };
  }
};

// Logout
export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('user');
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_details');
    localStorage.removeItem('user');
    
    // Dispatch event for navbar to update
    window.dispatchEvent(new Event('authChange'));
  }
};

// ==================== PROTECTED ROUTES ====================

// Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/users/profile');
    
    // Update stored user data if needed
    if (response.data.success && response.data.data) {
      const userData = response.data.data;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_details', JSON.stringify(userData));
        localStorage.setItem('user', JSON.stringify(userData));
      }
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get profile' };
  }
};

// Update Profile
export const updateProfile = async (userData) => {
  try {
    const response = await axiosInstance.put('/users/profile', userData);
    
    // Update stored user data
    if (response.data.success) {
      const updatedUser = response.data.data;
      
      Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_details', JSON.stringify(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update profile' };
  }
};

// Change Password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axiosInstance.put('/users/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to change password' };
  }
};

// ==================== ADMIN FUNCTIONS ====================

// Create Admin (Initial Setup)
export const createAdmin = async (adminData) => {
  try {
    const response = await axiosInstance.post('/users/admin/setup', adminData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create admin' };
  }
};

// Create Staff (Admin Only)
export const createStaff = async (staffData) => {
  try {
    const response = await axiosInstance.post('/users/staff', staffData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create staff' };
  }
};

// Get All Users (Admin Only)
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get users' };
  }
};

// Get User By ID (Admin Only)
export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get user' };
  }
};

// Update User (Admin Only)
export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update user' };
  }
};

// Delete User (Admin Only)
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete user' };
  }
};

// Get Users By Role (Admin Only)
export const getUsersByRole = async (role) => {
  try {
    const response = await axiosInstance.get(`/users/role/${role}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get users by role' };
  }
};

// ==================== HELPER FUNCTIONS ====================

// Get Current User (Priority: localStorage > cookies)
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  // Try localStorage first (for Google login)
  let userStr = localStorage.getItem('user_details');
  
  if (!userStr) {
    // Fallback to cookies
    userStr = Cookies.get('user');
  }
  
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Get Auth Token (Priority: localStorage > cookies)
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  
  // Try localStorage first
  let token = localStorage.getItem('auth_token');
  
  if (!token) {
    // Fallback to cookies
    token = Cookies.get('token');
  }
  
  return token;
};

// Check if User is Authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Check if User has Specific Role
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user?.role === role;
};

// Check if User is Admin
export const isAdmin = () => {
  return hasRole('admin');
};

// Check if User is Customer
export const isCustomer = () => {
  return hasRole('customer');
};

// Check if User is Staff (Operations or Warehouse)
export const isStaff = () => {
  const user = getCurrentUser();
  return user?.role === 'operations' || user?.role === 'warehouse';
};

// Sync user data across storage
export const syncUserData = (userData, token) => {
  if (typeof window === 'undefined') return;
  
  if (token) {
    localStorage.setItem('auth_token', token);
    Cookies.set('token', token, { expires: 7 });
  }
  
  if (userData) {
    localStorage.setItem('user_details', JSON.stringify(userData));
    localStorage.setItem('user', JSON.stringify(userData));
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
  }
};