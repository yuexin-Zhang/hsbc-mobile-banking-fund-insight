import React from 'react';

interface StructuredProductAnalysisSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const StructuredProductAnalysisSection: React.FC<StructuredProductAnalysisSectionProps> = ({ sectionRef }) => {
  return (
    <div ref={sectionRef} className="scroll-mt-[150px] mt-8 pt-8 border-t-[6px] border-[#f4f5f6]">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-5 bg-[#da0011]"></div>
        <h2 className="text-[16px] font-bold text-gray-900">Structured Product</h2>
      </div>
      
      <div className="space-y-3">
        {/* AI Summary */}
        <div className="bg-[#f0f8ff] p-2">
          <p className="text-[11px] text-gray-700 leading-snug">
            Portfolio of <span className="font-bold">4 products</span> worth <span className="font-bold text-[#da0011]">HKD 2,850,000.00</span> with unrealized gain <span className="font-bold text-[#da0011]">+HKD 186,000.00 (+6.97%)</span>. All products above barrier with <span className="font-bold">100% principal protection</span>. <span className="font-bold">Next observation: Mar 15, 2026</span> - HSI Autocall has <span className="font-bold text-[#da0011]">68% early redemption probability</span>.
          </p>
        </div>

        {/* Product Details */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-semibold text-gray-700 mb-3">Product Holdings - Key Focus</h4>
          
          {/* Product 1 */}
          <div className="border-l-2 border-l-orange-400 p-3 border border-gray-200 bg-white">
            <div className="flex justify-between items-start mb-1.5">
              <div>
                <div className="text-[11px] font-bold text-gray-900">Tech Index Autocallable Note</div>
                <div className="text-[9px] text-gray-600 mt-0.5">Linked to: NASDAQ-100 Index</div>
              </div>
              <div className="px-1.5 py-0.5 bg-orange-50 border border-orange-300 text-[8px] font-semibold text-orange-700">
                MONITOR
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div>
                <div className="text-[8px] text-gray-500">Invested / Current</div>
                <div className="text-[10px] font-bold text-gray-900">HKD 750,000.00</div>
                <div className="text-[9px] text-[#da0011] font-semibold">HKD 812,000.00 (+8.27%)</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-500">Barrier Status</div>
                <div className="text-[10px] font-bold text-orange-600">78% (Strike: 75%)</div>
                <div className="text-[9px] text-gray-600">Index: 104% of initial</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-500">Next Event</div>
                <div className="text-[10px] font-bold text-gray-900">Jun 15, 2026</div>
                <div className="text-[9px] text-gray-600">Observation</div>
              </div>
            </div>
            <div className="mt-2 text-[9px] text-gray-700">
              <span className="font-semibold">Structure:</span> 10% p.a. coupon if above 105% at observation | Principal protected if above 75% at maturity
            </div>
          </div>

          {/* Product 2 */}
          <div className="border-l-2 border-l-orange-400 p-3 border border-gray-200 bg-white">
            <div className="flex justify-between items-start mb-1.5">
              <div>
                <div className="text-[11px] font-bold text-gray-900">HSI Autocall Note</div>
                <div className="text-[9px] text-gray-600 mt-0.5">Linked to: Hang Seng Index</div>
              </div>
              <div className="px-1.5 py-0.5 bg-orange-50 border border-orange-300 text-[8px] font-semibold text-orange-700">
                AUTOCALL LIKELY
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div>
                <div className="text-[8px] text-gray-500">Invested / Current</div>
                <div className="text-[10px] font-bold text-gray-900">HKD 680,000.00</div>
                <div className="text-[9px] text-[#da0011] font-semibold">HKD 724,000.00 (+6.47%)</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-500">Barrier Status</div>
                <div className="text-[10px] font-bold text-orange-600">92% (Strike: 75%)</div>
                <div className="text-[9px] text-gray-600">Index: 123% of initial</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-500">Next Event</div>
                <div className="text-[10px] font-bold text-[#da0011]">Mar 15, 2026</div>
                <div className="text-[9px] text-[#da0011] font-semibold">Autocall Check</div>
              </div>
            </div>
            <div className="mt-2 text-[9px] text-gray-700">
              <span className="font-semibold">Autocall trigger:</span> 100% of initial price | <span className="font-semibold text-[#da0011]">68% probability</span> of early redemption at Mar observation | Total return if called: <span className="font-bold text-[#da0011]">+8.5% annualized</span>
            </div>
          </div>

          {/* Product 3 */}
          <div className="border-l-2 border-l-orange-400 p-3 border border-gray-200 bg-white">
            <div className="flex justify-between items-start mb-1.5">
              <div>
                <div className="text-[11px] font-bold text-gray-900">US Equity Principal Protected Note</div>
                <div className="text-[9px] text-gray-600 mt-0.5">Linked to: S&P 500 Index</div>
              </div>
              <div className="px-1.5 py-0.5 bg-orange-50 border border-orange-300 text-[8px] font-semibold text-orange-700">
                NEAR CAP
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div>
                <div className="text-[8px] text-gray-500">Invested / Current</div>
                <div className="text-[10px] font-bold text-gray-900">HKD 834,000.00</div>
                <div className="text-[9px] text-[#da0011] font-semibold">HKD 893,000.00 (+7.07%)</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-500">Cap Utilization</div>
                <div className="text-[10px] font-bold text-orange-600">16% / 20% cap</div>
                <div className="text-[9px] text-gray-600">Index: 126% of initial</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-500">Maturity</div>
                <div className="text-[10px] font-bold text-gray-900">Mar 20, 2027</div>
                <div className="text-[9px] text-gray-600">12 months left</div>
              </div>
            </div>
            <div className="mt-2 text-[9px] text-gray-700">
              <span className="font-semibold">Structure:</span> 100% principal protection | 80% participation with 20% cap | <span className="font-semibold text-orange-600">80% of max return achieved</span> - consider exit to capture further upside
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
                <div className="text-gray-900">
                  <span><span className="font-bold text-[#da0011]">Mar 15, 2026:</span> HSI Autocall observation date - <span className="font-bold text-[#da0011]">High probability of early redemption</span> (HKD 724,000.00). Prepare reinvestment: allocate 50% to AI/semiconductor autocallables with 9-11% p.a. yields.</span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 ml-1 cursor-pointer">
                    <span>View Tech Sector Products</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <div className="text-gray-900">
                  <span><span className="font-bold text-[#da0011]">Jun 15, 2026:</span> Tech Index Note coupon observation - Currently below 105% trigger (at 104% of initial). Monitor closely for potential coupon payment.</span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 ml-1 cursor-pointer">
                    <span>Set Price Alert</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <div className="text-gray-900">
                  <span>US Equity Note reached <span className="font-bold text-[#da0011]">80% of 20% cap</span> with S&P 500 at 126% of initial. Consider exit to roll into uncapped participation structures for further upside capture.</span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 ml-1 cursor-pointer">
                    <span>Compare Alternatives</span>
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
              Search Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructuredProductAnalysisSection;
