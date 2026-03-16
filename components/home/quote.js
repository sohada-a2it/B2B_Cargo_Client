"use client";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RequestQuote() {
  // Form state
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    freightType: '',
    weight: '',
    dimensions: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    instructions: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dropdown options
  const originOptions = ['China', 'Thailand'];
  const destinationOptions = ['USA', 'Canada', 'UK'];
  const freightTypeOptions = [
    'Sea Freight (FCL)',
    'Sea Freight (LCL)',
    'Air Freight',
    'Rail Freight',
    'Express Delivery',
    'Inland Transport',
    'Door to Door'
  ];

  // Simple validation function
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.origin) newErrors.origin = 'Please select origin';
    if (!formData.destination) newErrors.destination = 'Please select destination';
    if (!formData.freightType) newErrors.freightType = 'Please select freight type';
    if (!formData.weight.trim()) newErrors.weight = 'Weight is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    // Weight validation
    if (formData.weight && !/^\d*\.?\d+\s*(kg|g|lb|lbs)?$/.test(formData.weight)) {
      newErrors.weight = 'Use format: 10kg, 5.5lbs';
    }

    // Dimensions validation (optional)
    if (formData.dimensions && !/^\d+\s*cm\s*x\s*\d+\s*cm\s*x\s*\d+\s*cm$/.test(formData.dimensions)) {
      newErrors.dimensions = 'Use: 120cm x 80cm x 60cm';
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user selects/types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Show loading toast
      const loadingToast = toast.loading('Sending quote request...');
      
      try {
        const response = await fetch('http://localhost:8000/api/v1/request-quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        // রেসপন্স চেক করুন
        let result;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          const text = await response.text();
          throw new Error(`Server returned ${response.status}: ${text}`);
        }

        // Dismiss loading toast
        toast.dismiss(loadingToast);

        if (response.ok && result.success) {
          // Success toast
          toast.success(
            <div>
              <strong>✓ Quote sent successfully!</strong>
              <p style={{ fontSize: '14px', marginTop: '5px' }}>
                Quote ID: {result.quoteId}
              </p>
            </div>,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
          
          // ফর্ম রিসেট করুন
          setFormData({
            origin: '', destination: '', freightType: '', weight: '', dimensions: '',
            name: '', email: '', phone: '', company: '', address: '',
            instructions: '', agreeToTerms: false
          });
          setErrors({});
          
        } else {
          // Error toast
          toast.error(result?.message || 'Something went wrong', {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error('Submission error:', error);
        
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        
        // নেটওয়ার্ক বা অন্যান্য এরর
        if (error.message.includes('Failed to fetch')) {
          toast.error('⚠️ Cannot connect to server. Please make sure the backend is running on port 8000.', {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast.error('Error: ' + error.message, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Form validation errors
      const errorMessages = Object.values(errors).join('\n');
      toast.error('Please fix the following errors:\n' + errorMessages, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      {/* Toast Container - এটা যোগ করুন */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <section className="bg-gradient-to-br from-slate-50 to-orange-50 py-6 px-4 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">

          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-orange-600 uppercase tracking-wider text-sm font-semibold">
                Get Your Quote
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-800 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                Request Your Estimate
              </span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Get a personalized shipping quote within 24 hours. Fill out the form below with your cargo details.
            </p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">

              {/* Shipment Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📦</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Shipment & Cargo Details</h3>
                </div>

                <Select
                  label="Origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  options={originOptions}
                  error={errors.origin}
                  icon="🌍"
                  placeholder="Select origin country"
                />
                
                <Select
                  label="Destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  options={destinationOptions}
                  error={errors.destination}
                  icon="📍"
                  placeholder="Select destination country"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Freight Type"
                    name="freightType"
                    value={formData.freightType}
                    onChange={handleChange}
                    options={freightTypeOptions}
                    error={errors.freightType}
                    icon="🚚"
                    placeholder="Select type"
                  />
                  <Input
                    label="Weight"
                    name="weight"
                    placeholder="e.g., 100kg"
                    value={formData.weight}
                    onChange={handleChange}
                    error={errors.weight}
                    icon="⚖️"
                  />
                </div>
                
                <Input
                  label="Dimensions"
                  name="dimensions"
                  placeholder="120cm x 80cm x 60cm"
                  value={formData.dimensions}
                  onChange={handleChange}
                  error={errors.dimensions}
                  icon="📏"
                  hint="Optional - Format: L x W x H in cm"
                />
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Contact Information</h3>
                </div>

                <Input
                  label="Full Name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  icon="👤"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    icon="📧"
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    icon="📞"
                  />
                </div>
                
                <Input
                  label="Company"
                  name="company"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={handleChange}
                  icon="🏢"
                />
                
                <Input
                  label="Address"
                  name="address"
                  placeholder="Street, City, Zip Code"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  icon="🏠"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="mt-10 relative z-10">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <span className="text-lg">📝</span> Special Instructions (Optional)
              </label>
              <textarea
                name="instructions"
                rows={4}
                placeholder="Any special requirements or additional information..."
                value={formData.instructions}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 rounded-xl px-5 py-4 outline-none transition-all duration-300 hover:border-orange-300 text-slate-700 placeholder-slate-400 resize-none"
              />
            </div>

            {/* Terms */}
            <div className="mt-6 relative z-10">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 accent-orange-500 rounded border-slate-300 text-orange-500 focus:ring-orange-200 focus:ring-offset-0"
                />
                <span className="text-slate-600 text-sm">
                  I agree to the <span className="text-orange-600 font-medium hover:text-orange-700 hover:underline cursor-pointer transition-colors">Terms & Conditions</span> and <span className="text-orange-600 font-medium hover:text-orange-700 hover:underline cursor-pointer transition-colors">Privacy Policy</span>.
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
                  <span>⚠️</span> {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Button */}
            <div className="mt-10 text-center relative z-10">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative group bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-12 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg min-w-[240px]"
              >
                <span className="flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Get Your Quote
                      <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>

          </form>
        </div>

        <style jsx>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }
        `}</style>
      </section>
    </>
  );
}

// Input Component
function Input({ label, name, type = 'text', placeholder, value, onChange, error, icon, hint }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
        <span className="text-lg">{icon}</span> {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full bg-white border rounded-xl px-4 py-3 outline-none transition-all duration-300 text-slate-700 placeholder-slate-400
          ${error 
            ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100' 
            : 'border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100'
          }
          hover:border-orange-300
        `}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
          <span>⚠️</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-2 text-xs text-slate-500 italic">{hint}</p>
      )}
    </div>
  );
}

// Select Component
function Select({ label, name, value, onChange, options, error, icon, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
        <span className="text-lg">{icon}</span> {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full bg-white border rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer transition-all duration-300 text-slate-700
            ${error 
              ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100' 
              : 'border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100'
            }
            hover:border-orange-300
            ${!value && 'text-slate-400'}
          `}
        >
          <option value="" disabled className="text-slate-400">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-slate-700">
              {option}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}