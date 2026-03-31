import Teams from "@/components/about/Teams";
import React from "react";

// 🔹 SEO metadata for Our Teams
export const metadata = {
  title: "Our Teams | Cargo Logistics Group",
  description:
    "Meet our expert team of logistics professionals at Cargo Logistics Group. Our leadership and management team brings 15+ years of experience in supply chain management, freight forwarding, and cargo services.",
  keywords: [
    "Cargo Logistics",
    "Our Teams",
    "Logistics Team",
    "Management Team",
    "Supply Chain Experts",
    "Freight Specialists",
    "Cargo Professionals",
    "Logistics Leadership",
    "Team Members",
    "Logistics Experts",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/teams",
  },
  openGraph: {
    title: "Our Teams | Cargo Logistics Group",
    description:
      "Meet our expert team of logistics professionals at Cargo Logistics Group. Our leadership and management team brings 15+ years of experience in supply chain management, freight forwarding, and cargo services.",
    url: "https://client.cargologisticscompany.com/teams",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-teams.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Our Teams",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Teams | Cargo Logistics Group",
    description:
      "Meet our expert team of logistics professionals at Cargo Logistics Group. Our leadership and management team brings 15+ years of experience.",
    images: ["/og-teams.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <Teams />

      {/* 🔹 Schema Markup for Our Teams */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Cargo Logistics Group",
            url: "https://client.cargologisticscompany.com/teams",
            description:
              "Meet our expert team of logistics professionals at Cargo Logistics Group. Our leadership and management team brings 15+ years of experience in supply chain management, freight forwarding, and cargo services.",
            founder: {
              "@type": "Person",
              name: "Leo George",
              jobTitle: "Chief Executive Officer",
            },
            employee: [
              {
                "@type": "Person",
                name: "Leo George",
                jobTitle: "CHIEF EXECUTIVE OFFICER",
                email: "leo.george@cargologisticscompany.com",
                telephone: "+1 (555) 123-4567",
                worksFor: {
                  "@type": "Organization",
                  name: "Cargo Logistics Group",
                },
              },
              {
                "@type": "Person",
                name: "Benjamin Ebenezer",
                jobTitle: "LOGISTICS MANAGER",
                email: "benjamin.ebenezer@cargologisticscompany.com",
                telephone: "+1 (555) 234-5678",
                worksFor: {
                  "@type": "Organization",
                  name: "Cargo Logistics Group",
                },
              },
              {
                "@type": "Person",
                name: "Sophia Luna",
                jobTitle: "CLIENT RELATIONS SPECIALIST",
                email: "sophia.luna@cargologisticscompany.com",
                telephone: "+1 (555) 345-6789",
                worksFor: {
                  "@type": "Organization",
                  name: "Cargo Logistics Group",
                },
              },
              {
                "@type": "Person",
                name: "Michael Chen",
                jobTitle: "OPERATIONS DIRECTOR",
                email: "michael.chen@cargologisticscompany.com",
                telephone: "+1 (555) 456-7890",
                worksFor: {
                  "@type": "Organization",
                  name: "Cargo Logistics Group",
                },
              },
              {
                "@type": "Person",
                name: "Sarah Williams",
                jobTitle: "FINANCE MANAGER",
                email: "sarah.williams@cargologisticscompany.com",
                telephone: "+1 (555) 567-8901",
                worksFor: {
                  "@type": "Organization",
                  name: "Cargo Logistics Group",
                },
              },
              {
                "@type": "Person",
                name: "David Rodriguez",
                jobTitle: "FLEET SUPERVISOR",
                email: "david.rodriguez@cargologisticscompany.com",
                telephone: "+1 (555) 678-9012",
                worksFor: {
                  "@type": "Organization",
                  name: "Cargo Logistics Group",
                },
              },
            ],
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              value: "50+",
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