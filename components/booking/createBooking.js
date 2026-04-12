// app/create-booking/page.js
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { createBooking } from '@/Api/booking';

// Location functions
import { getStates, fetchCitiesByState } from '@/Api/location';

// Icons
import {
  Package, MapPin, Calendar, Weight, Box, FileText, ArrowLeft,
  Plus, Trash2, Send, AlertCircle, CheckCircle, ChevronRight,
  ChevronLeft, Truck, Ship, Plane, Phone, Mail,
  Building, Clock, Globe, Hash, Tag, Briefcase, Loader2, X,
  User, Save, Info, Ruler, UserPlus, Search,
  CreditCard, Wallet, Repeat, TruckIcon, DollarSign
} from 'lucide-react';

// ==================== CURRENCY CONSTANTS ====================
const CURRENCY_BY_COUNTRY = {
    'USA': 'USD',
    'UK': 'GBP',
    'Canada': 'CAD'
};

const CURRENCY_SYMBOLS = {
    'USD': '$',
    'GBP': '£',
    'CAD': 'C$'
};

// ==================== CONSTANTS ====================

const SHIPMENT_MAIN_TYPES = [
  { value: 'sea_freight', label: 'Sea Freight', icon: Ship },
  { value: 'air_freight', label: 'Air Freight', icon: Plane },
  { value: 'inland_trucking', label: 'Inland Trucking', icon: Truck },
  { value: 'multimodal', label: 'Multimodal', icon: Repeat }
];

const SHIPMENT_SUB_TYPES = {
  sea_freight: [
    { value: 'sea_freight_fcl', label: 'FCL - Full Container Load' },
    { value: 'sea_freight_lcl', label: 'LCL - Less than Container Load' }
  ],
  air_freight: [
    { value: 'air_freight', label: 'Air Freight' }
  ],
  inland_trucking: [
    { value: 'inland_transport', label: 'Inland Transport' }
  ],
  multimodal: [
    { value: 'door_to_door', label: 'Door to Door' }
  ]
};

const SHIPPING_MODES = [
  { value: 'DDP', label: 'DDP (Delivered Duty Paid)' },
  { value: 'DDU', label: 'DDU (Delivered Duty Unpaid)' },
  { value: 'FOB', label: 'FOB (Free on Board)' },
  { value: 'CIF', label: 'CIF (Cost, Insurance & Freight)' }
];

const PAYMENT_MODES = [
  { value: 'bank_transfer', label: 'Bank Transfer', icon: CreditCard },
  { value: 'credit_card', label: 'Credit Card', icon: CreditCard },
  { value: 'cash', label: 'Cash', icon: Wallet },
  { value: 'wire_transfer', label: 'Wire Transfer', icon: CreditCard }
];

const SERVICE_TYPES = [
  { value: 'standard', label: 'Standard Delivery (3-5 Days)' },
  { value: 'express', label: 'Express Delivery (1-2 Days)' },
  { value: 'overnight', label: 'Overnight Delivery' },
  { value: 'economy', label: 'Economy Delivery (5-7 Days)' }
];

const ORIGINS = [
  { value: 'China Warehouse', label: 'China - Main Warehouse' },
  { value: 'Thailand Warehouse', label: 'Thailand - Regional Hub' }
];

const DESTINATIONS = [
  { value: 'USA', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'Canada', label: 'Canada' }
];

const PRODUCT_CATEGORIES = [
  'Electronics', 'Furniture', 'Clothing', 'Machinery', 
  'Automotive', 'Pharmaceuticals', 'Food', 'Documents', 'Tires', 'Chemicals', 'Others'
];

const CURRENCIES = ['USD', 'GBP', 'CAD'];

const PACKAGING_TYPES = [
  { value: 'pallet', label: 'Pallet' },
  { value: 'carton', label: 'Carton' },
  { value: 'crate', label: 'Crate' },
  { value: 'wooden_box', label: 'Wooden Box' },
  { value: 'container', label: 'Container' },
  { value: 'envelope', label: 'Envelope' },
  { value: 'loose_cargo', label: 'Loose Cargo' },
  { value: 'loose_tires', label: 'Loose Tires' },
  { value: '20ft_container', label: '20FT Container' },
  { value: '40ft_container', label: '40FT Container' }
];

// ==================== COMPONENTS ====================

const Button = ({ children, type = 'button', variant = 'primary', size = 'md', isLoading = false, disabled = false, onClick, className = '', icon: Icon, iconPosition = 'left' }) => {
  const baseClasses = 'rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[#2563eb] text-white hover:bg-[#1d4ed8] focus:ring-[#2563eb] shadow-sm',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400 border border-gray-300',
    outline: 'border border-[#2563eb] text-[#2563eb] hover:bg-blue-50 focus:ring-[#2563eb]',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500'
  };

  const sizes = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base'
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center">
          <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
          <span>Please wait...</span>
        </div>
      ) : (
        <div className="flex items-center">
          {Icon && iconPosition === 'left' && <Icon className="h-3.5 w-3.5 mr-1.5" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="h-3.5 w-3.5 ml-1.5" />}
        </div>
      )}
    </button>
  );
};

