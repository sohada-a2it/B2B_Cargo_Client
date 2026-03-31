import History from "@/components/about/history";
import React from "react";

// 🔹 SEO metadata for Our History
export const metadata = {
  title: "Our History | Cargo Logistics Group",
  description:
    "Explore the journey of Cargo Logistics Group since 1984. Learn about our foundation, expansion, global reach, milestones, and achievements in the logistics industry.",
  keywords: [
    "Cargo Logistics",
    "Our History",
    "Company History",
    "Logistics Journey",
    "Air Freight Expansion",
    "Global Reach Logistics",
    "Logistics Milestones",
    "Transportation History",
    "Cargo Timeline",
    "Logistics Achievements",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/history",
  },
  openGraph: {
    title: "Our History | Cargo Logistics Group",
    description:
      "Explore the journey of Cargo Logistics Group since 1984. Learn about our foundation, expansion, global reach, milestones, and achievements in the logistics industry.",
    url: "https://client.cargologisticscompany.com/history",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-history.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Our History",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our History | Cargo Logistics Group",
    description:
      "Explore the journey of Cargo Logistics Group since 1984. Learn about our foundation, expansion, global reach, and milestones.",
    images: ["/og-history.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <History />

      {/* 🔹 Schema Markup for Our History */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Cargo Logistics Group",
            url: "https://client.cargologisticscompany.com/history",
            description:
              "Explore the journey of Cargo Logistics Group since 1984. Learn about our foundation, expansion, global reach, milestones, and achievements in the logistics industry.",
            foundingDate: "1984",
            foundingLocation: {
              "@type": "Place",
              name: "Company Founding Location",
            },
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