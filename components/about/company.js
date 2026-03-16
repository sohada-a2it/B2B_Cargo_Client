"use client";
import Image from "next/image";
import { FaHeadset, FaShieldAlt, FaDollarSign, FaCogs } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { HiChevronRight } from 'react-icons/hi';
import CountUp from "react-countup";

// Why Choose Us Features Data
const features = [
  {
    id: "01",
    title: "Advanced Technology",
    desc: "Shrinking from toil and pain these cases are perfectly simple.",
    icon: <FaCogs />,
    position: "left",
  },
  {
    id: "02",
    title: "Experts Support",
    desc: "The claims of duty or the obligation of business it will frequently.",
    icon: <FaHeadset />,
    position: "right",
  },
  {
    id: "03",
    title: "Cost-Effective",
    desc: "Right to find fault with a chooses to a pleasure consequences.",
    icon: <FaDollarSign />,
    position: "left",
  },
  {
    id: "04",
    title: "Commitment to Safety",
    desc: "Shrinking from toil and pain these all cases are perfectly simple.",
    icon: <FaShieldAlt />,
    position: "right",
  },
];

// Why Choose Us Component
function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-[#FD5621] font-semibold tracking-widest">
          WHY CHOOSE US
        </p>

        <h2 className="text-4xl font-bold text-[#122652] mt-2 mb-16">
          Why We’re the Right Choice
        </h2>

        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-10">
            {features
              .filter((item) => item.position === "left")
              .map((item) => (
                <Card key={item.id} item={item} align="right" />
              ))}
          </div>

          {/* CENTER IMAGE */}
          <div className="relative flex justify-center">
            <div className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-gray-300 animate-spin-slow"></div>

            <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="/images/choose.jpg"
                alt="worker"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-10">
            {features
              .filter((item) => item.position === "right")
              .map((item) => (
                <Card key={item.id} item={item} align="left" />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ item, align }) {
  return (
    <div
      className={`group relative bg-[#122652] text-white p-6 rounded-xl 
      transition duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]`}
    >
      {/* Number */}
      <span className="text-[#FD5621] font-bold text-lg">{item.id}</span>

      <h3 className="text-xl font-semibold mt-2 group-hover:text-[#FD5621] transition">
        {item.title}
      </h3>

      <p className="text-gray-300 text-sm mt-2">{item.desc}</p>

      {/* Icon */}
      <div
        className={`absolute -top-6 ${
          align === "right" ? "-right-6" : "-left-6"
        } bg-white text-[#FD5621] w-14 h-14 rounded-lg flex items-center justify-center text-xl shadow-lg 
        transition group-hover:scale-110`}
      >
        {item.icon}
      </div>
    </div>
  );
}

// Interesting Facts Component
const InterestingFacts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const facts = [
    {
      id: 1,
      title: 'WAREHOUSE SPACE',
      value: '400k',
      numericValue: 400,
      unit: 'k ft²',
      description: 'Strategic storage & distribution network across major cities',
      icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4'
    },
    {
      id: 2,
      title: 'ON-TIME DELIVERY',
      value: '98',
      numericValue: 98,
      unit: '%',
      description: 'Industry-leading precision delivery performance',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      id: 3,
      title: 'WEEKLY SHIPMENTS',
      value: '5K',
      numericValue: 5,
      unit: 'K+',
      description: 'Shipments processed with real-time tracking',
      icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
    },
    {
      id: 4,
      title: 'INDUSTRY AWARDS',
      value: '25',
      numericValue: 25,
      unit: '+',
      description: 'Recognition for excellence & innovation',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-6 overflow-hidden">  
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
        {/* Stats Grid with Glass Morphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, index) => (
            <div
              key={fact.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon with Gradient Background */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative w-14 h-14 bg-primary rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <svg 
                    className="w-7 h-7 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={fact.icon} />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 group-hover:text-fourth transition-colors duration-300">
                {fact.title}
              </h3>

              {/* Animated Counter */}
              <div className="flex items-baseline mb-4">
                <Counter 
                  value={fact.numericValue} 
                  isVisible={isVisible} 
                  duration={2000}
                />
                {fact.unit && (
                  <span className="text-2xl font-bold text-gray-800 ml-1 bg-gradient-to-r from-primary to-fourth text-transparent bg-clip-text">
                    {fact.unit}
                  </span>
                )}
              </div>

              {/* Description with Icon */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {fact.description}
              </p>

              {/* Progress Bar */}
              <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-fourth rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: isVisible ? `${(fact.numericValue / (fact.id === 2 ? 100 : fact.id === 1 ? 500 : fact.id === 3 ? 10 : 50)) * 100}%` : '0%'
                  }}
                ></div>
              </div>
            </div>
          ))}
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
    </section>
  );
};

