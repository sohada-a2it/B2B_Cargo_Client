"use client";
import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit2,
  Save,
  Camera,
  Shield,
  Package,
  Truck,
  Building2,
  Briefcase,
  Globe,
  Bell,
  Clock,
  Users,
  Warehouse,
  Key,
  MapPin,
  Star,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  LogOut,
  ClipboardList
} from 'lucide-react';
import { getCurrentUser, updateProfile, logout } from '@/Api/Authentication';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    try {
      const currentUser = getCurrentUser();
      if (currentUser?._id) {
        setUser(currentUser);
        setFormData({
          firstName: currentUser.firstName || '',
          lastName: currentUser.lastName || '',
          phone: currentUser.phone || '',
          companyName: currentUser.companyName || '',
          companyAddress: currentUser.companyAddress || '',
          companyVAT: currentUser.companyVAT || '',
          businessType: currentUser.businessType || 'Trader',
          industry: currentUser.industry || '',
          department: currentUser.department || '',
          designation: currentUser.designation || '',
          employeeId: currentUser.employeeId || '',
          warehouseLocation: currentUser.warehouseLocation || '',
          timezone: currentUser.timezone || 'UTC',
          preferredCurrency: currentUser.preferredCurrency || 'USD',
          language: currentUser.language || 'en'
        });
      }
    } catch (error) {
      console.error('Error loading user:', error);
      toast.error('Failed to load profile', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateProfile(formData);
      if (response?.success) {
        setUser(response.data);
        setIsEditing(false);
        toast.success('Profile updated successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: '✅'
        });
      }
    } catch (error) {
      toast.error(error?.message || 'Update failed. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
    toast.info('Logged out successfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#E67E22]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 bg-[#E67E22] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  const getRoleIcon = () => {
    switch (user.role) {
      case 'admin': return <Shield className="w-5 h-5" />;
      case 'operations': return <Package className="w-5 h-5" />;
      case 'warehouse': return <Truck className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getRoleColor = () => {
    switch (user.role) {
      case 'admin': return 'bg-red-500';
      case 'operations': return 'bg-blue-500';
      case 'warehouse': return 'bg-purple-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusBadge = () => {
    const status = user.status || 'active';
    const config = {
      active: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle, label: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-700', icon: XCircle, label: 'Inactive' },
      suspended: { color: 'bg-red-100 text-red-700', icon: AlertCircle, label: 'Suspended' },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'Pending' }
    };
    const { color, icon: Icon, label } = config[status] || config.active;
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </span>
    );
  };

  const getVerificationBadge = () => {
    if (!user.isVerified) return null;
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
        <CheckCircle className="w-3 h-3 mr-1" />
        Verified
      </span>
    );
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: User }, 
    { id: 'professional', label: user.role === 'customer' ? 'Business' : 'Professional', icon: user.role === 'customer' ? Building2 : Briefcase },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    // { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50"> 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Profile Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              {/* Cover with gradient */}
              <div className={`h-24 bg-gradient-to-r from-[#122652] to-[#E67E22] relative`}>
                <div className={`absolute -bottom-12 left-6 w-24 h-24 rounded-xl bg-white p-1 shadow-lg`}>
                  <div className={`w-full h-full rounded-lg ${getRoleColor()} flex items-center justify-center text-white text-2xl font-bold`}>
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-14 px-6 pb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h2>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getRoleIcon()}
                        <span className="ml-1 capitalize">{user.role}</span>
                      </span>
                      {getStatusBadge()}
                      {getVerificationBadge()}
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 text-[#E67E22] hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Quick Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-600">{user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">
                      Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="border-t border-gray-200">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center justify-between px-6 py-3 text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-orange-50 text-[#E67E22] border-l-4 border-[#E67E22]'
                          : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <span className="flex items-center">
                        <Icon className="w-4 h-4 mr-3" />
                        {section.label}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h3>
                  
                  <div className="space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Role-specific fields */}
                    {user.role === 'customer' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              value={formData.companyName || ''}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              VAT Number
                            </label>
                            <input
                              type="text"
                              name="companyVAT"
                              value={formData.companyVAT || ''}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Address
                          </label>
                          <textarea
                            name="companyAddress"
                            value={formData.companyAddress || ''}
                            onChange={handleInputChange}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Business Type
                            </label>
                            <select
                              name="businessType"
                              value={formData.businessType || 'Trader'}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                            >
                              <option value="Manufacturer">Manufacturer</option>
                              <option value="Trader">Trader</option>
                              <option value="Wholesaler">Wholesaler</option>
                              <option value="Retailer">Retailer</option>
                              <option value="Importer">Importer</option>
                              <option value="Exporter">Exporter</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Industry
                            </label>
                            <input
                              type="text"
                              name="industry"
                              value={formData.industry || ''}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {(user.role === 'operations' || user.role === 'warehouse' || user.role === 'admin') && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employee ID
                          </label>
                          <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                          </label>
                          <input
                            type="text"
                            name="department"
                            value={formData.department || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Designation
                          </label>
                          <input
                            type="text"
                            name="designation"
                            value={formData.designation || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                          />
                        </div>
                        {user.role === 'warehouse' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Warehouse Location
                            </label>
                            <input
                              type="text"
                              name="warehouseLocation"
                              value={formData.warehouseLocation || ''}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-[#E67E22] text-white text-sm font-medium rounded-lg hover:bg-[#d35400] transition-colors disabled:opacity-50 flex items-center"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  {/* Profile Section */}
                  {activeSection === 'profile' && (
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">First Name</p>
                          <p className="font-medium text-gray-900">{user.firstName}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Last Name</p>
                          <p className="font-medium text-gray-900">{user.lastName}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Email</p>
                          <p className="font-medium text-gray-900">{user.email}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Phone</p>
                          <p className="font-medium text-gray-900">{user.phone || 'Not provided'}</p>
                        </div>
                      </div> 
                    </div>
                  )}

                  {/* Professional Section */}
                  {activeSection === 'professional' && (
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {user.role === 'customer' ? 'Business Information' : 'Professional Details'}
                      </h3>
                      
                      {user.role === 'customer' ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">Company Name</p>
                              <p className="font-medium">{user.companyName || 'Not provided'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">VAT Number</p>
                              <p className="font-medium">{user.companyVAT || 'Not provided'}</p>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Company Address</p>
                            <p className="font-medium">{user.companyAddress || 'Not provided'}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">Business Type</p>
                              <p className="font-medium">{user.businessType || 'Not specified'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">Industry</p>
                              <p className="font-medium">{user.industry || 'Not specified'}</p>
                            </div>
                          </div>

                          {/* Shipping Info */}
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-2">Origin Countries</p>
                                <div className="flex flex-wrap gap-1">
                                  {user.originCountries?.length > 0 ? (
                                    user.originCountries.map((c, i) => (
                                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                        {c}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-sm text-gray-600">Not specified</span>
                                  )}
                                </div>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-2">Destination Markets</p>
                                <div className="flex flex-wrap gap-1">
                                  {user.destinationMarkets?.length > 0 ? (
                                    user.destinationMarkets.map((m, i) => (
                                      <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                        {m}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-sm text-gray-600">Not specified</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Employee ID</p>
                            <p className="font-medium">{user.employeeId || 'Not assigned'}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Department</p>
                            <p className="font-medium">{user.department || 'Not specified'}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Designation</p>
                            <p className="font-medium">{user.designation || 'Not specified'}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Employment Date</p>
                            <p className="font-medium">
                              {user.employmentDate ? new Date(user.employmentDate).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                          {user.role === 'warehouse' && (
                            <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">Warehouse Location</p>
                              <p className="font-medium">{user.warehouseLocation || 'Not specified'}</p>
                            </div>
                          )}
                          {user.role === 'operations' && (
                            <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-500 mb-1">Assigned Customers</p>
                              <p className="font-medium">{user.assignedCustomers?.length || 0} customers</p>
                            </div>
                          )}
                          {user.role === 'admin' && (
                            <>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Admin Level</p>
                                <p className="font-medium capitalize">{user.adminLevel || 'admin'}</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Access Level</p>
                                <p className="font-medium capitalize">{user.accessLevel || 'full'}</p>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Preferences Section */}
                  {activeSection === 'preferences' && (
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Timezone</p>
                            <p className="font-medium">{user.timezone || 'UTC'}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Currency</p>
                            <p className="font-medium">{user.preferredCurrency || 'USD'}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Language</p>
                            <p className="font-medium">{(user.language || 'en').toUpperCase()}</p>
                          </div>
                        </div> 
                      </div>
                    </div>
                  )}

                  {/* Security Section */}
                  {activeSection === 'security' && (
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                      <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-yellow-800">Password</h4>
                              <p className="text-sm text-yellow-700 mt-1">
                                For security reasons, password changes are handled in a separate secure area.
                              </p>
                              <button className="mt-3 text-sm text-yellow-800 font-medium hover:underline">
                                Go to Security Settings →
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Login History */}
                        {/* <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Logins</h4>
                          <div className="space-y-2">
                            {user.loginHistory?.slice(0, 3).map((login, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                                <span>{new Date(login.timestamp).toLocaleString()}</span>
                                <span className="text-gray-600">{login.ipAddress}</span>
                                <span className="text-xs text-gray-500">{login.device}</span>
                              </div>
                            ))}
                            {(!user.loginHistory || user.loginHistory.length === 0) && (
                              <p className="text-sm text-gray-500">No login history available</p>
                            )}
                          </div>
                        </div> */}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;