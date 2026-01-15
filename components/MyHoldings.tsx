
import React, { useState } from 'react';

interface MyHoldingsProps {
  onBack: () => void;
  onGoToFundInsight?: () => void;
}

const MyHoldings: React.FC<MyHoldingsProps> = ({ onBack, onGoToFundInsight }) => {
  const [activeTab, setActiveTab] = useState<'insurance' | 'funds'>('insurance');

  return (
    <div className="flex flex-col h-full bg-[#f8f8f8]">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="w-9 h-9 -ml-2 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[17px] font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">My holdings</h1>
          <button className="w-9 h-9 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v.01M12 8v5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        {/* Total Amount Section */}
        <div className="bg-white py-2 border-gray-200 px-4">
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-gray-900">Total amount</span>
            <span className="text-[17px] font-semibold text-gray-900">-123.30 CNY</span>
          </div>
        </div>

        {/* Transactions in Progress */}
        <div className="px-4 py-2">
          <div className="w-full flex items-center justify-between px-2 py-2 active:opacity-70 transition-opacity cursor-pointer bg-[#f3f3f3] border border-[#d0d0d0]" style={{ borderRadius: '0 !important' }}>
            <span className="text-[15px] text-gray-900">3 transaction(s) in progress</span>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-[#dc0010] rounded-full flex items-center justify-center">
                <span className="text-white text-[13px]">3</span>
              </div>
              <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white mt-4 space-y-3.5 px-4">
          <div className="flex items-start justify-between">
            <span className="text-[12px] text-gray-900">Unrealized gain/loss (rate)</span>
            <div className="text-right">
              <div className="text-[12px] font-medium text-[#00a0b0]">-2,871.48 CNY <span className="text-[12px]">(-57.43%)</span></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-gray-900">Cash income</span>
            <span className="text-[12px] font-medium text-[#dc0010]">1.69 CNY</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-[12px] text-gray-900">Total return (rate)</span>
            <div className="text-right">
              <div className="text-[12px] font-medium text-[#00a0b0]">-2,869.79 CNY</div>
              <div className="text-[12px] text-[#00a0b0]">(-57.40%)</div>
            </div>
          </div>
        </div>

        {/* Info Notice */}
        <div className="my-4 flex gap-3 px-4">
          <div className="w-4 h-4 bg-[#4a7c8c] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[10px] font-bold">i</span>
          </div>
          <p className="text-[13px] text-gray-900 leading-[1.5]">
            Foreign currency assets have been converted into CNY equivalent amount. The specific return is based on the product details. Exchange risks exist, which means your actual investment result could be affected positively or negatively due to exchange rate fluctuations.
          </p>
        </div>

        {/* Portfolio Review Report Button */}
        <div className="w-full border border-l-0 border-b-0 border-r-0">
          <div className="flex items-center gap-4 bg-white px-4 py-4">
            <button className="flex-[2] flex items-center justify-center gap-2 active:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="text-[11px] font-medium text-gray-900">Portfolio Review Report</span>
            </button>
            <button 
              onClick={onGoToFundInsight}
              className="flex-[1] flex items-center justify-center gap-2 active:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 10l-2 2 2 2" />
              </svg>
              <span className="text-[11px] font-medium text-gray-900">Fund Insights</span>
            </button>
          </div>
          <div className="bg-[#f3f3f3] h-[5px]"></div>
        </div>

        {/* Denominated Currency Dropdown */}
        <div className="bg-white px-4 py-3 border-b border-gray-200">
          <button className="flex items-center gap-2 text-[14px] text-gray-900 active:opacity-70 transition-opacity">
            <span>Denominated currency</span>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-white border-b-[3px] border-gray-200">
          <button
            onClick={() => setActiveTab('insurance')}
            className={`px-4 py-3.5 text-[14px] font-medium border-b-[3px] -mb-[3px] transition-colors ${
              activeTab === 'insurance'
                ? 'text-gray-900 border-[#dc0010]'
                : 'text-gray-500 border-transparent'
            }`}
          >
            Insurance
          </button>
          <button
            onClick={() => setActiveTab('funds')}
            className={`px-6 py-3.5 text-[14px] font-medium border-b-[3px] -mb-[3px] transition-colors ${
              activeTab === 'funds'
                ? 'text-gray-900 border-[#dc0010]'
                : 'text-gray-500 border-transparent'
            }`}
          >
            Funds
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'insurance' && (
          <div className="bg-[#f3f3f3]">
            {/* Insurance Summary */}
            <button className="w-full flex items-center justify-between px-4 pt-3 pb-2 active:bg-gray-50 transition-colors">
              <span className="text-[14px] font-medium text-gray-900">Insurance (4)</span>
              <div className="flex items-center gap-3">
                <span className="text-[14px] text-gray-900">-2,251.74 CNY</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Insurance Item */}
            <div className="bg-white mx-4 p-4 space-y-4">
              <h3 className="text-[14px] text-gray-900 leading-[1.4]">
                HSBC Hui You Kang Ning Major Illness Insurance Type B
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#888888]">Cash value</span>
                  <span className="text-[14px] text-gray-900">0.00 CNY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#888888]">Next premium<br></br>deduction date</span>
                  <span className="text-[14px] text-gray-900">14 Sep 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#888888]">Premium amount</span>
                  <span className="text-[14px] text-gray-900">7,920.00 CNY</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'funds' && (
          <div className="bg-white px-4 py-8">
            <div className="text-center text-gray-500 text-[15px]">
              No fund holdings
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHoldings;
