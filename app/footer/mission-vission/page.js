import History from "../../../components/home/history";
import React from "react";

// 🔹 SEO metadata for Our History
export const metadata = {
  title: "Our History | Cargo Logistics Group",
  description:
    "Learn about the history, vision, and mission of Cargo Logistics Group. Discover our commitment to providing secure, efficient, and cost-effective logistics solutions worldwide.",
  keywords: [
    "Cargo Logistics",
    "Our History",
    "Company History",
    "Logistics Vision",
    "Mission Statement",
    "Logistics Company",
    "Supply Chain History",
    "Freight Company",
    "Global Logistics",
    "Shipping History",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/history",
  },
  openGraph: {
    title: "Our History | Cargo Logistics Group",
    description:
      "Learn about the history, vision, and mission of Cargo Logistics Group. Discover our commitment to providing secure, efficient, and cost-effective logistics solutions worldwide.",
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
      "Learn about the history, vision, and mission of Cargo Logistics Group. Discover our commitment to logistics excellence.",
    images: ["/og-history.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <History />

      {/* 🔹 Schema Markup for History Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Our History",
            description:
              "Learn about the history, vision, and mission of Cargo Logistics Group. Discover our commitment to providing secure, efficient, and cost-effective logistics solutions worldwide.",
            url: "https://client.cargologisticscompany.com/history",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              foundingDate: "2009",
              foundingLocation: {
                "@type": "Place",
                name: "Global Operations",
              },
              mission: "To provide secure, efficient, and cost-effective logistics solutions that empower businesses to move goods globally with confidence. We are committed to reliability, compliance, and customer-focused service at every stage of the supply chain.",
              vision: "To become a globally recognized logistics partner known for operational excellence, strategic trade expertise, and innovation in international freight management.",
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for History */}
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
                name: "History",
                item: "https://client.cargologisticscompany.com/history",
              },
            ],
          }),
        }}
      />

      {/* 🔹 Organization Schema for Company Details */}
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
            foundingDate: "2009",
            founders: [
              {
                "@type": "Person",
                name: "Company Founder",
              },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "8825 Stanford Blvd Suite 306",
              addressLocality: "Columbia",
              addressRegion: "MD",
              postalCode: "21045",
              addressCountry: "USA",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-647-362-7735",
              contactType: "customer service",
              email: "support@cargologisticscompany.com",
              availableLanguage: ["English"],
            },
            sameAs: [
              "https://www.facebook.com/cargologistics",
              "https://www.linkedin.com/company/cargo-logistics-group",
              "https://twitter.com/cargologistics",
            ],
          }),
        }}
      />

      {/* 🔹 AboutPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Cargo Logistics Group",
            description:
              "Cargo Logistics Group is a leading provider of secure, efficient, and cost-effective logistics solutions worldwide.",
            mainEntity: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              description: "Global logistics and supply chain solutions provider",
            },
          }),
        }}
      />
    </>
  );
}