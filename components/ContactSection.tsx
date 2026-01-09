
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-50">
        <h3 className="text-lg font-bold text-gray-800">Contact Us</h3>
      </div>
      
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              <circle cx="12" cy="10" r="1" fill="currentColor" />
            </svg>
          </div>
          <div>
            <div className="text-base font-medium text-gray-900">AI Assistant</div>
            <div className="text-xs text-gray-500">24/7 Service</div>
          </div>
        </div>
        <button className="text-[#DB0011] font-medium text-sm">Call Us</button>
      </div>

      <div className="mx-4 h-px bg-gray-100"></div>

      <div className="p-4 flex items-center justify-between group active:bg-gray-50 transition-colors">
        <div className="text-xs text-gray-600 line-clamp-1">
          You have a new HSBC investment insight waiting for you!
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  );
};

export default ContactSection;
