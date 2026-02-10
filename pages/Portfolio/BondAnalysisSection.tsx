import React, { useState } from 'react';
import { allBondHoldings, couponPayments, maturities } from './portfolioData';

interface BondAnalysisSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const BondAnalysisSection: React.FC<BondAnalysisSectionProps> = ({ sectionRef }) => {
  const [currentBondViewIndex, setCurrentBondViewIndex] = useState(0);
  const [isBondViewTransitioning, setIsBondViewTransitioning] = useState(false);

  return (
    <div ref={sectionRef} className="scroll-mt-[150px] mt-8 pt-8 border-t-[6px] border-[#f4f5f6]">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-5 bg-[#da0011]"></div>
        <h2 className="text-[16px] font-bold text-gray-900">Bond</h2>
      </div>
      
      <div className="space-y-3">
        {/* AI Summary */}
        <div className="bg-[#f0f8ff] p-2">
          <p className="text-[11px] text-gray-700 leading-snug">
            Well-diversified allocation with avg yield <span className="font-bold text-[#da0011]">4.2%</span>. Consider laddering for rate flexibility. <span className="font-bold">15%</span> high-yield shows credit deterioration.
          </p>
        </div>

        {/* Bond Portfolio Summary Cards */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gradient-to-br from-[#f8f9fa] to-white border border-gray-200 px-3 py-2">
            <div className="text-[9px] text-gray-600 font-medium mb-0.5">Total Bond Value</div>
            <div className="flex items-baseline gap-2">
              <div className="text-[13px] font-bold text-gray-900">HKD 8.2M</div>
              <div className="text-[8px] text-[#db0011] font-medium">+2.1% YTD</div>
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

        {/* Bond Carousel */}
        <div className="pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => {
                if (!isBondViewTransitioning) {
                  setIsBondViewTransitioning(true);
                  setCurrentBondViewIndex((prev) => (prev - 1 + 2) % 2);
                  setTimeout(() => setIsBondViewTransitioning(false), 500);
                }
              }}
              className="p-1 transition-colors cursor-pointer"
              disabled={isBondViewTransitioning}
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1 flex items-center justify-around px-4">
              <button
                onClick={() => {
                  if (!isBondViewTransitioning && currentBondViewIndex !== 0) {
                    setIsBondViewTransitioning(true);
                    setCurrentBondViewIndex(0);
                    setTimeout(() => setIsBondViewTransitioning(false), 500);
                  }
                }}
                className="cursor-pointer"
                disabled={isBondViewTransitioning}
              >
                <h4 className={`text-[11px] font-semibold transition-colors ${
                  currentBondViewIndex === 0 ? 'text-[#da0011]' : 'text-gray-400'
                }`}>Risk Holdings</h4>
              </button>
              <button
                onClick={() => {
                  if (!isBondViewTransitioning && currentBondViewIndex !== 1) {
                    setIsBondViewTransitioning(true);
                    setCurrentBondViewIndex(1);
                    setTimeout(() => setIsBondViewTransitioning(false), 500);
                  }
                }}
                className="cursor-pointer"
                disabled={isBondViewTransitioning}
              >
                <h4 className={`text-[11px] font-semibold transition-colors ${
                  currentBondViewIndex === 1 ? 'text-[#da0011]' : 'text-gray-400'
                }`}>Upcoming Cashflows</h4>
              </button>
            </div>
            <button
              onClick={() => {
                if (!isBondViewTransitioning) {
                  setIsBondViewTransitioning(true);
                  setCurrentBondViewIndex((prev) => (prev + 1) % 2);
                  setTimeout(() => setIsBondViewTransitioning(false), 500);
                }
              }}
              className="p-1 transition-colors cursor-pointer"
              disabled={isBondViewTransitioning}
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
                style={{ transform: `translateX(calc(-${currentBondViewIndex * 100}%))` }}
              >
                {/* Risk Holdings View */}
                <div className="flex-shrink-0" style={{ width: '100%' }}>
                  <div className="bg-white overflow-hidden space-y-3">
                    {allBondHoldings.map((bond, index) => (
                      <div 
                        key={index} 
                        className={`hover:bg-gray-50 active:bg-gray-100 transition-colors p-3 border border-gray-200 ${bond.hasRisk ? 'border-l-2 border-l-orange-400' : ''}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="text-[11px] font-bold text-gray-900 mb-0.5 flex items-center gap-1">
                              <span>{bond.name}</span>
                              {bond.hasRisk && <span className="inline-flex items-center px-1.5 py-0.5 text-[8px] font-bold bg-orange-100 text-orange-700">⚠ Risk</span>}
                            </div>
                            <div className="text-[9px] text-gray-600">ISIN: {bond.isin} • {bond.rating}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] font-bold text-gray-900">{bond.value}</div>
                            <div className="text-[9px] text-gray-600">{bond.allocation}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <div className="text-[8px] text-gray-500">Coupon</div>
                            <div className="text-[10px] font-semibold text-[#da0011]">{bond.coupon}</div>
                          </div>
                          <div>
                            <div className="text-[8px] text-gray-500">Maturity</div>
                            <div className="text-[10px] font-semibold text-gray-700">{bond.maturity}</div>
                          </div>
                          <div>
                            <div className="text-[8px] text-gray-500">YTM</div>
                            <div className="text-[10px] font-semibold text-red-600">{bond.ytm}</div>
                          </div>
                        </div>
                        {bond.warning && (
                          <div className="mt-2 bg-orange-50 border border-orange-200 px-2 py-1">
                            <p className="text-[9px] text-orange-800">⚠ {bond.warning}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Cashflows View */}
                <div className="flex-shrink-0" style={{ width: '100%' }}>
                  <div className="bg-white border border-gray-200 overflow-hidden">
                    {couponPayments.map((cashflow, index) => (
                      <div key={`coupon-${index}`} className="p-3 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-[10px] font-semibold text-gray-900 mb-1">{cashflow.date}</div>
                            <div className="text-[9px] text-gray-600 mb-0.5">{cashflow.bond}</div>
                            <div className="text-[8px] text-gray-500">{cashflow.frequency}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[13px] font-bold text-[#db0011] mb-1">{cashflow.amount}</div>
                            <div className="text-[8px] text-gray-500">{cashflow.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {maturities.map((cashflow, index) => (
                      <div key={`maturity-${index}`} className="p-3 bg-blue-50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="text-[10px] font-semibold text-gray-900 mb-1 flex items-center gap-1">
                              <span>{cashflow.date}</span>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold bg-blue-100 text-blue-700">Maturity</span>
                            </div>
                            <div className="text-[9px] text-gray-600 mb-0.5">{cashflow.bond}</div>
                            <div className="text-[8px] text-gray-500">{cashflow.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[13px] font-bold text-blue-600 mb-1">{cashflow.amount}</div>
                          </div>
                        </div>
                        <div className="mt-2 bg-white border border-blue-200 px-2 py-1">
                          <p className="text-[8px] text-blue-800">💡 {cashflow.note}</p>
                        </div>
                      </div>
                    ))}
                    <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-[9px] font-bold text-gray-900">Total Expected (12M)</div>
                        <div className="text-[12px] font-bold text-[#db0011]">HKD 603,050</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-gradient-to-br from-[#e8f4f8] via-[#fef5f4] to-[#f0f8fc] px-4 py-3 rounded-[20px] border border-[#d5e5ec] shadow-sm">
          <div className="mb-3">
            <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Suggestions</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-[11px]">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <div className="text-gray-700">
                  <span className="font-semibold text-orange-700">⚠ Urgent: </span>
                  <span>Evergrande 8.25% (HKD 650K, 8%) downgraded to CCC. AI recommends selling and reallocating to </span>
                  <span className="font-semibold">US Treasury 10Y</span>
                  <span> or </span>
                  <span className="font-semibold">HSBC 5.5% Perp</span>
                  <span> to preserve capital </span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 cursor-pointer">
                    <span>Rebalance Now</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <div className="text-gray-700">
                  <span>Corporate Bond ABC matures </span>
                  <span className="font-semibold">Sep 20, 2026</span>
                  <span> (HKD 526K). Reinvest in China Govt 3.25% 2030 for similar risk/return profile or explore higher-yield Asia IG corporates </span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 cursor-pointer">
                    <span>Plan Reinvestment</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <div className="text-gray-700">
                  <span>Expected HKD 603K coupon income in next 12 months. Consider auto-reinvesting 70% into bond fund (4.8% yield) for compounding effect </span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 cursor-pointer">
                    <span>Set Auto-Invest</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <div className="text-gray-700">
                  <span>Portfolio duration 5.3y is moderate. If expecting rate cuts, extend duration by adding 10-15Y treasuries; if rate hikes, reduce by rotating to short-term (2-3Y) bonds </span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 cursor-pointer">
                    <span>Adjust Duration</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3 pt-3 border-t border-[#d5e5ec]">
            <button className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 border border-[#db0011] active:opacity-80 transition-opacity cursor-pointer">
              View Details
            </button>
            <button className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 active:opacity-80 transition-opacity cursor-pointer">
              Search Bond
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondAnalysisSection;
