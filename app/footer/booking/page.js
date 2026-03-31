// app/footer/booking/page.jsx
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import RequestQuote from "@/components/home/quote";

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-[#E67E22]" />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RequestQuote />
    </Suspense>
  );
}