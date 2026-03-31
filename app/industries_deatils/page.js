import IndustriesDeatils from '@/components/industriesDetails/industriesDeatils';
import TailoredService from '@/components/industriesDetails/TailoredServices';
import Choose from '@/components/industriesDetails/choose';
import React from "react";

// 🔹 SEO metadata for Industries Details
export const metadata = {
  title: "Industries Details | Cargo Logistics Group",
  description:
    "Discover our tailored logistics solutions for various industries. We provide just-in-time delivery, returnable packaging, specialized vehicles, rapid delivery, and advanced technology solutions for your business needs.",
  keywords: [
    "Cargo Logistics",
    "Industries Details",
    "Tailored Logistics",
    "Just-in-Time Delivery",
    "Returnable Packaging",
    "Specialized Vehicles",
    "Rapid Delivery",
    "Logistics Solutions",
    "Supply Chain Visibility",
    "Global Transport Network",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/industries-details",
  },
  openGraph: {
    title: "Industries Details | Cargo Logistics Group",
    description:
      "Discover our tailored logistics solutions for various industries. We provide just-in-time delivery, returnable packaging, specialized vehicles, rapid delivery, and advanced technology solutions.",
    url: "https://client.cargologisticscompany.com/industries-details",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-industries-details.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Industries Details",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries Details | Cargo Logistics Group",
    description:
      "Discover our tailored logistics solutions for various industries. We provide just-in-time delivery, returnable packaging, specialized vehicles, and rapid delivery.",
    images: ["/og-industries-details.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <IndustriesDeatils />
      <TailoredService />
      <Choose />

      {/* 🔹 Schema Markup for Industries Details Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Industries Details",
            description:
              "Discover our tailored logistics solutions for various industries. We provide just-in-time delivery, returnable packaging, specialized vehicles, rapid delivery, and advanced technology solutions for your business needs.",
            url: "https://client.cargologisticscompany.com/industries-details",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Tailored Services",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Just-in-Time Delivery",
                  description: "Optimized scheduling to reduce storage costs and improve efficiency",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Returnable Packaging",
                  description: "Eco-friendly and reusable packaging solutions for sustainability",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Specialized Vehicles",
                  description: "Temperature-controlled and industry-specific transport solutions",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Rapid Delivery",
                  description: "Fast and secure transportation with real-time tracking",
                },
              ],
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Industries Details */}
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
                name: "Industries",
                item: "https://client.cargologisticscompany.com/industries",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Industries Details",
                item: "https://client.cargologisticscompany.com/industries-details",
              },
            ],
          }),
        }}
      />

      {/* 🔹 Organization Schema with Stats */}
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
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              value: "120+",
            },
            foundingDate: "2009",
            knowsAbout: [
              "Just-in-Time Delivery",
              "Returnable Packaging",
              "Specialized Vehicles",
              "Rapid Delivery",
              "Supply Chain Visibility",
              "Advanced Technology Logistics",
            ],
          }),
        }}
      />
    </>
  );
}