import React, { useState } from 'react';
import AllocationSection from '../overview/AllocationSection';

interface HoldingData {
  name: string;
  code: string;
  returnRate: string;
  holdingDays: string;
  threeMonthChange: string;
  assetClass: string;
  mktValue: number;
  weight: string;
}

interface AllocationData {
  label: string;
  pct: number;
  val: string;
  color: string;
  currency?: string;
}

interface ClassesTabProps {
  assetClassesData: AllocationData[];
  holdingsData: HoldingData[];
  isAIGenerated: boolean;
}

const ClassesTab: React.FC<ClassesTabProps> = ({ assetClassesData, holdingsData, isAIGenerated }) => {
  const [selectedAssetClass, setSelectedAssetClass] = useState<string | null>(() => {
    const maxItem = [...assetClassesData].sort((a, b) => b.pct - a.pct)[0];
    return maxItem ? maxItem.label : null;
  });

  return (
    <div className="animate-fade-in">
      {/* Section Title */}
      <div className="flex items-start gap-2 mb-4">
        <div className="w-[3px] h-[18px] bg-[#da0011] rounded-full mt-0.5"></div>
        <h2 className="text-[15px] font-bold text-[#1e1e1e] leading-tight">Asset Classes</h2>
      </div>

      <AllocationSection 
        title="Asset Classes" 
        data={assetClassesData} 
        showVal={true} 
        useTreemap={false} 
        insight="Your portfolio is mainly in Domestic Equity (42.14%). Consider increasing exposure to Overseas Markets for better global diversification."
        onItemClick={(label) => setSelectedAssetClass(label === selectedAssetClass ? null : label)}
        selectedItem={selectedAssetClass}
        hideTitle={true}
        isAIGenerated={isAIGenerated}
      />

      {selectedAssetClass && (
        <div className="border-t border-[#f4f5f6] pt-4 animate-fade-in" style={{ marginTop: '0.5rem' }}>
          <div className="flex flex-start gap-2 mb-4 px-1">
            <div 
              className="w-1 h-4 mt-0.5" 
              style={{ backgroundColor: assetClassesData.find(a => a.label === selectedAssetClass)?.color || '#da0011' }}
            ></div>
            <h4 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tight">{selectedAssetClass} Holdings</h4>
          </div>
          
          <div className="flex text-[9px] font-bold text-[#767676] mb-4 uppercase tracking-tighter px-1 border-b border-gray-100 pb-2">
            <div className="w-[45%]">Product name/amount</div>
            <div className="w-[30%] text-center">Holding period return</div>
            <div className="w-[25%] text-right pr-1">3-month gain/loss</div>
          </div>
          
          <div className="space-y-4">
            {holdingsData
              .filter(f => f.assetClass === selectedAssetClass)
              .sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight))
              .map((fund, idx) => {
                const isRatePositive = !fund.returnRate.startsWith('-');
                const is3MPositive = !fund.threeMonthChange.startsWith('-');
                return (
                  <div key={idx} className="flex items-center text-[11px] px-1 group active:bg-gray-50 transition-colors py-1 border-b border-gray-50 last:border-0 pb-3">
                    <div className="w-[45%] flex flex-col">
                      <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
                      <span className="text-[9px] text-[#767676] mt-0.5 font-medium">CNY {fund.mktValue.toLocaleString()}</span>
                    </div>
                    <div className="w-[30%] text-center">
                      <div className={`text-[11px] font-bold ${isRatePositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
                        {fund.returnRate}
                      </div>
                      <div className="text-[9px] text-[#767676] font-medium mt-0.5">{fund.holdingDays}</div>
                    </div>
                    <div className="w-[25%] text-right pr-1 font-bold">
                      <span className={is3MPositive ? 'text-[#da0011]' : 'text-[#008c4a]'}>
                        {fund.threeMonthChange}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesTab;
