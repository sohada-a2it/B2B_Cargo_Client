import Industries from "@/components/industries/industries";
import React from "react";

// 🔹 SEO metadata for Industries
export const metadata = {
  title: "Industries We Serve | Cargo Logistics Group",
  description:
    "Explore the industries we serve at Cargo Logistics Group. Specialized logistics solutions for eCommerce, manufacturing, retail, automotive, pharmaceuticals, food & beverage, and more. Get tailored shipping solutions for your business.",
  keywords: [
    "Cargo Logistics",
    "Industries We Serve",
    "Logistics Solutions",
    "eCommerce Logistics",
    "Manufacturing Logistics",
    "Retail Shipping",
    "Automotive Logistics",
    "Pharmaceutical Shipping",
    "Food Logistics",
    "Supply Chain Solutions",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/industries",
  },
  openGraph: {
    title: "Industries We Serve | Cargo Logistics Group",
    description:
      "Explore the industries we serve at Cargo Logistics Group. Specialized logistics solutions for eCommerce, manufacturing, retail, automotive, pharmaceuticals, food & beverage, and more.",
    url: "https://client.cargologisticscompany.com/industries",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-industries.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Industries We Serve",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Cargo Logistics Group",
    description:
      "Explore the industries we serve at Cargo Logistics Group. Specialized logistics solutions for various business sectors.",
    images: ["/og-industries.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <Industries />

      {/* 🔹 Schema Markup for Industries Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Industries We Serve",
            description:
              "Explore the industries we serve at Cargo Logistics Group. Specialized logistics solutions for eCommerce, manufacturing, retail, automotive, pharmaceuticals, food & beverage, and more.",
            url: "https://client.cargologisticscompany.com/industries",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Industries Served",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "eCommerce Logistics",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Manufacturing",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Retail",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Automotive",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Pharmaceuticals",
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  name: "Food & Beverage",
                },
                {
                  "@type": "ListItem",
                  position: 7,
                  name: "Textile and Apparel",
                },
                {
                  "@type": "ListItem",
                  position: 8,
                  name: "Electronics",
                },
                {
                  "@type": "ListItem",
                  position: 9,
                  name: "Chemicals",
                },
              ],
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Industries */}
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
            ],
          }),
        }}
      />
    </>
  );
}