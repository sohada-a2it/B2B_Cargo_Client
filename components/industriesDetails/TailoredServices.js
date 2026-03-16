export default function TailoredServices() {
  const services = [
    {
      title: "Just-in-Time Delivery",
      desc: "Optimized scheduling to reduce storage costs and improve efficiency.",
      icon: "⏱️",
    },
    {
      title: "Returnable Packaging",
      desc: "Eco-friendly and reusable packaging solutions for sustainability.",
      icon: "♻️",
    },
    {
      title: "Specialized Vehicles",
      desc: "Temperature-controlled and industry-specific transport solutions.",
      icon: "🚛",
    },
    {
      title: "Rapid Delivery",
      desc: "Fast and secure transportation with real-time tracking.",
      icon: "⚡",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-primary">
            Tailored Services
          </h2>
          <p className="text-third mt-4 max-w-2xl mx-auto">
            We provide customized logistics solutions designed to meet your
            unique business requirements efficiently and reliably.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 group border border-gray-100"
            >
              <div className="text-4xl mb-5 group-hover:scale-110 transition">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}