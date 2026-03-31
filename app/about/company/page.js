import OurCompany from "@/components/about/company";
import React from "react";

// 🔹 SEO metadata for Our Company
export const metadata = {
  title: "Our Company | Cargo Logistics Group",
  description:
    "Discover Cargo Logistics Group, our mission, vision, and dedicated team providing logistics, supply chain management, warehousing, and cargo solutions worldwide.",
  keywords: [
    "Cargo Logistics",
    "Our Company",
    "Logistics Company",
    "Supply Chain Management",
    "Warehouse Solutions",
    "Cargo Services",
    "Freight Forwarding",
    "Transportation Services",
    "Logistics Partner",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/our-company",
  },
  openGraph: {
    title: "Our Company | Cargo Logistics Group",
    description:
      "Discover Cargo Logistics Group, our mission, vision, and dedicated team providing logistics, supply chain management, warehousing, and cargo solutions worldwide.",
    url: "https://client.cargologisticscompany.com/our-company",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-our-company.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Our Company",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Company | Cargo Logistics Group",
    description:
      "Discover Cargo Logistics Group, our mission, vision, and dedicated team providing logistics, supply chain management, warehousing, and cargo solutions worldwide.",
    images: ["/og-our-company.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <OurCompany />

      {/* 🔹 Schema Markup for Our Company */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Our Company",
            url: "https://client.cargologisticscompany.com/our-company",
            description:
              "Discover Cargo Logistics Group, our mission, vision, and dedicated team providing logistics, supply chain management, warehousing, and cargo solutions worldwide.",
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