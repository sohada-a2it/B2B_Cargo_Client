'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Navbar from "@/components/common/navbar";
import Topbar from "@/components/common/topbar";
import Footer from "@/components/common/footer";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PageTransition from "@/components/common/PageTransition";

function LayoutContent({ children }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 150); // 150ms করে দিন
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      {isNavigating && <LoadingSpinner fullScreen />}
      <PageTransition>
        <div className="flex flex-col min-h-screen">
          <Topbar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}