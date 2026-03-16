"use client"
import React from 'react'
import { HiChevronRight } from 'react-icons/hi'
import { FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaFacebookF } from 'react-icons/fa'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'


function Teams() {
  // In your component:
const [ref, inView] = useInView({
  triggerOnce: true,
  threshold: 0.5,
})
  const teamMembers = [
    {
      name: "Leo George",
      title: "CHIEF EXECUTIVE OFFICER",
      image: "/images/team (1).jpg",
      email: "leo.george@cargologisticscompany.com",
      phone: "+1 (555) 123-4567",
      experience: "15+ years",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      name: "Benjamin Ebenezer",
      title: "LOGISTICS MANAGER",
      image: "/images/team (2).jpg", 
      email: "benjamin.ebenezer@cargologisticscompany.com",
      phone: "+1 (555) 234-5678",
      experience: "12+ years",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      name: "Sophia Luna",
      title: "CLIENT RELATIONS SPECIALIST",
      image: "/images/team (3).jpg",
      email: "sophia.luna@cargologisticscompany.com",
      phone: "+1 (555) 345-6789",
      experience: "8+ years",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      name: "Michael Chen",
      title: "OPERATIONS DIRECTOR",
      image: "/images/team (4).jpg",
      email: "michael.chen@cargologisticscompany.com",
      phone: "+1 (555) 456-7890",
      experience: "10+ years",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      name: "Sarah Williams",
      title: "FINANCE MANAGER",
      image: "/images/team (5).jpg",
      email: "sarah.williams@cargologisticscompany.com",
      phone: "+1 (555) 567-8901",
      experience: "9+ years",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      name: "David Rodriguez",
      title: "FLEET SUPERVISOR",
      image: "/images/team (6).jpg",
      email: "david.rodriguez@cargologisticscompany.com",
      phone: "+1 (555) 678-9012",
      experience: "7+ years",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#"
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <div
        className="min-h-[350px] bg-cover bg-center bg-no-repeat relative mx-6 rounded-b-3xl overflow-hidden"
        style={{
          backgroundImage: "url('/images/aboutBanner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        <div className="relative z-10 p-8 md:p-12">
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
                Teams
              </li>
            </ol>
          </nav>
          
          <div className="mt-16 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet Our Expert Team
            </h1>
            <p className="text-lg text-gray-200">
              Our dedicated team of 50+ professionals works tirelessly to ensure your cargo reaches its destination safely and on time.
            </p>
          </div>
        </div>
      </div>

      {/* Team Stats Banner */}
      <div className="max-w-7xl mx-auto px-6 mt-10" ref={ref}>
  <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
        {inView ? <CountUp end={50} duration={2.5} suffix="+" /> : "0+"}
      </div>
      <div className="text-sm text-gray-600 font-medium">Team Members</div>
    </div>
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
        {inView ? <CountUp end={15} duration={2.5} suffix="+" /> : "0+"}
      </div>
      <div className="text-sm text-gray-600 font-medium">Years Experience</div>
    </div>
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
        {inView ? <CountUp end={500} duration={2.5} suffix="+" /> : "0+"}
      </div>
      <div className="text-sm text-gray-600 font-medium">Projects Done</div>
    </div>
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
        {inView ? <CountUp end={24} duration={2.5} suffix="/7" /> : "0/7"}
      </div>
      <div className="text-sm text-gray-600 font-medium">Support</div>
    </div>
  </div>
</div>

      {/* Team Members Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Leadership & Management Team
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Member Image */}
              <div className="relative h-72 overflow-hidden bg-gray-200">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                    <span className="text-5xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                
                {/* Social Links Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
                  <a
                    href={member.social.linkedin}
                    className="bg-white p-2.5 rounded-full hover:bg-[#0077b5] hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="bg-white p-2.5 rounded-full hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.facebook}
                    className="bg-white p-2.5 rounded-full hover:bg-[#4267B2] hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                </div> */}

                {/* Experience Badge */}
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {member.experience}
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-primary mb-4 pb-2 border-b border-gray-100">
                  {member.title}
                </p>
                
                {/* Contact Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-600 group/email">
                    <FaEnvelope className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover/email:text-primary transition-colors" />
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm hover:text-primary transition-colors truncate"
                    >
                      {member.email}
                    </a>
                  </div>
                  {/* <div className="flex items-center gap-3 text-gray-600 group/phone">
                    <FaPhone className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover/phone:text-primary transition-colors" />
                    <a
                      href={`tel:${member.phone}`}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {member.phone}
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-third py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Team?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine expertise with dedication to provide the best logistics solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Team</h3>
              <p className="text-gray-400">Highly qualified professionals with years of industry experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cost Effective</h3>
              <p className="text-gray-400">Competitive pricing without compromising on quality</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Reliable Service</h3>
              <p className="text-gray-400">24/7 support and real-time tracking for peace of mind</p>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Teams