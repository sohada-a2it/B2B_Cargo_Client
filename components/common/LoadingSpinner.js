'use client';

export default function LoadingSpinner({ fullScreen = false, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinner = (
    <div className="relative">
      {/* Outer ring */}
      <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}></div>
      {/* Spinning ring */}
      <div className={`${sizeClasses[size]} border-4 border-[#E67E22] rounded-full border-t-transparent animate-spin absolute top-0 left-0`}></div>
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 bg-[#E67E22] rounded-full"></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
        <div className="text-center">
          {spinner}
          <p className="mt-4 text-gray-600 font-medium animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return spinner;
}