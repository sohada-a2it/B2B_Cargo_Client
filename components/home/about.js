"use client";
import { CheckCircle, Award, Target, Eye, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import { FaAward } from "react-icons/fa";

export default function about() {
  return (
    <div className="bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div className="relative">
        {/* Background Decorative Element */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-tr from-orange-500/5 to-blue-500/5 rounded-full blur-2xl"></div>
        
        <div className="relative">
          {/* Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-blue-100 text-orange-700 font-semibold text-sm px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
            Global Logistics Leader
          </div>
          
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Cargo Logistic Company
            <span className="block text-orange-500 mt-2">About Us</span>
          </h1>
          
          <div className="space-y-4 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
             Building Trust Through Excellence
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When our power choice is untrammelled and when nothing prevents being able to do what we to be welcomed procure him some great pleasure take a trivial example, which of us ever undertake laborious physical exercise, except to obtain some advantages.
            </p>
          </div>
          
          {/* Stats Card */}
          <div className="bg-gradient-to-r from-white to-orange-50 border border-orange-100 rounded-2xl p-3 md:p-4 shadow-lg mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <FaAward className='text-[30px]'/>
                </div>
              </div>
              <div className="ml-6">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                25
                </div>
                <div className="text-gray-600 font-medium">
                  Industry Awards
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Industry awards in the past decade.
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
      
      {/* Right Side - Map Visualization */}
      <div className="relative">
  <div className="relative h-[500px] lg:h-[400px] bg-gradient-to-br from-blue-50 via-sky-50 to-white rounded-3xl overflow-hidden shadow-2xl border border-blue-200">
    
    {/* Subtle Grid Background */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }}></div>
    </div> 

    <div className="absolute top-[35%] right-[40%]">
      <div className="relative">
        <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-ping opacity-60" style={{animationDelay: '0.2s'}}></div>
        <div className="absolute top-0 w-6 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="fi fi-cn fis text-xs"></span>
        </div>
        <div className="absolute -top-12 -left-6 bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg p-3 shadow-md border border-red-200">
          <div className="text-sm font-bold text-red-900">China</div>
          <div className="text-lg font-bold">1,250+</div>
          <div className="text-xs text-red-600">Active Clients</div>
        </div>
      </div>
    </div>

    <div className="absolute bottom-[20%] left-1/3">
       <div className="relative z-10">
        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-0 w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="fi fi-th fis text-xs"></span>
        </div>
        <div className="absolute -top-12 -left-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-3 shadow-md border border-orange-200">
          <div className="text-sm font-bold text-orange-900">Thailand</div>
          <div className="text-lg font-bold">850+</div>
          <div className="text-xs text-orange-600">Active Clients</div>
        </div>
      </div>
    </div> 

    {/* Enhanced Floating Cards */}
    <div className="absolute top-8 left-8 bg-gradient-to-br from-white to-blue-50 rounded-xl p-5 shadow-xl border border-blue-200 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-blue-300 z-10">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
          <span className="fi fi-as fis text-white"></span>
        </div>
        <div>
          <div className="text-sm font-bold text-blue-900">Asia Pacific</div>
          <div className="text-xs text-blue-600">Thailand • China</div>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">4,200+</div>
      <div className="text-xs text-gray-500">Active Clients</div>
      <div className="mt-2 flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <span className="text-xs text-green-600 font-medium">Live Routes Active</span>
      </div>
    </div> 
    
    <div className="absolute top-1/2 right-16 bg-gradient-to-br from-white to-red-50 rounded-xl p-5 shadow-xl border border-red-200 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-red-300 z-10">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
          <span className="fi fi-na fis text-white"></span>
        </div>
        <div>
          <div className="text-sm font-bold text-red-900">Americas</div>
          <div className="text-xs text-red-600">USA • Canada • UK</div>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">3,750+</div>
      <div className="text-xs text-gray-500">Active Clients</div>
      <div className="mt-2 flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <span className="text-xs text-green-600 font-medium">Live Routes Active</span>
      </div>
    </div> 

    {/* Enhanced Connection Lines with Flags */}
    <svg className="absolute inset-0 w-full h-full" style={{zIndex: 0}}>
      {/* Thailand to China */}
      <line x1="25%" y1="25%" x2="33%" y2="33%" stroke="url(#grad1)" strokeWidth="3" strokeDasharray="5" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
      </line>
      
      {/* China to USA */}
      <line x1="33%" y1="33%" x2="40%" y2="60%" stroke="url(#grad2)" strokeWidth="3" strokeDasharray="5" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" begin="0.3s" />
      </line>
      
      {/* USA to UK */}
      <line x1="40%" y1="60%" x2="75%" y2="66%" stroke="url(#grad3)" strokeWidth="3" strokeDasharray="5" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" begin="0.6s" />
      </line>
      
      {/* USA to Canada */}
      <line x1="40%" y1="60%" x2="50%" y2="50%" stroke="url(#grad4)" strokeWidth="3" strokeDasharray="5" className="animate-dash">
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" begin="0.9s" />
      </line>
      
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </svg> 
  </div>
  
  {/* Enhanced Decorative Elements */}
  <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-tr from-orange-500/30 via-amber-500/20 to-transparent rounded-full blur-xl animate-pulse"></div>
  <div className="absolute -top-6 -right-6 w-36 h-36 bg-gradient-to-bl from-blue-500/30 via-cyan-500/20 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
  <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/10 rounded-full blur-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
</div>
    </div>
  </div>
  
  {/* Bottom Pattern */}
  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-50/50 to-transparent"></div>
</div>
  );
} 