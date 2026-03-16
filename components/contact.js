"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  HiChevronRight,
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiClock,
} from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: '',
    message: '',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.inquiryType) newErrors.inquiryType = 'Please select inquiry type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Sending message...');

    try {
      const response = await fetch('http://localhost:8000/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      toast.dismiss(loadingToast);

      if (response.ok && result.success) {
        toast.success(
          <div>
            <strong>✓ Message sent successfully!</strong>
            <p style={{ fontSize: '14px', marginTop: '5px' }}>
              Reference: {result.contactId}
            </p>
          </div>,
          { autoClose: 5000 }
        );

        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          inquiryType: '',
          message: '',
          agreeToTerms: false
        });
        setErrors({});
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Submission error:', error);
      
      if (error.message.includes('Failed to fetch')) {
        toast.error('Cannot connect to server. Please try again.');
      } else {
        toast.error('Network error: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50">
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

      {/* Banner Section */}
      <div
        className="min-h-[300px] bg-cover bg-center bg-no-repeat relative mx-6 rounded-xl overflow-hidden"
        style={{
          backgroundImage: "url('/images/aboutBanner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 p-10 flex flex-col justify-center h-full">
          <nav
            className="flex items-center text-sm font-medium text-white"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-2">
              <li>
                <a
                  href="/"
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <HiChevronRight className="h-4 w-4 text-gray-300" />
              </li>
              <li className="text-orange-400 font-semibold">Contact</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
  <p className="text-primary text-center font-bold text-sm sm:text-base">Get in touch</p>
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-fourth mb-4 sm:mb-6 text-center">
    Start Your Journey With Us
  </h1>

  {/* Contact Cards - Mobile: 1 column, Tablet: 2 columns */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
    {/* Phone & Email */}
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="flex items-start gap-3 sm:gap-4 lg:gap-5">
        <div className="bg-orange-100 p-2.5 sm:p-3 lg:p-4 rounded-lg text-orange-500 text-lg sm:text-xl lg:text-2xl">
          <HiPhone />
        </div>
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">Reach Us</h3>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-0.5 sm:mb-1">
            Phone: <span className="font-medium">+1-647-362-7735</span>
          </p>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
            Email:{" "}
            <span className="font-medium break-all">
              support@cargologisticscompany.com
            </span>
          </p>
        </div>
      </div>
    </div>

    {/* Working Hours */}
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="flex items-start gap-3 sm:gap-4 lg:gap-5">
        <div className="bg-orange-100 p-2.5 sm:p-3 lg:p-4 rounded-lg text-orange-500 text-lg sm:text-xl lg:text-2xl">
          <HiClock />
        </div>
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">Office Hours</h3>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
            Mon - Sat: 07:00 AM - 10:00 PM
          </p>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Sunday: Closed</p>
        </div>
      </div>
    </div>

    {/* Location */}
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="flex items-start gap-3 sm:gap-4 lg:gap-5">
        <div className="bg-orange-100 p-2.5 sm:p-3 lg:p-4 rounded-lg text-orange-500 text-lg sm:text-xl lg:text-2xl">
          <HiLocationMarker />
        </div>
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">Location</h3>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
            8825 Stanford Blvd Suite 306 <br />
            Columbia MD 21045 USA
          </p>
        </div>
      </div>
    </div>

    {/* Support */}
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="flex items-start gap-3 sm:gap-4 lg:gap-5">
        <div className="bg-orange-100 p-2.5 sm:p-3 lg:p-4 rounded-lg text-orange-500 text-lg sm:text-xl lg:text-2xl">
          <HiMail />
        </div>
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">Customer Support</h3>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
            Find quick answers in our FAQ section or contact our support team anytime.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Contact Form Section */}
  <div className="mt-8 sm:mt-12 lg:mt-20 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-14 border border-gray-100">
    <div className="text-center mb-6 sm:mb-8 lg:mb-12">
      <p className="text-orange-500 font-semibold tracking-wider uppercase text-xs sm:text-sm">
        Send Message
      </p>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mt-2 sm:mt-3">
        Message Us for Assistance
      </h2>
    </div>

    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      
      {/* Left Side */}
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.name && <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 Number"
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition ${
              errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.phone && <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition ${
              errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.email && <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
            Reason for Contact <span className="text-red-500">*</span>
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition bg-white ${
              errors.inquiryType ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
          >
            <option value="">Select Inquiry Type</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Shipping Information">Shipping Information</option>
            <option value="Pricing">Pricing</option>
            <option value="Support">Support</option>
          </select>
          {errors.inquiryType && <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-red-500">{errors.inquiryType}</p>}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col">
        <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          rows={window.innerWidth < 640 ? 6 : 8}
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className={`w-full h-full min-h-[120px] sm:min-h-[200px] lg:min-h-[250px] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition resize-none ${
            errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200'
          }`}
        ></textarea>
        {errors.message && <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-red-500">{errors.message}</p>}
      </div>

      {/* Terms + Button */}
      <div className="md:col-span-2 mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <input 
            type="checkbox" 
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="accent-orange-500 w-3.5 h-3.5 sm:w-4 sm:h-4" 
          />
          <span>
            I agree to the{" "}
            <a href="#" className="text-orange-500 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-500 hover:underline">
              Privacy
            </a>
          </span>
        </div>
        {errors.agreeToTerms && (
          <p className="text-xs sm:text-sm text-red-500">{errors.agreeToTerms}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Request'}
        </button>
      </div>
    </form>
  </div>
</div>
    </div>
  );
}

export default Contact;