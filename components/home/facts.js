// app/page.tsx or components/InterestingFacts.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const InterestingFacts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);
  const animationStarted = useRef(false);
  
  const facts = [
    {
      id: 1,
      title: 'WAREHOUSE',
      value: 400,
      displayValue: '400k',
      unit: 'ft²',
      description: 'Strategic storage & distribution network',
      icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4'
    },
    {
      id: 2,
      title: 'ON-TIME',
      value: 98,
      displayValue: '98',
      unit: '%',
      description: 'Precision delivery performance',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      id: 3,
      title: 'WEEKLY',
      value: 5,
      displayValue: '5K',
      unit: '',
      description: 'Shipments processed & tracked',
      icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
    },
    {
      id: 4,
      title: 'AWARDS',
      value: 25,
      displayValue: '25',
      unit: '',
      description: 'Industry recognition & excellence',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
    }
  ];

  // Counter animation function
  const animateCounter = () => {
    if (animationStarted.current) return;
    animationStarted.current = true;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;
    
    const targets = facts.map(f => f.value);
    const increments = targets.map(t => t / steps);
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      if (currentStep >= steps) {
        // Final values
        setCounters(targets);
        clearInterval(timer);
      } else {
        // Intermediate values
        setCounters(prev => 
          prev.map((_, idx) => Math.min(Math.floor(increments[idx] * currentStep), targets[idx]))
        );
      }
    }, interval);
  };

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounter();
        }
      },
      { 
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Format counter value with K suffix
  const formatCounterValue = (index) => {
    const fact = facts[index];
    if (fact.displayValue.includes('K')) {
      const baseValue = counters[index];
      if (baseValue >= 400) return '400k';
      if (baseValue > 0) return `${baseValue}k`;
      return '0k';
    }
    return counters[index];
  };

  return (
    <section ref={sectionRef} className="relative bg-white py-6 sm:py-4 lg:py-6 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <span className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            Our Impact
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 mt-2 sm:mt-4 mb-4 sm:mb-6">
            Facts & Figures
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-gray-300 mx-auto"></div>
        </div>

        {/* Stats Grid - Mobile: 2 columns, Tablet/Desktop: 4 columns */}
        <div className=" p-2 rounded-lg  grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-px bg-gray-200">
          {facts.map((fact, index) => (
            <div
              key={fact.id}
              className="bg-white p-3 sm:p-4 lg:p-8 group transition-all duration-300 hover:bg-gray-50 rounded-lg sm:rounded-none"
            >
              {/* Icon */}
              <div className="mb-2 sm:mb-4 lg:mb-6">
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={fact.icon} />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-[10px] sm:text-xs lg:text-sm font-medium text-gray-400 uppercase tracking-wider mb-1 sm:mb-2 lg:mb-3">
                {fact.title}
              </h3>

              {/* Value with Counter */}
              <div className="flex items-baseline mb-1 sm:mb-2 lg:mb-3">
                <span className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-light text-gray-900">
                  {fact.displayValue.includes('K') 
                    ? formatCounterValue(index)
                    : counters[index]
                  }
                </span>
                {fact.unit && (
                  <span className="text-xs sm:text-sm lg:text-lg text-gray-400 ml-0.5 sm:ml-1">
                    {fact.unit}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 leading-tight sm:leading-normal">
                {fact.description}
              </p>

              {/* Subtle Indicator - Hidden on mobile */}
              <div className="hidden lg:block mt-6">
                <div className="w-8 h-px bg-gray-300 group-hover:w-12 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div> 
      </div>
    </section>
  );
};

export default InterestingFacts;