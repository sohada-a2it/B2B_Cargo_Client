"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ChevronDown, Home, FileText, User, Settings, File, Mail, Sparkles, LogOut, UserCircle, ClipboardList, Truck, FileSpreadsheet } from 'lucide-react';
import { getAuthToken, getUserDetails, logout } from '@/helper/SessionHelper';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isTopbarVisible, setIsTopbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication status on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken();
      const userDetails = getUserDetails();
      
      setIsLoggedIn(!!token);
      if (token && userDetails) {
        setUser(userDetails);
      } else {
        setUser(null);
      }
    };

    checkAuth();

    // Listen for storage events (in case user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for login/logout within the same tab
    window.addEventListener('authChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Topbar visibility check
      if (currentScrollY < 10) {
        setIsTopbarVisible(true);
      } else {
        setIsTopbarVisible(false);
      }
      
      // Navbar background change on scroll
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
    setIsMenuOpen(false);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new Event('authChange'));
  };

  // Topbar visible থাকলে Navbar top-9, না থাকলে top-0
  const navbarTopPosition = isTopbarVisible ? 'top-9' : 'top-0';

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: <Home className="w-4 h-4" />
    },
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
    // {
    //   label: 'Blog',
    //   href: '#',
    //   icon: <File className="w-4 h-4" />
    // },
    {
      label: 'Services',
      href: '/service',
      icon: <Settings className="w-4 h-4" />, 
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: <Mail className="w-4 h-4" />
    }
  ];

  // Profile dropdown items for logged in users
  const profileDropdownItems = [
    { 
      label: 'My Profile', 
      href: '/profile', 
      icon: <UserCircle className="w-4 h-4" /> 
    },
    { 
      label: 'Create Bookings', 
      href: '/Bookings/create_bookings', 
      icon: <ClipboardList className="w-4 h-4" /> 
    },
    { 
      label: 'My Bookings', 
      href: '/Bookings/my_bookings', 
      icon: <ClipboardList className="w-4 h-4" /> 
    },
    { 
      label: 'My Shipments', 
      href: '/my-shipping', 
      icon: <Truck className="w-4 h-4" /> 
    },
    { 
      label: 'My Invoices', 
      href: '/invoice', 
      icon: <FileSpreadsheet className="w-4 h-4" /> 
    }
  ];

  // Add admin panel link if user is admin
  if (user?.role === 'admin') {
    profileDropdownItems.push(
      { 
        label: 'Admin Panel', 
        href: '/admin', 
        icon: <Settings className="w-4 h-4" /> 
      }
    );
  }

  const DropdownMenu = ({ items, isMobile = false }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`${isMobile ? 'relative ml-3 mt-1' : 'absolute left-0 mt-2 min-w-[220px]'} bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden`}
      style={{ 
        maxWidth: 'calc(100vw - 2rem)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}
    >
      {items.map((item, idx) => (
        <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ x: 8, backgroundColor: '#f0f7ff' }}
            className="block px-5 py-3 text-sm text-gray-700 hover:text-[#246092] font-medium transition-all border-b border-gray-50 last:border-0 cursor-pointer"
          >
            {item.label}
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed ${navbarTopPosition} left-0 right-0 z-[9999] transition-all duration-300 w-full ${
          scrolled 
            ? 'bg-white py-2 shadow-lg' 
            : 'bg-secondary py-4'
        }`} 
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="flex items-center space-x-2 flex-shrink-0"
            >
             <a href="/">
               <div className="relative overflow-visible  rounded-lg p-1 ">
                <img 
                  src="/images/logo.png" 
                  alt="Cargo Logistics Company" 
                  className="h-12 w-auto " 
                />
              </div>
             </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.dropdown) {
                      setActiveDropdown(item.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.dropdown) {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  {item.dropdown ? (
                    <button
                      className={`flex items-center space-x-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 group ${
                        scrolled ? 'text-third hover:text-primary' : 'text-gray-700 hover:text-[#246092]'
                      }`}
                    >
                      <span className={`opacity-60 group-hover:opacity-100 transition-opacity ${
                        scrolled ? 'text-primary' : ''
                      }`}>
                        {item.icon}
                      </span>
                      <span className="whitespace-nowrap">{item.label}</span>
                      {item.dropdown && (
                        <motion.div
                          animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className={`w-3 h-3 ${
                            scrolled ? 'text-primary' : ''
                          }`} />
                        </motion.div>
                      )}
                    </button>
                  ) : (
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className={`flex items-center space-x-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 group ${
                          scrolled ? 'text-third hover:text-primary' : 'text-gray-700 hover:text-[#246092]'
                        }`}
                      >
                        <span className={`opacity-60 group-hover:opacity-100 transition-opacity ${
                          scrolled ? 'text-primary' : ''
                        }`}>
                          {item.icon}
                        </span>
                        <span className="whitespace-nowrap">{item.label}</span>
                      </motion.div>
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <div className="absolute left-0 top-full pt-2">
                        <DropdownMenu items={item.dropdown} />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop Right Side Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  {/* Track Order Button - Always visible */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }} 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/tracking-number')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 ${
                      scrolled 
                        ? 'bg-primary text-white' 
                        : 'bg-fourth text-white hover:bg-primary'
                    }`}
                  >
                    Track Your Order
                  </motion.button>

                  {/* Profile Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown('profile')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 ${
                        scrolled 
                          ? 'bg-primary text-white' 
                          : 'bg-fourth text-white hover:bg-primary'
                      }`}
                    >
                      <UserCircle className="w-4 h-4" />
                      <span className="max-w-[100px] truncate">
                        {user?.name?.split(' ')[0] || user?.fullName?.split(' ')[0] || 'Profile'}
                      </span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === 'profile' ? 'rotate-180' : ''
                      }`} />
                    </motion.button>

                    {/* Profile Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === 'profile' && (
                        <div className="absolute right-0 top-full pt-2">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden min-w-[200px]"
                          >
                            {profileDropdownItems.map((item, idx) => (
                              <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  whileHover={{ x: 8, backgroundColor: '#f0f7ff' }}
                                  className="flex items-center space-x-3 px-5 py-3 text-sm text-gray-700 hover:text-[#246092] font-medium transition-all border-b border-gray-50 last:border-0 cursor-pointer"
                                >
                                  <span className="text-gray-500 w-4 h-4">{item.icon}</span>
                                  <span>{item.label}</span>
                                </motion.div>
                              </Link>
                            ))}
                            
                            {/* Logout Button */}
                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              whileHover={{ x: 8, backgroundColor: '#fee2e2' }}
                              onClick={handleLogout}
                              className="w-full flex items-center space-x-3 px-5 py-3 text-sm text-red-600 hover:text-red-700 font-medium transition-all cursor-pointer"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </motion.button>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/auth/login')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 ${
                      scrolled 
                        ? 'bg-white text-third' 
                        : 'bg-fourth text-white hover:bg-primary'
                    }`}
                  >
                    Login
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }} 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/tracking-number')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 ${
                      scrolled 
                        ? 'bg-white text-third hover:bg-secondary' 
                        : 'bg-fourth text-white hover:bg-primary'
                    }`}
                  >
                    Track Your Order
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2.5 rounded-lg transition-colors ${
                scrolled 
                  ? 'bg-white/20 text-white hover:bg-white/30' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
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
                <div className="bg-white rounded-xl shadow-xl border py-4">
                  <div className="space-y-1 px-3">
                    {/* Mobile User Info (if logged in) */}
                    {isLoggedIn && (
                      <div className="px-4 py-3 bg-blue-50 rounded-lg mb-2">
                        <p className="text-sm text-gray-600">Logged in as</p>
                        <p className="font-semibold text-gray-800">{user?.name || user?.fullName}</p>
                        <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                      </div>
                    )}

                    {navItems.map((item) => (
                      <div key={item.label}>
                        {item.dropdown ? (
                          <>
                            <button
                              onClick={() => {
                                setActiveDropdown(activeDropdown === item.label ? null : item.label);
                              }}
                              className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-gray-600">{item.icon}</span>
                                <span className="font-medium text-gray-800">{item.label}</span>
                              </div>
                              {item.dropdown && (
                                <motion.div
                                  animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                                >
                                  <ChevronDown className="w-4 h-4 text-gray-500" />
                                </motion.div>
                              )}
                            </button>

                            {/* Mobile Dropdown */}
                            <AnimatePresence>
                              {item.dropdown && activeDropdown === item.label && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="ml-8 mt-1 mb-2"
                                >
                                  <DropdownMenu items={item.dropdown} isMobile />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                            <div className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                              <span className="text-gray-600">{item.icon}</span>
                              <span className="font-medium text-gray-800">{item.label}</span>
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}

                    {/* Mobile Profile Items (if logged in) */}
                    {isLoggedIn && (
                      <>
                        <div className="border-t border-gray-200 my-2 pt-2">
                          <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Account
                          </p>
                          {profileDropdownItems.map((item) => (
                            <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                              <div className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                                <span className="text-gray-600 w-4 h-4">{item.icon}</span>
                                <span className="font-medium text-gray-800">{item.label}</span>
                              </div>
                            </Link>
                          ))}
                          
                          {/* Mobile Logout Button */}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="font-medium">Logout</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Contact */}
                  <div className="mt-4 pt-4 border-t px-4">
                    <button
                      onClick={() => router.push('/tracking-number')}
                      style={{ backgroundColor: '#122652' }}
                      className="w-full text-white py-3.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 mb-2"
                    >
                      Track Your Order
                    </button>
                    {!isLoggedIn && (
                      <button
                        onClick={() => {
                          router.push('/auth/login');
                          setIsMenuOpen(false);
                        }}
                        style={{ backgroundColor: '#246092' }}
                        className="w-full text-white py-3.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Dynamic Spacer - Topbar visible থাকলে বেশি spacer, না থাকলে কম */}
      <div className={isTopbarVisible ? 'h-28' : 'h-20'} />
    </>
  );
};

export default Navbar;