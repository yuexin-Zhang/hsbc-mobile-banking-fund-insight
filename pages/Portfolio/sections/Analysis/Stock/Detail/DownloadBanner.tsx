import React from 'react';

export const DownloadBanner: React.FC = () => {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#da0011]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-gray-900 mb-0.5">Looking for more details?</h3>
          <p className="text-[13px] text-gray-600">Download the HSBC HK Easy</p>
        </div>
        <button className="flex-shrink-0 p-2 cursor-pointer">
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DownloadBanner;
