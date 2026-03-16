"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function logisticTimeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const timelineEvents = [
    {
      year: "1984",
      title: "Foundation",
      description: "Denounce with righteous indigation demoralized by pleasure.",
      color: "blue",
      quote: "Blinded by desire, that they cannot foresee the pain and trouble"
    },
    {
      year: "1989",
      title: "Global Reach",
      description: "Expanded operations across 3 continents, establishing our first international logistics hub.",
      color: "blue",
      quote: "Blinded by desire, that they cannot foresee the pain and trouble"
    },
    {
      year: "1995",
      title: "300+ Branches",
      description: "Rapid growth phase with new branches opening in 15 countries worldwide.",
      color: "green",
      quote: "Denounce with righteous indignation and demoralized by pleasure."
    },
    {
      year: "2000",
      title: "Customer Award",
      description: "Recognized as 'Best Logistics Provider' by the International Trade Association.",
      color: "amber",
      quote: "Blinded by desire, that they cannot foresee the pain and trouble"
    },
    {
      year: "2010",
      title: "Digital Transformation",
      description: "Launched AI-powered tracking system revolutionizing supply chain management.",
      color: "purple",
      quote: "To take a trivial example, which of us ever undertakes laborious"
    },
    {
      year: "2024",
      title: "Sustainability Leader",
      description: "Achieved carbon-neutral operations across all European facilities.",
      color: "teal",
      quote: "Every pleasure is to be welcomed and every pain avoided."
    }
  ];

  const colors = {
    blue: "border-blue-600 bg-blue-50",
    green: "border-green-600 bg-green-50",
    amber: "border-amber-600 bg-amber-50",
    purple: "border-purple-600 bg-purple-50",
    teal: "border-teal-600 bg-teal-50"
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % timelineEvents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[400px] overflow-hidden">
      {/* Background Image - শুধু এই কম্পোনেন্টের জন্য */}
      <div className="absolute inset-0">
        <Image
          src="/images/overlay.jpg"
          alt="Logistics background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[200px] px-4 py-8">
  <div className="max-w-4xl w-full">
    {/* Header with Animation - ছোট ও কমপ্যাক্ট */}
    <motion.div 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10"
    >
      <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 tracking-tight">
        40<span className="text-blue-400">+</span>
      </h1>
      <p className="text-lg md:text-xl text-white/90 font-light tracking-wider uppercase">
        Years of Excellence
      </p>
      <div className="w-16 h-0.5 bg-blue-400/50 mx-auto mt-3" />
    </motion.div>

    {/* Timeline Slider - কমপ্যাক্ট ভার্সন */}
    <div className="relative">
      {/* Navigation Arrows - ছোট সাইজ */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-8 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-8 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slider Container - কমপ্যাক্ট কার্ড */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className={`bg-white/60  rounded-2xl shadow-xl p-6 md:p-8 border-l-[8px] ${colors[timelineEvents[currentIndex].color]} transform transition-all duration-300 hover:scale-[1.01]`}>
              {/* Year and Title - সাইড বাই সাইড */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-4xl md:text-5xl font-bold text-${timelineEvents[currentIndex].color}-600`}>
                  {timelineEvents[currentIndex].year}
                </span>
                <div className="h-8 w-px bg-gray-300" />
                <div>
                  <h2 className={`text-xl md:text-2xl font-semibold text-${timelineEvents[currentIndex].color}-800`}>
                    {timelineEvents[currentIndex].title}
                  </h2>
                </div>
              </div>

              {/* Description - ছোট ও সিম্পল */}
              <p className="text-gray-600 text-base mb-4 line-clamp-2">
                {timelineEvents[currentIndex].description}
              </p>

              {/* Quote - মিনিমাল */}
              <div className="bg-gray-50/80 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 italic">
                  &ldquo;{timelineEvents[currentIndex].quote}&rdquo;
                </p>
              </div>

              {/* Progress Bar - ছোট */}
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className={`h-full bg-${timelineEvents[currentIndex].color}-600`}
                  key={currentIndex}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Timeline Dots - ছোট */}
      <div className="flex justify-center mt-4 gap-2">
        {timelineEvents.map((event, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 ${
              index === currentIndex 
                ? `w-8 h-2 bg-${event.color}-600 rounded-full` 
                : 'w-2 h-2 bg-white/30 hover:bg-white/50 rounded-full'
            }`}
          />
        ))}
      </div>

      {/* Year Labels - ছোট ফন্ট */}
      <div className="flex justify-between mt-3 px-2">
        {timelineEvents.map((event, index) => (
          <span 
            key={index}
            className={`text-xs font-medium transition-all duration-200 cursor-pointer ${
              index === currentIndex 
                ? `text-${event.color}-400 font-semibold` 
                : 'text-white/40 hover:text-white/70'
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            {event.year}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>
    </div>
  );
}