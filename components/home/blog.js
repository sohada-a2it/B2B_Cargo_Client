"use client";
import Image from "next/image";

export default function BlogSection() {
  const blogs = [
    {
      img: "/images/blog1.jpg",
      tag: "INDUSTRY INSIGHTS",
      title: "The Impact of E-commerce on Global Logistics",
      desc: "Exporto and dislike men who are...",
    },
    {
      img: "/images/blog2.jpg",
      tag: "COMPANY NEWS",
      title: "Freight Insurance 101: What You Need to Know",
      desc: "Exporto and dislike men who are...",
    },
  ];

  return (
    <section className="relative py-14 bg-[#f4f7fb] overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#FD5621]/10 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#122652]/10 blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#FD5621] tracking-[4px] font-semibold text-sm">
            BLOG POST
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#122652] mt-4">
            News from Exporto World
          </h2>

          <div className="flex justify-center mt-6">
            <div className="w-24 h-[3px] bg-gradient-to-r from-[#FD5621] to-[#122652] rounded-full"></div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-12">

          {blogs.map((blog, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition duration-700"
            >

              {/* image */}
              <div className="relative h-[250px] overflow-hidden">
                <Image
                  src={blog.img}
                  alt="blog"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                {/* overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#122652]/80 via-transparent to-transparent"></div>

                {/* tag */}
                <span className="absolute top-5 left-5 bg-[#FD5621] text-white text-xs px-4 py-1.5 rounded-full shadow-md">
                  {blog.tag}
                </span>
              </div>

              {/* content */}
              <div className="p-4">

                <h3 className="text-2xl font-bold text-[#122652] group-hover:text-[#FD5621] transition">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-relaxed">
                  {blog.desc}
                </p>

                <div className="flex items-center justify-between mt-6">

                  <span className="text-sm text-gray-400">
                    7 MONTHS AGO
                  </span>

                  <button className="relative px-5 py-2 font-semibold text-[#122652] group-hover:text-white transition">

                    <span className="relative z-10">
                      Read More →
                    </span>

                    <div className="absolute inset-0 bg-[#FD5621] scale-x-0 group-hover:scale-x-100 origin-left transition duration-500 rounded-full"></div>

                  </button>

                </div>

              </div>

              {/* animated border */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-[#FD5621]/40 transition duration-700"></div>

            </div>
          ))}

        </div>
      </div> 
    </section>
  );
}
