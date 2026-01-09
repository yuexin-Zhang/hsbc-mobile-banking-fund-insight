
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[12px] rounded-[3rem] h-[92vh] max-h-[850px] w-[375px] shadow-2xl overflow-hidden ring-4 ring-gray-700 ring-opacity-20 transition-all duration-300">
      {/* Top Notch Area / Status Bar */}
      <div className="absolute top-0 inset-x-0 h-10 bg-transparent z-50 flex justify-between px-7 items-center pointer-events-none">
        <span className="text-white text-xs font-semibold">17:41</span>
        
        {/* Notch */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-6 bg-gray-800 rounded-b-2xl"></div>

        <div className="flex items-center space-x-1.5">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
          </svg>
          <div className="flex items-center border border-white/50 rounded-[3px] px-0.5 py-0">
             <span className="text-[8px] text-white mr-0.5 scale-[0.8]">75</span>
             <div className="w-3 h-1.5 bg-green-400 rounded-[1px]"></div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="h-full w-full bg-white relative">
        {children}
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400/50 rounded-full z-50"></div>
    </div>
  );
};

export default PhoneFrame;
