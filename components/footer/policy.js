"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  HiShieldCheck,
  HiChevronRight,
  HiLockClosed,
  HiEye,
  HiDocumentText,
  HiGlobeAlt,
  HiMail,
  HiPhone,
  HiClock,
  HiCheckCircle,
  HiExclamationCircle,
  HiDownload,
  HiPrinter,
  HiUser,
  HiOfficeBuilding,
  HiCreditCard,
  HiIdentification,
  HiLocationMarker,
  HiCube,
  HiScale,
  HiCalendar,
  HiServer,
  HiChip,
  HiCookie,
  HiChartBar,
  HiTruck,
  HiDocumentReport,
  HiShieldExclamation,
  HiRefresh,
  HiPencil,
  HiTrash
} from 'react-icons/hi';

const policy = () => {
  const lastUpdated = "March 10, 2026";

  const sections = [
    {
      id: "information",
      title: "Information We Collect",
      icon: <HiEye className="w-6 h-6" />,
      bgColor: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      content: [
        {
          icon: <HiUser className="w-5 h-5" />,
          subtitle: "Personal Information",
          items: [
            { text: "Full name and contact details (email, phone number, address)", icon: <HiMail className="w-4 h-4" /> },
            { text: "Company name and business registration details", icon: <HiOfficeBuilding className="w-4 h-4" /> },
            { text: "Billing and payment information", icon: <HiCreditCard className="w-4 h-4" /> },
            { text: "Government-issued IDs for customs clearance", icon: <HiIdentification className="w-4 h-4" /> }
          ]
        },
        {
          icon: <HiCube className="w-5 h-5" />,
          subtitle: "Shipment Information",
          items: [
            { text: "Origin and destination addresses", icon: <HiLocationMarker className="w-4 h-4" /> },
            { text: "Cargo details (weight, dimensions, contents)", icon: <HiScale className="w-4 h-4" /> },
            { text: "Shipping history and tracking data", icon: <HiTruck className="w-4 h-4" /> },
            { text: "Customs documentation", icon: <HiDocumentText className="w-4 h-4" /> }
          ]
        },
        {
          icon: <HiServer className="w-5 h-5" />,
          subtitle: "Technical Information",
          items: [
            { text: "IP address and browser type", icon: <HiChip className="w-4 h-4" /> },
            { text: "Device information", icon: <HiClock className="w-4 h-4" /> },
            { text: "Cookies and usage data", icon: <HiClock className="w-4 h-4" /> },
            { text: "Login activity logs", icon: <HiChartBar className="w-4 h-4" /> }
          ]
        }
      ]
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: <HiDocumentText className="w-6 h-6" />,
      bgColor: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      content: [
        {
          items: [
            { text: "Process and manage your shipments", icon: <HiTruck className="w-4 h-4" /> },
            { text: "Provide real-time tracking updates", icon: <HiEye className="w-4 h-4" /> },
            { text: "Generate invoices and shipping documents", icon: <HiDocumentReport className="w-4 h-4" /> },
            { text: "Communicate about your shipments", icon: <HiMail className="w-4 h-4" /> },
            { text: "Improve our logistics services", icon: <HiChartBar className="w-4 h-4" /> },
            { text: "Comply with customs regulations", icon: <HiShieldCheck className="w-4 h-4" /> },
            { text: "Prevent fraud and enhance security", icon: <HiLockClosed className="w-4 h-4" /> }
          ]
        }
      ]
    },
    {
      id: "sharing",
      title: "Information Sharing",
      icon: <HiGlobeAlt className="w-6 h-6" />,
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      content: [
        {
          subtitle: "We may share your information with:",
          items: [
            { text: "Shipping carriers and logistics partners", icon: <HiTruck className="w-4 h-4" /> },
            { text: "Customs authorities and regulatory bodies", icon: <HiShieldExclamation className="w-4 h-4" /> },
            { text: "Payment processors for billing", icon: <HiCreditCard className="w-4 h-4" /> },
            { text: "Third-party service providers", icon: <HiOfficeBuilding className="w-4 h-4" /> },
            { text: "Legal authorities when required by law", icon: <HiDocumentText className="w-4 h-4" /> }
          ]
        }
      ]
    },
    {
      id: "security",
      title: "Data Security",
      icon: <HiLockClosed className="w-6 h-6" />,
      bgColor: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      content: [
        {
          items: [
            { text: "256-bit SSL encryption for all data transmission", icon: <HiLockClosed className="w-4 h-4" /> },
            { text: "Regular security audits and penetration testing", icon: <HiShieldCheck className="w-4 h-4" /> },
            { text: "Access controls and authentication", icon: <HiUser className="w-4 h-4" /> },
            { text: "Secure data centers with 24/7 monitoring", icon: <HiServer className="w-4 h-4" /> },
            { text: "Employee training on data protection", icon: <HiDocumentText className="w-4 h-4" /> }
          ]
        }
      ]
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: <HiCheckCircle className="w-6 h-6" />,
      bgColor: "from-red-50 to-rose-50",
      borderColor: "border-red-200",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      content: [
        {
          items: [
            { text: "Access your personal data", icon: <HiEye className="w-4 h-4" /> },
            { text: "Correct inaccurate information", icon: <HiPencil className="w-4 h-4" /> },
            { text: "Request data deletion", icon: <HiTrash className="w-4 h-4" /> },
            { text: "Opt-out of marketing communications", icon: <HiMail className="w-4 h-4" /> },
            { text: "Data portability", icon: <HiRefresh className="w-4 h-4" /> }
          ]
        }
      ]
    }
  ];

  const contacts = [
    { icon: <HiMail className="w-5 h-5" />, text: "privacy@cargologisticscompany.com", href: "mailto:privacy@cargologisticscompany.com" },
    { icon: <HiPhone className="w-5 h-5" />, text: "+1-647-362-7735", href: "tel:+1-647-362-7735" },
    { icon: <HiLocationMarker className="w-5 h-5" />, text: "8825 Stanford Blvd Suite 306, Columbia MD 21045 USA", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Banner with #E67E22 and #122652 colors */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #122652 0%, #1a3a6e 50%, #E67E22 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <HiShieldCheck className="w-5 h-5 text-orange-400" />
              <span className="text-white/90 text-sm font-medium">Last Updated: {lastUpdated}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center justify-center mt-8 text-sm text-white/70">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <HiChevronRight className="w-4 h-4 mx-2" />
              <span className="text-orange-400 font-medium">Privacy Policy</span>
            </nav>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24"> 

        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 mb-8 border border-gray-100"
        >
          <div className="flex items-start gap-6">
            <div className="hidden lg:block w-20 h-20 bg-gradient-to-br from-[#122652] to-[#E67E22] rounded-2xl flex items-center justify-center">
              <HiShieldCheck className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#122652] mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                At Cargo Logistics Company, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our freight forwarding and logistics services. Please read this policy carefully to understand our views and practices regarding your personal data.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sections Grid */}
        <div className="grid gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`bg-gradient-to-br ${section.bgColor} rounded-2xl shadow-lg border ${section.borderColor} overflow-hidden`}
            >
              {/* Section Header */}
              <div className="p-6 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${section.iconBg} rounded-xl flex items-center justify-center ${section.iconColor}`}>
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-[#122652]">{section.title}</h2>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6">
                {section.content.map((subsection, idx) => (
                  <div key={idx} className={idx > 0 ? 'mt-6' : ''}>
                    {subsection.subtitle && (
                      <div className="flex items-center gap-2 mb-4">
                        {subsection.icon && (
                          <div className={`w-8 h-8 ${section.iconBg} rounded-lg flex items-center justify-center ${section.iconColor}`}>
                            {subsection.icon}
                          </div>
                        )}
                        <h3 className="font-semibold text-gray-800">{subsection.subtitle}</h3>
                      </div>
                    )}
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {subsection.items.map((item, itemIdx) => (
                        <div 
                          key={itemIdx}
                          className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                          <div className={`mt-0.5 ${section.iconColor}`}>
                            {item.icon || <HiCheckCircle className="w-5 h-5" />}
                          </div>
                          <span className="text-sm text-gray-600 flex-1">
                            {item.text || item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-br from-[#122652] to-[#1a3a6e] rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Contact Info */}
            <div className="p-10 lg:p-14">
              <h3 className="text-2xl font-bold text-white mb-4">Questions About Your Privacy?</h3>
              <p className="text-white/80 mb-8">
                If you have any questions or concerns about our Privacy Policy, please contact our Data Protection Officer.
              </p>
              
              <div className="space-y-4">
                {contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.href}
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="text-white">
                        {contact.icon}
                      </div>
                    </div>
                    <span className="text-white/90 group-hover:text-white">
                      {contact.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Decorative */}
            <div className="relative hidden lg:block bg-[#E67E22] overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative h-full flex items-center justify-center p-14">
                <div className="text-center">
                  <HiShieldCheck className="w-24 h-24 text-white/30 mx-auto mb-6" />
                  <h4 className="text-white/80 text-lg font-medium">Your Data, Protected</h4>
                  <p className="text-white/60 text-sm">256-bit SSL Encryption</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p>© {new Date().getFullYear()} Cargo Logistics Company. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/terms-of-service" className="hover:text-[#E67E22] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#E67E22] transition-colors">
              Cookie Policy
            </Link>
            <Link href="/contact" className="hover:text-[#E67E22] transition-colors">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default policy;