// Counter Component
const Counter = ({ value, isVisible, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return (
    <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">
      {count}
    </span>
  );
};

// Testimonials Component
const TestimonialsSection = () => {
  const colors = {
    primary: "#FD5621",
    secondary: "#122652",
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      image: "/images/team (1).jpg",
      name: "John Doe",
      role: "CEO, Company Inc.",
      title: "Excellent Service!",
      content: "They provided outstanding logistics support for our global supply chain. Highly reliable and professional.",
    },
    {
      image: "/images/team (2).jpg",
      name: "Jane Smith",
      role: "Operations Manager",
      title: "Smooth & Efficient",
      content: "The team handled everything seamlessly. We saved time and costs with their expertise.",
    },
    {
      image: "/images/team (3).jpg",
      name: "Mike Johnson",
      role: "Supply Chain Lead",
      title: "Trusted Partner",
      content: "We've worked together for years. They consistently deliver excellence.",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const next = () => setActiveIndex((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  const active = testimonials[activeIndex];

  return (
    <div className="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: colors.primary }}
      />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold" style={{ color: colors.secondary }}>
           Board Members
          </h2>

          <div className="text-xl font-bold">
            <span style={{ color: colors.primary }}>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-gray-400">
              /{String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="h-1.5 bg-gray-200 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
              background: colors.primary,
            }}
          />
        </div>

        {/* 3 Cards Grid with larger images */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(activeIndex, activeIndex + 3).map((testimonial, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="relative w-24 h-24 mb-3">
                  <div
                    className="absolute inset-0 rounded-full animate-spin-slow"
                    style={{
                      border: `2px dashed ${colors.primary}`,
                    }}
                  />
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full rounded-full object-cover border-3 border-white shadow-lg"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: colors.secondary }}>
                    {testimonial.name}
                  </h3>
                  <p className="text-sm font-semibold tracking-wide" style={{ color: colors.primary }}>
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -top-4 left-0 text-5xl opacity-10" style={{ color: colors.secondary }}>
                  “
                </span>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3 pl-4">
                  {testimonial.content}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm" style={{ color: colors.primary }}>★</span>
                  ))}
                </div>
                <div className="w-16 h-1 rounded-full" style={{ background: colors.primary }} />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full shadow-lg bg-white hover:scale-110 transition text-lg hover:shadow-xl"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-6 py-2 rounded-full bg-gray-100 text-sm font-semibold hover:bg-gray-200 transition"
          >
            {isAutoPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full shadow-lg bg-white hover:scale-110 transition text-lg hover:shadow-xl"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

// Main Component
export default function OurCompany() {
  return (
    <div>
      {/* Banner Section */}
      <div 
        className="min-h-[300px] bg-cover bg-center bg-no-repeat relative mx-6"
        style={{
          backgroundImage: "url('/images/aboutBanner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-8">
          <nav className="flex items-center text-sm font-medium text-white" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="hover:text-primary transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <HiChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </li>
              <li className="text-primary font-semibold" aria-current="page">
                Our Company
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/about1.jpg"
                alt="Cargo Ship"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-12 right-8 border-8 border-orange-500 rounded-xl overflow-hidden shadow-xl w-[70%]">
              <img
                src="/images/about2.jpg"
                alt="Workers"
                className="w-full h-[300px] object-cover"
              />
            </div>

            <div className="absolute top-6 right-6 w-36 h-36">
              <div className="relative w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="absolute w-full h-full animate-[spin_12s_linear_infinite]">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <text fill="white" fontSize="14" fontWeight="600" letterSpacing="2">
                    <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                      MOVING GOODS • BUILDING RELATIONSHIPS •
                    </textPath>
                  </text>
                </svg>
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="w-80 h-80 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <p className="text-primary font-semibold uppercase tracking-widest mb-4">
              About Us
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-fourth leading-tight mb-6">
              Building Trust <br /> Through Excellence
            </h2>
            <p className="text-gray-600 mb-8">
              When our power choice is untrammelled and when nothing prevents being able 
              to do what we like best, every pleasure is to be welcomed and every pain 
              avoided. But in certain circumstances and owing to the claims of duty.
            </p>
            <div className="space-y-6 mb-10">
              <div>
                <h4 className="text-xl font-semibold text-fourth">Mission</h4>
                <p className="text-gray-500">Uncover Our Core Purpose.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-fourth">Vision</h4>
                <p className="text-gray-500">Discover Our Future Goals.</p>
              </div>
            </div>
            <div className="bg-fourth text-white p-8 rounded-xl w-full max-w-sm shadow-xl">
              <p className="uppercase text-sm tracking-widest text-gray-300 mb-4">
                Industry Awards
              </p>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-primary">
                  <CountUp end={25} duration={3} enableScrollSpy scrollSpyDelay={200} />+
                </span>
              </div>
              <p className="mt-4 text-gray-300">
                Industry awards in the past decade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Interesting Facts Section */}
      <InterestingFacts />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
}