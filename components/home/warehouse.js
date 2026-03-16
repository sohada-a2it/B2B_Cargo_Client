'use client';

import React, { useState, useEffect, useRef } from 'react';

const TestimonialsSection = () => {
  // Brand colors
  const colors = {
    primary: '#FD5621',
    secondary: '#122652',
  };

  // State for button hover
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  // State for active testimonial index
  const [activeIndex, setActiveIndex] = useState(0);
  // State for auto-play
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // Refs for touch handling
  const touchStartX = useRef(null);
  const containerRef = useRef(null);

  // Extended testimonials data with images
  const testimonials = [
    {
      rating: 5,
      title: '“Great Work!”',
      content:
        'I work in project management and joined Unicoach because I get great courses for less. The instructors are fantastic, interesting, and helpful. I plan to use for a long time!',
      name: 'Anna Ingrosso',
      role: 'CLIENT OF COMPANY',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      rating: 5,
      title: '“Perfect Results!”',
      content:
        'I work in project management and joined Unicoach because I get great courses for less. The instructors are fantastic, interesting, and helpful. I plan to use for a long time!',
      name: 'Tomm Skywalker',
      role: 'CLIENT OF COMPANY',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      rating: 5,
      title: '“Excellent Support”',
      content:
        'The team at Unicoach goes above and beyond. Their courses are top-notch and the support is incredible. I highly recommend them to anyone looking to advance their career.',
      name: 'Maria Chen',
      role: 'PRODUCT MANAGER',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      rating: 5,
      title: '“Highly Effective”',
      content:
        'I was skeptical at first, but the results speak for themselves. The methodologies taught here have transformed our team’s productivity.',
      name: 'David Kim',
      role: 'TEAM LEAD',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      rating: 5,
      title: '“Life-changing”',
      content:
        'Not only did I gain new skills, but I also gained confidence. The instructors are mentors who truly care about your growth.',
      name: 'Sophia Rodriguez',
      role: 'MARKETING DIRECTOR',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      rating: 5,
      title: '“Worth every penny”',
      content:
        'The depth of content and the practical exercises make this stand out from any other platform. Already recommended to five colleagues!',
      name: 'James Wright',
      role: 'ENGINEERING MANAGER',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Navigation handlers
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextTestimonial();
      } else {
        prevTestimonial();
      }
    }
    
    touchStartX.current = null;
  };

  return (
    <div className="w-full bg-white py-8 px-4 sm:px-6 lg:py-12 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, ${colors.secondary} 1px, transparent 1px),
            linear-gradient(to right, ${colors.secondary}05 1px, transparent 1px),
            linear-gradient(to bottom, ${colors.secondary}05 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 50px 50px',
          opacity: 0.3,
        }}
      ></div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header Section - smaller */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.secondary }}>
            People Say About Our Company
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Transmax is the world's driving worldwide coordinations supplier — we uphold industry and 
            exchange the worldwide exchange.
          </p>
          
          {/* ALL TESTIMONIALS link - smaller */}
          {/* <div className="mt-4">
            <button 
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border-2 font-medium text-sm transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              style={{ 
                borderColor: colors.primary,
                color: isButtonHovered ? 'white' : colors.primary,
                backgroundColor: isButtonHovered ? colors.primary : 'transparent',
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              ALL TESTIMONIALS
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div> */}
        </div>

        {/* Elegant divider - smaller */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed" style={{ borderColor: `${colors.secondary}20` }}></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-2 h-2 transform rotate-45" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>

        {/* Main testimonial display */}
        <div 
          ref={containerRef}
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Progress bar - smaller */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                backgroundColor: colors.primary 
              }}
            ></div>
          </div>

          {/* Main testimonial card with animation - more compact */}
          <div className="mt-6">
            <div
              key={activeIndex}
              className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              style={{
                animation: 'fadeInUp 0.5s ease-out',
              }}
            >
              <div className="grid md:grid-cols-5 gap-4 items-center">
                {/* Left side - Image and info */}
                <div className="md:col-span-2">
                  <div className="relative">
                    {/* Decorative circle - smaller */}
                    <div 
                      className="absolute -top-2 -left-2 w-16 h-16 rounded-full opacity-10 animate-pulse"
                      style={{ backgroundColor: colors.primary }}
                    ></div>
                    
                    {/* Profile image - smaller */}
                    <div className="relative z-10">
                      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden border-2 border-white shadow-md transform transition-transform duration-300 hover:scale-105">
                        <img 
                          src={testimonials[activeIndex].image} 
                          alt={testimonials[activeIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Name and role - smaller */}
                    <div className="text-center mt-2">
                      <h3 className="text-base md:text-lg font-bold" style={{ color: colors.secondary }}>
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className="text-xs font-semibold tracking-wider mt-0.5" style={{ color: colors.primary }}>
                        {testimonials[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side - Testimonial content */}
                <div className="md:col-span-3">
                  {/* Quote mark - smaller */}
                  <div className="text-5xl font-serif opacity-10 leading-none mb-1" style={{ color: colors.secondary }}>
                    &ldquo;
                  </div>

                  {/* Rating - smaller */}
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 transition-transform duration-300 hover:scale-110"
                        fill={i < testimonials[activeIndex].rating ? colors.primary : 'none'}
                        stroke={colors.primary}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                  </div>

                  {/* Title - smaller */}
                  <h4 className="text-lg md:text-xl font-bold mb-1" style={{ color: colors.secondary }}>
                    {testimonials[activeIndex].title}
                  </h4>

                  {/* Content - smaller */}
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3">
                    {testimonials[activeIndex].content}
                  </p>

                  {/* Decorative line - smaller */}
                  <div 
                    className="w-16 h-0.5 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation controls - smaller */}
          <div className="flex items-center justify-between mt-4">
            {/* Arrow buttons - smaller */}
            <div className="flex gap-2">
              <button
                onClick={prevTestimonial}
                className="group p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                style={{ color: colors.secondary }}
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="group p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                style={{ color: colors.secondary }}
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Auto-play toggle - smaller */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 text-xs"
              style={{ color: colors.secondary }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isAutoPlaying ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                )}
              </svg>
              <span className="text-xs font-medium">
                {isAutoPlaying ? 'Pause' : 'Play'}
              </span>
            </button>
          </div>

          {/* Elegant dot navigation - smaller */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className="group relative"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div
                  className={`transition-all duration-500 rounded-full ${
                    index === activeIndex 
                      ? 'w-8 h-2' 
                      : 'w-2 h-2 group-hover:w-3'
                  }`}
                  style={{ 
                    backgroundColor: index === activeIndex ? colors.primary : `${colors.secondary}20`,
                  }}
                />
                {index === activeIndex && (
                  <div 
                    className="absolute -inset-1 rounded-full opacity-50 animate-ping"
                    style={{ backgroundColor: colors.primary }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add keyframe animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;