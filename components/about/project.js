"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["All", "Customs", "Freights", "Industries", "Shipments", "Stores"];

const projects = [
  {
    title: "Smart Customs Clearance",
    category: "Customs",
    image: "/images/project (1).jpg",
    description: "AI-powered customs documentation and clearance system with real-time tracking",
    location: "Singapore Hub",
    year: "2024"
  },
  {
    title: "Global Freight Solutions",
    category: "Freights",
    image: "/images/project (2).jpg",
    description: "End-to-end freight management with predictive analytics",
    location: "Rotterdam Port",
    year: "2024"
  },
  {
    title: "Express Cargo Handling",
    category: "Industries",
    image: "/images/project (3).jpg",
    description: "Automated cargo sorting and handling system",
    location: "Dubai Airport",
    year: "2023"
  },
  {
    title: "Industrial Supply Chain Hub",
    category: "Industries",
    image: "/images/project (4).jpg",
    description: "Smart warehouse with IoT integration",
    location: "Shanghai Port",
    year: "2024"
  },
  {
    title: "Smart Manufacturing Logistics",
    category: "Shipments",
    image: "/images/project (5).jpg",
    description: "Just-in-time delivery optimization system",
    location: "Tokyo Factory",
    year: "2023"
  },
  {
    title: "Real-Time Shipment Tracking",
    category: "Shipments",
    image: "/images/project (6).jpg",
    description: "Blockchain-based shipment verification",
    location: "Hamburg Terminal",
    year: "2024"
  },
  {
    title: "Cross-Border Shipping Network",
    category: "Stores",
    image: "/images/project (7).jpg",
    description: "Multi-country shipping consolidation",
    location: "LA Logistics Center",
    year: "2023"
  },
  {
    title: "Next-Gen Warehousing Facility",
    category: "Freights",
    image: "/images/project (8).jpg",
    description: "Automated storage and retrieval system",
    location: "Amsterdam Hub",
    year: "2024"
  },
];

export default function ProjectTabs() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const getCount = (tab) => {
    if (tab === "All") return projects.length;
    return projects.filter((p) => p.category === tab).length;
  };

  // Responsive grid classes
  const gridClasses = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6";

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-14 bg-gray-50">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-[#FD5621]">Projects</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest innovations in logistics and supply chain management
          </p>
        </div>

        {/* Tabs with animation */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-sm",
                activeTab === tab
                  ? "bg-[#FD5621] text-white shadow-lg shadow-orange-200"
                  : "bg-white text-gray-600 hover:bg-gray-100 hover:shadow-md border border-gray-200"
              )}
            >
              {tab}
              <span className={clsx(
                "text-xs px-2 py-0.5 rounded-full",
                activeTab === tab ? "bg-white/20" : "bg-gray-200 text-gray-600"
              )}>
                {getCount(tab)}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Projects Grid with Animation */}
        <motion.div 
          className={gridClasses}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(item)}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-white"
              >
                {/* Image Container */}
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay - Always visible on mobile, hover on desktop */}
                  <div className={clsx(
                    "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent",
                    "lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
                  )}>
                    {/* Desktop Hover Details */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs text-[#FD5621] font-semibold mb-1">{item.category}</p>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-200 mb-2">{item.description}</p>
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>{item.location}</span>
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Details - Always visible below image */}
                <div className="p-4 block lg:hidden">
                  <p className="text-xs text-[#FD5621] font-semibold mb-1">{item.category}</p>
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{item.location}</span>
                    <span>{item.year}</span>
                  </div>
                </div>

                {/* Desktop Static Details (hidden on hover) */}
                {/* <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-md lg:block lg:group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-xs text-[#FD5621] font-semibold mb-1">{item.category}</p>
                  <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                </div> */}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {filtered.length > 9 && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#FD5621] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              View All Projects
            </motion.button>
          </div>
        )}
      </section>

      {/* Image Modal */}
      {/* <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
              
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <p className="text-[#FD5621] font-semibold text-sm mb-1">{selectedImage.category}</p>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{selectedImage.title}</h3>
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                <div className="flex gap-6 text-sm text-gray-500">
                  <span>📍 {selectedImage.location}</span>
                  <span>📅 {selectedImage.year}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
}