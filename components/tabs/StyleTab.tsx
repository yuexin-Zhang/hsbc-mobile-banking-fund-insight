import React, { useState } from 'react';

interface StyleHolding {
  name: string;
  id: string;
  returnRate: string;
  holdingDays: string;
  threeMonthChange: string;
  isPositive: boolean;
  style: string;
}

interface StyleTabProps {
  styleHoldings: StyleHolding[];
  styleTrustHoldings: StyleHolding[];
  totalAssetValue: number;
}

const StyleTab: React.FC<StyleTabProps> = ({ styleHoldings, styleTrustHoldings, totalAssetValue }) => {
  const [holdingStyle, setHoldingStyle] = useState<'Value' | 'Balanced' | 'Growth'>('Balanced');

  return (
    <div className="animate-fade-in space-y-5">
      {/* Section Title */}
      <div className="flex items-start gap-2 mb-4">
        <div className="w-[3px] h-[18px] bg-[#da0011] rounded-full mt-0.5"></div>
        <h2 className="text-[15px] font-bold text-[#1e1e1e] leading-tight">Fund Style</h2>
      </div>

      {/* Insight Box */}
      <div className="flex items-center gap-2 p-3 bg-blue-50/50 border border-blue-100 rounded-[3px]">
        <div className="p-0.5 bg-blue-500 rounded-full flex-shrink-0">
          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-[10px] text-blue-800 font-medium">
          Maintain <span className="font-bold">70% Balanced</span> core while increasing Growth for long-term upside.
        </p>
      </div>

      {/* Style Toggle Buttons */}
      <div className="flex gap-2.5 bg-[#f4f5f6] p-1 rounded-full">
        {[
          { id: 'Value', label: 'Value', pct: '15%' },
          { id: 'Balanced', label: 'Balanced', pct: '70%' },
          { id: 'Growth', label: 'Growth', pct: '15%' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setHoldingStyle(tab.id as any)}
            className={`flex-1 py-2 rounded-full flex flex-col items-center transition-all ${
              holdingStyle === tab.id 
              ? 'bg-white text-[#da0011] shadow-sm' 
              : 'text-[#767676] hover:text-[#da0011]/60'
            }`}
          >
            <span className="text-[10px] font-bold uppercase leading-tight">{tab.label}</span>
            <span className="text-[9px] font-bold opacity-80">{tab.pct}</span>
          </button>
        ))}
      </div>

      {/* Fund List Header */}
      <div className="flex text-[9px] font-bold text-[#767676] uppercase tracking-tighter pb-2 border-b border-gray-100 mt-4">
        <div className="w-[45%]">Holding</div>
        <div className="w-[30%] text-center">Holding Return Rate</div>
        <div className="w-[25%] text-right pr-1">3M Change</div>
      </div>

      {/* Main Style Holdings */}
      <div className="space-y-4">
        {styleHoldings
          .filter(h => h.style === holdingStyle)
          .sort((a, b) => parseFloat(b.returnRate) - parseFloat(a.returnRate))
          .map((item, idx) => {
          const isRatePositive = !item.returnRate.startsWith('-');
          const is3MPositive = !item.threeMonthChange.startsWith('-');
          return (
          <div key={idx} className="flex items-center py-1 border-b border-gray-50 last:border-0 pb-3">
            <div className="w-[45%] text-[11px] font-bold text-[#1e1e1e] leading-tight pr-2">
              {item.name}
              <div className="text-[9px] text-[#767676] font-medium mt-0.5">{item.id}</div>
            </div>
            <div className="w-[30%] text-center">
              <div className={`text-[11px] font-bold ${isRatePositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
                {item.returnRate}
              </div>
              <div className="text-[9px] text-[#767676] font-medium mt-0.5">{item.holdingDays}</div>
            </div>
            <div className="w-[25%] text-right pr-1">
              <div className={`text-[11px] font-bold ${is3MPositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
                {item.threeMonthChange}
              </div>
            </div>
          </div>
        );})}
      </div>

      {/* Trust Section if applicable */}
      {styleTrustHoldings.filter(h => h.style === holdingStyle).length > 0 && (
        <div className="mt-4 space-y-4">
          {styleTrustHoldings
            .filter(h => h.style === holdingStyle)
            .map((item, idx) => {
            const isRatePositive = !item.returnRate.startsWith('-');
            const is3MPositive = !item.threeMonthChange.startsWith('-');
            return (
            <div key={`trust-${idx}`} className="flex items-center py-1 border-b border-gray-50 last:border-0 pb-3">
              <div className="w-[45%] text-[11px] font-bold text-[#1e1e1e] leading-tight pr-2">
                {item.name}
                <div className="text-[9px] text-[#767676] font-medium mt-0.5">{item.id}</div>
              </div>
              <div className="w-[30%] text-center">
                <div className={`text-[11px] font-bold ${isRatePositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
                  {item.returnRate}
                </div>
                <div className="text-[9px] text-[#767676] font-medium mt-0.5">{item.holdingDays}</div>
              </div>
              <div className="w-[25%] text-right pr-1">
                <div className={`text-[11px] font-bold ${is3MPositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
                  {item.threeMonthChange}
                </div>
              </div>
            </div>
          );})}
        </div>
      )}
      
      <div className="pt-6 border-t border-[#f4f5f6] space-y-2">
        <div className="flex justify-between items-center text-[10px] text-[#1e1e1e]">
          <span className="font-bold">Total asset value:</span>
          <span className="font-bold">CNY {totalAssetValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="pt-4 text-right">
          <p className="text-[8px] text-[#767676] italic">Exchange rate: As of 30 December 2025 12:45</p>
        </div>
      </div>
    </div>
  );
};

export default StyleTab;
