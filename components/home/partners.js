"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const StylishPartnerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);

  const partners = [
    {
      id: 1,
      category: "DAILY NEWS",
      title: "New Generation",
      image: "/images/partner (1).png",
      activeImage: "/images/partner-active (1).png",
      color: "#FD5621",
    },
    {
      id: 2,
      category: "TECHNOLOGY",
      title: "HIGH PERFORMANCE",
      image: "/images/partner (2).png",
      activeImage: "/images/partner-active (2).png",
      color: "#122652",
    },
    {
      id: 3,
      category: "FURTURATECH",
      title: "INNOVATIVE SOLUTION",
      image: "/images/partner (3).png",
      activeImage: "/images/partner-active (3).png",
      color: "#FD5621",
    },
    {
      id: 4,
      category: "CYBERTECH",
      title: "SECURITY MADE SIMPLE",
      image: "/images/partner (4).png",
      activeImage: "/images/partner-active (4).png",
      color: "#122652",
    },
    {
      id: 5,
      category: "ART STUDIO",
      title: "STYLISH, MODERN",
      image: "/images/partner (5).png",
      activeImage: "/images/partner-active (5).png",
      color: "#FD5621",
    },
    {
      id: 6,
      category: "MORIOX",
      title: "High Performance",
      image: "/images/partner (6).png",
      activeImage: "/images/partner-active (6).png",
      color: "#122652",
    },
    {
      id: 7,
      category: "MORIOX",
      title: "High Performance",
      image: "/images/partner (7).png",
      activeImage: "/images/partner-active (7).png",
      color: "#FD5621",
    },
    {
      id: 8,
      category: "MORIOX",
      title: "High Performance",
      image: "/images/partner (8).png",
      activeImage: "/images/partner-active (8).png",
      color: "#122652",
    },
    {
      id: 9,
      category: "MORIOX",
      title: "High Performance",
      image: "/images/partner (9).png",
      activeImage: "/images/partner-active (9).png",
      color: "#FD5621",
    },
    {
      id: 10,
      category: "MORIOX",
      title: "High Performance",
      image: "/images/partner (10).png",
      activeImage: "/images/partner-active (10).png",
      color: "#122652",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [partners.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + partners.length) % partners.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % partners.length);
  };

  const activePartner = partners[currentSlide];

  return (
    <div className="bg-white relative p-4 sm:p-6 my-4 sm:my-8 rounded-2xl shadow-xl max-w-full mx-auto border border-gray-100">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="space-y-0">
          <h2 className="text-xs sm:text-sm font-light text-gray-600 tracking-wide">
            Collaborating with
          </h2>
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight transition-colors duration-300"
            style={{ color: activePartner.color }}
          >
            THE BEST
          </h1>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handlePrev}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-110"
          >
            <span className="text-gray-600 text-sm sm:text-base">←</span>
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-110"
          >
            <span className="text-gray-600 text-sm sm:text-base">→</span>
          </button>
        </div>
      </div>

      {/* Responsive Grid - Mobile: 5x2, Desktop: 10x1 full width */}
      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-1.5 sm:gap-2 md:gap-3">
        {partners.map((partner) => {
          const isActive = partner.id === activePartner.id;
          const isHovered = hoveredId === partner.id;

          // Show active image if: item is active OR item is being hovered
          const showActiveImage = isActive || isHovered;

          return (
            <div
              key={partner.id}
              onClick={() =>
                setCurrentSlide(partners.findIndex((p) => p.id === partner.id))
              }
              onMouseEnter={() => setHoveredId(partner.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 sm:hover:scale-110"
              style={{
                transform: isActive ? "scale(1.02) sm:scale(1.05)" : "scale(1)",
                boxShadow: isActive
                  ? `0 8px 16px -6px ${partner.color}80`
                  : "0 2px 8px -4px rgba(0,0,0,0.1)",
              }}
            >
              {/* Image with fade transition */}
              <div className="absolute inset-0">
                {/* Inactive Image */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    showActiveImage ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <Image
                    src={partner.image}
                    alt={partner.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 20vw, (max-width: 768px) 10vw, 8vw"
                  />
                </div>
                
                {/* Active Image */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    showActiveImage ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={partner.activeImage}
                    alt={partner.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 20vw, (max-width: 768px) 10vw, 8vw"
                  />
                </div>
              </div>

              {/* Active Indicator Border */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-lg border-2 sm:border-3 transition-all duration-300"
                  style={{
                    borderColor: partner.color,
                    boxShadow: `0 0 12px ${partner.color}`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation - Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 gap-3 sm:gap-0">
        <div className="flex gap-1.5 sm:gap-2 order-2 sm:order-1">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="focus:outline-none group"
            >
              <div
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 group-hover:bg-orange-400 ${
                  index === currentSlide
                    ? "w-5 sm:w-8 bg-orange-500"
                    : "w-1.5 sm:w-2 bg-gray-300 group-hover:w-3"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
          <span
            className="text-base sm:text-lg md:text-xl font-bold transition-colors duration-300"
            style={{ color: activePartner.color }}
          >
            {(currentSlide + 1).toString().padStart(2, "0")}
          </span>
          <span className="text-gray-400 text-xs sm:text-sm">/</span>
          <span className="text-gray-400 text-xs sm:text-sm">
            {partners.length.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Active Partner Info - Responsive */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 tracking-wide">{activePartner.category}</p>
            <p 
              className="text-sm sm:text-base md:text-lg font-semibold transition-colors duration-300"
              style={{ color: activePartner.color }}
            >
              {activePartner.title}
            </p>
          </div>
          
          {/* Desktop Quick Navigation */}
          <div className="hidden sm:flex gap-2 mt-2 sm:mt-0">
            {partners.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-orange-500 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylishPartnerSlider;