import VerifyOTPPage from "@/components/auth/verify-otp/page";
import React from "react";

// 🔹 SEO metadata for Verify OTP
export const metadata = {
  title: "Verify Email | Cargo Logistics Group",
  description:
    "Verify your email address to complete your Cargo Logistics Group account registration. Enter the 6-digit verification code sent to your email to activate your account and access logistics services.",
  keywords: [
    "Cargo Logistics",
    "Verify Email",
    "OTP Verification",
    "Email Verification",
    "Account Activation",
    "Verify OTP",
    "Registration Complete",
    "Logistics Account",
    "Customer Verification",
    "Secure Login",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/auth/verify-otp",
  },
  openGraph: {
    title: "Verify Email | Cargo Logistics Group",
    description:
      "Verify your email address to complete your Cargo Logistics Group account registration. Enter the 6-digit verification code sent to your email to activate your account.",
    url: "https://client.cargologisticscompany.com/auth/verify-otp",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-verify-otp.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Verify Email",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Email | Cargo Logistics Group",
    description:
      "Verify your email address to complete your Cargo Logistics Group account registration. Enter the 6-digit verification code sent to your email.",
    images: ["/og-verify-otp.jpg"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <VerifyOTPPage />

      {/* 🔹 Schema Markup for Verify OTP Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Verify Email",
            description:
              "Verify your email address to complete your Cargo Logistics Group account registration. Enter the 6-digit verification code sent to your email to activate your account.",
            url: "https://client.cargologisticscompany.com/auth/verify-otp",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "WebPageElement",
              name: "OTP Verification Form",
              description: "6-digit verification code entry form for email confirmation",
            },
            potentialAction: {
              "@type": "Action",
              name: "Verify Email",
              description: "Complete registration by verifying email address with OTP",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://client.cargologisticscompany.com/auth/verify-otp",
                actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
              },
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Verify OTP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://client.cargologisticscompany.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Authentication",
                item: "https://client.cargologisticscompany.com/auth",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Registration",
                item: "https://client.cargologisticscompany.com/auth/register",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Verify Email",
                item: "https://client.cargologisticscompany.com/auth/verify-otp",
              },
            ],
          }),
        }}
      />
    </>
  );
}