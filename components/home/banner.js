"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Truck, Clock, Shield, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  const primaryColor = '#246092';
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // স্লাইড ডেটা - প্রতিটি slide-এর জন্য আলাদা text content
  const slides = [
    {
      id: 1,
      image: '/banner/banner1.png',
      title: 'Cargo For Growth',
      subtitle: 'Moving Your Cargo, Moving Your Business Forward.',
      description: 'Trusted logistics for seamless, cross-border deliveries worldwide. We ensure your goods reach safely and on time.',
      features: [
        { icon: <Truck className="w-5 h-5" />, text: 'Fast Delivery' },
        { icon: <Clock className="w-5 h-5" />, text: '24/7 Tracking' },
        { icon: <Shield className="w-5 h-5" />, text: 'Fully Insured' }
      ],
      ctaText: 'Start Shipping'
    },
    {
      id: 2,
      image: '/banner/banner2.png',
      title: 'Global Logistics',
      subtitle: 'Connecting Markets Across Borders.',
      description: 'Efficient supply chain solutions for international trade. Expand your business globally with our network.',
      features: [
        { icon: <Truck className="w-5 h-5" />, text: 'Sea Freight' },
        { icon: <Clock className="w-5 h-5" />, text: 'Customs Clearance' },
        { icon: <Shield className="w-5 h-5" />, text: 'Secure Handling' }
      ],
      ctaText: 'Explore Services'
    },
    {
      id: 3,
      image: '/banner/banner3.png',
      title: 'Secure Transport',
      subtitle: 'Safe & Timely Deliveries Guaranteed.',
      description: 'Advanced tracking and insurance for complete peace of mind. Your cargo is our priority.',
      features: [
        { icon: <Truck className="w-5 h-5" />, text: 'Air Cargo' },
        { icon: <Clock className="w-5 h-5" />, text: 'Real-Time Updates' },
        { icon: <Shield className="w-5 h-5" />, text: 'Risk Coverage' }
      ],
      ctaText: 'Get Protected'
    }
  ];

  const activeContent = slides[activeSlide];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.realIndex);
  };

  return (
    <div className="bg-white relative overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[500px]">
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-primary/10 to-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-gradient-to-r from-blue-100/30 to-primary/5 rounded-full blur-2xl" />
      </div> */}

      <div className="max-w-7xl mx-auto py-12 relative z-10">
        {/* Mobile View - Vertical Layout */}
        {isMobile ? (
          <div className="flex flex-col lg:hidden">
            {/* Mobile Swiper */}
            <div className="relative h-[350px] sm:h-[400px] rounded-2xl overflow-hidden shadow-xl mb-6">
              <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={800}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                  clickable: true,
                  el: '.mobile-pagination',
                }}
                onSlideChange={handleSlideChange}
                className="w-full h-full"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="mobile-pagination flex justify-center gap-1 absolute bottom-4 left-0 right-0 z-10" />
            </div>

            {/* Mobile Text Content - Swiper-এর সাথে sync হবে */}
            <div className="px-2 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-primary">Slide {activeSlide + 1}/{slides.length}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {activeContent.title}
              </h1>
              
              <h3 className="text-lg text-primary font-medium mt-3">
                {activeContent.subtitle}
              </h3>
              
              <p className="text-gray-600 mt-3">
                {activeContent.description}
              </p>

              {/* Mobile Features */}
              <div className="grid grid-cols-3 gap-3 py-6">
                {activeContent.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg mb-2">
                      <div className="text-primary">
                        {feature.icon}
                      </div>
                    </div>
                    <span className="text-xs text-center font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              {/* <button
                style={{ backgroundColor: primaryColor }}
                className="w-full py-4 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                <span>{activeContent.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button> */}
            </div>
          </div>
        ) : (
          /* Desktop View - Grid Layout */
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
            
            {/* Left - Dynamic Text Content (Swiper-এর সাথে sync হবে) */}
            <div className="pl-0 lg:pl-4 xl:pl-8 pl-6">
              {/* Slide Indicator */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-6 group hover:bg-primary/20 transition-all duration-300">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-primary">
                  {activeSlide + 1}/{slides.length} • {activeContent.title}
                </span>
              </div>

              {/* Dynamic Title */}
              <div className="relative h-[60px]">
                <h1 
                  key={activeSlide}
                  className="text-5xl xl:text-6xl font-bold text-gray-900 leading-tight absolute top-0 left-0 animate-slide-in"
                >
                  {activeContent.title}
                </h1>
              </div>

              {/* Dynamic Subtitle */}
              <div className="overflow-hidden h-[30px] mt-2">
                <h3 
                  key={activeSlide}
                  className="text-xl text-primary font-medium animate-slide-up"
                  style={{ animationDelay: '0.1s' }}
                >
                  {activeContent.subtitle}
                </h3>
              </div>
              
              {/* Dynamic Description */}
              <div className="h-[30px] mt-3">
                <p 
                  key={activeSlide}
                  className="text-gray-600 animate-fade-in"
                >
                  {activeContent.description}
                </p>
              </div>

              {/* Dynamic Features */}
              <div className="grid grid-cols-3 gap-4 py-8">
                {activeContent.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary transition-all duration-300">
                      <div className="text-primary group-hover:text-white transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                    <span className="font-medium text-gray-700 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic CTA Button */}
              <div className="flex gap-4 pt-2">
                {/* <button
                  style={{ backgroundColor: primaryColor }}
                  className="group px-8 py-4 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative">{activeContent.ctaText}</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-2 transition-transform duration-300" />
                </button> */}
                <a href="/service"> 
                <button className="px-6 py-4 bg-white text-gray-800 rounded-xl font-semibold border border-gray-300 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:bg-fourth hover:text-white">
                 View All Services
                </button>
                </a>
              </div>
            </div>

            {/* Right - Swiper Slider */}
            <div className="relative h-[400px]">
              {/* Navigation Buttons */}
              {/* <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 flex flex-col gap-2">
              <button
                ref={navigationPrevRef}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-primary" />
              </button>
            </div> */}
              
              {/* <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
                <button
                  ref={navigationNextRef}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-primary" />
                </button>
              </div> */}

              {/* Swiper Slider */}
              <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={800}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                pagination={{
                  clickable: true,
                  el: '.desktop-pagination',
                }}
                onInit={(swiper) => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                onSlideChange={handleSlideChange}
                className="w-full h-full overflow-hidden"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full">
                      {/* Floating elements */}
                      <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-blue-300/20 rounded-2xl rotate-12 animate-float-delayed" />
                      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-100/30 to-primary/10 rounded-3xl -rotate-12 animate-float-delayed-2" />
                      
                      {/* Main Image */}
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0  " />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Pagination */}
              <div className="desktop-pagination flex justify-center gap-2 mt-6" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;

// Animation styles
const styles = `
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) rotate(12deg); }
  50% { transform: translateY(-15px) rotate(12deg); }
}

@keyframes float-delayed-2 {
  0%, 100% { transform: translateY(0px) rotate(-12deg); }
  50% { transform: translateY(-25px) rotate(-12deg); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 7s ease-in-out infinite 1s;
}

.animate-float-delayed-2 {
  animation: float-delayed-2 9s ease-in-out infinite 2s;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

/* Swiper Custom Styles */
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: primary;
  opacity: 1;
  transition: all 0.3s ease;
}

.swiper-pagination-bullet-active {
  width: 24px;
  height: 8px;
  background: #246092 !important;
  border-radius: 4px;
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
  }
  
  .swiper-pagination-bullet-active {
    width: 20px;
    height: 6px;
  }
}

/* Tablet Responsive */
@media (min-width: 641px) and (max-width: 1023px) {
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
  }
  
  .swiper-pagination-bullet-active {
    width: 32px;
    height: 8px;
  }
}
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}