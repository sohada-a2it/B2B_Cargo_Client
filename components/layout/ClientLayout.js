'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Navbar from "@/components/common/navbar";
import Topbar from "@/components/common/topbar";
import Footer from "@/components/common/footer";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PageTransition from "@/components/common/PageTransition";

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Navigation loading - clean up on route change
  useEffect(() => {
    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    setIsNavigating(true);
    
    // Set new timeout
    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
      navigationTimeoutRef.current = null;
    }, 300);

    // Cleanup on unmount or before next effect
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
    };
  }, [pathname, searchParams]);

  // Handle all link clicks with debounce
  useEffect(() => {
    let clickTimeout = null;
    let lastClickTime = 0;

    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      // Skip if already navigating
      if (isNavigating) {
        e.preventDefault();
        return;
      }

      // Prevent multiple rapid clicks
      const now = Date.now();
      if (now - lastClickTime < 500) {
        e.preventDefault();
        return;
      }
      lastClickTime = now;

      if (link.href && !link.target && !e.ctrlKey && !e.metaKey) {
        const isSameOrigin = link.origin === window.location.origin;
        const isHash = link.hash && link.pathname === window.location.pathname;
        const isNextLink = link.closest('[data-next-link]');
        
        if (isSameOrigin && !isHash && !isNextLink) {
          e.preventDefault(); // Prevent default navigation temporarily
          
          // Clear any existing timeout
          if (clickTimeout) {
            clearTimeout(clickTimeout);
          }
          
          // Set navigating state
          setIsNavigating(true);
          
          // Navigate after a tiny delay
          clickTimeout = setTimeout(() => {
            window.location.href = link.href;
          }, 100);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
    };
  }, [isNavigating]);

  // Show initial loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopbarSkeleton />
        <NavbarSkeleton />
        <ContentSkeleton />
        <FooterSkeleton />
      </div>
    );
  }

  return (
    <>
      {/* Global navigation spinner */}
      {isNavigating && <LoadingSpinner fullScreen />}
      
      {/* Page transition wrapper */}
      <PageTransition>
        <div className="flex flex-col min-h-screen">
          <Topbar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}

// Skeleton Components (unchanged)
function TopbarSkeleton() {
  return (
    <div className="w-full bg-gradient-to-r from-[#E67E22] to-[#3C719D] h-10 animate-pulse"></div>
  );
}

function NavbarSkeleton() {
  return (
    <div className="w-full bg-white shadow-sm h-16 flex items-center px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="hidden md:flex items-center space-x-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

function ContentSkeleton() {
  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Title */}
        <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-100 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-100 rounded animate-pulse"></div>
                <div className="w-4/6 h-4 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterSkeleton() {
  return (
    <footer className="w-full bg-gray-900 h-48 animate-pulse"></footer>
  );
}