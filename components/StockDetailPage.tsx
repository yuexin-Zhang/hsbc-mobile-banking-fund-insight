import React, { useState, useEffect } from 'react';
import { useMobileDetect } from '../hooks/useMobileDetect';

interface StockDetailPageProps {
  onBack: () => void;
}

const StockDetailPage: React.FC<StockDetailPageProps> = ({ onBack }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [activeTab, setActiveTab] = useState<'Overview' | 'Advance ratio'>('Overview');
  const [activeTimeRange, setActiveTimeRange] = useState('1D');
  const isMobile = useMobileDetect();

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
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Mobile Status Bar - Hidden on mobile */}
      {!isMobile && (
      <div className="bg-white pt-2 pb-1 px-4 sticky top-0 z-50">
        <div className="flex items-center justify-between text-[15px] font-semibold text-gray-900">
          <span>{currentTime || '4:02'}</span>
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
      )}

      {/* Header */}
      <div className={`bg-white py-3 px-4 border-b border-gray-200 sticky z-50 ${isMobile ? 'top-0' : 'top-[30px]'}`}>
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="w-8 h-8 -ml-2 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors flex-shrink-0 z-10"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <h1 className="text-[17px] font-semibold text-gray-900">NVDA (US)</h1>
              <p className="text-[13px] text-gray-600">NVIDIA CORP</p>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Stock Price Section */}
        <div className="px-4 pt-4 pb-3 mb-3">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-[32px] font-normal text-gray-900">171.880</span>
            <span className="text-[20px] text-gray-600">USD</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[15px] text-gray-600">0.000 (0.00%)</span>
          </div>
          {/* Divider */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[15px] text-gray-600">N/A</span>
            <button className="w-8 h-8 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          <div className="text-[15px] text-gray-900 mb-4">
            Maximum advance ratio: 70%
          </div>
          {/* Bid/Ask */}
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <span className="text-[15px] text-gray-900">Bid: </span>
              <span className="text-[15px] font-medium text-gray-900">N/A</span>
            </div>
            <div className="flex-1 text-right">
              <span className="text-[15px] text-gray-900">Ask: </span>
              <span className="text-[15px] font-medium text-gray-900">N/A</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[10px] bg-gray-200"></div>

        {/* Tabs Section */}
        <div className="bg-white mt-3 border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('Overview')}
              className={`flex-1 py-4 text-[15px] font-medium relative transition-colors ${
                activeTab === 'Overview' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              Overview
              {activeTab === 'Overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#da0011]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('Advance ratio')}
              className={`flex-1 py-4 text-[15px] font-medium relative transition-colors ${
                activeTab === 'Advance ratio' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              Advance ratio
              {activeTab === 'Advance ratio' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#da0011]" />
              )}
            </button>
          </div>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'Overview' && (
          <div className="px-4 py-4">
            {/* Time Range Selector */}
            <div className="flex items-center gap-4 mb-4">
              {['1D', '1W', '1M', '3M', '6M'].map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveTimeRange(range)}
                  className={`text-[14px] font-medium pb-1 ${
                    activeTimeRange === range
                      ? 'text-gray-900 border-b-2 border-[#da0011]'
                      : 'text-gray-500'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Chart Placeholder */}
            <div className="relative h-64 bg-white">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Y-axis labels */}
                <text x="2" y="8" fontSize="3" fill="#666" fontFamily="sans-serif">176.778</text>
                <text x="2" y="30" fontSize="3" fill="#666" fontFamily="sans-serif">175.448</text>
                <text x="2" y="52" fontSize="3" fill="#666" fontFamily="sans-serif">174.119</text>
                <text x="2" y="74" fontSize="3" fill="#666" fontFamily="sans-serif">172.789</text>
                <text x="2" y="96" fontSize="3" fill="#666" fontFamily="sans-serif">171.460</text>

                {/* Grid lines */}
                <line x1="12" y1="10" x2="98" y2="10" stroke="#f0f0f0" strokeWidth="0.2"/>
                <line x1="12" y1="32" x2="98" y2="32" stroke="#f0f0f0" strokeWidth="0.2"/>
                <line x1="12" y1="54" x2="98" y2="54" stroke="#f0f0f0" strokeWidth="0.2"/>
                <line x1="12" y1="76" x2="98" y2="76" stroke="#f0f0f0" strokeWidth="0.2"/>

                {/* Price line chart */}
                <polyline
                  points="12,30 15,8 18,45 21,42 24,38 27,40 30,15 33,18 36,22 39,20 42,28 45,32 48,35 51,30 54,25 57,28 60,38 63,42 66,48 69,52 72,45 75,40 78,50 81,58 84,62 87,68 90,75 93,82 96,88"
                  fill="none"
                  stroke="#da0011"
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                />

                {/* X-axis labels */}
                <text x="12" y="99" fontSize="3" fill="#666" fontFamily="sans-serif">09:30</text>
                <text x="48" y="99" fontSize="3" fill="#666" fontFamily="sans-serif">12:45</text>
                <text x="85" y="99" fontSize="3" fill="#666" fontFamily="sans-serif">16:00</text>
              </svg>
            </div>
          </div>
        )}

        {/* Advance Ratio Tab Content */}
        {activeTab === 'Advance ratio' && (
          <div>
            {/* Trading Stats Grid */}
            <div className="px-4 py-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <div className="text-[15px] text-gray-900">Open</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">0.000</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] text-gray-900">Volume</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">0.00</div>
                </div>
                <div>
                  <div className="text-[15px] text-gray-900">Day low</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">0.000</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] text-gray-900">Day high</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">0.000</div>
                </div>
                <div>
                  <div className="text-[15px] text-gray-900">52 wk low</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">86.620</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] text-gray-900">52 wk high</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">212.1899</div>
                </div>
                <div>
                  <div className="text-[15px] text-gray-900">Turnover</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">N/A</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] text-gray-900">Currency</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">USD</div>
                </div>
                <div>
                  <div className="text-[15px] text-gray-900">P/E ratio</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">42.57x</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] text-gray-900">Market cap</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">N/A</div>
                </div>
                <div>
                  <div className="text-[15px] text-gray-900">Div yield</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">0.02%</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] text-gray-900">Ex. div</div>
                  <div className="text-[15px] font-medium text-gray-900 mt-1">4 Dec 2025</div>
                </div>
              </div>
            </div>

            {/* Download Banner */}
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
                <button className="flex-shrink-0 p-2">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
        <button className="flex-1 bg-[#da0011] text-white text-[15px] font-semibold py-3 rounded active:opacity-80 transition-opacity">
          Buy
        </button>
        <button className="flex-1 bg-white text-gray-400 text-[15px] font-semibold py-3 rounded border border-gray-300 active:opacity-80 transition-opacity">
          Sell
        </button>
      </div>
    </div>
  );
};

export default StockDetailPage;
