import React from 'react';

const marketIndices = [
  { name: 'HSI', value: '7,649.60', change: '1.28%', isUp: true },
  { name: 'HSAHP', value: '16,475.82', change: '1.28%', isUp: false },
  { name: 'HSCEI', value: '7,369.66', change: '0.28%', isUp: true },
  { name: 'HSTEC', value: '10,389.0', change: '0.23%', isUp: true },
];

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
      
      <div className="mb-1">
        <span className="text-[13px] text-gray-900">Unrealised gain/loss </span>
        <span className="text-[13px] font-semibold text-[#da0011]">▲ 231,617.06</span>
        <span className="text-[12px] text-[#da0011] ml-1">(+2.23%)</span>
      </div>
      
      <div className="">
        <div className="overflow-x-auto no-scrollbar -mx-2 px-2">
          <div className="flex gap-2 pb-1">
            {marketIndices.map((index) => (
              <div key={index.name} className="flex-shrink-0 w-[88px] bg-white rounded border border-gray-200 overflow-hidden shadow-md">
                <div className="px-2 pt-2.5">
                  <div className="text-[11px] font-bold text-gray-900 mb-0.5 leading-tight">{index.name}</div>
                  <div className="text-[10px] text-gray-500 mb-1.5 leading-tight">{index.value}</div>
                </div>
                <div className={`px-2 py-1 flex items-center gap-0.5 ${index.isUp ? 'bg-[#ffebee]' : 'bg-[#e8f5e9]'}`}>
                  <span className={`text-[9px] ${index.isUp ? 'text-[#c62828]' : 'text-[#2e7d32]'}`}>
                    {index.isUp ? '▲' : '▼'}
                  </span>
                  <span className="text-[10px] font-medium text-gray-600">{index.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMarketValueSection;
