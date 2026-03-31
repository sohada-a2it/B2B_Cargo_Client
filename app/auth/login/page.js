import LoginPage from "@/components/auth/login/page";
import React from "react";

// 🔹 SEO metadata for Login
export const metadata = {
  title: "Customer Login | Cargo Logistics Group",
  description:
    "Login to your Cargo Logistics Group customer account. Track shipments in real-time, manage your logistics operations, access digital documents, and enjoy seamless supply chain management.",
  keywords: [
    "Cargo Logistics",
    "Customer Login",
    "Login Portal",
    "Logistics Account",
    "Shipment Tracking",
    "Supply Chain Login",
    "Cargo Management",
    "Digital Logistics",
    "Account Access",
    "Real-time Tracking",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/auth/login",
  },
  openGraph: {
    title: "Customer Login | Cargo Logistics Group",
    description:
      "Login to your Cargo Logistics Group customer account. Track shipments in real-time, manage your logistics operations, access digital documents, and enjoy seamless supply chain management.",
    url: "https://client.cargologisticscompany.com/auth/login",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-login.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Customer Login",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Login | Cargo Logistics Group",
    description:
      "Login to your Cargo Logistics Group customer account. Track shipments in real-time and manage your logistics operations.",
    images: ["/og-login.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <LoginPage />

      {/* 🔹 Schema Markup for Login Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Customer Login",
            description:
              "Login to your Cargo Logistics Group customer account. Track shipments in real-time, manage your logistics operations, access digital documents, and enjoy seamless supply chain management.",
            url: "https://client.cargologisticscompany.com/auth/login",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "WebPageElement",
              name: "Login Form",
              description: "Secure customer login portal with email and password authentication",
            },
            potentialAction: {
              "@type": "Action",
              name: "Login",
              description: "Customer authentication for logistics account access",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://client.cargologisticscompany.com/auth/login",
                actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
              },
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Login */}
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
                name: "Customer Login",
                item: "https://client.cargologisticscompany.com/auth/login",
              },
            ],
          }),
        }}
      />
    </>
  );
}