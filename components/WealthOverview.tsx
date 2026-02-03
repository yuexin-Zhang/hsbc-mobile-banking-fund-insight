
import React, { useState, useEffect } from 'react';

interface WealthOverviewProps {
  onBack: () => void;
  onGoToPortfolioOverview: () => void;
}

const WealthOverview: React.FC<WealthOverviewProps> = ({ onBack, onGoToPortfolioOverview }) => {
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
    <div className="flex flex-col h-full bg-[#f5f5f5] font-sans">
      {/* Combined Status Bar and Navigation */}
      <div className="bg-white shrink-0">
        {/* Status Bar */}
        <div className="pt-2 pb-1 px-4">
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

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-around py-1 px-2">
            <button className="flex items-center justify-center p-2">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button className="text-[15px] text-gray-600 px-4 py-2">Pay</button>
            <button className="text-[15px] text-gray-600 px-4 py-2">Cards</button>
            <button className="text-[15px] text-gray-900 font-semibold px-4 py-2 border-b-4 border-[#da0011]">
              Wealth
            </button>
            <button className="text-[15px] text-gray-600 px-4 py-2">Ins...</button>
            <button className="flex items-center justify-center p-2">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Risk Profile Banner */}
        <div className="bg-white mx-4 mt-4 rounded-sm border border-gray-200 shadow-md relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#da0011] rounded-l-sm"></div>
          <button className="absolute top-3 right-3 p-1 active:opacity-60 transition-opacity">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-4 pr-12">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-gray-900 mb-1">Expired risk profile</div>
                <div className="text-[13px] text-gray-600 mb-3">
                  To continue investing, please retake the risk profile questionnaire.
                </div>
                <button className="text-[14px] text-[#da0011] font-medium">
                  Retake questionnaire
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Selection */}
        <div className="px-4 mt-4">
          <button className="flex items-center gap-2 text-[15px] text-gray-900 bg-white border border-gray-300 rounded px-3 py-2 active:bg-gray-50 transition-colors">
            <span>All accounts selected</span>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Total Market Value */}
        <div className="px-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[13px] text-gray-600">Total market value</span>
            <button className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-[10px] text-gray-600">?</span>
            </button>
          </div>
          <div className="mb-1">
            <span className="text-[32px] font-bold text-gray-900">632,546</span>
            <span className="text-[20px] text-gray-600">.65</span>
            <span className="text-[14px] text-gray-600 ml-2">HKD</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[11px] text-gray-500">As at 5 Sep 2024, 12:18:34 (HKT)</div>
            {/* Portfolio Review */}
            <button 
              onClick={onGoToPortfolioOverview}
              className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200 active:opacity-60 transition-opacity"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-[11px] text-gray-700 font-medium">Portfolio Review</span>
            </button>
          </div>
        </div>

        {/* Unrealised gain/loss */}
        <div className="px-4 mt-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-900">Unrealised gain/loss</span>
              <button className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                <span className="text-[10px] text-gray-600">?</span>
              </button>
            </div>
            <div className="text-right">
              <span className="text-[13px] font-semibold text-[#31b0d5]">▲ 15,478.80</span>
              <span className="text-[12px] text-[#31b0d5] ml-1">(+23.21%)</span>
            </div>
          </div>
        </div>

        {/* Realised gain/loss */}
        <div className="px-4 mt-2">
          <button 
            className="w-full flex items-center justify-between active:bg-gray-50 transition-colors py-1"
          >
            <span className="text-[13px] text-gray-900">Realised gain/loss</span>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600">View details</span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>

        {/* Action Buttons Grid */}
        <div className="bg-white px-4 pt-6 pb-4">
          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <span className="text-[11px] text-center text-gray-900 leading-tight">Trade stocks</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#da0011]" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                  <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-[11px] text-center text-gray-900 leading-tight">View stocks<br/>order status</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-[11px] text-center text-gray-900 leading-tight">Trade funds</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[11px] text-center text-gray-900 leading-tight">Subscribe<br/>to IPO</span>
            </button>
          </div>
        </div>

        {/* Overview/Insights Tabs */}
        <div className="bg-white border-b-2 border-gray-200">
          <div className="flex px-4">
            <button className="px-1 py-3 text-[15px] font-semibold text-gray-900 border-b-2 border-[#da0011] -mb-[2px]">
              Overview
            </button>
            <button className="px-6 py-3 text-[15px] text-gray-600 ml-8">
              Insights
            </button>
          </div>
        </div>

        {/* Your holdings section */}
        <div className="bg-white px-4 pb-20 pt-6">
          <h3 className="text-[17px] font-semibold text-gray-900 mb-4">Your holdings</h3>
          
          {/* Holdings bar chart */}
          <div className="h-6 flex rounded-sm overflow-hidden mb-3">
            <div className="bg-[#31708f]" style={{ width: '34.85%' }}></div>
            <div className="bg-[#5cb85c]" style={{ width: '14.54%' }}></div>
            <div className="bg-[#a94442]" style={{ width: '13.01%' }}></div>
            <div className="bg-[#f0ad4e]" style={{ width: '12.93%' }}></div>
            <div className="bg-[#31b0d5]" style={{ width: '11.49%' }}></div>
            <div className="bg-[#d9534f]" style={{ width: '13.18%' }}></div>
          </div>

          {/* Holdings list */}
          <div className="space-y-4">
            {/* Stocks */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#31708f] rounded-sm"></div>
                <div>
                  <div className="text-[15px] text-gray-900">Stocks (34.85%)</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-gray-900">220,442</span>
                    <span className="text-[13px] text-gray-600">.00 HKD</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#5cb85c]">
                <span className="text-[15px] font-medium">▲ 12,345.90</span>
              </div>
            </div>

            {/* Unit Trusts */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#5cb85c] rounded-sm"></div>
                <div>
                  <div className="text-[15px] text-gray-900">Unit Trusts (14.54%)</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-gray-900">91,972</span>
                    <span className="text-[13px] text-gray-600">.28 HKD</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#a94442]">
                <span className="text-[15px] font-medium">▼ 3,233.23</span>
              </div>
            </div>

            {/* Investment-linked insurance */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-[#a94442] rounded-sm"></div>
                <div className="text-[15px] text-gray-900">Investment-linked insurance (13.01%)</div>
              </div>
              <div className="ml-6">
                <div className="text-[12px] text-gray-600 mb-1">Total fund balance</div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-gray-900">82,294</span>
                  <span className="text-[13px] text-gray-600">.32 HKD</span>
                </div>
              </div>
            </div>

            {/* Insurance with saving benefit */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-[#f0ad4e] rounded-sm"></div>
                <div className="text-[15px] text-gray-900">Insurance with saving benefit (12.93%)</div>
              </div>
              <div className="ml-6">
                <div className="text-[12px] text-gray-600 mb-1">Policy value</div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-gray-900">82,294</span>
                  <span className="text-[13px] text-gray-600">.32 HKD</span>
                </div>
              </div>
            </div>

            {/* Bonds and CDs */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#31b0d5] rounded-sm"></div>
                <div>
                  <div className="text-[15px] text-gray-900">Bonds and CDs (11.49%)</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-gray-900">72,679</span>
                    <span className="text-[13px] text-gray-600">.61 HKD</span>
                  </div>
                </div>
              </div>
              <div className="text-[15px] text-gray-600">0.00%</div>
            </div>

            {/* Other holdings */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-[#d9534f] rounded-sm"></div>
                <div className="text-[15px] text-gray-900">Other holdings</div>
              </div>
              
              <div className="ml-6 space-y-3">
                <div>
                  <div className="text-[13px] text-gray-900 mb-1">ELIs and Structured Notes (3.45%)</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold text-gray-900">21,822</span>
                      <span className="text-[13px] text-gray-600">.86 HKD</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#5cb85c]">
                      <span className="text-[15px] font-medium">▲ 3,023.00</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[13px] text-gray-900 mb-1">HSBC Gold Token (3.02%)</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold text-gray-900">19,102</span>
                      <span className="text-[13px] text-gray-600">.81 HKD</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#5cb85c]">
                      <span className="text-[15px] font-medium">▲ 2,345.90</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WealthOverview;
