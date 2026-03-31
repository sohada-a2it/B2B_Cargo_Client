import RequestQuote from "@/components/home/quote";
import React from "react";

// 🔹 SEO metadata for Request Quote
export const metadata = {
  title: "Request a Quote | Cargo Logistics Group",
  description:
    "Get a personalized shipping quote from Cargo Logistics Group. Request estimates for sea freight, air freight, rail freight, express delivery, and door-to-door shipping services worldwide.",
  keywords: [
    "Cargo Logistics",
    "Request Quote",
    "Shipping Quote",
    "Freight Quote",
    "Get Estimate",
    "Shipping Cost",
    "Freight Estimate",
    "Logistics Quote",
    "Sea Freight Quote",
    "Air Freight Quote",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/request-quote",
  },
  openGraph: {
    title: "Request a Quote | Cargo Logistics Group",
    description:
      "Get a personalized shipping quote from Cargo Logistics Group. Request estimates for sea freight, air freight, rail freight, express delivery, and door-to-door shipping services worldwide.",
    url: "https://client.cargologisticscompany.com/request-quote",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-request-quote.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Request a Quote",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Quote | Cargo Logistics Group",
    description:
      "Get a personalized shipping quote from Cargo Logistics Group. Request estimates for shipping services worldwide.",
    images: ["/og-request-quote.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <RequestQuote />

      {/* 🔹 Schema Markup for Request Quote Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Request a Quote",
            description:
              "Get a personalized shipping quote from Cargo Logistics Group. Request estimates for sea freight, air freight, rail freight, express delivery, and door-to-door shipping services worldwide.",
            url: "https://client.cargologisticscompany.com/request-quote",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "WebPageElement",
              name: "Quote Request Form",
              description: "Form to request personalized shipping quotes",
            },
            potentialAction: {
              "@type": "Action",
              name: "Request Quote",
              description: "Submit quote request for shipping services",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://client.cargologisticscompany.com/request-quote",
                actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
              },
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Request Quote */}
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
                name: "Request a Quote",
                item: "https://client.cargologisticscompany.com/request-quote",
              },
            ],
          }),
        }}
      />

      {/* 🔹 Service Schema for Quote Request */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Shipping Quote Request",
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
              name: "Shipping Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Sea Freight",
                    description: "FCL and LCL container shipping",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Air Freight",
                    description: "Express air cargo delivery",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Rail Freight",
                    description: "Cost-effective rail transport",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Express Delivery",
                    description: "Fast and reliable delivery",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Door to Door",
                    description: "Complete logistics solution",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* 🔹 Organization Schema with Contact */}
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
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-647-362-7735",
              contactType: "quote request",
              email: "quotes@cargologisticscompany.com",
              availableLanguage: ["English"],
            },
            potentialAction: {
              "@type": "Action",
              name: "Request Quote",
              target: "https://client.cargologisticscompany.com/request-quote",
            },
          }),
        }}
      />
    </>
  );
}