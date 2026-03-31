import Service from "@/components/service";
import React from "react";

// 🔹 SEO metadata for Our Services
export const metadata = {
  title: "Our Services | Cargo Logistics Group",
  description:
    "Explore our comprehensive logistics services at Cargo Logistics Group. We offer sea freight, air freight, road freight, warehousing, customs clearance, and supply chain solutions for businesses worldwide.",
  keywords: [
    "Cargo Logistics",
    "Our Services",
    "Logistics Services",
    "Sea Freight",
    "Air Freight",
    "Road Freight",
    "Warehousing",
    "Customs Clearance",
    "Supply Chain Solutions",
    "Freight Forwarding",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/service",
  },
  openGraph: {
    title: "Our Services | Cargo Logistics Group",
    description:
      "Explore our comprehensive logistics services at Cargo Logistics Group. We offer sea freight, air freight, road freight, warehousing, customs clearance, and supply chain solutions for businesses worldwide.",
    url: "https://client.cargologisticscompany.com/service",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-service.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Our Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Cargo Logistics Group",
    description:
      "Explore our comprehensive logistics services at Cargo Logistics Group. We offer sea freight, air freight, road freight, and supply chain solutions.",
    images: ["/og-service.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <Service />

      {/* 🔹 Schema Markup for Services Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Our Services",
            description:
              "Explore our comprehensive logistics services at Cargo Logistics Group. We offer sea freight, air freight, road freight, warehousing, customs clearance, and supply chain solutions.",
            url: "https://client.cargologisticscompany.com/service",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Logistics Services",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Sea Freight",
                  description: "FCL and LCL container shipping worldwide",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Air Freight",
                  description: "Express air cargo delivery",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Road Freight",
                  description: "Inland trucking and distribution",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Warehousing",
                  description: "Strategic storage solutions",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Customs Clearance",
                  description: "Professional customs brokerage",
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  name: "Supply Chain Solutions",
                  description: "End-to-end logistics management",
                },
              ],
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Services */}
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
                name: "Services",
                item: "https://client.cargologisticscompany.com/service",
              },
            ],
          }),
        }}
      />

      {/* 🔹 Service Schema for Logistics */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Logistics Services",
            provider: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
            },
            areaServed: {
              "@type": "Country",
              name: "Worldwide",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Logistics Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Sea Freight",
                    description: "Full Container Load (FCL) and Less than Container Load (LCL) shipping",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Air Freight",
                    description: "Fast and reliable air cargo services",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Road Freight",
                    description: "Inland trucking and distribution network",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Warehousing",
                    description: "Secure and strategic storage facilities",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Customs Clearance",
                    description: "Professional customs brokerage services",
                  },
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}