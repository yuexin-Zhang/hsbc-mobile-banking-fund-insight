import React from 'react';

const holdings = [
  { name: 'HSBC Global Equity Fund', type: 'Unit Trust', value: 1545000, pct: 14.5, return: 12.5 },
  { name: 'Tencent Holdings', type: 'Stock', value: 1232000, pct: 11.6, return: 8.3 },
  { name: 'US Treasury 10Y Bond', type: 'Bond', value: 1189000, pct: 11.2, return: 3.8 },
  { name: 'Hang Seng Index ELN', type: 'Structured', value: 956000, pct: 9.0, return: 5.2 },
  { name: 'Alibaba Group', type: 'Stock', value: 845000, pct: 7.9, return: -2.1 },
];

const stats = [
  { value: '54.2%', label: 'Top 5 Weight' },
  { value: '32', label: 'Total Holdings' },
  { value: '0.68', label: 'HHI Index' },
];

export const HoldingsConcentration: React.FC = () => {
  return (
    <div className="bg-white p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5 bg-[#da0011]"></div>
        <h3 className="text-[14px] font-bold text-gray-900">Top Holdings & Concentration</h3>
      </div>
      
      <div className="space-y-2 mb-4">
        {holdings.map((holding, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-shrink-0 w-6 h-6 bg-[#da0011] rounded-full flex items-center justify-center text-[10px] font-bold text-white">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <div className="text-[11px] font-semibold text-gray-900 truncate">{holding.name}</div>
                <div className={`text-[11px] font-bold ${holding.return > 0 ? 'text-[#da0011]' : 'text-[#00847f]'}`}>
                  {holding.return > 0 ? '+' : ''}{holding.return}%
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-gray-500">{holding.type}</div>
                <div className="text-[10px] text-gray-600">
                  <span className="font-semibold">{holding.pct}%</span> · HKD {(holding.value / 1000).toFixed(0)}K
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-gray-700">Concentration Risk Level</span>
          <span className="text-[11px] font-bold text-yellow-600">Medium</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="w-1/3 bg-[#00847f]"></div>
            <div className="w-1/3 bg-[#999999]"></div>
            <div className="w-1/3 bg-[#da0011]"></div>
          </div>
          <div 
            className="absolute top-0 left-0 h-full w-1 bg-gray-900 shadow-lg transition-all"
            style={{ left: '54.2%' }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-gray-500">Low</span>
          <span className="text-[9px] text-gray-500">High</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-[13px] font-bold text-gray-900">{stat.value}</div>
            <div className="text-[9px] text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-3 border border-gray-200">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5 text-[#da0011]" viewBox="0 0 24 24" fill="none">
              <path fill="currentColor" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[11px] text-gray-700 leading-relaxed">
              Your top 5 holdings represent <span className="font-bold text-gray-900">54.2% of portfolio value</span>, indicating moderate concentration risk. While diversified across <span className="font-bold text-gray-900">32 positions</span>, consider reducing exposure to HSBC Global Equity Fund (14.5%) and Tencent (11.6%) to enhance resilience. <span className="font-bold text-gray-900">Contact your RM</span> for personalized rebalancing strategies.
            </div>
            <div className="mt-2">
              <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#da0011] hover:underline">
                <span>View Detailed Holdings</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingsConcentration;
