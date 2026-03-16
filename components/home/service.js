// components/ServicesSection.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const ServicesSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "Land Transport",
      description: "With a worldwide organization and progressed coordination arrangements, our airship cargo sending items.",
      points: ["Part & Full Loads", "Multimodal Solutions", "Intermodal Solutions"],
      image: "/images/service1.jpg",
      icon: "fa-truck",
      gradient: "from-amber-500 to-orange-500",
      color: "#FD5621",
      bgGradient: "from-amber-500/10 to-orange-500/10",
      stats: { shipments: "10K+", countries: "50+", satisfaction: "98%" }
    },
    {
      id: 2,
      title: "Air Freight",
      description: "We help transport your load anyplace on the planet, making your business run easily regardless of where products.",
      points: ["General Air Freight Products", "Charter Services", "Intermodal Solutions"],
      image: "/images/service2.jpg",
      icon: "fa-plane",
      gradient: "from-sky-500 to-blue-500",
      color: "#0EA5E9",
      bgGradient: "from-sky-500/10 to-blue-500/10",
      stats: { shipments: "5K+", countries: "30+", satisfaction: "96%" }
    },
    {
      id: 3,
      title: "Ocean Freight",
      description: "Sea cargo dispatches in excess of 5,500 holders per day to ports all around the globe, making us a top forwarder.",
      points: ["Less-than-container Load", "Full Container Load", "Intermodal Solutions"],
      image: "/images/service3.jpg",
      icon: "fa-ship",
      gradient: "from-cyan-500 to-teal-500",
      color: "#06B6D4",
      bgGradient: "from-cyan-500/10 to-teal-500/10",
      stats: { shipments: "15K+", countries: "80+", satisfaction: "97%" }
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 px-4 md:px-8 lg:px-16 min-h-screen overflow-hidden bg-white">
      
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic Gradient Orbs */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#FD5621]/10 via-purple-600/10 to-blue-600/10 blur-3xl"
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
        
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-emerald-600/10 blur-3xl"
          style={{
            right: `${mousePosition.x * 0.03}px`,
            bottom: `${mousePosition.y * 0.03}px`,
            transform: 'translate(50%, 50%)',
          }}
        ></div>

        {/* Elegant Grid Pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        ></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#FD5621' : i % 3 === 1 ? '#0EA5E9' : '#06B6D4',
              opacity: 0.2,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 20}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          {/* Decorative Top Line */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#FD5621] to-transparent"></div>
            <span className="text-sm tracking-[0.3em] text-third font-light">OUR SERVICES</span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#FD5621] to-transparent"></div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-gray-300 to-third bg-clip-text text-transparent">
              Explore Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#FD5621] via-orange-500 to-[#FD5621] bg-clip-text text-transparent">
              Premium Services
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transmax is the world's driving worldwide coordinations provider — 
            we uphold industry and exchange the worldwide exchange of merchandise through land transport.
          </p>

          {/* Decorative Elements */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32">
            <div className="absolute inset-0 border-2 border-[#FD5621]/20 rounded-full animate-ping-slow"></div>
            <div className="absolute inset-4 border-2 border-blue-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative rounded-3xl overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card Container */}
              <div className="relative h-[550px]"> {/* Fixed height, no hover change */}
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 2}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30`}></div>
                  
                  {/* Color Accent Overlay */}
                  <div 
                    className="absolute inset-0 mix-blend-overlay opacity-30"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}40, transparent)`
                    }}
                  ></div>
                </div>

                {/* Decorative Border */}
                <div 
                  className="absolute inset-0 rounded-3xl border border-white/10"
                  style={{
                    boxShadow: `0 0 30px ${service.color}20`
                  }}
                ></div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Icon with Glow Effect */}
                    <div className="relative mb-6">
                      <div 
                        className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-3xl"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}30, ${service.color}60)`,
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${service.color}80`,
                          boxShadow: `0 10px 30px ${service.color}40`
                        }}
                      >
                        {/* Animated Background */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-20 rounded-2xl`}></div>
                        
                        {/* Rotating Ring */}
                        <div 
                          className="absolute inset-0 rounded-2xl border border-dashed animate-spin-slow"
                          style={{ borderColor: `${service.color}40` }}
                        ></div>
                        
                        <i className={`fas ${service.icon} relative z-10 text-white`}></i>
                      </div>

                      {/* Glow Effect */}
                      <div 
                        className="absolute -inset-3 rounded-2xl opacity-50 blur-xl"
                        style={{
                          background: `radial-gradient(circle at center, ${service.color} 0%, transparent 70%)`,
                        }}
                      ></div>

                      {/* Service Number */}
                      <div 
                        className="absolute -top-4 -right-4 text-8xl font-bold opacity-10"
                        style={{ color: service.color }}
                      >
                        {service.id.toString().padStart(2, '0')}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold mb-3">
                      <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.title}
                      </span>
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-gray-300 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Points List */}
                    <ul className="space-y-3 mb-6">
                      {service.points.map((point, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="relative flex items-center justify-center w-6 h-6 mr-3">
                            <span 
                              className="absolute inset-0 rounded-full animate-ping-slow opacity-50"
                              style={{
                                background: `radial-gradient(circle at center, ${service.color}, transparent)`
                              }}
                            ></span>
                            <i 
                              className="fas fa-check-circle text-sm relative z-10"
                              style={{ color: service.color }}
                            ></i>
                          </span>
                          <span className="text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/5">
                      {Object.entries(service.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-xl font-bold" style={{ color: service.color }}>{value}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Explore Button */}
                    {/* <button className="w-full group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}40, ${service.color}60)`
                        }}
                      ></div>
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative flex items-center justify-between px-6 py-3">
                        <span className="text-white font-semibold tracking-wider">EXPLORE SERVICE</span>
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:rotate-45"
                          style={{
                            background: `linear-gradient(135deg, ${service.color}, ${service.color}80)`,
                          }}
                        >
                          <i className="fas fa-arrow-right text-white text-sm"></i>
                        </div>
                      </div>
                    </button> */}
                  </div>
                </div>

                {/* Corner Decorations */}
                <div 
                  className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 opacity-50"
                  style={{ borderColor: service.color }}
                ></div>
                <div 
                  className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 opacity-50"
                  style={{ borderColor: service.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-16 flex justify-center items-center gap-4">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#FD5621] to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-[#FD5621] animate-pulse"></div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(100px, -100px);
          }
          50% {
            transform: translate(200px, 0);
          }
          75% {
            transform: translate(100px, 100px);
          }
        }

        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 25s infinite ease-in-out;
        }

        .animate-ping-slow {
          animation: ping-slow 3s infinite cubic-bezier(0, 0, 0.2, 1);
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;