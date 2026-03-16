// components/EcommerceSectors.jsx
'use client';
import React, { useState, useEffect } from 'react';

const EcommerceSectors = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sectors = [
    {
      id: 1,
      number: "01",
      title: "Quality Management System",
      description: "Service & Aftermarket Logistics",
      fullText: "With our worldwide inclusion, strong transportation organization and industry driving coordinations experience, our Service and Aftermarket Logistics arrangements.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      number: "02",
      title: "E-commerce Logistics",
      description: "End-to-end e-commerce solutions",
      fullText: "End-to-end e-commerce logistics with smart warehousing, real-time tracking, and optimized last-mile delivery for modern digital commerce.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 3,
      number: "03",
      title: "Aftermarket Logistics",
      description: "Service parts distribution",
      fullText: "Comprehensive after-sales logistics including parts distribution, reverse logistics, and field service coordination for maximum customer satisfaction.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 4,
      number: "04",
      title: "Industry Competence",
      description: "Specialized sector expertise",
      fullText: "Specialized logistics solutions designed for automotive, healthcare, technology, and industrial manufacturing sectors with industry-specific expertise.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  // Handle touch events for mobile
  const handleTouchStart = (index) => {
    if (isMobile) {
      setHoveredIndex(index);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setTimeout(() => setHoveredIndex(null), 300);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fixed Background */}
      <div 
        className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/products.jpg')`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center py-6 sm:py-12">
        <div className="w-full px-2 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Grid - Always 2 columns on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {sectors.map((sector, index) => (
                <div
                  key={sector.id}
                  className="group relative"
                  onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                  onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                  onTouchStart={() => handleTouchStart(index)}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchEnd}
                >
                  {/* Card with Mobile Optimized Effects */}
                  <div className={`
                    relative p-3 sm:p-4 lg:p-5 rounded-xl backdrop-blur-md border
                    transition-all duration-300 ease-out
                    h-[160px] xs:h-[170px] sm:h-[190px] lg:h-[220px] flex flex-col
                    ${hoveredIndex === index || !isMobile 
                      ? 'bg-white/20 border-white/30 shadow-2xl' 
                      : 'bg-white/10 border-white/20 shadow-xl'
                    }
                    ${!isMobile && 'hover:bg-white/20 hover:border-white/30 hover:shadow-2xl hover:scale-105 hover:-translate-y-2'}
                  `}>
                    
                    {/* Mobile Active Indicator */}
                    {isMobile && hoveredIndex === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl animate-pulse"></div>
                    )}

                    {/* Header with Icon and Number */}
                    <div className="flex items-start justify-between mb-1 sm:mb-2 relative z-10">
                      {/* Icon */}
                      <div className={`
                        transition-all duration-300
                        text-blue-400
                        ${!isMobile && 'group-hover:scale-110 group-hover:rotate-6'}
                        ${hoveredIndex === index && isMobile ? 'scale-110 rotate-6' : ''}
                      `}>
                        {sector.icon}
                      </div>
                      
                      {/* Number */}
                      <span className={`
                        text-xl sm:text-2xl font-light transition-all duration-300
                        text-white/20
                        ${!isMobile && 'group-hover:text-white/30 group-hover:scale-110'}
                        ${hoveredIndex === index && isMobile ? 'text-white/30 scale-110' : ''}
                      `}>
                        {sector.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`
                      text-xs sm:text-sm lg:text-base font-medium mb-1 sm:mb-2 line-clamp-2
                      text-white
                      ${!isMobile && 'group-hover:translate-x-1'}
                      ${hoveredIndex === index && isMobile ? 'translate-x-1' : ''}
                    `}>
                      {sector.title}
                    </h3>

                    {/* Description */}
                    <p className={`
                      text-[10px] xs:text-xs sm:text-xs lg:text-sm leading-relaxed line-clamp-3
                      text-white/70
                      ${!isMobile && 'group-hover:text-white/80'}
                      ${hoveredIndex === index && isMobile ? 'text-white/80' : ''}
                    `}>
                      {sector.fullText}
                    </p>

                    {/* Bottom Border */}
                    <div className={`
                      absolute bottom-0 left-2 right-2 sm:left-3 sm:right-3 h-0.5 
                      bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                      transition-all duration-300
                      ${!isMobile && 'group-hover:scale-x-100 group-hover:opacity-100'}
                      ${hoveredIndex === index && isMobile ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-50'}
                    `}></div>

                    {/* Corner Accents - Hidden on mobile */}
                    {!isMobile && (
                      <>
                        <div className="absolute top-2 left-2 w-2 h-2 lg:w-3 lg:h-3 border-t-2 border-l-2 border-blue-400/30 rounded-tl-lg transition-all duration-300 group-hover:border-blue-400/60"></div>
                        <div className="absolute bottom-2 right-2 w-2 h-2 lg:w-3 lg:h-3 border-b-2 border-r-2 border-purple-400/30 rounded-br-lg transition-all duration-300 group-hover:border-purple-400/60"></div>
                      </>
                    )}
                  </div>

                  {/* Glow Effect - Optimized for mobile */}
                  <div className={`
                    absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                    rounded-xl transition-all duration-300 -z-10
                    ${!isMobile && 'opacity-0 group-hover:opacity-30 group-hover:blur-xl'}
                    ${hoveredIndex === index && isMobile ? 'opacity-30 blur-xl' : 'opacity-0'}
                  `}></div>

                  {/* Ripple Effects - Only on desktop hover */}
                  {!isMobile && hoveredIndex === index && (
                    <>
                      <div className="absolute inset-0 rounded-xl border-2 border-blue-400/30 animate-ping-slow"></div>
                      <div className="absolute inset-0 rounded-xl border border-purple-400/20 animate-ping-slower"></div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom breakpoint for extra small devices */
        @media (min-width: 375px) {
          .xs\\:h-\\[170px\\] {
            height: 170px;
          }
          .xs\\:text-xs {
            font-size: 0.75rem;
          }
        }

        /* Animation Keyframes */
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-ping-slower {
          animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        /* Mobile Touch Optimization */
        @media (max-width: 640px) {
          .group:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }
        }

        /* Smooth Scrolling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default EcommerceSectors;