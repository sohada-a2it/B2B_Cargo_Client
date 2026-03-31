import TermsOfService from "@/components/footer/terms";
import React from "react";

// 🔹 SEO metadata for Terms of Service
export const metadata = {
  title: "Terms of Service | Cargo Logistics Group",
  description:
    "Read the Terms of Service for Cargo Logistics Group. Understand our legal framework for international freight forwarding, logistics management, and B2B operations across Thailand, China, USA, UK & Canada.",
  keywords: [
    "Cargo Logistics",
    "Terms of Service",
    "Terms and Conditions",
    "Legal Terms",
    "Freight Forwarding Terms",
    "Logistics Agreement",
    "B2B Terms",
    "Shipping Terms",
    "Service Agreement",
    "User Agreement",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Cargo Logistics Group",
    description:
      "Read the Terms of Service for Cargo Logistics Group. Understand our legal framework for international freight forwarding, logistics management, and B2B operations.",
    url: "https://client.cargologisticscompany.com/terms-of-service",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-terms-of-service.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Terms of Service",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Cargo Logistics Group",
    description:
      "Read the Terms of Service for Cargo Logistics Group. Understand our legal framework for international freight forwarding.",
    images: ["/og-terms-of-service.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <TermsOfService />

      {/* 🔹 Schema Markup for Terms of Service Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms of Service",
            description:
              "Read the Terms of Service for Cargo Logistics Group. Understand our legal framework for international freight forwarding, logistics management, and B2B operations across Thailand, China, USA, UK & Canada.",
            url: "https://client.cargologisticscompany.com/terms-of-service",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "WebPageElement",
              name: "Terms of Service Document",
              description: "Legal terms and conditions for logistics services",
            },
            dateModified: "2026-02-02",
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Terms of Service */}
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
                name: "Terms of Service",
                item: "https://client.cargologisticscompany.com/terms-of-service",
              },
            ],
          }),
        }}
      />

      {/* 🔹 Organization Schema for Legal Info */}
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
              contactType: "legal",
              email: "legal@cargologisticscompany.com",
              availableLanguage: ["English"],
            },
            legalName: "Cargo Logistics Group",
            foundingDate: "2009",
            termsOfService: "https://client.cargologisticscompany.com/terms-of-service",
          }),
        }}
      />

      {/* 🔹 Terms of Service Schema (Legal Document) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TermsOfService",
            name: "Terms of Service of Cargo Logistics Group",
            description:
              "These Terms of Service govern the use of Cargo Logistics Group's freight forwarding platform and logistics services.",
            url: "https://client.cargologisticscompany.com/terms-of-service",
            lastReviewed: "2026-02-02",
            inLanguage: "en-US",
            jurisdiction: "USA",
            applicableLegislation: ["UCC", "CISG"],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-647-362-7735",
              email: "legal@cargologisticscompany.com",
              contactType: "legal support",
            },
          }),
        }}
      />
    </>
  );
}