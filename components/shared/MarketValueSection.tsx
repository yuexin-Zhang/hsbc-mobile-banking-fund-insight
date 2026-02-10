import React from 'react';

const MarketValueSection: React.FC = () => {
  return (
    <>
      {/* Total Market Value */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[13px] text-gray-600">Total market value</span>
          <button className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
            <span className="text-[10px] text-gray-600">?</span>
          </button>
        </div>
        <div className="mb-1">
          <span className="text-[32px] font-bold text-gray-900">10,632,546</span>
          <span className="text-[20px] text-gray-600">.65</span>
          <span className="text-[14px] text-gray-600 ml-2">HKD</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[11px] text-gray-500">As at 5 Sep 2024, 12:18:34 (HKT)</div>
        </div>
      </div>

      {/* Unrealised gain/loss */}
      <div className="px-4 mt-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-900">Unrealised gain/loss</span>
            <button className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-[10px] text-gray-600">?</span>
            </button>
          </div>
          <div className="text-right">
            <span className="text-[13px] font-semibold text-[#da0011]">▲ 231,617.06</span>
            <span className="text-[12px] text-[#da0011] ml-1">(+2.23%)</span>
          </div>
        </div>
      </div>

      {/* Realised gain/loss */}
      <div className="px-4">
        <button className="w-full flex items-center justify-between active:bg-gray-50 transition-colors py-1">
          <span className="text-[13px] text-gray-900">Realised gain/loss</span>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-600">View details</span>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
};

export default MarketValueSection;
