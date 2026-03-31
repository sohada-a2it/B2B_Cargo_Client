import RegisterPage from "@/components/auth/register/page";
import React from "react";

// 🔹 SEO metadata for Registration
export const metadata = {
  title: "Create Account | Cargo Logistics Group",
  description:
    "Join Cargo Logistics Group today. Create your customer account to access real-time shipment tracking, global logistics solutions, competitive shipping rates, and 24/7 customer support.",
  keywords: [
    "Cargo Logistics",
    "Create Account",
    "Register",
    "Sign Up",
    "Logistics Account",
    "Customer Registration",
    "Shipping Account",
    "Supply Chain Registration",
    "Global Logistics",
    "Freight Registration",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/auth/register",
  },
  openGraph: {
    title: "Create Account | Cargo Logistics Group",
    description:
      "Join Cargo Logistics Group today. Create your customer account to access real-time shipment tracking, global logistics solutions, competitive shipping rates, and 24/7 customer support.",
    url: "https://client.cargologisticscompany.com/auth/register",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-register.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Create Account",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Account | Cargo Logistics Group",
    description:
      "Join Cargo Logistics Group today. Create your customer account to access real-time shipment tracking and global logistics solutions.",
    images: ["/og-register.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <RegisterPage />

      {/* 🔹 Schema Markup for Registration Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Create Account",
            description:
              "Join Cargo Logistics Group today. Create your customer account to access real-time shipment tracking, global logistics solutions, competitive shipping rates, and 24/7 customer support.",
            url: "https://client.cargologisticscompany.com/auth/register",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "WebPageElement",
              name: "Registration Form",
              description: "Multi-step customer registration form for logistics account access",
            },
            potentialAction: {
              "@type": "Action",
              name: "Register",
              description: "Create new customer account for logistics services",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://client.cargologisticscompany.com/auth/register",
                actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
              },
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Registration */}
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
                name: "Create Account",
                item: "https://client.cargologisticscompany.com/auth/register",
              },
            ],
          }),
        }}
      />
    </>
  );
}