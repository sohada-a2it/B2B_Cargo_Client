'use client';

import { useEffect, useState } from 'react';

export default function LoadingSpinner({ 
  fullScreen = false, 
  size = 'md', 
  timeout = 10000,
  message = 'Loading...',
  showProgress = true
}) {
  const [showTimeout, setShowTimeout] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Progress animation for better UX
  useEffect(() => {
    if (!showProgress) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [showProgress]);
  
  // Timeout handler
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeout(true);
      setProgress(100);
    }, timeout);
    
    return () => clearTimeout(timer);
  }, [timeout]);
  
  const sizeClasses = {
    sm: {
      container: 'w-12 h-12',
      ring: 'w-12 h-12',
      dot: 'w-1.5 h-1.5'
    },
    md: {
      container: 'w-16 h-16',
      ring: 'w-16 h-16',
      dot: 'w-2 h-2'
    },
    lg: {
      container: 'w-24 h-24',
      ring: 'w-24 h-24',
      dot: 'w-2.5 h-2.5'
    },
    xl: {
      container: 'w-32 h-32',
      ring: 'w-32 h-32',
      dot: 'w-3 h-3'
    }
  };

  const spinner = (
    <div className="relative">
      {/* Outer ring with gradient */}
      <div className={`${sizeClasses[size].ring} rounded-full`}>
        <div className="w-full h-full rounded-full bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#E67E22] animate-pulse opacity-20"></div>
      </div>
      
      {/* Spinning ring */}
      <div className={`absolute top-0 left-0 ${sizeClasses[size].ring}`}>
        <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="70 200"
            strokeDashoffset="0"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E67E22" />
              <stop offset="50%" stopColor="#F39C12" />
              <stop offset="100%" stopColor="#E67E22" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Center pulsing dot */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
        <div className={`${sizeClasses[size].dot} bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-full animate-ping`}></div>
        <div className={`${sizeClasses[size].dot} bg-[#E67E22] rounded-full absolute top-0 left-0 animate-pulse`}></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 backdrop-blur-md z-[9999] flex items-center justify-center">
        <div className="relative">
          {/* Animated background circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-64 h-64 bg-orange-200 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute w-48 h-48 bg-orange-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute w-32 h-32 bg-orange-400 rounded-full opacity-20 animate-bounce"></div>
          </div>
          
          {/* Main content */}
          <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 min-w-[320px] text-center border border-orange-100">
            {spinner}
            
            {/* Progress bar */}
            {showProgress && (
              <div className="mt-6 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#E67E22] to-[#F39C12] h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            
            {/* Message */}
            <p className="mt-4 text-gray-700 font-medium">
              {showTimeout ? 'Taking longer than expected...' : message}
            </p>
            
            {/* Tips for better experience */}
            {showTimeout && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500">
                  This might take a few moments due to:
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Large content loading</li>
                  <li>• Network connection speed</li>
                  <li>• Server response time</li>
                </ul>
              </div>
            )}
            
            {/* Reload button */}
            {showTimeout && (
              <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reload Page
                </span>
              </button>
            )}
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-2 left-2 w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-100"></div>
              <div className="absolute top-1/2 right-4 w-1 h-1 bg-orange-200 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-block">
      {spinner}
    </div>
  );
}