"use client";
import { useState, useEffect, useRef } from "react";

function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);

          const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
              start = end;
              clearInterval(counter);
            }
            setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const features = [
    {
      title: "Precision Timing",
      desc: "We ensure exact scheduling to minimize delays and maximize performance.",
    },
    {
      title: "End-to-End Visibility",
      desc: "Real-time tracking and transparency throughout the supply chain.",
    },
    {
      title: "Advanced Technology",
      desc: "Modern logistics systems with automation and data-driven insights.",
    },
    {
      title: "Reliable Network",
      desc: "Strong global transport network ensuring safe and secure delivery.",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose Us
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We combine technology, reliability, and industry expertise
            to deliver unmatched logistics performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Tabs */}
          <div className="space-y-4">
            {features.map((item, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-full text-left p-5 rounded-xl transition duration-300 border ${
                  active === index
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-50 hover:bg-blue-50 text-gray-700"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="bg-gray-50 p-10 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {features[active].title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              {features[active].desc}
            </p>
          </div>
          
        </div>
         {/* Counter Section */}
            <div className="grid grid-cols-4 gap-6 mt-6">
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h4 className="text-3xl font-bold text-third">
                  <Counter end={600} suffix="+" />
                </h4>
                <p className="text-sm text-gray-500 mt-2">
                  Shipments Daily
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h4 className="text-3xl font-bold text-third">
                  <Counter end={30} suffix="%" />
                </h4>
                <p className="text-sm text-gray-500 mt-2">
                  Fuel Efficiency
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h4 className="text-3xl font-bold text-third">
                  <Counter end={15} suffix="+" />
                </h4>
                <p className="text-sm text-gray-500 mt-2">
                  Years Experience
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h4 className="text-3xl font-bold text-third">
                  <Counter end={120} suffix="+" />
                </h4>
                <p className="text-sm text-gray-500 mt-2">
                  Global Clients
                </p>
              </div>
            </div>
      </div>
    </section>
  );
}