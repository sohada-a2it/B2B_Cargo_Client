// app/components/states.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Headphones, TrendingDown } from 'lucide-react';

export default function States() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [counters, setCounters] = useState({
    satisfaction: 0,
    support: 0,
    reduction: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  const features = [
    {
      id: 1,
      title: "Advanced Technology",
      description: "Shrinking from toil and pain these cases are perfectly simple.",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-orange-500/20 to-orange-500/5"
    },
    {
      id: 2,
      title: "Experts Support",
      description: "The claims of duty or the obligations business it will frequently.",
      icon: <Headphones className="w-8 h-8" />,
      color: "from-blue-900/20 to-blue-900/5"
    },
    {
      id: 3,
      title: "Cost-Effective",
      description: "Right to find fault with a chooses to a pleasure consequences.",
      icon: <TrendingDown className="w-8 h-8" />,
      color: "from-orange-500/10 to-blue-900/5"
    }
  ];

  // Intersection Observer for counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate counters
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepDuration = duration / steps;
            
            const targets = {
              satisfaction: 99,
              support: 24, // Changed from 24/7 to 24 for counting
              reduction: 50
            };
            
            let step = 0;
            const interval = setInterval(() => {
              step++;
              const progress = step / steps;
              
              setCounters({
                satisfaction: Math.floor(easeOutCubic(progress) * targets.satisfaction),
                support: Math.floor(easeOutCubic(progress) * targets.support),
                reduction: Math.floor(easeOutCubic(progress) * targets.reduction)
              });
              
              if (step >= steps) {
                clearInterval(interval);
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Easing function for smooth animation
  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-orange-500">Our Solutions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We provide cutting-edge solutions with a perfect blend of technology and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`relative group cursor-pointer ${
                activeFeature === index ? 'transform scale-105' : ''
              }`}
              onClick={() => setActiveFeature(index)}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 p-8 h-full">
                  <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center ${
                    index === 0 ? 'bg-orange-500/10 text-orange-500' :
                    index === 1 ? 'bg-blue-900/10 text-blue-900' :
                    'bg-gradient-to-r from-orange-500/10 to-blue-900/10 text-orange-500'
                  }`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* <button className={`flex items-center text-sm font-semibold ${
                    index === 0 ? 'text-orange-500 hover:text-orange-600' :
                    index === 1 ? 'text-blue-900 hover:text-blue-800' :
                    'text-orange-500 hover:text-orange-600'
                  } transition-colors duration-300`}>
                    Learn More
                    <svg 
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button> */}
                </div>

                <div className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  index === 0 ? 'border-orange-500/20' :
                  index === 1 ? 'border-blue-900/20' :
                  'border-orange-500/10'
                }`} />
              </div>

              {activeFeature === index && (
                <div className="absolute -top-3 -right-3">
                  <div className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                    index === 0 ? 'bg-orange-500' :
                    index === 1 ? 'bg-blue-900' :
                    'bg-gradient-to-r from-orange-500 to-blue-900'
                  }`}>
                    Popular
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Counter Section */}
        <div ref={statsRef} className="mt-16 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-900/5 rounded-3xl -rotate-1"></div>
          
          {/* Main Stats Card */}
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200/50">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900">
                Our <span className="text-orange-500">Impact</span> in Numbers
              </h3>
              <p className="text-gray-600 mt-2">Real-time statistics that speak volumes</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Client Satisfaction */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-500/5 flex items-center justify-center">
                      <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      <span className="text-orange-500">{counters.satisfaction}</span>%
                    </div>
                    <div className="text-gray-700 font-medium">Client Satisfaction</div>
                    <p className="text-gray-500 text-sm mt-2">Based on 500+ reviews</p>
                  </div>
                  {/* Animated Progress Bar */}
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000"
                        style={{ width: `${counters.satisfaction}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                {/* Floating Element */}
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  TOP
                </div>
              </div>

              {/* Expert Support */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-900/20 to-blue-900/5 flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                      <span className="text-blue-900">{counters.support}</span>
                      <span className="text-2xl text-gray-600 ml-1">/7</span>
                    </div>
                    <div className="text-gray-700 font-medium">Expert Support</div>
                    <p className="text-gray-500 text-sm mt-2">Round the clock assistance</p>
                  </div>
                  {/* Support Badge */}
                  <div className="mt-4 inline-flex items-center justify-center w-full">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                      Always Available
                    </span>
                  </div>
                </div>
                {/* Pulsing Dot */}
                <div className="absolute -top-2 -right-2">
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full absolute top-0 left-0"></div>
                  </div>
                </div>
              </div>

              {/* Cost Reduction */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-500/5 flex items-center justify-center">
                      <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      <span className="text-orange-500">{counters.reduction}</span>%
                    </div>
                    <div className="text-gray-700 font-medium">Cost Reduction</div>
                    <p className="text-gray-500 text-sm mt-2">Average savings per client</p>
                  </div>
                  {/* Savings Badge */}
                  <div className="mt-4">
                    <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-medium px-3 py-2 rounded-lg">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Smart Savings
                    </div>
                  </div>
                </div>
                {/* Ribbon */}
                <div className="absolute -top-3 right-4">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-t-lg">
                    SAVE
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div> 
      </div>
    </div>
  );
}