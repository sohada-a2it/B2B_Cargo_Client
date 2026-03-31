import ProjectTabs from "@/components/about/project";
import React from "react";

// 🔹 SEO metadata for Our Projects
export const metadata = {
  title: "Our Projects | Cargo Logistics Group",
  description:
    "Explore our latest projects in logistics, supply chain management, customs clearance, freight solutions, and smart warehousing. Discover how Cargo Logistics Group delivers innovation across industries.",
  keywords: [
    "Cargo Logistics",
    "Our Projects",
    "Logistics Projects",
    "Customs Clearance",
    "Freight Solutions",
    "Supply Chain Projects",
    "Smart Warehousing",
    "Shipment Tracking",
    "Industrial Logistics",
    "Cross Border Shipping",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/projects",
  },
  openGraph: {
    title: "Our Projects | Cargo Logistics Group",
    description:
      "Explore our latest projects in logistics, supply chain management, customs clearance, freight solutions, and smart warehousing. Discover how Cargo Logistics Group delivers innovation across industries.",
    url: "https://client.cargologisticscompany.com/projects",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-projects.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Our Projects",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Projects | Cargo Logistics Group",
    description:
      "Explore our latest projects in logistics, supply chain management, customs clearance, freight solutions, and smart warehousing.",
    images: ["/og-projects.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <ProjectTabs />

      {/* 🔹 Schema Markup for Our Projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Logistics Projects",
            description:
              "Explore our latest projects in logistics, supply chain management, customs clearance, freight solutions, and smart warehousing.",
            brand: {
              "@type": "Brand",
              name: "Cargo Logistics Group",
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