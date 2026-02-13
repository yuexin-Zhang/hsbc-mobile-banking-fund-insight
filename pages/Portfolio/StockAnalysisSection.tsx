import React, { useState } from 'react';
import { risers, fallers } from './portfolioData';

interface StockAnalysisSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
  onShowStockDetail: () => void;
}

const StockAnalysisSection: React.FC<StockAnalysisSectionProps> = ({ sectionRef, onShowStockDetail }) => {
  const [currentStockViewIndex, setCurrentStockViewIndex] = useState(0);
  const [isStockViewTransitioning, setIsStockViewTransitioning] = useState(false);

  return (
    <div ref={sectionRef} className="scroll-mt-[150px]" data-section="stock">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-5 bg-[#da0011]"></div>
        <h2 className="text-[16px] font-bold text-gray-900">Stock</h2>
      </div>
      
      <div className="space-y-3">
        {/* AI Summary */}
        <div className="bg-[#f0f8ff] p-2">
          <p className="text-[11px] text-gray-700 leading-snug">
            YTD <span className="text-[#da0011]">+25.3%</span> with strong momentum. Top risers: HSBC <span className="text-[#da0011]">+3.12%</span>, UBTECH <span className="text-[#da0011]">+1.83%</span>; MTR <span className="text-green-600">-1.47%</span>. Tech at 45%—consider profit-taking and diversifying into defensive sectors.
          </p>
        </div>

        {/* Stock Movers Carousel */}
        <div className="pb-3 border-b border-gray-200">
          {/* Section Title */}
          <h3 className="text-[14px] font-bold text-gray-900 mb-3">Your portfolio insights</h3>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(calc(-${currentStockViewIndex * 70}%))` }}
              >
                {/* Risers View */}
                <div className="flex-shrink-0" style={{ width: '70%', paddingRight: '8px' }}>
                  <h4 className="text-[11px] font-semibold text-gray-700 mb-3">Biggest day risers</h4>
                  <div className="bg-white border border-gray-200 overflow-hidden">
                    {risers.map((stock, index) => (
                      <div key={index} className={`p-3 ${index < risers.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-[11px] font-semibold text-gray-900 mb-1">{stock.name}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{stock.exchange}</span>
                              <span className="text-[10px] text-gray-600">{stock.code}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[13px] font-bold text-gray-900 mb-1">{stock.price}</div>
                            <div className="flex items-center gap-1 justify-end">
                              <span className="text-[10px] text-[#da0011]">▲</span>
                              <span className="text-[10px] font-medium text-gray-900">{stock.change}</span>
                              <span className="text-[9px] text-[#da0011]">{stock.percent}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fallers View */}
                <div className="flex-shrink-0" style={{ width: '70%', paddingLeft: '8px' }}>
                  <h4 className="text-[11px] font-semibold text-gray-700 mb-3">Biggest day fallers</h4>
                  <div className="bg-white border border-gray-200 overflow-hidden">
                    {fallers.map((stock, index) => (
                      <div key={index} className={`p-3 ${index < fallers.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-[11px] font-semibold text-gray-900 mb-1">{stock.name}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{stock.exchange}</span>
                              <span className="text-[10px] text-gray-600">{stock.code}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[13px] font-bold text-gray-900 mb-1">{stock.price}</div>
                            <div className="flex items-center gap-1 justify-end">
                              <span className="text-[10px] text-green-600">▼</span>
                              <span className="text-[10px] font-medium text-gray-900">{stock.change}</span>
                              <span className="text-[9px] text-green-600">{stock.percent}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => {
                  if (!isStockViewTransitioning) {
                    setIsStockViewTransitioning(true);
                    setCurrentStockViewIndex((prev) => (prev - 1 + 2) % 2);
                    setTimeout(() => setIsStockViewTransitioning(false), 500);
                  }
                }}
                className="p-1 transition-colors cursor-pointer"
                disabled={isStockViewTransitioning}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center gap-1.5">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isStockViewTransitioning && index !== currentStockViewIndex) {
                        setIsStockViewTransitioning(true);
                        setCurrentStockViewIndex(index);
                        setTimeout(() => setIsStockViewTransitioning(false), 500);
                      }
                    }}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      index === currentStockViewIndex 
                        ? 'w-2 h-2 bg-gray-900' 
                        : 'w-1.5 h-1.5 bg-gray-400'
                    }`}
                    disabled={isStockViewTransitioning}
                  />
                ))}
              </div>
              
              <button
                onClick={() => {
                  if (!isStockViewTransitioning) {
                    setIsStockViewTransitioning(true);
                    setCurrentStockViewIndex((prev) => (prev + 1) % 2);
                    setTimeout(() => setIsStockViewTransitioning(false), 500);
                  }
                }}
                className="p-1 transition-colors cursor-pointer"
                disabled={isStockViewTransitioning}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
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
                  <span>Tech concentration at 45% exceeds recommended 35% threshold; consider partial profit-taking </span>
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
                  <span>Add defensive stocks in consumer staples or utilities to hedge against market correction </span>
                  <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 cursor-pointer">
                    <span>Explore Defensive Stocks</span>
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[11px]">
                <span className="text-[#db0011] font-bold mt-0.5">•</span>
                <div className="text-gray-700">
                  <span>NVIDIA's revenue surged 262% YOY last quarter, highlighting its dominance in AI chips. </span>
                  <button onClick={onShowStockDetail} className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5 relative cursor-pointer">
                    <span className="inline-flex items-center gap-0.5">
                      <span>View Price</span>
                      <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
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
              Search Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAnalysisSection;
