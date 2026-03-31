import Price from "@/components/about/price";
import React from "react";

// 🔹 SEO metadata for Pricing
export const metadata = {
  title: "Pricing Table | Cargo Logistics Group",
  description:
    "Explore our competitive pricing plans for logistics, supply chain management, warehousing, and cargo services. Find the right solution for your business needs at Cargo Logistics Group.",
  keywords: [
    "Cargo Logistics",
    "Pricing Table",
    "Logistics Pricing",
    "Shipping Rates",
    "Warehouse Pricing",
    "Supply Chain Cost",
    "Cargo Rates",
    "Freight Pricing",
    "Transportation Cost",
    "Logistics Plans",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/pricing",
  },
  openGraph: {
    title: "Pricing Table | Cargo Logistics Group",
    description:
      "Explore our competitive pricing plans for logistics, supply chain management, warehousing, and cargo services. Find the right solution for your business needs at Cargo Logistics Group.",
    url: "https://client.cargologisticscompany.com/pricing",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-pricing.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Pricing Table",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing Table | Cargo Logistics Group",
    description:
      "Explore our competitive pricing plans for logistics, supply chain management, warehousing, and cargo services.",
    images: ["/og-pricing.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <Price />

      {/* 🔹 Schema Markup for Pricing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Logistics Services",
            description:
              "Competitive pricing plans for logistics, supply chain management, warehousing, and cargo services.",
            brand: {
              "@type": "Brand",
              name: "Cargo Logistics Group",
            },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "USD",
              offerCount: "4",
              description: "Various pricing plans for different logistics needs",
            },
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
          }),
        }}
      />
    </>
  );
}