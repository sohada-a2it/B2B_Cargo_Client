"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HiChevronRight } from "react-icons/hi";

const timelineData = [
  {
    year: "1984",
    title: "Foundation",
    desc: "Denounce with righteous indignation demoralized by pleasure.",
    img: "/images/history (1).jpg",
  },
  {
    year: "1988",
    title: "Air Freight Expansion",
    desc: "Easy to distinguish a free hour, when our power of choice.",
    img: "/images/history (2).jpg",
  },
  {
    year: "1989",
    title: "Global Reach",
    desc: "Blinded by desire, that they cannot foresee the pain.",
    img: "/images/history (3).jpg",
  },
  {
    year: "1992",
    title: "Milestone",
    desc: "Frequently occur that pleasures have to be repudiated.",
    img: "/images/history (4).jpg",
  },
  {
    year: "1995",
    title: "300+ Branches",
    desc: "Denounce with righteous indignation demoralized by pleasure.",
    img: "/images/history (5).jpg",
  },
  {
    year: "1997",
    title: "100+ Countries",
    desc: "Easy to distinguish a free hour, when our power.",
    img: "/images/history (6).jpg",
  },
  {
    year: "2000",
    title: "Customer Award",
    desc: "Blinded by desire, that they cannot foresee the pain.",
    img: "/images/history (7).jpg",
  },
  {
    year: "2004",
    title: "New Milestone",
    desc: "Easy to distinguish a free hour, when our power.",
    img: "/images/history (8).jpg",
  },
];

export default function History() {
  return (
    <div>
      {/* Banner Section */}
      <div
        className="min-h-[300px] bg-cover bg-center bg-no-repeat relative mx-6"
        style={{
          backgroundImage: "url('/images/aboutBanner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-8">
          <nav
            className="flex items-center text-sm font-medium text-white"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-2">
              <li>
                <a
                  href="/"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <HiChevronRight
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </li>
              <li className="text-primary font-semibold" aria-current="page">
                Our History
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="py-8 bg-[#f9fafc] overflow-hidden">
  <div className="max-w-5xl mx-auto px-4 relative">
    {/* CENTER LINE */}
    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gray-200"></div>

    <div className="space-y-8">
      {timelineData.map((item, i) => {
        const isLeft = i % 2 === 0;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`flex items-center w-full ${
              isLeft ? "justify-start" : "justify-end"
            }`}
          >
            {/* CARD */}
            <div className="w-[40%] relative">
              <div
                className={`bg-white p-3 rounded-lg shadow-sm hover:shadow transition
                  flex items-center gap-3
                  ${isLeft ? "text-right" : "text-left"}`}
              >
                <Image
                  src={item.img}
                  width={40}
                  height={40}
                  alt=""
                  className="rounded object-cover"
                />

                <div>
                  <h3 className="font-semibold text-[#122652] text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* YEAR */}
              <span
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm
                  ${isLeft ? "-right-14" : "-left-14"}`}
              >
                {item.year}
              </span>
            </div>

            {/* DOT */}
            <div className="relative z-10 w-4 h-4 bg-white border-2 border-[#FD5621] rounded-full"></div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>
    </div>
  );
}