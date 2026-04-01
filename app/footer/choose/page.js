import WhyChooseUs from "@/components/industriesDetails/choose";
import React from "react";

// 🔹 SEO metadata for Why Choose Us
export const metadata = {
  title: "Why Choose Us | Cargo Logistics Group",
  description:
    "Discover why Cargo Logistics Group is the right choice for your shipping needs. We offer precision timing, end-to-end visibility, advanced technology, and a reliable global network for unmatched logistics performance.",
  keywords: [
    "Cargo Logistics",
    "Why Choose Us",
    "Logistics Services",
    "Precision Timing",
    "End-to-End Visibility",
    "Advanced Technology",
    "Reliable Network",
    "Shipping Solutions",
    "Supply Chain Management",
    "Freight Services",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/why-choose-us",
  },
  openGraph: {
    title: "Why Choose Us | Cargo Logistics Group",
    description:
      "Discover why Cargo Logistics Group is the right choice for your shipping needs. We offer precision timing, end-to-end visibility, advanced technology, and a reliable global network.",
    url: "https://client.cargologisticscompany.com/why-choose-us",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-why-choose-us.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - Why Choose Us",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose Us | Cargo Logistics Group",
    description:
      "Discover why Cargo Logistics Group is the right choice for your shipping needs. We offer precision timing, end-to-end visibility, advanced technology, and a reliable global network.",
    images: ["/og-why-choose-us.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <WhyChooseUs />;
}