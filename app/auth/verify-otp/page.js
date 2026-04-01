// app/auth/verify-otp/page.jsx (or wherever this component is)
import { Suspense } from 'react';
import VerifyOTPPage from "@/components/auth/verify-otp/page"  

export default function Page() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E67E22]"></div>
      </div>
    }>
      <VerifyOTPPage />
    </Suspense>
  );
}