import WhyChooseUs from "@/components/industriesDetails/choose";
import React from "react";

// 🔹 SEO metadata for Why Choose Us
export const metadata = {
  title: "Why Choose Us | Cargo Logistics Group",
  description:
    "Discover why Cargo Logistics Group is the right choice for your shipping needs. We offer precision timing, end-to-end visibility, advanced technology, and a reliable global network for unmatched logistics performance.",
  keywords: [
    "Cargo Logistics",
    "Why Choose Us",
    "Logistics Services",
    "Precision Timing",
    "End-to-End Visibility",
    "Advanced Technology",
    "Reliable Network",
    "Shipping Solutions",
    "Supply Chain Management",
    "Freight Services",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/why-choose-us",
  },
  openGraph: {
    title: "Why Choose Us | Cargo Logistics Group",
    description:
      "Discover why Cargo Logistics Group is the right choice for your shipping needs. We offer precision timing, end-to-end visibility, advanced technology, and a reliable global network.",
    url: "https://client.cargologisticscompany.com/why-choose-us",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-why-choose-us.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Why Choose Us",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose Us | Cargo Logistics Group",
    description:
      "Discover why Cargo Logistics Group is the right choice for your shipping needs. We offer precision timing, end-to-end visibility, advanced technology, and a reliable global network.",
    images: ["/og-why-choose-us.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
      <WhyChooseUs /> 
    </Suspense>

      {/* 🔹 Schema Markup for Why Choose Us Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Why Choose Us",
            description:
              "Discover why Cargo Logistics Group is the right choice for your shipping needs. We offer precision timing, end-to-end visibility, advanced technology, and a reliable global network.",
            url: "https://client.cargologisticscompany.com/why-choose-us",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Why Choose Us Features",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Precision Timing",
                  description: "We ensure exact scheduling to minimize delays and maximize performance.",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "End-to-End Visibility",
                  description: "Real-time tracking and transparency throughout the supply chain.",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Advanced Technology",
                  description: "Modern logistics systems with automation and data-driven insights.",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Reliable Network",
                  description: "Strong global transport network ensuring safe and secure delivery.",
                },
              ],
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Why Choose Us */}
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
                name: "Why Choose Us",
                item: "https://client.cargologisticscompany.com/why-choose-us",
              },
            ],
          }),
        }}
      />

      {/* 🔹 Organization Schema with Statistics */}
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
              "Precision Timing",
              "End-to-End Visibility",
              "Advanced Technology",
              "Reliable Network",
              "Supply Chain Management",
              "Freight Forwarding",
            ],
            award: [
              "Industry Excellence Awards",
              "Best Logistics Provider",
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
              name: "Core Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Precision Timing",
                    description: "Exact scheduling to minimize delays and maximize performance",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Real-time Tracking",
                    description: "End-to-end visibility throughout the supply chain",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Technology Solutions",
                    description: "Modern logistics systems with automation and data-driven insights",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Global Network",
                    description: "Strong global transport network ensuring safe and secure delivery",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* 🔹 Quantitative Value Schema for Statistics */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "QuantitativeValue",
            name: "Daily Shipments",
            value: "600+",
            unitCode: "E37",
          },
          {
            "@context": "https://schema.org",
            "@type": "QuantitativeValue",
            name: "Fuel Efficiency Improvement",
            value: "30%",
            unitCode: "P1",
          },
          {
            "@context": "https://schema.org",
            "@type": "QuantitativeValue",
            name: "Years of Experience",
            value: "15+",
            unitCode: "ANN",
          }),
        }}
      />
    </>
  );
}