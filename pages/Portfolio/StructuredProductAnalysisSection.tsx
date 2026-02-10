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
            <span className="text-[#da0011]">HKD 2,544,000</span> (<span className="text-[#da0011]">+7.6%</span>), all barriers safe. Mar 15: HSI Autocall <span className="text-[#da0011]">68% early redemption</span> at <span className="text-[#da0011]">+8.5% annualized</span>. Tech Note at 104% (needs 105% for Jun coupon).
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
                <div className="text-[9px] text-[#da0011] font-semibold">HKD 812,035.42 (+8.27%)</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-500">Barrier Status</div>
                <div className="text-[10px] font-bold text-orange-600">78% <span className="text-gray-900">(Strike: 75%)</span></div>
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
                <div className="text-[10px] font-bold text-gray-900">HKD 680,500.00</div>
                <div className="text-[9px] text-[#da0011] font-semibold">HKD 724,531.00 (+6.47%)</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-500">Barrier Status</div>
                <div className="text-[10px] font-bold text-orange-600">92% <span className="text-gray-900">(Strike: 75%)</span></div>
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
        </div>

        {/* AI Suggestions */}
        <div className="bg-gradient-to-br from-[#e8f4f8] via-[#fef5f4] to-[#f0f8fc] px-4 py-3 rounded-[20px] border border-[#d5e5ec] shadow-sm">
          <div className="mb-3">
            <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Suggestions</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-[11px]">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <div className="text-gray-900">
                  <span>Mar 15: HSI Autocall observation—<span className="font-bold text-[#da0011]">68% early redemption</span> probability (HKD 724,000 at +8.5% annualized). Prepare to reinvest: allocate 50% to AI/semiconductor autocallables (9-11% p.a. yields).</span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 ml-1 cursor-pointer">
                    <span>View Tech Products</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <div className="text-gray-900">
                  <span>Jun 15: Tech Index Note coupon observation—currently at 104% of initial (needs 105% for 10% p.a. coupon payment). Monitor NASDAQ-100 closely.</span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 ml-1 cursor-pointer">
                    <span>Set Price Alert</span>
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
