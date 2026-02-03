import React, { useState } from 'react';

interface StyleHolding {
  name: string;
  id: string;
  returnRate: string;
  holdingDays: string;
  threeMonthChange: string;
  isPositive: boolean;
  style: string;
  mktValue: number;
}

interface StyleTabProps {
  styleHoldings: StyleHolding[];
  styleTrustHoldings: StyleHolding[];
  totalAssetValue: number;
  isAIGenerated: boolean;
}

const StyleTab: React.FC<StyleTabProps> = ({ styleHoldings, styleTrustHoldings, totalAssetValue, isAIGenerated }) => {
  const [holdingStyle, setHoldingStyle] = useState<'Value' | 'Balanced' | 'Growth'>('Balanced');

  return (
    <div className="animate-fade-in space-y-5">
      {/* Section Title */}
      <div className="flex items-start gap-2 mb-4">
        <div className="w-[3px] h-[18px] bg-[#da0011] rounded-full mt-0.5"></div>
        <h2 className="text-[15px] font-bold text-[#1e1e1e] leading-tight">Fund Style</h2>
      </div>

      {/* Strategic Insight Box */}
      {isAIGenerated && (
        <div className="p-3 bg-gray-50/50 border-l-2 border-[#da0011] rounded-r relative overflow-hidden">
          {/* AI Tag */}
          <div className="absolute bottom-1.5 right-1.5 z-10">
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-[8px] font-bold text-white">AI</span>
            </div>
          </div>
          <p className="text-[10px] text-[#767676] leading-snug relative z-10">
            Maintain <span className="font-bold">70% Balanced</span> core while increasing Growth for long-term upside.
          </p>
        </div>
      )}

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
        <div className="w-[45%]">Product name/amount</div>
        <div className="w-[30%] text-center">Holding period return</div>
        <div className="w-[25%] text-right pr-1">3-month gain/loss</div>
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
              <div className="text-[9px] text-[#767676] font-medium mt-0.5">CNY {item.mktValue.toLocaleString()}</div>
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
                <div className="text-[9px] text-[#767676] font-medium mt-0.5">CNY {item.mktValue.toLocaleString()}</div>
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
    </div>
  );
};

export default StyleTab;
