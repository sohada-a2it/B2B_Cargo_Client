'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Navbar from "@/components/common/navbar";
import Topbar from "@/components/common/topbar";
import Footer from "@/components/common/footer";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PageTransition from "@/components/common/PageTransition";

// Component that uses usePathname and useSearchParams
function LayoutContent({ children }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef(pathname);
  const lastSearchRef = useRef(searchParams?.toString());

  // Navigation loading - clean up on route change
  useEffect(() => {
    const currentPath = pathname;
    const currentSearch = searchParams?.toString();
    
    // Check if navigation actually changed
    const hasChanged = lastPathRef.current !== currentPath || 
                       lastSearchRef.current !== currentSearch;
    
    // Update refs
    lastPathRef.current = currentPath;
    lastSearchRef.current = currentSearch;
    
    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    
    // Only show loading if navigation actually changed
    if (hasChanged) {
      setIsNavigating(true);
      
      navigationTimeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
        navigationTimeoutRef.current = null;
      }, 300);
    } else {
      // Same page - ensure loading is false
      setIsNavigating(false);
    }

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
    let lastClickedUrl = null;

    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const currentUrl = window.location.pathname + window.location.search;
      const targetUrl = link.pathname + link.search;
      
      // If clicking the same page, prevent loading state
      if (targetUrl === currentUrl) {
        e.preventDefault();
        return;
      }

      if (isNavigating) {
        e.preventDefault();
        return;
      }

      // Prevent multiple rapid clicks on same link
      const now = Date.now();
      if (now - lastClickTime < 500 && lastClickedUrl === targetUrl) {
        e.preventDefault();
        return;
      }
      lastClickTime = now;
      lastClickedUrl = targetUrl;

      if (link.href && !link.target && !e.ctrlKey && !e.metaKey) {
        const isSameOrigin = link.origin === window.location.origin;
        const isHash = link.hash && link.pathname === window.location.pathname;
        const isNextLink = link.closest('[data-next-link]');
        
        if (isSameOrigin && !isHash && !isNextLink) {
          e.preventDefault();
          
          if (clickTimeout) {
            clearTimeout(clickTimeout);
          }
          
          setIsNavigating(true);
          
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

  return (
    <>
      {isNavigating && <LoadingSpinner fullScreen />}
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

// Main ClientLayout component with Suspense boundary
export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // Initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Reduced from 500ms to 200ms for better performance

    return () => clearTimeout(timer);
  }, []);

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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E67E22]"></div>
      </div>
    }>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}

// Skeleton Components (keep them as they are)
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
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>

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