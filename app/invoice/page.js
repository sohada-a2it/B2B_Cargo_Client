import MyInvoicesPage from "@/components/profile/invoice";
import React from "react";

// 🔹 SEO metadata for My Invoices
export const metadata = {
  title: "My Invoices | Cargo Logistics Group",
  description:
    "View and manage your shipping invoices with Cargo Logistics Group. Track invoice status, download PDF copies, view payment history, and manage your logistics billing online.",
  keywords: [
    "Cargo Logistics",
    "My Invoices",
    "Shipping Invoices",
    "Logistics Billing",
    "Invoice Management",
    "Payment History",
    "Freight Invoices",
    "Cargo Billing",
    "Transportation Invoices",
    "Logistics Payments",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/invoices",
  },
  openGraph: {
    title: "My Invoices | Cargo Logistics Group",
    description:
      "View and manage your shipping invoices with Cargo Logistics Group. Track invoice status, download PDF copies, view payment history, and manage your logistics billing online.",
    url: "https://client.cargologisticscompany.com/invoices",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-invoices.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - My Invoices",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Invoices | Cargo Logistics Group",
    description:
      "View and manage your shipping invoices with Cargo Logistics Group. Track invoice status and download PDF copies.",
    images: ["/og-invoices.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <MyInvoicesPage />

      {/* 🔹 Schema Markup for My Invoices Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "My Invoices",
            description:
              "View and manage your shipping invoices with Cargo Logistics Group. Track invoice status, download PDF copies, view payment history, and manage your logistics billing online.",
            url: "https://client.cargologisticscompany.com/invoices",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Customer Invoices",
              description: "List of invoices for shipping and logistics services",
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for My Invoices */}
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
                name: "Customer Dashboard",
                item: "https://client.cargologisticscompany.com/customer/dashboard",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "My Invoices",
                item: "https://client.cargologisticscompany.com/invoices",
              },
            ],
          }),
        }}
      />

      {/* 🔹 Organization Schema for Invoices */}
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
            paymentAccepted: ["Credit Card", "Bank Transfer", "Wire Transfer"],
            priceRange: "$$",
            areaServed: {
              "@type": "Country",
              name: "Worldwide",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-647-362-7735",
              contactType: "billing support",
              email: "billing@cargologisticscompany.com",
              availableLanguage: ["English"],
            },
          }),
        }}
      />
    </>
  );
}