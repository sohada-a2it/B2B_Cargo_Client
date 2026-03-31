import ProfilePage from "@/components/profile/profile";
import React from "react";

// 🔹 SEO metadata for Profile
export const metadata = {
  title: "My Profile | Cargo Logistics Group",
  description:
    "Manage your Cargo Logistics Group profile. Update personal information, view business details, manage preferences, and access security settings for your logistics account.",
  keywords: [
    "Cargo Logistics",
    "My Profile",
    "Profile Settings",
    "Account Management",
    "User Profile",
    "Logistics Account",
    "Profile Update",
    "Account Settings",
    "Personal Information",
    "Business Profile",
  ],
  alternates: {
    canonical: "https://client.cargologisticscompany.com/profile",
  },
  openGraph: {
    title: "My Profile | Cargo Logistics Group",
    description:
      "Manage your Cargo Logistics Group profile. Update personal information, view business details, manage preferences, and access security settings for your logistics account.",
    url: "https://client.cargologisticscompany.com/profile",
    siteName: "Cargo Logistics Group",
    images: [
      {
        url: "/og-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Cargo Logistics Group - My Profile",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Profile | Cargo Logistics Group",
    description:
      "Manage your Cargo Logistics Group profile. Update personal information, view business details, and manage preferences.",
    images: ["/og-profile.jpg"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <ProfilePage />

      {/* 🔹 Schema Markup for Profile Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "User Profile",
            description:
              "Manage your Cargo Logistics Group profile. Update personal information, view business details, manage preferences, and access security settings.",
            url: "https://client.cargologisticscompany.com/profile",
            publisher: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
              url: "https://client.cargologisticscompany.com",
              logo: "https://client.cargologisticscompany.com/logo.png",
            },
            mainEntity: {
              "@type": "ProfilePage",
              name: "Customer Profile",
              description: "User profile management for logistics account",
            },
          }),
        }}
      />

      {/* 🔹 Breadcrumb Schema for Profile */}
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
                name: "My Profile",
                item: "https://client.cargologisticscompany.com/profile",
              },
            ],
          }),
        }}
      />

      {/* 🔹 Person Schema for Profile */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Cargo Logistics Customer",
            url: "https://client.cargologisticscompany.com/profile",
            email: "customer@cargologisticscompany.com",
            telephone: "+1-647-362-7735",
            worksFor: {
              "@type": "Organization",
              name: "Cargo Logistics Group",
            },
            knowsAbout: [
              "Logistics Management",
              "Supply Chain",
              "Freight Shipping",
              "Warehousing",
            ],
          }),
        }}
      />
    </>
  );
}