import React from 'react';

interface RMContactPageProps {
  onBack: () => void;
}

const RMContactPage: React.FC<RMContactPageProps> = ({ onBack }) => {
  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-[17px] font-semibold text-gray-900">Your Relationship Manager</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* RM Profile Card */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 border border-red-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#da0011] to-[#ba000e] flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-gray-900 text-base font-bold">Sarah Chen</div>
              <div className="text-gray-600 text-xs mt-0.5">Senior Relationship Manager</div>
              <div className="text-gray-600 text-xs mt-0.5">HSBC Premier</div>
              <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] mt-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Available now
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <div className="text-gray-900 text-sm font-bold mb-3">Contact Options</div>
          
          <button className="w-full bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#da0011] transition-all text-left group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#da0011] to-[#ba000e] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-gray-900 text-xs font-bold">Call Now</div>
                <div className="text-gray-500 text-[10px] mt-0.5">+852 2233 3322</div>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button className="w-full bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#da0011] transition-all text-left group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-gray-900 text-xs font-bold">Send Email</div>
                <div className="text-gray-500 text-[10px] mt-0.5">sarah.chen@hsbc.com.hk</div>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button className="w-full bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#da0011] transition-all text-left group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-gray-900 text-xs font-bold">Live Chat</div>
                <div className="text-gray-500 text-[10px] mt-0.5">Start secure messaging</div>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button className="w-full bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#da0011] transition-all text-left group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-gray-900 text-xs font-bold">Schedule Meeting</div>
                <div className="text-gray-500 text-[10px] mt-0.5">Book an appointment</div>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Office Info */}
        <div className="bg-white p-4 border border-gray-200">
          <div className="text-gray-900 text-sm font-bold mb-3">Office Location</div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="text-gray-600 text-xs leading-relaxed">
                HSBC Main Building<br/>
                1 Queen's Road Central<br/>
                Hong Kong
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-gray-600 text-xs">
                Mon-Fri: 9:00 AM - 5:00 PM<br/>
                Sat: 9:00 AM - 1:00 PM
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 border border-amber-200">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div className="text-gray-900 text-xs leading-relaxed">
              <span className="font-bold text-amber-700">24/7 Premier Hotline:</span><br/>
              For urgent matters, call +852 2233 3000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RMContactPage;
