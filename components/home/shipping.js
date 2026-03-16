"use client";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Request a Quote",
    desc: "Best every pleasures is too welcome business to handling.",
    align: "top",      // card position relative to dot
    left: "15%",        // horizontal position
    dotY: 140,          // vertical position of dot (pixels from top of container)
  },
  {
    number: "02",
    title: "Book Your Shipment",
    desc: "How all this mistaken idea of denouncing pleasure.",
    align: "bottom",
    left: "32%",
    dotY: 100,
  },
  {
    number: "03",
    title: "Track Your Shipment",
    desc: "Nor again is there anyone who loves or pursues.",
    align: "top",
    left: "47%",
    dotY: 260,
  },
  {
    number: "04",
    title: "Delivery & Receipt",
    desc: "Take a trivial example which undertakes laborious.",
    align: "bottom",
    left: "80%",
    dotY: 200,
  },
];

export default function ShippingProcess() {
  return (
    <section className="relative bg-[#f5f7fb] pb-24 pt-2 overflow-hidden">

      {/* Watermark */}
      <h1 className="absolute bottom-10 left-0 text-[160px] font-black text-gray-200 opacity-40 select-none pointer-events-none hidden lg:block">
        WORK PROCESS
      </h1>

      {/* Right side image */}
      <img
        src="/images/shipping.png"
        className="absolute top-0 right-0 w-[48%] hidden lg:block"
        alt="Shipping"
      />

      <div className="max-w-7xl mx-auto px-4 relative">

        {/* Heading */}
        <div className="mb-20">
          <p className="text-[#FD5621] font-semibold tracking-widest text-sm">
            HOW WE WORK
          </p>
          <h2 className="text-5xl font-extrabold text-[#122652] mt-3 mb-50">
            Simple Shipping Process
          </h2>
        </div>

        {/* Desktop Timeline */}
        <div className="relative hidden lg:block h-[400px] ">

          {/* Start label */}
          <div className="absolute left-20 top-[155px] font-semibold text-[#122652]">
            Start
          </div>

          {/* Finish label */}
          <div className="absolute right-20 bottom-20 font-semibold text-[#122652]">
            Finish
          </div>

          {/* Animated Zigzag Path */}
          <svg
            className="absolute left-[20%] top-[130px]"
            width="860"
            height="220"
            viewBox="0 0 860 220"
            fill="none"
          >
            <motion.path
              d="M0 40 H180 V120 H360 V40 H560 V140 H760"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </svg>

          {/* Steps */}
          {steps.map((step, i) => {
  const isTop = step.align === "top";

  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.3, duration: 0.6 }}
      viewport={{ once: true }}
      className="absolute group"
      style={{ left: step.left, top: step.dotY }}
    >
      {/* Number Dot */}
      <div className="w-14 h-14 rounded-full bg-white border-2 border-[#FD5621] text-[#FD5621] font-bold flex items-center justify-center shadow-lg group-hover:bg-[#FD5621] group-hover:text-white transition-all duration-300 z-10 relative">
        {step.number}
      </div>

      {/* Card */}
      <div
        className={`absolute w-[240px] ${
          isTop ? "top-[80px]" : "bottom-[80px]"
        } left-1/2 -translate-x-1/2`}
      >
        <motion.div
          whileHover={{ 
            y: -8,
            boxShadow: "0 25px 30px -12px rgba(253, 86, 33, 0.25)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative bg-white p-6 rounded-xl shadow-lg group-hover:bg-fourth transition-all duration-300"
        >
          {/* Arrow (triangle) */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-white rotate-45 ${
              isTop ? "-top-2.5" : "-bottom-2.5"
            } group-hover:bg-fourth transition-colors duration-300`}
          />

          {/* Default Content */}
          <div className="group-hover:hidden">
            <h3 className="font-bold text-[#122652] mb-3">
              {step.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {step.desc}
            </p>
          </div>

          {/* Hover Content */}
          <div className="hidden group-hover:block text-white"> 
            <p className="text-sm text-white/90 leading-relaxed">
              {step.number === "01" && "Best every pleasures is too welcome business to the claims of duty or the obligation of business."}
              {step.number === "02" && "How all this mistaken idea of denouncing pleasure to the claims of duty or the obliga- tion of business."}
              {step.number === "03" && "Nor again is there anyone in who loves or pursues to the claims of duty or the obliga- tion of business."}
              {step.number === "04" && "Take a trivial example, which undertakes laborious to the claims of duty or the obliga- tion of business."}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
})}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex gap-5 items-start"
            >
              <div className="w-12 h-12 rounded-full bg-[#FD5621] text-white flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0">
                {step.number}
              </div>
              <div>
                <h3 className="font-bold text-[#122652] text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}