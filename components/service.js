import React from 'react'
import { HiChevronRight } from 'react-icons/hi'
import Service from "@/components/home/service"
import Shipping from "@/components/home/shipping"
import Price from "@/components/home/price"
function service() {
  return (
    <div>
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
                      Service
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <Service/>
            <Shipping/>
            <Price/>
    </div>
  )
}

export default service
