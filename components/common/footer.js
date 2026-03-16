"use client";

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ChevronRight, Facebook, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';
import Link from 'next/link';

const footer = () => { 

  const footerSections = [
  {
  title: "Contact Info",
  content: (
    <div className="space-y-1.5">
      {/* Head Office - Ultra Compact */}
      <div className=' mb-4 '>
        <h3 className="font-semibold text-third text-[10px] sm:text-sm leading-tight mb-2">
          HEAD OFFICE
        </h3>
        <p className="text-gray-600 text-[9px] sm:text-sm leading-tight">
          8825 STANFORD BLVD, SUITE 306, COLUMBIA, MD 21045, USA
        </p>
      </div>
      
      {/* Phone & Email - Side by side, no gap */}
      <div className="flex flex-wrap items-center gap-x-1 mb-4 sm:mb-1">
        <span className="font-semibold text-third text-[10px] sm:text-sm">PHONE:</span>
        <a href="tel:+1-647-362-7735" className="text-gray-600 text-[9px] sm:text-sm hover:text-primary transition-colors inline-flex items-center gap-0.5">
          <Phone className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
          +1-647-362-7735
        </a>
      </div>
      
      <div className="flex flex-wrap items-center gap-x-1">
        <span className="font-semibold text-third text-[10px] sm:text-sm">EMAIL:</span>
        <a href="mailto:info@cargologisticscompany.com" className="text-gray-600 text-[9px] sm:text-sm hover:text-primary transition-colors inline-flex items-center gap-0.5 truncate max-w-[180px] sm:max-w-none">
          <Mail className="w-2.5 h-2.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">info@cargologisticscompany.com</span>
        </a>
      </div>
    </div>
  )
},
    {
      title: "Links",
      links: [
        { name: "Our Company", path: "/about/company" },
        { name: "History", path: "/about/history" },
        { name: "Mission & Vision", path: "/footer/mission-vission" },
        { name: "Global Network", path: "/contact" },
        { name: "Projects", path: "/about/project" }
      ]
    },
    {
      title: "Essentials",
      links: [
        { name: "Services", path: "/service" },
        { name: "Industries", path: "/industries" },
        { name: "Booking", path: "/footer/booking" },
        { name: "Tracking", path: "/tracking-number" },
        { name: "Why Us", path: "/footer/choose" },
      ]
    },
    {
      title: "Gallery",
      content: (
        <div>
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {[
              { id: 1, src: "/images/gal1.jpg", alt: "Gallery 1", path: "/gallery/1" },
              { id: 2, src: "/images/gal2.jpg", alt: "Gallery 2", path: "/gallery/2" },
              { id: 3, src: "/images/gal3.jpg", alt: "Gallery 3", path: "/gallery/3" },
              { id: 4, src: "/images/gal4.jpg", alt: "Gallery 4", path: "/gallery/4" },
              { id: 5, src: "/images/gal5.jpg", alt: "Gallery 5", path: "/gallery/5" },
              { id: 6, src: "/images/gal6.jpg", alt: "Gallery 6", path: "/gallery/6" }
            ].map((item) => (
              <Link href={item.path} key={item.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square bg-primary/10 rounded-lg overflow-hidden cursor-pointer"
                >
                  <img 
                    src={item.src} 
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150?text=Gallery";
                    }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <footer className="bg-secondary text-third relative overflow-hidden"> 

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 lg:py-6">
        {/* Mobile: 2 columns exact, Desktop: 4 columns */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4 lg:gap-12">
          {/* First row - Contact Info & Links */}
          <div className="col-span-1">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 relative inline-block">
              {footerSections[0].title}
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 rounded-full bg-primary" 
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 0.1 }}
              />
            </h2>
            {footerSections[0].content}
          </div>

          <div className="col-span-1">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 relative inline-block">
              {footerSections[1].title}
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 rounded-full bg-primary" 
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 0.2 }}
              />
            </h2>
            <ul className="space-y-1.5 sm:space-y-0.5 lg:space-y-4">
              {footerSections[1].links.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  className="text-[10px] sm:text-xs lg:text-sm"
                >
                  <Link
                    href={link.path}
                    className="text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-1 lg:gap-2"
                  >
                    <ChevronRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-primary" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Second row - Essentials & Gallery */}
          <div className="col-span-1">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 relative inline-block">
              {footerSections[2].title}
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 rounded-full bg-primary" 
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 0.3 }}
              />
            </h2>
            <ul className="space-y-1.5 sm:space-y-2 lg:space-y-4">
              {footerSections[2].links.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  className="text-[10px] sm:text-xs lg:text-sm"
                >
                  <Link
                    href={link.path}
                    className="text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-1 lg:gap-2"
                  >
                    <ChevronRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-primary" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 relative inline-block">
              {footerSections[3].title}
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 rounded-full bg-primary" 
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 0.4 }}
              />
            </h2>
            {footerSections[3].content}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 sm:mt-5 lg:mt-6 pt-3 sm:pt-4 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4"
        >
          <p className="text-gray-600 text-[8px] sm:text-xs lg:text-sm text-center md:text-left">
            © {new Date().getFullYear()} Cargo Logistics Company. All rights reserved.
          </p>
          
          <div className="flex gap-3 sm:gap-4 lg:gap-6 text-[8px] sm:text-xs lg:text-sm">
            <Link href="/footer/privacy-policy" className="text-gray-600 hover:text-[#FD5621] transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="text-gray-600 hover:text-[#FD5621] transition-colors">
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default footer;