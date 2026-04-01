"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Home, FileText, User, Settings, Mail, LogOut, UserCircle, ClipboardList, Truck, FileSpreadsheet } from 'lucide-react';
import { getAuthToken, getUserDetails, logout } from '@/helper/SessionHelper';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isTopbarVisible, setIsTopbarVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs for dropdown timing
  const hoverTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  // Check authentication status
  const checkAuth = () => {
    let token = null;
    let userData = null;
    
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('auth_token');
      const userStr = localStorage.getItem('user_details') || localStorage.getItem('user');
      if (userStr) {
        try {
          userData = JSON.parse(userStr);
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    }
    
    if (!token) {
      token = getAuthToken();
      userData = getUserDetails();
    }
    
    const loggedIn = !!token;
    
    setIsLoggedIn(loggedIn);
    if (loggedIn && userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = () => checkAuth();
    const handleAuthChange = () => checkAuth();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);
    
    const interval = setInterval(checkAuth, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
      clearInterval(interval);
    };
  }, []);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsTopbarVisible(true);
      } else {
        setIsTopbarVisible(false);
      }
      
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dropdown with delay
  const handleMouseEnter = (dropdownName) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLogout = () => {
    logout();
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_details');
      localStorage.removeItem('user');
    }
    
    setIsLoggedIn(false);
    setUser(null);
    setIsMenuOpen(false);
    window.dispatchEvent(new Event('authChange'));
    router.push('/');
  };

  const navbarTopPosition = isTopbarVisible ? 'top-9' : 'top-0';

  const navItems = [
    { label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    {
      label: 'About',
      href: '#',
      icon: <User className="w-4 h-4" />,
      dropdown: [
        { label: 'Our Company', href: '/about/company' },
        { label: 'History', href: '/about/history' },
        { label: 'Teams', href: '/about/teams' }, 
        { label: 'Projects', href: '/about/project' }, 
        { label: 'Pricing Table', href: '/about/price' }, 
      ]
    },
    {
      label: 'Industries',
      href: '#',
      icon: <FileText className="w-4 h-4" />,
      dropdown: [
        { label: 'Industries', href: '/industries' },
        { label: 'Industries Details', href: '/industries_deatils' }, 
      ]
    },
    { label: 'Services', href: '/service', icon: <Settings className="w-4 h-4" /> },
    { label: 'Contact', href: '/contact', icon: <Mail className="w-4 h-4" /> }
  ];

  const profileDropdownItems = [
    { label: 'My Profile', href: '/profile', icon: <UserCircle className="w-4 h-4" /> },
    { label: 'Create Bookings', href: '/Bookings/create_bookings', icon: <ClipboardList className="w-4 h-4" /> },
    { label: 'My Bookings', href: '/Bookings/my_bookings', icon: <ClipboardList className="w-4 h-4" /> },
    { label: 'My Shipments', href: '/my-shipping', icon: <Truck className="w-4 h-4" /> },
    { label: 'My Invoices', href: '/invoice', icon: <FileSpreadsheet className="w-4 h-4" /> }
  ];

  if (user?.role === 'admin') {
    profileDropdownItems.push({ label: 'Admin Panel', href: '/admin', icon: <Settings className="w-4 h-4" /> });
  }

  if (isLoading) {
    return (
      <div className={`fixed ${navbarTopPosition} left-0 right-0 z-[20] bg-white py-4 shadow-sm w-full`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex items-center justify-between">
            <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="hidden lg:flex space-x-1">
              <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`.trim().split(' ')[0];
    }
    if (user?.name) {
      return user.name.split(' ')[0];
    }
    return 'Profile';
  };

  return (
    <>
      <nav
        className={`fixed ${navbarTopPosition} left-0 right-0 z-[20] transition-all duration-300 w-full ${
          scrolled ? 'bg-white py-2 shadow-lg' : 'bg-secondary py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <a href="/">
                <img src="/images/logo.png" alt="Cargo Logistics Company" className="h-12 w-auto" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown ? (
                    <button
                      className={`flex items-center space-x-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        scrolled ? 'text-gray-700 hover:text-[#E67E22]' : 'text-gray-700 hover:text-[#246092]'
                      }`}
                    >
                      <span className="opacity-70">{item.icon}</span>
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link href={item.href}>
                      <div className={`flex items-center space-x-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        scrolled ? 'text-gray-700 hover:text-[#E67E22]' : 'text-gray-700 hover:text-[#246092]'
                      }`}>
                        <span className="opacity-70">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div 
                      className="absolute left-0 top-full pt-2 z-50"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-white rounded-lg shadow-lg border border-gray-100 min-w-[200px] overflow-hidden">
                        <div className="py-1">
                          {item.dropdown.map((subItem) => (
                            <Link 
                              key={subItem.label} 
                              href={subItem.href} 
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 transition-colors duration-150 cursor-pointer">
                                <div className="w-5 h-5 rounded-md bg-orange-50 flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                </div>
                                <span className="text-sm text-gray-700 hover:text-[#E67E22]">
                                  {subItem.label}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Right Side Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => router.push('/tracking-number')}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 ${
                      scrolled ? 'bg-[#E67E22] text-white hover:bg-[#d35400]' : 'bg-fourth text-white hover:bg-primary'
                    }`}
                  >
                    Track Order
                  </button>

                  <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter('profile')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 ${
                        scrolled ? 'bg-[#E67E22] text-white' : 'bg-fourth text-white hover:bg-primary'
                      }`}
                    >
                      <UserCircle className="w-4 h-4" />
                      <span className="max-w-[100px] truncate">{getDisplayName()}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'profile' ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {activeDropdown === 'profile' && (
                      <div 
                        className="absolute right-0 top-full pt-2 z-50"
                        onMouseEnter={() => handleMouseEnter('profile')}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="bg-white rounded-lg shadow-lg border border-gray-100 min-w-[240px] overflow-hidden">
                          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                <UserCircle className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Welcome,</p>
                                <p className="text-sm font-semibold text-gray-800">{getDisplayName()}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="py-1">
                            {profileDropdownItems.map((item) => (
                              <Link 
                                key={item.label} 
                                href={item.href} 
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <div className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 transition-colors duration-150 cursor-pointer">
                                  <div className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center">
                                    {item.icon}
                                  </div>
                                  <span className="text-sm text-gray-700 hover:text-[#E67E22]">
                                    {item.label}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                          
                          <div className="border-t border-gray-100"></div>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 transition-colors duration-150"
                          >
                            <div className="w-5 h-5 rounded-md bg-red-50 flex items-center justify-center">
                              <LogOut className="w-3 h-3 text-red-500" />
                            </div>
                            <span className="text-sm text-red-600">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push('/auth/login')}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 ${
                      scrolled ? 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50' : 'bg-fourth text-white hover:bg-primary'
                    }`}
                  >
                    Login
                  </button>
                  
                  <button
                    onClick={() => router.push('/tracking-number')}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 ${
                      scrolled ? 'bg-[#E67E22] text-white hover:bg-[#d35400]' : 'bg-fourth text-white hover:bg-primary'
                    }`}
                  >
                    Track Order
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 text-gray-700"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden mt-4"
              >
                <div className="bg-white rounded-xl shadow-xl border py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="space-y-1 px-3">
                    {isLoggedIn && user && (
                      <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg mb-2">
                        <p className="text-xs text-gray-500">Logged in as</p>
                        <p className="font-semibold text-gray-800">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 truncate">{user.email}</p>
                      </div>
                    )}

                    {navItems.map((item) => (
                      <div key={item.label}>
                        {item.dropdown ? (
                          <>
                            <button
                              onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                              className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-gray-600">{item.icon}</span>
                                <span className="font-medium text-gray-800">{item.label}</span>
                              </div>
                              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {activeDropdown === item.label && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="ml-8 mt-1 mb-2"
                                >
                                  <div className="bg-gray-50 rounded-lg border border-gray-100">
                                    {item.dropdown.map((subItem) => (
                                      <Link key={subItem.label} href={subItem.href} onClick={() => setIsMenuOpen(false)}>
                                        <div className="px-4 py-2 text-sm text-gray-600 hover:text-[#E67E22] hover:bg-white rounded-lg transition-colors">
                                          {subItem.label}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors">
                              <span className="text-gray-600">{item.icon}</span>
                              <span className="font-medium text-gray-800">{item.label}</span>
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}

                    {isLoggedIn && (
                      <div className="border-t border-gray-100 my-2 pt-2">
                        <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
                        {profileDropdownItems.map((item) => (
                          <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors">
                              <span className="text-gray-600 w-4 h-4">{item.icon}</span>
                              <span className="font-medium text-gray-800">{item.label}</span>
                            </div>
                          </Link>
                        ))}
                        <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                          <LogOut className="w-4 h-4" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 px-4">
                    <button onClick={() => router.push('/tracking-number')} className="w-full bg-[#122652] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all mb-2">
                      Track Your Order
                    </button>
                    {!isLoggedIn && (
                      <button onClick={() => { router.push('/auth/login'); setIsMenuOpen(false); }} className="w-full bg-[#246092] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                        Login
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className={isTopbarVisible ? 'h-28' : 'h-20'} />
    </>
  );
};

export default Navbar;