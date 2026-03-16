'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '@/Api/Authentication'; 
import { setAuthToken, setUserDetails, getAuthToken } from '@/helper/SessionHelper';  

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const baseClasses = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#E67E22] text-white hover:bg-[#d35400] focus:ring-[#E67E22]',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border-2 border-[#E67E22] text-[#E67E22] hover:bg-[#fffaf6] focus:ring-[#E67E22]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className} ${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Logging in...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-secondary mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={
            'w-full px-3 py-2 border rounded-lg shadow-sm ' +
            'focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] ' +
            (error ? 'border-red-500 ' : 'border-gray-300 ') +
            (disabled ? 'bg-gray-100 cursor-not-allowed ' : '') +
            (icon ? 'pl-10 ' : '') +
            className
          }
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600 font-bold">{error}</p>}
    </div>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); 

  useEffect(() => { 
    const checkAuth = async () => {
      try {
        const token = getAuthToken(); 
        if (token) { 
          // Get user details from localStorage
          const userStr = localStorage.getItem('user_details');
          if (userStr) {
            const user = JSON.parse(userStr);
            // Check if user has customer role
            if (user.role === 'customer') {
              router.push('/profile');
            } else {
              // If not customer, clear token and stay on login page
              localStorage.removeItem('auth_token');
              localStorage.removeItem('user_details');
              setIsCheckingAuth(false);
            }
          } else {
            router.push('/profile');
          }
        } else {
          setIsCheckingAuth(false);  
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsCheckingAuth(false); 
      }
    };

    checkAuth();
  }, [router]); 

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#fffaf6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E67E22] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const validationErrors = validateForm();
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Touch all fields to show errors
    setTouched({
      email: true,
      password: true
    });

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        console.log('Attempting login with:', formData.email);
        
        const response = await login(formData.email, formData.password);
        console.log('Login response:', response);
        
        if (response.success && response.token) {
          const userData = response.data || response.user;
          
          // Check if user has customer role
          if (userData.role !== 'customer') {
            toast.error('Access denied. Only customers can log in to this portal.', {
              position: 'top-right',
              autoClose: 5000,
            });
            setLoading(false);
            return;
          }

          // Save to localStorage
          console.log('Saving token to localStorage:', response.token);
          setAuthToken(response.token);
          
          console.log('Saving user to localStorage:', userData);
          setUserDetails(userData);
          
          // Dispatch event for navbar to update
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('authChange'));
          }
          
          // Show success message
          toast.success('Login successful! Redirecting...', {
            position: 'top-right',
            autoClose: 2000,
          });
          
          // Small delay to ensure localStorage is set
          setTimeout(() => {
            router.push('/profile');
          }, 2000);
        } else {
          toast.error(response.message || 'Invalid email or password', {
            position: 'top-right',
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error(error.message || 'Invalid email or password', {
          position: 'top-right',
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const renderIcon = (type) => {
    switch(type) {
      case 'email':
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'password':
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
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
        theme="colored"
      />
      
      <div className="h-[540px] bg-[#fffaf6] flex flex-col lg:flex-row">
        {/* Left Side - Branding/Info */}
        <div className="lg:w-1/2 bg-gradient-to-br from-[#0a1a3a] to-[#1a2f5a] p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            {/* Floating Orbs */}
            <div className="absolute top-0 -left-4 w-96 h-96 bg-[#E67E22] rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow"></div>
            <div className="absolute bottom-0 -right-4 w-96 h-96 bg-[#3C719D] rounded-full mix-blend-soft-light filter blur-3xl animate-float"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative"> 
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E67E22] to-[#3C719D] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              </div>
              <div className="relative">
                <img 
                  src="/images/logo.png" 
                  alt="LogiSwift Logo" 
                  className="h-12 w-auto brightness-0 invert filter"
                />
                <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-[#E67E22] to-transparent"></div>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="py-2 relative">
              <div className="absolute -left-8 top-0 w-1 h-16 bg-gradient-to-b from-[#E67E22] to-transparent"></div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Welcome Back
                <span className="block mt-2">
                  to{' '}
                  <span className="bg-gradient-to-r from-[#E67E22] to-[#f39c12] bg-clip-text text-transparent">
                    Your Logistics Hub
                  </span>
                </span>
              </h1>
              <p className="mt-6 text-gray-300 text-lg max-w-md leading-relaxed">
                Access your dashboard, track shipments in real-time, and manage your global logistics operations with ease.
              </p> 
            </div>

            {/* Features Grid */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🚚', title: 'Real-time tracking', desc: 'Live shipment updates' },
                { icon: '📄', title: 'Digital docs', desc: 'Paperless operations' },
                { icon: '🌍', title: 'Global network', desc: '100+ countries' },
                { icon: '💰', title: 'Competitive rates', desc: 'Best prices guaranteed' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-[#E67E22]/30"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E67E22]/0 to-[#3C719D]/0 group-hover:from-[#E67E22]/10 group-hover:to-[#3C719D]/10 rounded-xl transition-all duration-300"></div>
                  
                  <div className="relative z-10 flex items-start space-x-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-12 text-[#0a1a3a] opacity-20" fill="currentColor" viewBox="0 0 1440 320">
              <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div> 

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("/images/project (1).jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark Overlay for better readability */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
          
          {/* Optional: Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#E67E22] rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#3C719D] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#E67E22] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="w-full max-w-md relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Customer Login</h2>
              <p className="text-gray-200 mt-2">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-[#E67E22] font-semibold hover:underline">
                  Create account
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-500 bg-opacity-30 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
              {/* Email Field */}
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="john.doe@company.com"
                error={touched.email && errors.email}
                required
                icon={renderIcon('email')}
              />

              {/* Password Field */}
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="********"
                  error={touched.password && errors.password}
                  required
                  icon={renderIcon('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-[#E67E22]"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#E67E22] border-gray-300 rounded focus:ring-[#E67E22]"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-secondary">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-[#E67E22] hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="w-full"
              >
                Sign In
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}