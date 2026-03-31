import ShipmentsPage from "@/components/myShipping/myShipping";
import React from "react";

// 🔹 SEO metadata for My Shipments
export const metadata = {
  title: "My Shipments | Cargo Logistics Group",
  description:
    "Track and manage your shipments with Cargo Logistics Group. View real-time shipment status, track packages, monitor transit progress, and manage your logistics operations from one dashboard.",
  keywords: [
    "Cargo Logistics",
    "My Shipments",
    "Track Shipment",
    "Shipment Tracking",
    "Package Tracking",
    "Freight Tracking",
    "Cargo Tracking",
    "Logistics Dashboard",
    "Shipment Status",
    "Real-time Tracking",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/shipments",
  },
  openGraph: {
    title: "My Shipments | Cargo Logistics Group",
    description:
      "Track and manage your shipments with Cargo Logistics Group. View real-time shipment status, track packages, monitor transit progress, and manage your logistics operations from one dashboard.",
    url: "https://client.cargologisticscompany.com/shipments",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-shipments.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - My Shipments",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Shipments | Cargo Logistics Group",
    description:
      "Track and manage your shipments with Cargo Logistics Group. View real-time shipment status and track packages.",
    images: ["/og-shipments.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <ShipmentsPage />

      {/* 🔹 Schema Markup for Shipments Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "My Shipments Dashboard",
            description:
              "Track and manage your shipments with Cargo Logistics Group. View real-time shipment status, track packages, monitor transit progress, and manage your logistics operations.",
            url: "https://client.cargologisticscompany.com/shipments",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Customer Shipments",
              description: "List of all customer shipments with tracking information",
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Shipments */}
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
                name: "Customer Dashboard",
                item: "https://client.cargologisticscompany.com/customer/dashboard",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "My Shipments",
                item: "https://client.cargologisticscompany.com/shipments",
              },
            ],
          }),
        }}
      />

      {/* 🔹 Organization Schema for Shipments */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Cargo Logistics Group",
            url: "https://client.cargologisticscompany.com",
            logo: "https://client.cargologisticscompany.com/logo.png",
            description: "Leading logistics and supply chain solutions provider",
            areaServed: {
              "@type": "Country",
              name: "Worldwide",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-647-362-7735",
              contactType: "customer support",
              email: "support@cargologisticscompany.com",
              availableLanguage: ["English"],
            },
          }),
        }}
      />
    </>
  );
}