"use client";

import React from 'react';

const PricingPlans = () => {
  const plans = [
    {
      name: 'Basic',
      price: '199.00',
      shipments: 'Up to 100 shipments',
      delivery: '5-7 days Delivery',
      tracking: 'Basic Tracking',
      support: 'Email Support',
      insurance: 'Basic Insurance',
      gradientFrom: 'from-[#FD5621]',
      gradientTo: 'to-[#FD5621]/80',
    },
    {
      name: 'Standard',
      price: '249.00',
      shipments: 'Up to 100 shipments',
      delivery: '5-7 days Delivery',
      tracking: 'Basic Tracking',
      support: 'Email Support',
      insurance: 'Basic Insurance',
      gradientFrom: 'from-[#122652]',
      gradientTo: 'to-[#122652]/90',
    },
    {
      name: 'Premium',
      price: '299.00',
      shipments: 'Up to 100 shipments',
      delivery: '5-7 days Delivery',
      tracking: 'Basic Tracking',
      support: 'Email Support',
      insurance: 'Basic Insurance',
      gradientFrom: 'from-[#FD5621]',
      gradientTo: 'to-[#122652]',
    },
  ];

  // Add custom animations using Tailwind's arbitrary variants or inline style
  const shineAnimation = {
    animation: 'shine 1.5s ease-in-out infinite',
  };

  const floatAnimation = {
    animation: 'float 4s ease-in-out infinite',
  };

  const floatSlowAnimation = {
    animation: 'float 6s ease-in-out infinite',
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-gray-100 py-12 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FD5621]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#122652]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* header with hover effect */}
      <div className="text-center mb-10 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FD5621] to-[#122652] hover:scale-105 transition-transform duration-300 inline-block">
            PRICING & PLANS
          </span>
        </h1>
        <p className="text-[#122652]/60 text-sm font-medium mt-1 tracking-wide relative">
          <span className="relative inline-block">
            Reliable Freight Services
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FD5621]/0 via-[#FD5621]/50 to-[#122652]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
          </span>
        </p>
      </div>

      {/* cards container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200/50 hover:border-transparent flex flex-col transform hover:-translate-y-2 hover:scale-[1.02]"
          >
            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent via-white/50 to-transparent pointer-events-none"></div>
            
            {/* Shine effect - using Tailwind animation */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div 
                className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={shineAnimation}
              ></div>
            </div>

            {/* Top accent with animation */}
            <div className={`relative h-2 w-full bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} group-hover:h-3 transition-all duration-300`}>
              {/* Pulsing dot */}
              <div className="absolute -top-1 right-4 w-2 h-2 bg-white rounded-full opacity-75 group-hover:animate-ping"></div>
            </div>

            <div className="p-6 flex flex-col flex-1 relative z-10">
              {/* Plan name with hover effect */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#122652]/70 group-hover:text-[#FD5621] transition-colors duration-300">
                  {plan.name}
                </span>
                <div className="text-right transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xs text-gray-400 group-hover:text-[#FD5621] transition-colors">$</span>
                  <span className="text-3xl font-bold text-[#122652] group-hover:text-[#FD5621] transition-colors duration-300">
                    {plan.price}
                  </span>
                </div>
              </div>

              {/* Feature list with staggered hover animations */}
              <ul className="space-y-3 mb-6 text-sm">
                {[
                  { icon: 'fa-box', text: plan.shipments },
                  { icon: 'fa-truck', text: plan.delivery },
                  { icon: 'fa-map-pin', text: plan.tracking },
                  { icon: 'fa-envelope', text: plan.support },
                  { icon: 'fa-shield', text: plan.insurance },
                ].map((feature, i) => (
                  <li 
                    key={i}
                    className="flex items-center gap-3 text-gray-700 group/item hover:text-[#122652] transition-all duration-300 transform group-hover:translate-x-1"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <div className="relative">
                      <i className={`fas ${feature.icon} text-[#FD5621] text-sm w-5 text-center group-hover/item:scale-110 transition-transform duration-300`}></i>
                      <div className="absolute inset-0 bg-[#FD5621]/20 rounded-full blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <span className="text-xs sm:text-sm leading-tight group-hover/item:font-medium transition-all">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button with advanced hover effects */}
              <button
                className={`relative mt-auto w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-3 group/btn overflow-hidden
                  ${
                    idx === 1
                      ? 'bg-[#122652] text-white hover:bg-[#122652]/90' 
                      : 'bg-[#FD5621] text-white hover:bg-[#FD5621]/90'
                  }`}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                  <div 
                    className="absolute top-0 -inset-full h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={shineAnimation}
                  ></div>
                </div>
                
                <a href="/footer/booking">
                   <span className="relative z-10">GET STARTED TODAY</span>
                </a>
                <i className="fas fa-arrow-right text-xs relative z-10 group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-all duration-300"></i>
                
                {/* Ripple effect on hover */}
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>

              {/* Popular badge for Premium (example) */}
              {idx === 2 && (
                <div className="absolute top-4 right-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FD5621] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FD5621]"></span>
                  </span>
                </div>
              )}
            </div>

            {/* Floating particles on hover */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#FD5621]/30 rounded-full opacity-0 group-hover:opacity-100"
                style={floatSlowAnimation}
              ></div>
              <div 
                className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-[#122652]/30 rounded-full opacity-0 group-hover:opacity-100"
                style={{ ...floatAnimation, animationDelay: '300ms' }}
              ></div>
              <div 
                className="absolute top-2/3 right-1/3 w-1 h-1 bg-[#FD5621]/30 rounded-full opacity-0 group-hover:opacity-100"
                style={{ ...floatAnimation, animationDelay: '700ms' }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom decorative element */}
      <div className="text-center mt-10 relative">
        <p className="text-xs text-[#122652]/30 mt-6 font-mono hover:text-[#122652]/50 transition-colors duration-300 cursor-default">
          * all plans include basic insurance • no hidden fees
        </p>
        
        {/* Animated underline */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-24 h-0.5 bg-gradient-to-r from-[#FD5621] to-[#122652] transition-all duration-500"></div>
      </div>

      {/* Add keyframes to global CSS or use style tag in head */}
      <style>{`
        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-5px);
          }
          75% {
            transform: translateY(-15px) translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PricingPlans;