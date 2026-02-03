import React, { useState } from 'react';
import AllocationSection from '../overview/AllocationSection';

interface AllocationData {
  label: string;
  pct: number;
  val: string;
  color: string;
  dailyChange?: number;
  currency?: string;
}

interface HoldingData {
  name: string;
  code: string;
  mktValue: number;
  sectorWeight: Record<string, string>;
  regionWeight: Record<string, string>;
  topStocks: Array<{ name: string; contribution: string }>;
}

interface ConcentrationTabProps {
  concentrationSectorData: AllocationData[];
  concentrationRegionData: AllocationData[];
  concentrationTopHoldingsData: AllocationData[];
  holdingsData: HoldingData[];
  totalAssetValue: number;
  isAIGenerated: boolean;
}

const ConcentrationTab: React.FC<ConcentrationTabProps> = ({
  concentrationSectorData,
  concentrationRegionData,
  concentrationTopHoldingsData,
  holdingsData,
  totalAssetValue,
  isAIGenerated
}) => {
  const [concentrationTab, setConcentrationTab] = useState('Sector');
  const [selectedConcentrationItem, setSelectedConcentrationItem] = useState<string | null>(() => {
    const maxItem = [...concentrationSectorData].sort((a, b) => b.pct - a.pct)[0];
    return maxItem ? maxItem.label : null;
  });

  const getCurrentData = () => {
    if (concentrationTab === 'Sector') return concentrationSectorData;
    if (concentrationTab === 'Region') return concentrationRegionData;
    return concentrationTopHoldingsData;
  };

  const getInsight = () => {
    if (concentrationTab === 'Sector') {
      return 'Power equipment, transportation and internet & technology sectors are key drivers of your portfolio; consider monitoring policy changes and sector cycles closely.';
    }
    if (concentrationTab === 'Region') {
      return 'Your portfolio has significant exposure to China and United States markets, with diversification across Hong Kong and Europe, balancing growth opportunities with geographic risk.';
    }
    return 'Top positions are concentrated in leaders such as Tencent Holdings, Alibaba Group and Apple Inc., so the portfolio still relies on a small group of large names even though single-stock weights are not extreme.';
  };

  const handleTabChange = (tabId: string) => {
    setConcentrationTab(tabId);
    let data: AllocationData[] = [];
    if (tabId === 'Sector') data = concentrationSectorData;
    else if (tabId === 'Region') data = concentrationRegionData;
    else if (tabId === 'Top Holdings') data = concentrationTopHoldingsData;
    const maxItem = [...data].sort((a, b) => b.pct - a.pct)[0];
    if (maxItem) setSelectedConcentrationItem(maxItem.label);
  };

  const renderHoldingsList = () => {
    const currentData = getCurrentData();
    const themeColor = currentData.find(d => d.label === selectedConcentrationItem)?.color || '#da0011';

    if (concentrationTab === 'Sector') {
      return holdingsData
        .filter(f => (f.sectorWeight as any)[selectedConcentrationItem!])
        .sort((a, b) => parseFloat((b.sectorWeight as any)[selectedConcentrationItem!]) - parseFloat((a.sectorWeight as any)[selectedConcentrationItem!]))
        .map((fund, idx) => (
          <div key={idx} className="flex items-center text-[11px] px-1 border-b border-gray-50 last:border-0 pb-2">
            <div className="w-[40%] flex flex-col">
              <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
              <span className="text-[9px] text-[#767676] mt-0.5 font-medium">{fund.code}</span>
            </div>
            <div className="w-[35%] text-center">
              <div className="font-bold text-[#1e1e1e]">{((fund.mktValue / totalAssetValue) * 100).toFixed(2)}%</div>
              <div className="text-[9px] text-[#767676] font-medium mt-0.5">HKD {fund.mktValue.toLocaleString()}</div>
            </div>
            <div className="w-[25%] text-right pr-1 font-bold text-[#1e1e1e]">
              {(fund.sectorWeight as any)[selectedConcentrationItem!]}
            </div>
          </div>
        ));
    }

    if (concentrationTab === 'Region') {
      return holdingsData
        .filter(f => (f.regionWeight as any)[selectedConcentrationItem!])
        .sort((a, b) => parseFloat((b.regionWeight as any)[selectedConcentrationItem!]) - parseFloat((a.regionWeight as any)[selectedConcentrationItem!]))
        .map((fund, idx) => (
          <div key={idx} className="flex items-center text-[11px] px-1 border-b border-gray-50 last:border-0 pb-2">
            <div className="w-[40%] flex flex-col">
              <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
              <span className="text-[9px] text-[#767676] mt-0.5 font-medium">{fund.code}</span>
            </div>
            <div className="w-[35%] text-center">
              <div className="font-bold text-[#1e1e1e]">{((fund.mktValue / totalAssetValue) * 100).toFixed(2)}%</div>
              <div className="text-[9px] text-[#767676] font-medium mt-0.5">HKD {fund.mktValue.toLocaleString()}</div>
            </div>
            <div className="w-[25%] text-right pr-1 font-bold text-[#1e1e1e]">
              {(fund.regionWeight as any)[selectedConcentrationItem!]}
            </div>
          </div>
        ));
    }

    // Top Holdings
    return holdingsData
      .filter(f => f.topStocks.some(s => s.name === selectedConcentrationItem))
      .sort((a, b) => {
        const getContrib = (fund: HoldingData) =>
          parseFloat(fund.topStocks.find(s => s.name === selectedConcentrationItem)?.contribution || '0');
        return getContrib(b) - getContrib(a);
      })
      .map((fund, idx) => {
        const contributionValue =
          fund.topStocks.find(s => s.name === selectedConcentrationItem)?.contribution || '0%';

        return (
          <div key={idx} className="flex items-center text-[11px] px-1 border-b border-gray-50 last:border-0 pb-2">
            <div className="w-[40%] flex flex-col">
              <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
              <span className="text-[9px] text-[#767676] mt-0.5 font-medium">{fund.code}</span>
            </div>
            <div className="w-[35%] text-center">
              <div className="font-bold text-[#1e1e1e]">{((fund.mktValue / totalAssetValue) * 100).toFixed(2)}%</div>
              <div className="text-[9px] text-[#767676] font-medium mt-0.5">HKD {fund.mktValue.toLocaleString()}</div>
            </div>
            <div className="w-[25%] text-right pr-1 font-bold text-[#1e1e1e]">
              {contributionValue}
            </div>
          </div>
        );
      });
  };

  const getDescription = () => {
    return {
      title: `${selectedConcentrationItem} is heavily held by the following funds:`,
      subtitle:
        concentrationTab === 'Top Holdings'
          ? `${selectedConcentrationItem} is one of the core positions in these funds.`
          : `These funds have relatively high exposure to this ${concentrationTab.toLowerCase()}.`,
    };
  };

  return (
    <div className="animate-fade-in space-y-4">
      {/* Section Title */}
      <div className="flex items-start gap-1 mb-2">
        <div className="w-[3px] h-[18px] bg-[#da0011] mt-0.5"></div>
        <h2 className="text-[15px] font-bold text-[#1e1e1e] leading-tight">Portfolio Concentration</h2>
      </div>

      {/* Concentration Toggle Buttons */}
      <div className="flex p-1 bg-[#f4f5f6]">
        {[
          { id: 'Sector', label: 'Sector' },
          { id: 'Region', label: 'Region' },
          { id: 'Top Holdings', label: 'Top Holdings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 py-2 text-[11px] font-bold transition-all ${
              concentrationTab === tab.id 
              ? 'bg-white text-[#da0011] shadow-sm' 
              : 'text-[#767676]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-2 animate-fade-in">
        <AllocationSection 
          title={`${concentrationTab} Concentration`}
          data={[...getCurrentData()].sort((a, b) => b.pct - a.pct)} 
          showVal={true} 
          useTreemap={true} 
          insight={getInsight()}
          onItemClick={(label) => setSelectedConcentrationItem(label === selectedConcentrationItem ? null : label)}
          selectedItem={selectedConcentrationItem}
          hideTitle={true}
          isAIGenerated={isAIGenerated}
          hideList={true}
        />

        {selectedConcentrationItem && (
          <div className="border-t border-[#f4f5f6] pt-4 animate-fade-in">
            <div className="flex flex-start gap-2 mb-4 px-1">
              <div 
                className="w-1 h-4 mt-0.5" 
                style={{ backgroundColor: '#da0011' }}
              ></div>
              <div className="flex flex-col">
                <h4 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tight">
                  {getDescription().title}
                </h4>
                <p className="text-[9px] text-[#999] font-medium mt-0.5 leading-tight italic">
                  {getDescription().subtitle}
                </p>
              </div>
            </div>
            
            <div className="flex text-[9px] font-bold text-[#767676] mb-4 uppercase tracking-tighter px-1 border-b border-gray-100 pb-2">
              <div className="w-[40%]">Product name</div>
              <div className="w-[35%] text-center">Weight / Amount</div>
              <div className="w-[25%] text-right pr-1">Concentration</div>
            </div>
            
            <div className="space-y-2">
              {renderHoldingsList()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConcentrationTab;
