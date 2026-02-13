import React from 'react';
import { useNavigate } from 'react-router-dom';
import HoldingsPerformanceChart from './HoldingsPerformanceChart';
import { chartData, chartColors } from './portfolioData';

interface UnitTrustAnalysisSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const UnitTrustAnalysisSection: React.FC<UnitTrustAnalysisSectionProps> = ({ sectionRef }) => {
  const navigate = useNavigate();

  return (
    <div ref={sectionRef} className="scroll-mt-[150px] mt-8 pt-8 border-t-[6px] border-[#f4f5f6]" data-section="unit-trust">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-5 bg-[#da0011]"></div>
        <h2 className="text-[16px] font-bold text-gray-900">Unit Trust</h2>
      </div>
      
      <div className="space-y-3">
        {/* AI Summary */}
        <div className="bg-[#f0f8ff] p-2">
          <p className="text-[11px] text-gray-700 leading-snug">
            Strong performance <span className="text-[#da0011]">+18.5%</span> YoY, outperforming benchmark by <span className="text-[#da0011]">+3.2%</span>. Tech and healthcare exposure solid. Consider +5% Asia allocation.
          </p>
        </div>

        {/* Performance Chart */}
        <div className="pb-3 border-b border-gray-200">
          <HoldingsPerformanceChart chartData={chartData} colors={chartColors} />
        </div>

        {/* AI Suggestions */}
        <div className="bg-gradient-to-br from-[#e8f4f8] via-[#fef5f4] to-[#f0f8fc] px-4 py-3 rounded-[20px] border border-[#d5e5ec] shadow-sm">
          <div className="mb-3">
            <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Suggestions</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-[11px] relative">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <svg className="absolute -left-[4px] -top-[1px] w-4 h-4 text-[#FFA500] transform rotate-45 scale-x-[-1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" style={{ zIndex: 1 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className="text-gray-700">
                  <span>Consider rebalancing: Increase Asia ex-Japan exposure by 3-5% to capture emerging market growth </span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 cursor-pointer">
                    <span>View Asia Funds</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[11px] relative">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <svg className="absolute -left-[4px] -top-[1px] w-4 h-4 text-[#FFA500] transform rotate-45 scale-x-[-1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" style={{ zIndex: 1 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className="text-gray-700">
                  <span>BGF ENERGY showing recent underperformance; monitor for potential reallocation to renewable energy funds </span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 cursor-pointer">
                    <span>Compare Alternatives</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <div className="text-gray-700">
                  <span>Optimal timing to add defensive positions as market volatility indicators suggest caution ahead </span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 cursor-pointer">
                    <span>Explore Defensive Funds</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3 pt-3 border-t border-[#d5e5ec]">
            <button 
              onClick={() => navigate('/fund')}
              className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 border border-[#db0011] active:opacity-80 transition-opacity relative cursor-pointer"
            >
              <span className="inline-block">View Details</span>
            </button>
            <button className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 active:opacity-80 transition-opacity cursor-pointer">
              Search Fund
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitTrustAnalysisSection;
