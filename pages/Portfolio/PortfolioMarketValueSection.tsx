import React from 'react';

const PortfolioMarketValueSection: React.FC = () => {
  return (
    <div className="bg-white px-2 pt-4 pb-3">
      <div className="">
        <span className="text-[14px] text-gray-600">Total market value</span>
      </div>
      <div className="">
        <span className="text-[32px] font-bold text-gray-900">10,632,546</span>
        <span className="text-[20px] text-gray-600">.65</span>
        <span className="text-[14px] text-gray-600 ml-2">HKD</span>
      </div>
      
      {/* Unrealised gain/loss */}
      <div className="mb-1">
        <span className="text-[13px] text-gray-900">Unrealised gain/loss </span>
        <span className="text-[13px] font-semibold text-[#da0011]">▲ 231,617.06</span>
        <span className="text-[12px] text-[#da0011] ml-1">(+2.23%)</span>
      </div>
      
      {/* Macro Indicators - Horizontal Scroll */}
      <div className="">
        <div className="overflow-x-auto no-scrollbar -mx-2 px-2">
          <div className="flex gap-2 pb-1">
            {/* HSI Card - Increase (Red up) */}
            <div className="flex-shrink-0 w-[88px] bg-white rounded border border-gray-200 overflow-hidden shadow-md">
              <div className="px-2 pt-2.5">
                <div className="text-[11px] font-bold text-gray-900 mb-0.5 leading-tight">HSI</div>
                <div className="text-[10px] text-gray-500 mb-1.5 leading-tight">7,649.60</div>
              </div>
              <div className="bg-[#ffebee] px-2 py-1 flex items-center gap-0.5">
                <span className="text-[9px] text-[#c62828]">▲</span>
                <span className="text-[10px] font-medium text-gray-600">1.28%</span>
              </div>
            </div>

            {/* HSAHP Card - Decrease (Green down) */}
            <div className="flex-shrink-0 w-[88px] bg-white rounded border border-gray-200 overflow-hidden shadow-md">
              <div className="px-2 pt-2.5">
                <div className="text-[11px] font-bold text-gray-900 mb-0.5 leading-tight">HSAHP</div>
                <div className="text-[10px] text-gray-500 mb-1.5 leading-tight">16,475.82</div>
              </div>
              <div className="bg-[#e8f5e9] px-2 py-1 flex items-center gap-0.5">
                <span className="text-[9px] text-[#2e7d32]">▼</span>
                <span className="text-[10px] font-medium text-gray-600">1.28%</span>
              </div>
            </div>

            {/* HSCEI Card - Increase (Red up) */}
            <div className="flex-shrink-0 w-[88px] bg-white rounded border border-gray-200 overflow-hidden shadow-md">
              <div className="px-2 pt-2.5">
                <div className="text-[11px] font-bold text-gray-900 mb-0.5 leading-tight">HSCEI</div>
                <div className="text-[10px] text-gray-500 mb-1.5 leading-tight">7,369.66</div>
              </div>
              <div className="bg-[#ffebee] px-2 py-1 flex items-center gap-0.5">
                <span className="text-[9px] text-[#c62828]">▲</span>
                <span className="text-[10px] font-medium text-gray-600">0.28%</span>
              </div>
            </div>

            {/* HSTEC Card - Increase (Red up) */}
            <div className="flex-shrink-0 w-[88px] bg-white rounded border border-gray-200 overflow-hidden shadow-md">
              <div className="px-2 pt-2.5">
                <div className="text-[11px] font-bold text-gray-900 mb-0.5 leading-tight">HSTEC</div>
                <div className="text-[10px] text-gray-500 mb-1.5 leading-tight">10,389.0</div>
              </div>
              <div className="bg-[#ffebee] px-2 py-1 flex items-center gap-0.5">
                <span className="text-[9px] text-[#c62828]">▲</span>
                <span className="text-[10px] font-medium text-gray-600">0.23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMarketValueSection;
