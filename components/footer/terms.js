"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
  Ship,
  Plane,
  Package,
} from "lucide-react";
import Link from "next/link";

const TermsOfService = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const sections = [
    {
      id: "overview",
      title: "1. Overview & Acceptance",
      icon: <FileText className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            By accessing and using the Cargo Logistics Company freight forwarding platform
            (the "Platform"), you agree to be bound by these Terms of Service ("Terms").
            These Terms apply to all users including B2B customers, freight forwarders,
            warehouse managers, and administrative personnel operating within Thailand,
            China, USA, UK, and Canada.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The Platform provides international freight booking, shipment tracking,
            warehouse consolidation, documentation management, and billing services.
            If you do not agree to these Terms, please refrain from using our services.
          </p>
          <div className="bg-primary/5 border-l-4 border-primary p-3 rounded-r-lg">
            <p className="text-sm text-gray-700">
              <strong>Last Updated:</strong> February 2, 2026
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "services",
      title: "2. Freight & Logistics Services",
      icon: <Truck className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Cargo Logistics Company offers international freight forwarding services including:
          </p>
          <ul className="space-y-2 ml-6">
            {[
              "Air Freight ✈️ – Express and consolidated air shipments",
              "Sea Freight 🚢 – FCL (Full Container Load) & LCL (Less than Container Load)",
              "Express Courier 📦 – Door-to-door expedited delivery",
              "Warehouse consolidation & container loading",
              "Customs brokerage support (DDP/DDU options)",
              "Real-time shipment tracking & milestone updates",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-2 text-gray-700"
              >
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed text-sm bg-gray-50 p-3 rounded-lg">
            <strong>Note:</strong> All shipping routes and estimated delivery times are
            subject to operational constraints, weather conditions, customs clearance,
            and other force majeure events.
          </p>
        </div>
      ),
    },
    {
      id: "user-roles",
      title: "3. User Roles & Responsibilities",
      icon: <Shield className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-4">
          {[
            {
              role: "Admin (Logistics Owner)",
              desc: "Full system oversight: customer management, shipment approval, invoice generation, staff assignment, and analytics dashboard.",
            },
            {
              role: "Operations Staff",
              desc: "Daily shipment operations: booking confirmation, milestone updates, document uploads, and container/airway bill assignment.",
            },
            {
              role: "Warehouse Manager",
              desc: "Handles consolidation: receiving cargo, warehouse location assignment, package grouping, and container loading status.",
            },
            {
              role: "B2B Customer",
              desc: "Portal access: book shipments, upload packing lists, track shipments, download invoices and shipping documents.",
            },
          ].map((role, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 4 }}
              className="border-l-2 border-primary/30 pl-4 py-1"
            >
              <h4 className="font-semibold text-gray-800">{role.role}</h4>
              <p className="text-sm text-gray-600">{role.desc}</p>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: "bookings",
      title: "4. Shipment Booking & Confirmation",
      icon: <Package className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Customers may submit shipment requests through the booking portal.
            All bookings are subject to review and approval by operations staff.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-semibold text-sm text-gray-800 mb-2">
                Required Information:
              </h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Shipment Type (Air/Sea/Courier)</li>
                <li>• Origin (China/Thailand warehouse)</li>
                <li>• Destination (US/UK/Canada)</li>
                <li>• Cartons, Weight, Volume (CBM)</li>
                <li>• Product category & DDP/DDU preference</li>
              </ul>
            </div>
            <div className="bg-primary/5 p-3 rounded-lg">
              <h4 className="font-semibold text-sm text-gray-800 mb-2">
                Shipment Status Flow:
              </h4>
              <div className="flex flex-wrap gap-1 text-xs">
                {[
                  "Booking Requested",
                  "Confirmed",
                  "At Warehouse",
                  "Consolidation",
                  "In Transit",
                  "Customs",
                  "Delivered",
                ].map((status, i) => (
                  <span
                    key={i}
                    className="bg-white px-2 py-0.5 rounded-full shadow-sm"
                  >
                    {status}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic mt-2">
            Once confirmed, a unique tracking number will be assigned for end-to-end visibility.
          </p>
        </div>
      ),
    },
    {
      id: "warehouse",
      title: "5. Warehouse Consolidation & Container Loading",
      icon: <Ship className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Our warehouse consolidation system allows grouping multiple supplier
            shipments into full container loads (FCL). Warehouse managers maintain
            real-time visibility of cargo location and loading status.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center gap-2 bg-white shadow-sm px-3 py-2 rounded-full">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">Receiving at Warehouse</span>
            </div>
            <div className="flex items-center gap-2 bg-white shadow-sm px-3 py-2 rounded-full">
              <Package className="w-4 h-4 text-primary" />
              <span className="text-sm">Location Assignment</span>
            </div>
            <div className="flex items-center gap-2 bg-white shadow-sm px-3 py-2 rounded-full">
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-sm">Container Loading Plan</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tracking",
      title: "6. Tracking Portal & Updates",
      icon: <Globe className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Every shipment receives a unique tracking ID accessible via public or
            customer portal. Real-time milestones include:
          </p>
          <div className="relative mt-4 mb-2">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>
            <div className="space-y-4">
              {[
                "Booking Confirmed & Tracking Assigned",
                "Received at Origin Warehouse",
                "Consolidation / Container Loading",
                "Departed Origin Port/Airport",
                "Arrived at Destination Country",
                "Customs Clearance (Mock Process)",
                "Out for Delivery",
                "Delivered – Proof of Delivery",
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center z-10">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-gray-700 text-sm pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "billing",
      title: "7. Billing, Invoicing & Payment",
      icon: <FileText className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Freight charges, handling fees, warehouse fees, and customs processing
            fees are itemized on each invoice. Multi-currency support includes:
          </p>
          <div className="flex gap-3 flex-wrap">
            {["USD 💵", "GBP 💷", "CAD 💸"].map((curr) => (
              <span
                key={curr}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium"
              >
                {curr}
              </span>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed mt-2">
            Invoices are generated by Admin/Staff and marked as "Due" or "Paid"
            (manual confirmation). Customers can download PDF invoices directly from
            their portal. Payment terms are net 30 days unless otherwise agreed.
          </p>
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
            <p className="text-sm text-amber-800 flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                All amounts exclude applicable taxes, duties, or customs tariffs
                unless DDP terms are explicitly selected.
              </span>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "documents",
      title: "8. Documentation & Compliance",
      icon: <FileText className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Customers and staff can upload and manage essential shipping documents:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-2">
            {[
              "Commercial Invoice",
              "Packing List",
              "Shipping Labels",
              "Bill of Lading (B/L)",
              "Airway Bill (AWB)",
              "Customs Declaration (Mock)",
            ].map((doc) => (
              <li key={doc} className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                {doc}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            All documents must comply with international trade regulations and
            origin/destination country laws. False declarations may result in
            shipment holds or legal action.
          </p>
        </div>
      ),
    },
    {
      id: "privacy",
      title: "9. Data Privacy & Security",
      icon: <Shield className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            We implement role-based access controls (RBAC), JWT authentication, and
            encrypted data storage. Personal and business information is used solely
            for logistics operations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Customers may only access their own shipments, invoices, and documents.
            Staff and Admin have elevated permissions strictly for operational needs.
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>GDPR & CCPA compliant practices (mock readiness)</span>
          </div>
        </div>
      ),
    },
    {
      id: "limitations",
      title: "10. Limitations of Liability",
      icon: <AlertCircle className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Cargo Logistics Company shall not be liable for delays caused by customs
            holds, natural disasters, political instability, labor strikes, pandemics,
            or any force majeure events. Liability for lost or damaged goods is
            limited to the declared value on the shipping documentation, not exceeding
            $100 USD per shipment unless additional insurance is purchased.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We do not guarantee specific delivery dates; all ETAs are estimates based
            on historical carrier performance.
          </p>
        </div>
      ),
    },
    {
      id: "amendments",
      title: "11. Amendments & Governing Law",
      icon: <Clock className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            These Terms may be updated periodically. Continued use of the Platform
            constitutes acceptance of revised terms. These Terms are governed by the
            laws of Maryland, USA, without regard to conflict of law principles.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For disputes, the parties agree to submit to binding arbitration in
            Columbia, MD, unless otherwise required by local regulations in Thailand,
            China, UK, or Canada.
          </p>
        </div>
      ),
    },
  ];

  const footerSections = [
    {
      title: "Contact Info",
      content: (
        <div className="space-y-1.5">
          <div className="mb-4">
            <h3 className="font-semibold text-third text-[10px] sm:text-sm leading-tight mb-2">
              HEAD OFFICE
            </h3>
            <p className="text-gray-600 text-[9px] sm:text-sm leading-tight">
              8825 STANFORD BLVD, SUITE 306, COLUMBIA, MD 21045, USA
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-1 mb-4 sm:mb-1">
            <span className="font-semibold text-third text-[10px] sm:text-sm">
              PHONE:
            </span>
            <a
              href="tel:+1-647-362-7735"
              className="text-gray-600 text-[9px] sm:text-sm hover:text-primary transition-colors inline-flex items-center gap-0.5"
            >
              <Phone className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
              +1-647-362-7735
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-1">
            <span className="font-semibold text-third text-[10px] sm:text-sm">
              EMAIL:
            </span>
            <a
              href="mailto:info@cargologisticscompany.com"
              className="text-gray-600 text-[9px] sm:text-sm hover:text-primary transition-colors inline-flex items-center gap-0.5 truncate max-w-[180px] sm:max-w-none"
            >
              <Mail className="w-2.5 h-2.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">info@cargologisticscompany.com</span>
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "Links",
      links: [
        { name: "Our Company", path: "/about/company" },
        { name: "History", path: "/about/history" },
        { name: "Mission & Vision", path: "/footer/mission-vission" },
        { name: "Global Network", path: "/contact" },
        { name: "Projects", path: "/about/project" },
      ],
    },
    {
      title: "Essentials",
      links: [
        { name: "Services", path: "/service" },
        { name: "Industries", path: "/industries" },
        { name: "Booking", path: "/footer/booking" },
        { name: "Tracking", path: "/tracking-number" },
        { name: "Why Us", path: "/footer/choose" },
      ],
    },
    {
      title: "Gallery",
      content: (
        <div>
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <Link href={`/gallery/${id}`} key={id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square bg-primary/10 rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={`/images/gal${id}.jpg`}
                    alt={`Gallery ${id}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/150x150/e2e8f0/64748b?text=Img";
                    }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-secondary text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-primary/20 p-3 rounded-full backdrop-blur-sm">
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              Legal framework for international freight forwarding, logistics
              management, and B2B operations across Thailand, China, USA, UK & Canada
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                On this page
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Terms Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-6"
          >
            {sections.map((section) => (
              <motion.div
                key={section.id}
                id={section.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">{section.icon}</div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className="p-6">{section.content}</div>
              </motion.div>
            ))}

            {/* Acceptance Banner */}
            <motion.div
              variants={itemVariants}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center"
            >
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                By using our platform, you acknowledge these Terms
              </h3>
              <p className="text-gray-600">
                For questions or clarifications, please contact our legal team at{" "}
                <a
                  href="mailto:legal@cargologisticscompany.com"
                  className="text-primary hover:underline"
                >
                  legal@cargologisticscompany.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div> 
    </div>
  );
};

export default TermsOfService;