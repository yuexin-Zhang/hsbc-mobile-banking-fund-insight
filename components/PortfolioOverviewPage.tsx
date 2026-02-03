
import React, { useState, useEffect } from 'react';

interface PortfolioOverviewPageProps {
  onBack: () => void;
  onGoToUnitTrusts: () => void;
}

const PortfolioOverviewPage: React.FC<PortfolioOverviewPageProps> = ({ onBack, onGoToUnitTrusts }) => {
  const [currentTime, setCurrentTime] = useState('');

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#f4f5f6] font-sans">
      {/* Mobile Status Bar */}
      <div className="bg-white pt-2 pb-1 px-4 sticky top-0 z-50">
        <div className="flex items-center justify-between text-[15px] font-semibold text-gray-900">
          <span>{currentTime || '9:41'}</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M0 6v8h2V6H0zm4 8h12V6H4v8zm14 0h2V6h-2v8z" />
            </svg>
            <span className="text-[11px] ml-0.5">5G</span>
            <svg className="w-6 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 12">
              <rect x="1" y="1" width="18" height="10" rx="2" />
              <rect x="3" y="3" width="14" height="6" fill="currentColor" />
              <path d="M19 4v4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white py-2 px-3 border-b border-gray-200 sticky top-[30px] z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack} 
              className="w-7 h-7 -ml-2 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-[17px] font-semibold text-gray-900 whitespace-nowrap">Portfolio Overview</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Total Market Value Section */}
        <div className="bg-white px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[14px] text-gray-600">Total market value</span>
            <button className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-[10px] text-gray-600">?</span>
            </button>
          </div>
          <div className="mb-1">
            <span className="text-[32px] font-bold text-gray-900">632,546</span>
            <span className="text-[20px] text-gray-600">.65</span>
            <span className="text-[14px] text-gray-600 ml-2">HKD</span>
          </div>
          <div className="text-[11px] text-gray-500 mb-3">As at 5 Feb 2025, 12:13:34 (HKT)</div>

          {/* Unrealised gain/loss */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-gray-900">Unrealised gain/loss</span>
              <button className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                <span className="text-[10px] text-gray-600">?</span>
              </button>
            </div>
            <div className="text-right">
              <span className="text-[14px] font-semibold text-[#da0011]">▲ 15,748.89</span>
              <span className="text-[13px] text-[#da0011] ml-1">(+23.21%)</span>
            </div>
          </div>
          
          {/* Realised gain/loss and View details */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-2">
            <span className="text-[14px] text-gray-900">Realised gain/loss</span>
            <button className="flex items-center gap-1 text-[13px] text-gray-600 active:opacity-60 transition-opacity">
              <span>View details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Asset Details Section */}
        <div className="bg-[#f4f5f6] py-4">
          <div className="bg-white rounded-sm border-gray-200">
            {/* Header with chevron */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <button className="flex items-center gap-1 active:opacity-60 transition-opacity">
                <span className="text-[15px] font-semibold text-gray-900">Asset Details</span>
                <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Asset Summary Grid - 2x2 */}
            <div className="px-4 pb-3">
              <div className="grid grid-cols-2 gap-2">
                {/* Top Left - Stock */}
                <div className="bg-gray-100 px-2 py-2.5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[#4DA90F]"></div>
                    <span className="text-[10px] text-gray-600 whitespace-nowrap">Stock</span>
                  </div>
                  <div className="text-[15px] font-bold text-gray-900">158,920.30</div>
                </div>

                {/* Top Right - Unit Trust */}
                <div className="bg-gray-100 pt-3 px-2 pb-2 relative overflow-hidden">
                  <button 
                    onClick={onGoToUnitTrusts}
                    className="absolute top-0 right-0 flex items-center gap-0.5 text-[10px] text-white bg-[#da0011] px-2 py-1 active:opacity-80 transition-opacity rounded-l-full"
                  >
                    <span>Analyze</span>
                  </button>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[#EC7046]"></div>
                    <span className="text-[10px] text-gray-600 whitespace-nowrap">Unit Trust</span>
                  </div>
                  <div className="text-[15px] font-bold text-gray-900">89,395.70</div>
                </div>

                {/* Bottom Left - Structured Product */}
                <div className="bg-gray-100 px-2 py-2.5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[#C03954]"></div>
                    <span className="text-[10px] text-gray-600 whitespace-nowrap">Structured Product</span>
                  </div>
                  <div className="text-[15px] font-bold text-gray-900">125,810.50</div>
                </div>

                {/* Bottom Right - Bond */}
                <div className="bg-gray-100 px-2 py-2.5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[#266076]"></div>
                    <span className="text-[10px] text-gray-600">Bond</span>
                  </div>
                  <div className="text-[15px] font-bold text-gray-900">258,420.15</div>
                </div>
              </div>
            </div>
          </div>


        </div>
                  {/* Chart Section */}
          <div className="bg-white rounded-sm border border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button className="flex-1 py-3 text-[13px] font-medium text-[#da0011] border-b-2 border-[#da0011]">
                  Product type
                </button>
                <button className="flex-1 py-3 text-[13px] font-medium text-gray-500">
                  Asset class
                </button>
                <button className="flex-1 py-3 text-[13px] font-medium text-gray-500">
                  Currency
                </button>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="px-4 py-4">
              <div className="relative w-48 h-48 mx-auto">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Donut segments */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#266076"
                    strokeWidth="40"
                    strokeDasharray="175 440"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#4DA90F"
                    strokeWidth="40"
                    strokeDasharray="88 440"
                    strokeDashoffset="-175"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#C03954"
                    strokeWidth="40"
                    strokeDasharray="88 440"
                    strokeDashoffset="-263"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#EC7046"
                    strokeWidth="40"
                    strokeDasharray="89 440"
                    strokeDashoffset="-351"
                    transform="rotate(-90 100 100)"
                  />
                  {/* Center text */}
                  <text x="100" y="90" textAnchor="middle" className="text-[11px] fill-gray-600" fontWeight="500">
                    Total market
                  </text>
                  <text x="100" y="103" textAnchor="middle" className="text-[11px] fill-gray-600" fontWeight="500">
                    value
                  </text>
                  <text x="100" y="118" textAnchor="middle" className="text-[12px] fill-gray-900" fontWeight="600">
                    HKD
                  </text>
                  <text x="100" y="132" textAnchor="middle" className="text-[14px] fill-gray-900" fontWeight="bold">
                    632,546.65
                  </text>
                </svg>
              </div>

              {/* Asset List */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#266076] rounded-sm"></div>
                    <span className="text-[13px] text-gray-900">Bond</span>
                  </div>
                  <span className="text-[14px] font-semibold text-gray-900">HKD 258,420.15</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#4DA90F] rounded-sm"></div>
                    <span className="text-[13px] text-gray-900">Stock</span>
                  </div>
                  <span className="text-[14px] font-semibold text-gray-900">HKD 158,920.30</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#C03954] rounded-sm"></div>
                    <span className="text-[13px] text-gray-900">Structured Product</span>
                  </div>
                  <span className="text-[14px] font-semibold text-gray-900">HKD 125,810.50</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#EC7046] rounded-sm"></div>
                    <span className="text-[13px] text-gray-900">Unit Trust</span>
                  </div>
                  <span className="text-[14px] font-semibold text-gray-900">HKD 89,395.70</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default PortfolioOverviewPage;
