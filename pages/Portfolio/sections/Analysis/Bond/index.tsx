import React, { useState } from 'react';
import { SectionHeader, AISummary, AISuggestionsCard } from '../../../components';
import { RiskHoldings } from './RiskHoldings';
import { CashflowView } from './CashflowView';
import { allBondHoldings, couponPayments, maturities } from '../../../data';

interface BondAnalysisSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const BondAnalysisSection: React.FC<BondAnalysisSectionProps> = ({ sectionRef }) => {
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = (index: number) => {
    if (isTransitioning || index === currentViewIndex) return;
    setIsTransitioning(true);
    setCurrentViewIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goNext = () => goTo((currentViewIndex + 1) % 2);
  const goPrev = () => goTo((currentViewIndex - 1 + 2) % 2);

  const suggestions = [
    {
      text: '⚠ Urgent: Evergrande 8.25% (CCC, HKD 653,280) + Country Garden 7.5% (CC, HKD 487,105) = 14% at high default risk. Sell and rotate to US Treasury 10Y or HSBC 5.5% Perp ',
      prefix: '⚠ Urgent: ',
      prefixColor: 'text-orange-700',
      action: { label: 'Rebalance Now' }
    },
    {
      text: 'Sep 20: Corporate Bond ABC maturity (HKD 526,500). Reinvest in China Govt 3.25% 2030 or explore higher-yield Asia IG corporates ',
      action: { label: 'Plan Reinvestment' }
    }
  ];

  return (
    <div ref={sectionRef} className="scroll-mt-[150px] mt-8 pt-8 border-t-[6px] border-[#f4f5f6]">
      <SectionHeader title="Bond" />
      
      <div className="space-y-3">
        <AISummary>
          Avg yield <span className="text-[#da0011]">4.2%</span>, duration 5.3y. <span className="text-[#da0011]">14% high-risk</span>: Evergrande CCC, Country Garden CC—exit to IG bonds. HKD 593,250 coupons + Sep maturity (HKD 526,500) incoming.
        </AISummary>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gradient-to-br from-[#f8f9fa] to-white border border-gray-200 px-3 py-2">
            <div className="text-[9px] text-gray-600 font-medium mb-0.5">Total Bond Value HKD</div>
            <div className="flex items-baseline gap-1 flex-nowrap">
              <div className="text-[13px] font-bold text-gray-900 whitespace-nowrap">8,273,504.35</div>
              <div className="text-[8px] text-[#db0011] font-medium whitespace-nowrap">+2.1% YTD</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#f0f8ff] to-white border border-[#d5e5ec] px-3 py-2">
            <div className="text-[9px] text-gray-600 font-medium mb-0.5">Weighted Avg Yield</div>
            <div className="flex items-baseline gap-2">
              <div className="text-[13px] font-bold text-[#da0011]">4.2%</div>
              <div className="text-[8px] text-gray-600 font-medium">Duration: 5.3y</div>
            </div>
          </div>
        </div>

        <div className="pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={goPrev}
              className="p-1 transition-colors cursor-pointer"
              disabled={isTransitioning}
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1 flex items-center justify-around px-4">
              <button
                onClick={() => goTo(0)}
                className="cursor-pointer"
                disabled={isTransitioning}
              >
                <h4 className={`text-[11px] font-semibold transition-colors ${currentViewIndex === 0 ? 'text-[#da0011]' : 'text-gray-400'}`}>Risk Holdings</h4>
              </button>
              <button
                onClick={() => goTo(1)}
                className="cursor-pointer"
                disabled={isTransitioning}
              >
                <h4 className={`text-[11px] font-semibold transition-colors ${currentViewIndex === 1 ? 'text-[#da0011]' : 'text-gray-400'}`}>Upcoming Cashflows</h4>
              </button>
            </div>
            <button
              onClick={goNext}
              className="p-1 transition-colors cursor-pointer"
              disabled={isTransitioning}
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(calc(-${currentViewIndex * 100}%))` }}
              >
                <div className="flex-shrink-0" style={{ width: '100%' }}>
                  <RiskHoldings holdings={allBondHoldings} />
                </div>
                <div className="flex-shrink-0" style={{ width: '100%' }}>
                  <CashflowView coupons={couponPayments} maturities={maturities} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <AISuggestionsCard 
          suggestions={suggestions}
          secondaryAction={{ label: 'View Details' }}
          primaryAction={{ label: 'Search Bond' }}
        />
      </div>
    </div>
  );
};

export default BondAnalysisSection;