const Input = ({ label, type = 'text', name, value, onChange, onBlur, placeholder, error, required = false, disabled = false, icon: Icon, className = '', ...props }) => {
  const [touched, setTouched] = useState(false);
  const showError = (touched || error) && error;
  
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="block text-xs font-medium text-gray-600 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Icon className="h-3.5 w-3.5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          onBlur={(e) => { setTouched(true); onBlur?.(e); }}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-3 py-2 text-sm border rounded-md shadow-sm
            focus:outline-none focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb]
            ${showError ? 'border-red-300 bg-red-50' : 'border-gray-300'}
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
            ${Icon ? 'pl-8' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {showError && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

const Select = ({ label, name, value, onChange, options, error, required = false, icon: Icon, placeholder = 'Select...', disabled = false, loading = false }) => {
  const [touched, setTouched] = useState(false);
  const showError = (touched || error) && error;
  
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="block text-xs font-medium text-gray-600 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Icon className="h-3.5 w-3.5 text-gray-400" />
          </div>
        )}
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          onBlur={() => setTouched(true)}
          disabled={disabled || loading}
          className={`
            w-full px-3 py-2 text-sm border rounded-md shadow-sm appearance-none
            focus:outline-none focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb]
            ${showError ? 'border-red-300 bg-red-50' : 'border-gray-300'}
            ${Icon ? 'pl-8' : ''}
            ${disabled || loading ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
        >
          <option value="">
            {loading ? 'Loading...' : placeholder}
          </option>
          {!loading && options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {loading && (
          <div className="absolute inset-y-0 right-8 flex items-center">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-400" />
          </div>
        )}
        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
          <ChevronRight className="h-3.5 w-3.5 text-gray-400 transform rotate-90" />
        </div>
      </div>
      {showError && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

const TextArea = ({ label, name, value, onChange, placeholder, error, required = false, rows = 3 }) => {
  const [touched, setTouched] = useState(false);
  const showError = (touched || error) && error;
  
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="block text-xs font-medium text-gray-600 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-3 py-2 text-sm border rounded-md shadow-sm
          focus:outline-none focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb]
          ${showError ? 'border-red-300 bg-red-50' : 'border-gray-300'}
        `}
      />
      {showError && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

const StepIndicator = ({ step, currentStep, title }) => {
  const isActive = step <= currentStep;
  const isCurrent = step === currentStep;
  
  return (
    <div className="flex items-center">
      <div className={`
        w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all
        ${isCurrent ? 'bg-[#2563eb] text-white ring-2 ring-blue-200' : 
          isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
      `}>
        {isActive && step < currentStep ? <CheckCircle className="h-3 w-3" /> : step}
      </div>
      <span className={`ml-1.5 text-xs ${isCurrent ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function CreateBooking() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [availableSubTypes, setAvailableSubTypes] = useState([]);
  const [isReviewConfirmed, setIsReviewConfirmed] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [pickupRequired, setPickupRequired] = useState(false);
  
  // Location States
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // ===== Form Data State with Default Values =====
  const [formData, setFormData] = useState({
    customer: '',
    
    shipmentClassification: {
      mainType: '',
      subType: ''
    },
    
    shipmentDetails: {
      origin: 'China Warehouse',
      destination: 'USA',
      shippingMode: 'DDU',
      packageDetails: [{
        description: '',
        packagingType: 'carton',
        quantity: 1,
        weight: 0,
        volume: 0,
        dimensions: {
          length: 0,
          width: 0,
          height: 0,
          unit: 'cm'
        },
        productCategory: '',
        hsCode: '',
        value: { 
          amount: 0, 
          currency: 'USD' 
        },
        hazardous: false,
        temperatureControlled: {
          required: false,
          minTemp: null,
          maxTemp: null
        }
      }],
      totalPackages: 0,
      totalWeight: 0,
      totalVolume: 0,
      specialInstructions: '',
      referenceNumber: ''
    },
 
    payment: {
      mode: 'bank_transfer',
      currency: 'USD',
      amount: 0
    },
    
    serviceType: 'standard',
    
    sender: {
      name: '',
      companyName: '',
      email: '',
      phone: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
      },
      pickupDate: '',
      pickupInstructions: ''
    },
    
    receiver: {
      name: '',
      companyName: '',
      email: '',
      phone: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
      },
      deliveryInstructions: '',
      isResidential: false
    },
    
    courier: {
      company: 'Cargo Logistics Group',
      serviceType: 'standard'
    },
    
    customerReference: '',
    
    status: 'booking_requested',
    pricingStatus: 'pending'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ==================== LOAD LOGGED IN USER DATA ====================
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoadingUser(true);
      try {
        let userStr = localStorage.getItem('user');
        
        if (!userStr) {
          userStr = sessionStorage.getItem('user');
        }
        
        if (!userStr) {
          const cookies = document.cookie.split(';');
          for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'user') {
              userStr = decodeURIComponent(value);
              break;
            }
          }
        }
        
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            console.log('✅ User data loaded:', user);
            setLoggedInUser(user);
            
            setFormData(prev => ({
              ...prev,
              customer: user._id,
              sender: {
                ...prev.sender,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name || '',
                companyName: user.companyName || '',
                email: user.email || '',
                phone: user.phone || '',
                address: {
                  ...prev.sender.address,
                  addressLine1: user.address?.addressLine1 || user.companyAddress || '',
                  addressLine2: user.address?.addressLine2 || '',
                  city: user.address?.city || user.city || '',
                  state: user.address?.state || user.state || '',
                  country: user.address?.country || user.country || '',
                  postalCode: user.address?.postalCode || user.postalCode || ''
                }
              }
            }));
            
            toast.success(`Welcome ${user.firstName || user.name || 'User'}!`);
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            toast.error('Error loading user data. Please login again.');
            router.push('/auth/login');
          }
        } else {
          console.log('⚠️ No user found in storage');
          toast.warning('Please login to create a booking');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error loading user:', error);
        toast.error('Failed to load user data');
        router.push('/auth/login');
      } finally {
        setIsLoadingUser(false);
      }
    };
    
    loadUserData();
  }, [router]);

  // ==================== REAL-TIME VALIDATION FUNCTIONS ====================
  
  const validateField = useCallback((name, value) => {
    let error = '';
    
    if (name === 'shipmentClassification.mainType') {
      if (!value) error = 'Shipment type is required';
    } else if (name === 'shipmentClassification.subType') {
      if (!value) error = 'Shipment sub-type is required';
    } else if (name === 'payment.mode') {
      if (!value) error = 'Payment mode is required';
    }
    
    else if (name.includes('packageDetails')) {
      const match = name.match(/packageDetails\[(\d+)\]\.(.+)/);
      if (match) {
        const [, index, field] = match;
        if (field === 'description' && !value) {
          error = 'Description is required';
        } else if (field === 'quantity' && (!value || value < 1)) {
          error = 'Minimum 1 item required';
        } else if (field === 'weight' && (!value || value <= 0)) {
          error = 'Weight is required';
        }
      }
    }
    
    else if (name === 'sender.name') {
      if (!value) error = 'Sender name is required';
    } else if (name === 'sender.email') {
      if (!value) error = 'Sender email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
    } else if (name === 'sender.phone') {
      if (!value) error = 'Sender phone is required';
    }
    
    else if (name === 'receiver.name') {
      if (!value) error = 'Receiver name is required';
    } else if (name === 'receiver.email') {
      if (!value) error = 'Receiver email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
    } else if (name === 'receiver.phone') {
      if (!value) error = 'Receiver phone is required';
    } else if (name === 'receiver.address.addressLine1') {
      if (!value) error = 'Receiver address is required';
    } else if (name === 'receiver.address.city') {
      if (!value) error = 'City is required';
    } else if (name === 'receiver.address.country') {
      if (!value) error = 'Country is required';
    } else if (name === 'receiver.address.state') {
      if (!value) error = 'State is required';
    }
    
    else if (name === 'sender.pickupDate' && pickupRequired) {
      if (!value) error = 'Pickup date is required';
    }
    
    return error;
  }, [pickupRequired]);

  const validateOnChange = useCallback((name, value) => {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  }, [validateField]);

  const validateStep = useCallback((step) => {
    const newErrors = {};
    let isValid = true;
    
    if (step === 1) {
      if (!formData.shipmentClassification.mainType) {
        newErrors['shipmentClassification.mainType'] = 'Shipment type is required';
        isValid = false;
      }
      if (!formData.shipmentClassification.subType) {
        newErrors['shipmentClassification.subType'] = 'Shipment sub-type is required';
        isValid = false;
      }
      if (!formData.payment.mode) {
        newErrors['payment.mode'] = 'Payment mode is required';
        isValid = false;
      }
    }
    
    else if (step === 2) {
      formData.shipmentDetails.packageDetails.forEach((item, index) => {
        if (!item.description) {
          newErrors[`package_desc_${index}`] = 'Description is required';
          isValid = false;
        }
        if (!item.quantity || item.quantity < 1) {
          newErrors[`package_qty_${index}`] = 'Minimum 1 item required';
          isValid = false;
        }
        if (!item.weight || item.weight <= 0) {
          newErrors[`package_weight_${index}`] = 'Weight is required';
          isValid = false;
        }
      });
    }
    
    else if (step === 3) {
      if (!formData.sender.name) {
        newErrors['sender.name'] = 'Sender name is required';
        isValid = false;
      }
      if (!formData.sender.email) {
        newErrors['sender.email'] = 'Sender email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.sender.email)) {
        newErrors['sender.email'] = 'Invalid email format';
        isValid = false;
      }
      if (!formData.sender.phone) {
        newErrors['sender.phone'] = 'Sender phone is required';
        isValid = false;
      }
      if (!formData.receiver.name) {
        newErrors['receiver.name'] = 'Receiver name is required';
        isValid = false;
      }
      if (!formData.receiver.email) {
        newErrors['receiver.email'] = 'Receiver email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.receiver.email)) {
        newErrors['receiver.email'] = 'Invalid email format';
        isValid = false;
      }
      if (!formData.receiver.phone) {
        newErrors['receiver.phone'] = 'Receiver phone is required';
        isValid = false;
      }
      if (!formData.receiver.address.addressLine1) {
        newErrors['receiver.address.addressLine1'] = 'Receiver address is required';
        isValid = false;
      }
      if (!formData.receiver.address.city) {
        newErrors['receiver.address.city'] = 'City is required';
        isValid = false;
      }
      if (!formData.receiver.address.country) {
        newErrors['receiver.address.country'] = 'Country is required';
        isValid = false;
      }
      if (!formData.receiver.address.state) {
        newErrors['receiver.address.state'] = 'State is required';
        isValid = false;
      }
      
      if (pickupRequired && !formData.sender.pickupDate) {
        newErrors['sender.pickupDate'] = 'Pickup date is required';
        isValid = false;
      }
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  }, [formData, pickupRequired]);

  // ==================== LOCATION FUNCTIONS ====================
  
  const loadStates = useCallback((country) => {
    if (!country) return;
    
    setLoadingLocation(true);
    try {
      const statesData = getStates(country);
      if (statesData && statesData.length > 0) {
        const stateNames = statesData.map(s => s.name);
        setStates(stateNames);
      } else {
        setStates([]);
      }
    } catch (error) {
      console.error('Error loading states:', error);
      setStates([]);
    } finally {
      setLoadingLocation(false);
    }
  }, []);

  const loadCities = useCallback((country, state) => {
    if (!country || !state) return;
    
    setLoadingLocation(true);
    try {
      const citiesData = fetchCitiesByState(country, state);
      if (citiesData && citiesData.length > 0) {
        const cityNames = citiesData.map(c => c.name);
        setCities(cityNames);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error('Error loading cities:', error);
      setCities([]);
    } finally {
      setLoadingLocation(false);
    }
  }, []);

  // ==================== HANDLERS ====================
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const keys = name.split('.');
      const newFormData = JSON.parse(JSON.stringify(prev));
      let current = newFormData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = finalValue;
      return newFormData;
    });
    
    validateOnChange(name, finalValue);
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // Updated Destination Change Handler with Currency
  const handleDestinationChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
    
    if (value) {
      setStates([]);
      setCities([]);
      loadStates(value);
      
      // Get currency for selected country
      const currencyCode = CURRENCY_BY_COUNTRY[value] || 'USD';
      
      setFormData(prev => ({
        ...prev,
        receiver: {
          ...prev.receiver,
          address: {
            ...prev.receiver.address,
            country: value,
            city: '',
            state: '',
            postalCode: ''
          }
        },
        payment: {
          ...prev.payment,
          currency: currencyCode
        },
        shipmentDetails: {
          ...prev.shipmentDetails,
          destination: value
        }
      }));
      
      toast.success(`${value} selected - Currency: ${currencyCode} (${CURRENCY_SYMBOLS[currencyCode]})`);
    }
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
    
    if (value && formData.receiver.address.country) {
      setCities([]);
      loadCities(formData.receiver.address.country, value);
      
      setFormData(prev => ({
        ...prev,
        receiver: {
          ...prev.receiver,
          address: {
            ...prev.receiver.address,
            state: value,
            city: '',
            postalCode: ''
          }
        }
      }));
    }
  };

  const handleCityChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
    
    setFormData(prev => ({
      ...prev,
      receiver: {
        ...prev.receiver,
        address: {
          ...prev.receiver.address,
          city: value
        }
      }
    }));
  };

  const handlePackageChange = (index, field, value) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (!newData.shipmentDetails.packageDetails[index][parent]) {
          newData.shipmentDetails.packageDetails[index][parent] = {};
        }
        newData.shipmentDetails.packageDetails[index][parent][child] = value;
      } else {
        newData.shipmentDetails.packageDetails[index][field] = value;
      }
      
      const item = newData.shipmentDetails.packageDetails[index];
      if (item.dimensions.length && item.dimensions.width && item.dimensions.height) {
        const volume = (item.dimensions.length * item.dimensions.width * item.dimensions.height) / 1000000;
        newData.shipmentDetails.packageDetails[index].volume = parseFloat(volume.toFixed(3));
      }
      
      return newData;
    });
    
    const errorKey = `package_${field}_${index}`;
    let error = '';
    if (field === 'description' && !value) error = 'Description is required';
    if (field === 'quantity' && (!value || value < 1)) error = 'Minimum 1 item required';
    if (field === 'weight' && (!value || value <= 0)) error = 'Weight is required';
    
    setErrors(prev => ({ ...prev, [errorKey]: error }));
  };

  const addPackageItem = () => {
    setFormData(prev => ({
      ...prev,
      shipmentDetails: {
        ...prev.shipmentDetails,
        packageDetails: [
          ...prev.shipmentDetails.packageDetails,
          {
            description: '',
            packagingType: 'carton',
            quantity: 1,
            weight: 0,
            volume: 0,
            dimensions: { length: 0, width: 0, height: 0, unit: 'cm' },
            productCategory: '',
            hsCode: '',
            value: { amount: 0, currency: formData.payment.currency || 'USD' },
            hazardous: false,
            temperatureControlled: { required: false, minTemp: null, maxTemp: null }
          }
        ]
      }
    }));
  };

  const removePackageItem = (index) => {
    if (formData.shipmentDetails.packageDetails.length > 1) {
      setFormData(prev => ({
        ...prev,
        shipmentDetails: {
          ...prev.shipmentDetails,
          packageDetails: prev.shipmentDetails.packageDetails.filter((_, i) => i !== index)
        }
      }));
    }
  };

  // Calculate totals from package details
  useEffect(() => {
    if (formData.shipmentDetails.packageDetails.length > 0) {
      const totals = formData.shipmentDetails.packageDetails.reduce(
        (acc, item) => ({
          totalPackages: acc.totalPackages + (Number(item.quantity) || 0),
          totalWeight: acc.totalWeight + ((Number(item.weight) || 0) * (Number(item.quantity) || 0)),
          totalVolume: acc.totalVolume + ((Number(item.volume) || 0) * (Number(item.quantity) || 0))
        }),
        { totalPackages: 0, totalWeight: 0, totalVolume: 0 }
      );

      setFormData(prev => ({
        ...prev,
        shipmentDetails: { ...prev.shipmentDetails, ...totals }
      }));
    }
  }, [formData.shipmentDetails.packageDetails]);

  // Update sub types when main type changes
  useEffect(() => {
    if (formData.shipmentClassification.mainType) {
      setAvailableSubTypes(SHIPMENT_SUB_TYPES[formData.shipmentClassification.mainType] || []);
    }
  }, [formData.shipmentClassification.mainType]);

  // ==================== STEP NAVIGATION ====================
  
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      if (currentStep + 1 === 4) {
        setIsReviewConfirmed(false);
      }
    } else {
      toast.error('Please fill all required fields correctly');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // ==================== REVIEW CONFIRMATION HANDLER ====================
  
  const handleConfirmReview = () => {
    if (validateStep(3) && validateStep(2) && validateStep(1)) {
      setIsReviewConfirmed(true);
      toast.success('Details confirmed! You can now submit the booking.');
    } else {
      toast.error('Please complete all required fields before confirming');
    }
  };

  // ==================== SUBMIT HANDLER ====================
  
const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log('🔍 ========== SUBMIT STARTED ==========');
  console.log('Current Step:', currentStep);
  console.log('Is Review Confirmed:', isReviewConfirmed);
  
  if (currentStep !== 4) {
    toast.info('📋 Please complete all steps first');
    return;
  }
  
  if (!isReviewConfirmed) {
    toast.warning('⚠️ Please review all details and click "Confirm Details" before creating booking');
    return;
  }
  
  if (!loggedInUser || !loggedInUser._id) {
    toast.error('👤 User not logged in. Please login again.');
    return;
  }

  // সব validation পাস করলে success দেখান (API call ছাড়া)
  console.log('✅ All validations passed!');
  toast.success('🎉 Validation passed! Redirecting...');
  setShowSuccess(true);
  setTimeout(() => {
    router.push('/Bookings/my_bookings');
  }, 2000);
  return;
};

  // ==================== RENDER ====================
  
  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#2563eb] mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading your information...</p>
        </div>
      </div>
    );
  }
  
  if (!loggedInUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <p className="text-sm text-gray-700 mb-2">Please login to create a booking</p>
          <Link href="/auth/login" className="text-sm text-[#2563eb] hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <Link 
                href="/bookings"
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-base font-semibold text-gray-900 flex items-center">
                  <Package className="h-4 w-4 mr-1.5 text-[#2563eb]" />
                  Create New Booking
                </h1>
                <p className="text-xs text-gray-500">Cargo Logistics Group</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3"> 
              <span className="text-xs text-gray-500">
                Step {currentStep}/4
              </span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1 w-6 rounded-full transition-colors ${
                      step <= currentStep ? 'bg-[#2563eb]' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Welcome Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <div className="flex items-start">
            <User className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="ml-2 flex-1">
              <p className="text-xs font-medium text-blue-800">Welcome, {loggedInUser.firstName || loggedInUser.name || 'User'}!</p>
              <p className="text-xs text-blue-700 mt-1">
                Your contact details have been auto-filled. You can edit them if needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {serverErrors.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="ml-2 flex-1">
                <p className="text-xs font-medium text-red-800">Error creating booking</p>
                {serverErrors.map((error, index) => (
                  <p key={index} className="text-xs text-red-600">{error.msg}</p>
                ))}
              </div>
              <button onClick={() => setServerErrors([])} className="flex-shrink-0">
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      )} 

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 animate-fadeIn">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Success!</h3>
              <p className="text-sm text-gray-500 mb-4">Booking created successfully</p>
              <p className="text-xs text-gray-400">Redirecting to bookings...</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border shadow-sm">
          {/* Step Indicators */}
          <div className="border-b px-4 py-2 bg-gray-50 rounded-t-lg">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <StepIndicator step={1} currentStep={currentStep} title="Shipment" />
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <StepIndicator step={2} currentStep={currentStep} title="Package" />
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <StepIndicator step={3} currentStep={currentStep} title="Sender/Receiver" />
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <StepIndicator step={4} currentStep={currentStep} title="Review" />
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4">
            {/* Step 1: Shipment Info */}
            {currentStep === 1 && (
              <div className="space-y-3 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    label="Shipment Type"
                    name="shipmentClassification.mainType"
                    value={formData.shipmentClassification.mainType}
                    onChange={handleInputChange}
                    options={SHIPMENT_MAIN_TYPES}
                    required
                    icon={Package}
                    error={errors['shipmentClassification.mainType']}
                  />
                  
                  <Select
                    label="Shipment Sub-Type"
                    name="shipmentClassification.subType"
                    value={formData.shipmentClassification.subType}
                    onChange={handleInputChange}
                    options={availableSubTypes}
                    required
                    icon={Tag}
                    error={errors['shipmentClassification.subType']}
                    disabled={!formData.shipmentClassification.mainType}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Select
                    label="Shipping Mode"
                    name="shipmentDetails.shippingMode"
                    value={formData.shipmentDetails.shippingMode}
                    onChange={handleInputChange}
                    options={SHIPPING_MODES}
                    icon={Briefcase}
                  />
                  
                  {/* Payment Mode & Currency Display */}
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      label="Payment Mode"
                      name="payment.mode"
                      value={formData.payment.mode}
                      onChange={handleInputChange}
                      options={PAYMENT_MODES}
                      required
                      icon={CreditCard}
                      error={errors['payment.mode']}
                    />
                    
                    {/* Currency Display */}
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Currency
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                          <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={`${formData.payment.currency} (${CURRENCY_SYMBOLS[formData.payment.currency] || '$'})`}
                          disabled
                          className="w-full px-3 py-2 pl-8 text-sm border rounded-md bg-gray-100 text-gray-700"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Based on destination: {formData.shipmentDetails.destination}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Select
                    label="Origin"
                    name="shipmentDetails.origin"
                    value={formData.shipmentDetails.origin}
                    onChange={handleInputChange}
                    options={ORIGINS}
                    required
                    icon={MapPin}
                    error={errors['shipmentDetails.origin']}
                  />
                  
                  <Select
                    label="Destination"
                    name="shipmentDetails.destination"
                    value={formData.shipmentDetails.destination}
                    onChange={handleDestinationChange}
                    options={DESTINATIONS}
                    required
                    icon={Globe}
                    error={errors['shipmentDetails.destination']}
                  />
                </div> 

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Reference No"
                    name="customerReference"
                    value={formData.customerReference}
                    onChange={handleInputChange}
                    placeholder="Optional"
                    icon={Hash}
                  />
                  
                  <Select
                    label="Service Type"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    options={SERVICE_TYPES}
                    icon={Truck}
                  />
                </div> 
              </div>
            )}

            {/* Step 2: Package Details */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-medium text-gray-700">Package Details</h3>
                  <span className="text-xs text-gray-500">
                    {formData.shipmentDetails.packageDetails.length} package(s)
                  </span>
                </div>

                {formData.shipmentDetails.packageDetails.map((item, index) => (
                  <div key={index} className="border rounded-md p-3 bg-gray-50 relative">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removePackageItem(index)}
                        className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-0.5 hover:bg-red-200 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="col-span-2">
                        <Input
                          label="Description"
                          value={item.description}
                          onChange={(e) => handlePackageChange(index, 'description', e.target.value)}
                          placeholder="Product description"
                          required
                          icon={Package}
                          error={errors[`package_desc_${index}`]}
                        />
                      </div>

                      <Select
                        label="Packaging Type"
                        value={item.packagingType}
                        onChange={(e) => handlePackageChange(index, 'packagingType', e.target.value)}
                        options={PACKAGING_TYPES}
                        icon={Box}
                      />

                      <Select
                        label="Category"
                        value={item.productCategory}
                        onChange={(e) => handlePackageChange(index, 'productCategory', e.target.value)}
                        options={PRODUCT_CATEGORIES.map(cat => ({ value: cat, label: cat }))}
                        icon={Tag}
                      /> 

                      <Input
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handlePackageChange(index, 'quantity', parseInt(e.target.value) || 0)}
                        min="1"
                        required
                        icon={Box}
                        error={errors[`package_qty_${index}`]}
                      />

                      <Input
                        label="Weight (kg)"
                        type="number"
                        value={item.weight}
                        onChange={(e) => handlePackageChange(index, 'weight', parseFloat(e.target.value) || 0)}
                        min="0.1"
                        step="0.1"
                        required
                        icon={Weight}
                        error={errors[`package_weight_${index}`]}
                      />

                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Dimensions (cm)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            placeholder="Length"
                            type="number"
                            value={item.dimensions.length}
                            onChange={(e) => handlePackageChange(index, 'dimensions.length', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.1"
                            icon={Ruler}
                          />
                          <Input
                            placeholder="Width"
                            type="number"
                            value={item.dimensions.width}
                            onChange={(e) => handlePackageChange(index, 'dimensions.width', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.1"
                            icon={Ruler}
                          />
                          <Input
                            placeholder="Height"
                            type="number"
                            value={item.dimensions.height}
                            onChange={(e) => handlePackageChange(index, 'dimensions.height', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.1"
                            icon={Ruler}
                          />
                        </div>
                      </div>

                      <Input
                        label="Volume (CBM)"
                        type="number"
                        value={item.volume}
                        onChange={(e) => handlePackageChange(index, 'volume', parseFloat(e.target.value) || 0)}
                        min="0.001"
                        step="0.001"
                        required
                        icon={Box}
                        error={errors[`package_volume_${index}`]}
                      />

                      <div className="col-span-2 grid grid-cols-2 gap-2"> 
                       

                        {/* Currency Display - Readonly */}
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Currency
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                              <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              value={`${formData.payment.currency} (${CURRENCY_SYMBOLS[formData.payment.currency] || '$'})`}
                              disabled
                              className="w-full px-3 py-2 pl-8 text-sm border rounded-md bg-gray-100 text-gray-700"
                            />
                          </div>
                        </div>
                      </div> 
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPackageItem}
                  icon={Plus}
                  className="w-full"
                >
                  Add Another Package
                </Button>

                {formData.shipmentDetails.packageDetails.length > 0 && (
                  <div className="bg-blue-50 rounded-md p-3 mt-2">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-gray-500">Total Packages</div>
                        <div className="text-sm font-semibold text-[#2563eb]">
                          {formData.shipmentDetails.totalPackages}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Total Weight</div>
                        <div className="text-sm font-semibold text-[#2563eb]">
                          {formData.shipmentDetails.totalWeight.toFixed(1)} kg
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Total Volume</div>
                        <div className="text-sm font-semibold text-[#2563eb]">
                          {formData.shipmentDetails.totalVolume.toFixed(3)} CBM
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Sender & Receiver */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                {/* Sender Information - Auto-filled from logged-in user */}
                <div className="border rounded-md p-3 bg-blue-50">
                  <h3 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <User className="h-3.5 w-3.5 mr-1 text-[#2563eb]" />
                    Sender Information (Your Details)
                    <span className="ml-2 text-xs text-green-600">✓ Auto-filled from your profile</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Full Name"
                      name="sender.name"
                      value={formData.sender.name}
                      onChange={handleInputChange}
                      required
                      icon={User}
                      error={errors['sender.name']}
                    />

                    <Input
                      label="Company Name"
                      name="sender.companyName"
                      value={formData.sender.companyName}
                      onChange={handleInputChange}
                      icon={Building}
                    />

                    <Input
                      label="Email"
                      type="email"
                      name="sender.email"
                      value={formData.sender.email}
                      onChange={handleInputChange}
                      required
                      icon={Mail}
                      error={errors['sender.email']}
                    />

                    <Input
                      label="Phone"
                      name="sender.phone"
                      value={formData.sender.phone}
                      onChange={handleInputChange}
                      required
                      icon={Phone}
                      error={errors['sender.phone']}
                    />

                    <div className="col-span-2">
                      <Input
                        label="Address Line 1"
                        name="sender.address.addressLine1"
                        value={formData.sender.address.addressLine1}
                        onChange={handleInputChange}
                        icon={MapPin}
                      />
                    </div>

                    <div className="col-span-2">
                      <Input
                        label="Address Line 2"
                        name="sender.address.addressLine2"
                        value={formData.sender.address.addressLine2}
                        onChange={handleInputChange}
                        icon={MapPin}
                      />
                    </div>

                    <Input
                      label="City"
                      name="sender.address.city"
                      value={formData.sender.address.city}
                      onChange={handleInputChange}
                    />

                    <Input
                      label="State"
                      name="sender.address.state"
                      value={formData.sender.address.state}
                      onChange={handleInputChange}
                    />

                    <Input
                      label="Country"
                      name="sender.address.country"
                      value={formData.sender.address.country}
                      onChange={handleInputChange}
                    />
                    
                    {/* Pickup Required Section */}
                    <div className="col-span-2 mt-2 pt-2 border-t">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pickupRequired}
                          onChange={(e) => setPickupRequired(e.target.checked)}
                          className="h-4 w-4 text-[#2563eb] focus:ring-[#2563eb] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          <TruckIcon className="h-4 w-4 inline mr-1 text-[#2563eb]" />
                          Pickup Required?
                        </span>
                        <span className="ml-2 text-xs text-gray-500">(We will arrange pickup from your location)</span>
                      </label>
                    </div>

                    {pickupRequired && (
                      <>
                        <Input
                          label="Pickup Date"
                          type="date"
                          name="sender.pickupDate"
                          value={formData.sender.pickupDate}
                          onChange={handleInputChange}
                          required
                          icon={Calendar}
                          min={new Date().toISOString().split('T')[0]}
                          error={errors['sender.pickupDate']}
                        />

                        <TextArea
                          label="Pickup Instructions"
                          name="sender.pickupInstructions"
                          value={formData.sender.pickupInstructions}
                          onChange={handleInputChange}
                          placeholder="Special instructions for pickup (e.g., gate code, floor, etc.)"
                          rows={2}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Receiver Information */}
                <div className="border rounded-md p-3">
                  <h3 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <UserPlus className="h-3.5 w-3.5 mr-1 text-[#2563eb]" />
                    Receiver Information
                    <span className="ml-2 text-xs text-blue-600">(Will receive email notification)</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Full Name"
                      name="receiver.name"
                      value={formData.receiver.name}
                      onChange={handleInputChange}
                      required
                      icon={User}
                      error={errors['receiver.name']}
                    />

                    <Input
                      label="Company Name"
                      name="receiver.companyName"
                      value={formData.receiver.companyName}
                      onChange={handleInputChange}
                      icon={Building}
                    />

                    <Input
                      label="Email"
                      type="email"
                      name="receiver.email"
                      value={formData.receiver.email}
                      onChange={handleInputChange}
                      required
                      icon={Mail}
                      error={errors['receiver.email']}
                    />

                    <Input
                      label="Phone"
                      name="receiver.phone"
                      value={formData.receiver.phone}
                      onChange={handleInputChange}
                      required
                      icon={Phone}
                      error={errors['receiver.phone']}
                    />

                    <div className="col-span-2">
                      <Input
                        label="Address Line 1"
                        name="receiver.address.addressLine1"
                        value={formData.receiver.address.addressLine1}
                        onChange={handleInputChange}
                        required
                        icon={MapPin}
                        error={errors['receiver.address.addressLine1']}
                      />
                    </div>

                    <div className="col-span-2">
                      <Input
                        label="Address Line 2"
                        name="receiver.address.addressLine2"
                        value={formData.receiver.address.addressLine2}
                        onChange={handleInputChange}
                        icon={MapPin}
                      />
                    </div>

                    {/* Country Dropdown */}
                    <Select
                      label="Country"
                      name="receiver.address.country"
                      value={formData.receiver.address.country}
                      onChange={handleDestinationChange}
                      options={DESTINATIONS}
                      required
                      icon={Globe}
                      error={errors['receiver.address.country']}
                    />

                    {/* State Dropdown */}
                    <Select
                      label="State"
                      name="receiver.address.state"
                      value={formData.receiver.address.state}
                      onChange={handleStateChange}
                      options={states.map(state => ({ value: state, label: state }))}
                      required
                      icon={MapPin}
                      error={errors['receiver.address.state']}
                      disabled={!formData.receiver.address.country || loadingLocation}
                      loading={loadingLocation}
                      placeholder={loadingLocation ? 'Loading states...' : 'Select state'}
                    />

                    {/* City Dropdown */}
                    <Select
                      label="City"
                      name="receiver.address.city"
                      value={formData.receiver.address.city}
                      onChange={handleCityChange}
                      options={cities.map(city => ({ value: city, label: city }))}
                      required
                      icon={MapPin}
                      error={errors['receiver.address.city']}
                      disabled={!formData.receiver.address.state || loadingLocation}
                      loading={loadingLocation}
                      placeholder={loadingLocation ? 'Loading cities...' : 'Select city'}
                    />

                    <div className="col-span-2">
                      <TextArea
                        label="Delivery Instructions"
                        name="receiver.deliveryInstructions"
                        value={formData.receiver.deliveryInstructions}
                        onChange={handleInputChange}
                        placeholder="Special instructions for delivery"
                        rows={2}
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="receiver.isResidential"
                          checked={formData.receiver.isResidential}
                          onChange={handleInputChange}
                          className="h-3.5 w-3.5 text-[#2563eb] focus:ring-[#2563eb] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-xs text-gray-600">This is a residential address</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <div className="space-y-3 animate-fadeIn">
                {!isReviewConfirmed && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-3">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="ml-2 flex-1">
                        <p className="text-xs font-medium text-yellow-800">Review Required</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Please review all details below. Once confirmed, click "Confirm Details" before submitting.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {isReviewConfirmed && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="ml-2 flex-1">
                        <p className="text-xs font-medium text-green-800">Details Confirmed</p>
                        <p className="text-xs text-green-700 mt-1">
                          You can now submit the booking.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-md p-3">
                  <h3 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <Package className="h-3.5 w-3.5 mr-1 text-[#2563eb]" />
                    Shipment Overview
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-gray-500">Type:</span> <span className="font-medium">{formData.shipmentClassification.mainType} - {formData.shipmentClassification.subType}</span></div>
                    <div><span className="text-gray-500">Mode:</span> <span className="font-medium">{formData.shipmentDetails.shippingMode}</span></div>
                    <div><span className="text-gray-500">Payment:</span> <span className="font-medium">{formData.payment.mode}</span></div>
                    <div><span className="text-gray-500">Origin:</span> <span className="font-medium">{formData.shipmentDetails.origin}</span></div>
                    <div><span className="text-gray-500">Destination:</span> <span className="font-medium">{formData.shipmentDetails.destination}</span></div>
                    <div><span className="text-gray-500">Currency:</span> <span className="font-medium">{formData.payment.currency} ({CURRENCY_SYMBOLS[formData.payment.currency]})</span></div>
                    <div><span className="text-gray-500">Service:</span> <span className="font-medium">{formData.serviceType}</span></div> 
                    <div><span className="text-gray-500">Pickup Required:</span> <span className="font-medium">{pickupRequired ? 'Yes' : 'No'}</span></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-md p-3">
                  <h3 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <Box className="h-3.5 w-3.5 mr-1 text-[#2563eb]" />
                    Package Summary
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {formData.shipmentDetails.packageDetails.map((item, index) => (
                      <div key={index} className="text-xs border-b last:border-0 pb-1 last:pb-0">
                        <div className="font-medium">{item.description}</div>
                        <div className="text-gray-500 flex justify-between">
                          <span>{item.quantity} pcs | {item.weight} kg | {item.volume} CBM</span>
                          {item.value.amount > 0 && <span className="font-medium">{formData.payment.currency} {item.value.amount.toLocaleString()}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t grid grid-cols-3 gap-2 text-xs">
                    <div><span className="text-gray-500">Total Packages:</span> <span className="font-medium">{formData.shipmentDetails.totalPackages}</span></div>
                    <div><span className="text-gray-500">Total Weight:</span> <span className="font-medium">{formData.shipmentDetails.totalWeight.toFixed(1)} kg</span></div>
                    <div><span className="text-gray-500">Total Volume:</span> <span className="font-medium">{formData.shipmentDetails.totalVolume.toFixed(3)} CBM</span></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-md p-3">
                    <h3 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                      <User className="h-3.5 w-3.5 mr-1 text-[#2563eb]" />
                      Sender (You)
                    </h3>
                    <div className="text-xs">
                      <p className="font-medium">{formData.sender.name}</p>
                      {formData.sender.companyName && <p>{formData.sender.companyName}</p>}
                      <p className="text-gray-600 mt-1">📞 {formData.sender.phone}</p>
                      <p className="text-gray-600">✉️ {formData.sender.email}</p>
                      <p className="text-gray-600 mt-1">{formData.sender.address.city}, {formData.sender.address.state}, {formData.sender.address.country}</p>
                      {pickupRequired && formData.sender.pickupDate && (
                        <p className="text-blue-600 mt-1">📅 Pickup: {new Date(formData.sender.pickupDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md p-3">
                    <h3 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                      <UserPlus className="h-3.5 w-3.5 mr-1 text-[#2563eb]" />
                      Receiver
                    </h3>
                    <div className="text-xs">
                      <p className="font-medium">{formData.receiver.name}</p>
                      {formData.receiver.companyName && <p>{formData.receiver.companyName}</p>}
                      <p className="text-gray-600">{formData.receiver.address.addressLine1}</p>
                      <p className="text-gray-600">{formData.receiver.address.city}, {formData.receiver.address.state}</p>
                      <p className="text-gray-600">{formData.receiver.address.country}</p>
                      <p className="text-gray-600 mt-1">📞 {formData.receiver.phone}</p>
                      <p className="text-gray-600">✉️ {formData.receiver.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-md p-2">
                  <div className="flex items-center">
                    <Info className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                    <p className="text-xs text-green-700">
                      Confirmation email will be sent to receiver.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4 pt-3 border-t">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={prevStep}
                  icon={ChevronLeft}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < 4 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={nextStep}
                  icon={ChevronRight}
                  iconPosition="right"
                >
                  Next Step
                </Button>
              ) : (
                <div className="flex space-x-3">
                  {!isReviewConfirmed ? (
                    <Button
                      type="button"
                      variant="success"
                      size="sm"
                      onClick={handleConfirmReview}
                      icon={CheckCircle}
                    >
                      Confirm Details
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="success"
                      size="sm"
                      isLoading={isSubmitting}
                      icon={Save}
                    >
                      Create Booking
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Progress Summary */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            {currentStep === 1 && "📦 Select shipment type and destination country"}
            {currentStep === 2 && "📦 Add package details with packaging type"}
            {currentStep === 3 && "📦 Enter receiver information (your details are auto-filled). You can also request pickup."}
            {currentStep === 4 && "📦 Review and confirm booking - Click 'Confirm Details' then 'Create Booking'"}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}