import Contact from "@/components/contact";
import React from "react";

// 🔹 SEO metadata for Contact Us
export const metadata = {
  title: "Contact Us | Cargo Logistics Group",
  description:
    "Get in touch with Cargo Logistics Group for all your shipping and logistics needs. Contact our support team for inquiries about sea freight, air freight, trucking, and multimodal shipping solutions.",
  keywords: [
    "Cargo Logistics",
    "Contact Us",
    "Logistics Support",
    "Shipping Inquiries",
    "Freight Services",
    "Customer Support",
    "Logistics Company Contact",
    "Shipping Company",
    "Cargo Services",
    "Transportation Solutions",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/contact",
  },
  openGraph: {
    title: "Contact Us | Cargo Logistics Group",
    description:
      "Get in touch with Cargo Logistics Group for all your shipping and logistics needs. Contact our support team for inquiries about sea freight, air freight, trucking, and multimodal shipping solutions.",
    url: "https://client.cargologisticscompany.com/contact",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Contact Us",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Cargo Logistics Group",
    description:
      "Get in touch with Cargo Logistics Group for all your shipping and logistics needs. Contact our support team for inquiries.",
    images: ["/og-contact.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <Contact />

      {/* 🔹 Schema Markup for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us",
            description:
              "Get in touch with Cargo Logistics Group for all your shipping and logistics needs. Contact our support team for inquiries about sea freight, air freight, trucking, and multimodal shipping solutions.",
            url: "https://client.cargologisticscompany.com/contact",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-647-362-7735",
                  contactType: "customer service",
                  email: "support@cargologisticscompany.com",
                  availableLanguage: ["English"],
                  contactOption: "TollFree",
                  areaServed: "Worldwide",
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+1-647-362-7735",
                  contactType: "sales",
                  email: "support@cargologisticscompany.com",
                  availableLanguage: ["English"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+1-647-362-7735",
                  contactType: "technical support",
                  email: "support@cargologisticscompany.com",
                  availableLanguage: ["English"],
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
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "07:00",
                  closes: "22:00",
                },
              ],
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Contact */}
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
                name: "Contact Us",
                item: "https://client.cargologisticscompany.com/contact",
              },
            ],
          }),
        }}
      />
    </>
  );
}