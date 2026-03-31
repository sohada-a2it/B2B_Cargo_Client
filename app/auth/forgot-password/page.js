import ForgotPassword from "@/components/auth/forgot-password/page";
import React from "react";

// 🔹 SEO metadata for Forgot Password
export const metadata = {
  title: "Forgot Password | Cargo Logistics Group",
  description:
    "Reset your password for Cargo Logistics Group account. Enter your email to receive a verification code and create a new password to regain access to your logistics account.",
  keywords: [
    "Cargo Logistics",
    "Forgot Password",
    "Reset Password",
    "Password Recovery",
    "Account Recovery",
    "Login Help",
    "Password Reset",
    "Logistics Account",
    "Secure Login",
    "Account Access",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/auth/forgot-password",
  },
  openGraph: {
    title: "Forgot Password | Cargo Logistics Group",
    description:
      "Reset your password for Cargo Logistics Group account. Enter your email to receive a verification code and create a new password to regain access to your logistics account.",
    url: "https://client.cargologisticscompany.com/auth/forgot-password",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-forgot-password.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Forgot Password",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgot Password | Cargo Logistics Group",
    description:
      "Reset your password for Cargo Logistics Group account. Enter your email to receive a verification code and create a new password.",
    images: ["/og-forgot-password.jpg"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <ForgotPassword />

      {/* 🔹 Schema Markup for Forgot Password */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Forgot Password",
            description:
              "Reset your password for Cargo Logistics Group account. Enter your email to receive a verification code and create a new password to regain access to your logistics account.",
            url: "https://client.cargologisticscompany.com/auth/forgot-password",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "WebPageElement",
              name: "Password Reset Form",
              description: "Secure password recovery process with email verification and OTP authentication",
            },
            potentialAction: {
              "@type": "Action",
              name: "Reset Password",
              description: "Three-step password reset process including email verification, OTP confirmation, and new password creation",
            },
          }),
        }}
      />
    </>
  );
}