"use client"
import React from 'react'

function history() {
  return (
    <div className=" bg-gradient-to-br from-gray-50 to-blue-50 py-4 md:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Column - history Content */}
          <div className="lg:w-2/3"> 
            
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-4 border-primary inline-block">
                Our history
              </h2>
              
              <div className="space-y-10 ml-4 border-l-4 border-primary pl-8 mt-8">
                {/* Vision Section */}
                <div className="relative">
                  <div className="absolute -left-[52px] top-2 w-8 h-8 rounded-full bg-third border-4 border-blue-50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Our vision</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    To become a globally recognized logistics partner known for operational excellence, strategic trade expertise, and innovation in international freight management.
                  </p>
                </div>
                
                {/* Mission Section */}
                <div className="relative">
                  <div className="absolute -left-[52px] top-2 w-8 h-8 rounded-full bg-third border-4 border-blue-50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Our mission</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      {/* <svg className="w-5 h-5 text-third mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg> */}
                      <span>To provide secure, efficient, and cost-effective logistics solutions that empower businesses to move goods globally with confidence. We are committed to reliability, compliance, and customer-focused service at every stage of the supply chain.</span>
                    </li>
                    {/* <li className="flex items-start">
                      <svg className="w-5 h-5 text-third mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Stet clita kasd gubergren, no sea takimata sanctus.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-third mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Tempor invidunt ut labore et dolore magna aliquyam erat.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-third mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Risus commodo viverra maecenas accumsan lacus vel facilisis.</span>
                    </li> */}
                  </ul>
                </div>
              </div>
              
              {/* <a 
                href="#" 
                className="inline-flex items-center justify-center mt-10 px-8 py-3 text-base font-semibold text-white bg-third rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                Read More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a> */}
            </section>
          </div>
          
          {/* Right Column - Experience Card */}
<div className="lg:w-1/3">
  <div className="sticky top-8 relative overflow-hidden">  
    {/* Background/History Image */}
    <img src="/images/history.jpg" alt="History background" className="w-full h-[400px] rounded-lg" />
    
    {/* Sea/Water effect for realism */}
    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
    
    {/* Cargo Ship with realistic movement */}
    <div className="absolute bottom-0 left-0 w-full h-full">
      <div className="relative w-full h-full">
        <img 
          src="/images/cargo.png" 
          alt="Cargo Ship" 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 max-w-[90%] max-h-[70%] object-contain animate-ship-enter"
          style={{
            animation: 'shipEnter 3s ease-out forwards',
            animationPlayState: 'paused',
            animationDelay: 'calc(var(--scroll) * -1s)'
          }}
        />
        
        {/* Ship wake/water trail */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-4 bg-white/20 blur-md animate-wake"></div>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  )
}

export default history