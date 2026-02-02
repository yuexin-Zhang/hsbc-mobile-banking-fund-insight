import React, { useState } from 'react';
import AllocationSection from '../overview/AllocationSection';

interface AllocationData {
  label: string;
  pct: number;
  val: string;
  color: string;
  currency?: string;
}

interface HoldingData {
  name: string;
  code: string;
  mktValue: number;
  sectorWeight: Record<string, string>;
  industryWeight: Record<string, string>;
  topStocks: Array<{ name: string; contribution: string }>;
}

interface ConcentrationTabProps {
  concentrationSectorData: AllocationData[];
  concentrationIndustryData: AllocationData[];
  concentrationTopHoldingsData: AllocationData[];
  holdingsData: HoldingData[];
  totalAssetValue: number;
}

const ConcentrationTab: React.FC<ConcentrationTabProps> = ({
  concentrationSectorData,
  concentrationIndustryData,
  concentrationTopHoldingsData,
  holdingsData,
  totalAssetValue
}) => {
  const [concentrationTab, setConcentrationTab] = useState('Sector');
  const [selectedConcentrationItem, setSelectedConcentrationItem] = useState<string | null>(() => {
    const maxItem = [...concentrationSectorData].sort((a, b) => b.pct - a.pct)[0];
    return maxItem ? maxItem.label : null;
  });

  const getCurrentData = () => {
    if (concentrationTab === 'Sector') return concentrationSectorData;
    if (concentrationTab === 'Industry') return concentrationIndustryData;
    return concentrationTopHoldingsData;
  };

  const getInsight = () => {
    if (concentrationTab === 'Sector') return "Your portfolio is heavily biased towards Cyclical sectors (58.33%), which may increase volatility during economic shifts.";
    if (concentrationTab === 'Industry') return "Financials and Materials dominate your industry exposure. Consider diversifying into defensive sectors like Utilities.";
    return "Your top 6 stocks represent 20.16% of total assets. Monitor these closely for idiosyncratic risk.";
  };

  const handleTabChange = (tabId: string) => {
    setConcentrationTab(tabId);
    let data: AllocationData[] = [];
    if (tabId === 'Sector') data = concentrationSectorData;
    else if (tabId === 'Industry') data = concentrationIndustryData;
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
          <div key={idx} className="flex items-center text-[11px] px-1 py-1 border-b border-gray-50 last:border-0 pb-3">
            <div className="w-[40%] flex flex-col">
              <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
              <span className="text-[9px] text-[#767676] mt-0.5 font-medium">{fund.code}</span>
            </div>
            <div className="w-[35%] text-center">
              <div className="font-bold text-[#1e1e1e]">{((fund.mktValue / totalAssetValue) * 100).toFixed(2)}%</div>
              <div className="text-[9px] text-[#767676] font-medium mt-0.5">¥{fund.mktValue.toLocaleString()}</div>
            </div>
            <div className="w-[25%] text-right pr-1 font-bold" style={{ color: themeColor }}>
              {(fund.sectorWeight as any)[selectedConcentrationItem!]}
            </div>
          </div>
        ));
    }

    if (concentrationTab === 'Industry') {
      return holdingsData
        .filter(f => (f.industryWeight as any)[selectedConcentrationItem!])
        .sort((a, b) => parseFloat((b.industryWeight as any)[selectedConcentrationItem!]) - parseFloat((a.industryWeight as any)[selectedConcentrationItem!]))
        .map((fund, idx) => (
          <div key={idx} className="flex items-center text-[11px] px-1 py-1 border-b border-gray-50 last:border-0 pb-3">
            <div className="w-[40%] flex flex-col">
              <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
              <span className="text-[9px] text-[#767676] mt-0.5 font-medium">{fund.code}</span>
            </div>
            <div className="w-[35%] text-center">
              <div className="font-bold text-[#1e1e1e]">{((fund.mktValue / totalAssetValue) * 100).toFixed(2)}%</div>
              <div className="text-[9px] text-[#767676] font-medium mt-0.5">¥{fund.mktValue.toLocaleString()}</div>
            </div>
            <div className="w-[25%] text-right pr-1 font-bold" style={{ color: themeColor }}>
              {(fund.industryWeight as any)[selectedConcentrationItem!]}
            </div>
          </div>
        ));
    }

    // Top Holdings
    return holdingsData
      .filter(f => {
        if (selectedConcentrationItem === 'Others') {
          const totalWeight = (f.mktValue / totalAssetValue) * 100;
          const topStocksWeight = f.topStocks.reduce((sum, s) => sum + parseFloat(s.contribution), 0);
          return totalWeight > topStocksWeight;
        }
        return f.topStocks.some(s => s.name === selectedConcentrationItem);
      })
      .sort((a, b) => {
        const getContrib = (fund: HoldingData) => {
          if (selectedConcentrationItem === 'Others') {
            const totalWeight = (fund.mktValue / totalAssetValue) * 100;
            const topStocksWeight = fund.topStocks.reduce((sum, s) => sum + parseFloat(s.contribution), 0);
            return totalWeight - topStocksWeight;
          }
          return parseFloat(fund.topStocks.find(s => s.name === selectedConcentrationItem)?.contribution || '0');
        };
        return getContrib(b) - getContrib(a);
      })
      .map((fund, idx) => {
        let concentrationValue = '';
        
        if (selectedConcentrationItem === 'Others') {
          const totalWeight = (fund.mktValue / totalAssetValue) * 100;
          const topStocksWeight = fund.topStocks.reduce((sum, s) => sum + parseFloat(s.contribution), 0);
          concentrationValue = (totalWeight - topStocksWeight).toFixed(2) + '%';
        } else {
          concentrationValue = fund.topStocks.find(s => s.name === selectedConcentrationItem)?.contribution || '0%';
        }

        return (
          <div key={idx} className="flex items-center text-[11px] px-1 py-1 border-b border-gray-50 last:border-0 pb-3">
            <div className="w-[40%] flex flex-col">
              <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
              <span className="text-[9px] text-[#767676] mt-0.5 font-medium">{fund.code}</span>
            </div>
            <div className="w-[35%] text-center">
              <div className="font-bold text-[#1e1e1e]">{((fund.mktValue / totalAssetValue) * 100).toFixed(2)}%</div>
              <div className="text-[9px] text-[#767676] font-medium mt-0.5">¥{fund.mktValue.toLocaleString()}</div>
            </div>
            <div className="w-[25%] text-right pr-1 font-bold" style={{ color: themeColor }}>
              {concentrationValue}
            </div>
          </div>
        );
      });
  };

  const getDescription = () => {
    if (selectedConcentrationItem === 'Others') {
      return {
        title: 'Other Assets Breakdown',
        subtitle: "These funds contain secondary positions and cash not listed in the top holdings."
      };
    }
    return {
      title: `${selectedConcentrationItem} is heavily held by the following funds:`,
      subtitle: `High concentration indicates ${concentrationTab === 'Top Holdings' ? selectedConcentrationItem + ' is a core position for these funds' : 'this fund allocates a significant portion of its equity to this ' + concentrationTab.toLowerCase()}.`
    };
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Concentration Toggle Buttons */}
      <div className="flex gap-2 p-1 bg-[#f4f5f6] rounded-[4px]">
        {[
          { id: 'Sector', label: 'Sector' },
          { id: 'Industry', label: 'Industry' },
          { id: 'Top Holdings', label: 'Top Holdings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 py-2 text-[11px] font-bold rounded-[3px] transition-all ${
              concentrationTab === tab.id 
              ? 'bg-white text-[#da0011] shadow-sm' 
              : 'text-[#767676]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6 animate-fade-in">
        <AllocationSection 
          title={`${concentrationTab} Concentration`}
          data={[...getCurrentData()].sort((a, b) => b.pct - a.pct)} 
          showVal={true} 
          useTreemap={true} 
          insight={getInsight()}
          onItemClick={(label) => setSelectedConcentrationItem(label === selectedConcentrationItem ? null : label)}
          selectedItem={selectedConcentrationItem}
          hideTitle={true}
        />

        {selectedConcentrationItem && (
          <div className="border-t border-[#f4f5f6] pt-4 animate-fade-in">
            <div className="flex flex-start gap-2 mb-4 px-1">
              <div 
                className="w-1 h-4 mt-0.5" 
                style={{ backgroundColor: getCurrentData().find(d => d.label === selectedConcentrationItem)?.color || '#da0011' }}
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
              <div className="w-[40%]">Holdings</div>
              <div className="w-[35%] text-center">Weight / Amount</div>
              <div className="w-[25%] text-right pr-1">Concentration</div>
            </div>
            
            <div className="space-y-4">
              {renderHoldingsList()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConcentrationTab;
