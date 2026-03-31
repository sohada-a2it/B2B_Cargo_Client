import TrackingPage from "@/components/trackingPage";
import React from "react";

// 🔹 SEO metadata for Track Shipment
export const metadata = {
  title: "Track Shipment | Cargo Logistics Group",
  description:
    "Track your shipment in real-time with Cargo Logistics Group. Enter your tracking number to get live updates on your cargo location, status, and estimated delivery time.",
  keywords: [
    "Cargo Logistics",
    "Track Shipment",
    "Tracking Number",
    "Shipment Tracking",
    "Cargo Tracking",
    "Freight Tracking",
    "Real-time Tracking",
    "Package Tracking",
    "Logistics Tracking",
    "Delivery Status",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/tracking",
  },
  openGraph: {
    title: "Track Shipment | Cargo Logistics Group",
    description:
      "Track your shipment in real-time with Cargo Logistics Group. Enter your tracking number to get live updates on your cargo location, status, and estimated delivery time.",
    url: "https://client.cargologisticscompany.com/tracking",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-tracking.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Track Shipment",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Track Shipment | Cargo Logistics Group",
    description:
      "Track your shipment in real-time with Cargo Logistics Group. Enter your tracking number for live updates.",
    images: ["/og-tracking.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <TrackingPage />

      {/* 🔹 Schema Markup for Tracking Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Track Shipment",
            description:
              "Track your shipment in real-time with Cargo Logistics Group. Enter your tracking number to get live updates on your cargo location, status, and estimated delivery time.",
            url: "https://client.cargologisticscompany.com/tracking",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "WebPageElement",
              name: "Shipment Tracking Form",
              description: "Real-time shipment tracking by tracking number",
            },
            potentialAction: {
              "@type": "Action",
              name: "Track Shipment",
              description: "Track your shipment by entering tracking number",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://client.cargologisticscompany.com/tracking",
                actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
              },
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Tracking */}
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
                name: "Track Shipment",
                item: "https://client.cargologisticscompany.com/tracking",
              },
            ],
          }),
        }}
      />

      {/* 🔹 Tracking Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Shipment Tracking",
            provider: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
            },
            areaServed: {
              "@type": "Country",
              name: "Worldwide",
            },
            description: "Real-time shipment tracking service for cargo and freight",
            potentialAction: {
              "@type": "TrackAction",
              name: "Track Shipment",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://client.cargologisticscompany.com/tracking?trackingNumber={tracking_number}",
                actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
              },
            },
          }),
        }}
      />
    </>
  );
}