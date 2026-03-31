import Banner from '@/components/home/banner';
import State from '@/components/home/states';
import About from '@/components/home/about';
import History from '@/components/home/history';
import LogisticTimeline from '@/components/home/logiaticTimeline';
import Service from '@/components/home/service';
import Ecommerce from '@/components/home/ecommerce';
import Price from '@/components/home/price';
import Shipping from '@/components/home/shipping';
import Warehouse from '@/components/home/warehouse';
import Facts from '@/components/home/facts';
import Industries from '@/components/home/industries';
import Blog from '@/components/home/blog';
import Quote from '@/components/home/quote';
import Partners from '@/components/home/partners';
import React from "react";

// 🔹 SEO metadata for Home Page
export const metadata = {
  title: "Cargo Logistics Group | Global Freight Forwarding & Supply Chain Solutions",
  description:
    "Cargo Logistics Group provides international freight forwarding, sea freight, air freight, warehousing, customs clearance, and supply chain solutions worldwide. Trusted logistics partner for businesses across USA, UK, Canada, China, and Thailand.",
  keywords: [
    "Cargo Logistics",
    "Freight Forwarding",
    "Sea Freight",
    "Air Freight",
    "Warehousing",
    "Supply Chain Solutions",
    "Logistics Company",
    "International Shipping",
    "Customs Clearance",
    "Global Logistics",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com",
  },
  openGraph: {
    title: "Cargo Logistics Group | Global Freight Forwarding & Supply Chain Solutions",
    description:
      "Cargo Logistics Group provides international freight forwarding, sea freight, air freight, warehousing, customs clearance, and supply chain solutions worldwide.",
    url: "https://client.cargologisticscompany.com",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Global Logistics Solutions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cargo Logistics Group | Global Logistics Solutions",
    description:
      "International freight forwarding and supply chain solutions from Cargo Logistics Group.",
    images: ["/og-home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <Banner />
      <State />
      <About />
      <History />
      <LogisticTimeline />
      <Service />
      <Ecommerce />
      <Price />
      <Shipping />
      <Facts />
      <Industries />
      {/* <Blog /> */}
      <Quote />
      <Warehouse />
      <Partners />

      {/* 🔹 Schema Markup for Home Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cargo Logistics Group",
            description:
              "Cargo Logistics Group provides international freight forwarding, sea freight, air freight, warehousing, customs clearance, and supply chain solutions worldwide.",
            url: "https://client.cargologisticscompany.com",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
          }),
        }}
      />

      {/* 🔹 Organization Schema */}
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

      {/* 🔹 LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Cargo Logistics Group",
            image: "https://client.cargologisticscompany.com/logo.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "8825 Stanford Blvd Suite 306",
              addressLocality: "Columbia",
              addressRegion: "MD",
              postalCode: "21045",
              addressCountry: "USA",
            },
            telephone: "+1-647-362-7735",
            email: "support@cargologisticscompany.com",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "07:00",
                closes: "22:00",
              },
            ],
            priceRange: "$$",
            areaServed: {
              "@type": "Country",
              name: "Worldwide",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Logistics Services",
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
                    name: "Warehousing",
                    description: "Strategic storage solutions",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Customs Clearance",
                    description: "Professional customs brokerage",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema */}
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
            ],
          }),
        }}
      />
    </>
  );
}