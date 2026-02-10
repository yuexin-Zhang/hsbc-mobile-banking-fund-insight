import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AIPortfolioReviewProps {
  onOpenRiskProfile: () => void;
  onScrollToInsights: () => void;
}

const AIPortfolioReview: React.FC<AIPortfolioReviewProps> = ({ 
  onOpenRiskProfile,
  onScrollToInsights 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mt-4">
      <div className="overflow-hidden relative bg-white">
        <div className="px-3 pt-3 relative z-20">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[15px] font-bold whitespace-nowrap inline-flex items-stretch">
              {/* AI section with borders */}
              <span className="relative inline-flex items-center overflow-hidden">
                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                  <span className="absolute inset-0 bg-gradient-to-b from-purple-500 to-pink-500 animate-pulse opacity-50"></span>
                </span>
                <span className="absolute left-0 top-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
                <span className="absolute left-0 bottom-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
                <span className="relative flex items-center px-1 py-0.5">
                  <svg className="w-3 h-3 animate-pulse" viewBox="0 0 24 24" fill="none" style={{animationDuration: '2s'}}>
                    <defs>
                      <linearGradient id="lightning-gradient-title" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(168, 85, 247)'}} />
                        <stop offset="100%" style={{stopColor: 'rgb(236, 72, 153)'}} />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path fill="url(#lightning-gradient-title)" d="M13 10V3L4 14h7v7l9-11h-7z" filter="url(#glow)" />
                  </svg>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">AI</span>
                </span>
              </span>
              
              {/* Portfolio Review with background and shimmer effect */}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 flex items-center rounded-r-full relative overflow-hidden shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] w-[200%]"></span>
                <span className="relative">Portfolio Review</span>
              </span>
            </h3>
            
            {/* View Details Button */}
            <button
              onClick={() => navigate('/portfolio')}
              className="bg-white border border-[#da0011] px-3 py-1.5 flex items-center cursor-pointer active:bg-[#fff5f5] transition-all duration-200 hover:shadow-sm flex-shrink-0 ml-2 relative"
            >
              <span className="text-[12px] font-semibold text-[#da0011] leading-none inline-block">View details</span>
            </button>
          </div>

          {/* Collapsed State */}
          {!isExpanded ? (
            <div className="relative">
              <div 
                className="bg-gradient-to-br from-[#e8f4f8] via-[#fef5f4] to-[#f0f8fc] rounded-[20px] border border-[#d5e5ec] shadow-sm px-4 py-3"
                style={{ animation: 'glow 3s ease-in-out infinite' }}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#31b0d5] flex-shrink-0 mt-1 animate-pulse"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] leading-snug">
                        <span className="text-[#31708f] font-semibold">Performance: </span>
                        <span className="text-[#1e1e1e]">Outperforming market by </span>
                        <span className="font-bold text-[#da0011]">8.3%</span>
                        <span className="text-[#1e1e1e]"> this month</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#f0ad4e] flex-shrink-0 mt-1 animate-pulse"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] leading-snug">
                        <span className="text-[#8a6d3b] font-semibold">Risk profile: </span>
                        <span className="text-[#1e1e1e]">Your risk assessment is expiring soon </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenRiskProfile();
                          }}
                          className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 relative cursor-pointer"
                        >
                          <span className="underline inline-flex items-center gap-0.5 inline-block">
                            <span>Update now</span>
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsExpanded(true)}
                className="w-full mt-1 flex items-center justify-center gap-1 py-1 text-[#da0011] font-semibold text-[10px] active:opacity-70 transition-all cursor-pointer"
              >
                <div className="relative inline-flex items-center">
                  <span className="underline inline-block">Show More</span>
                </div>
                <svg className="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* What Happened Section */}
              <div>
                <h4 className="text-[13px] font-bold text-[#1e1e1e] mb-2 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#da0011]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h2v7H3v-7zm4-6h2v13H7V7zm4-4h2v17h-2V3zm4 9h2v8h-2v-8zm4-3h2v11h-2V9z"/>
                  </svg>
                  <span>What happened</span>
                </h4>
                <div className="bg-gradient-to-br from-[#e8f4f8] via-[#fef5f4] to-[#f0f8fc] px-4 py-3 rounded-[20px] border border-[#d5e5ec] shadow-sm">
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#31b0d5] flex-shrink-0 mt-1 animate-pulse"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] leading-snug">
                          <span className="text-[#31708f] font-semibold">Performance: </span>
                          <span className="text-[#1e1e1e]">Outperforming market by </span>
                          <span className="font-bold text-[#da0011]">8.3%</span>
                          <span className="text-[#1e1e1e]"> this month </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onScrollToInsights();
                            }}
                            className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 relative cursor-pointer"
                          >
                            <span className="underline inline-flex items-center gap-0.5 inline-block">
                              <span>CIO House View</span>
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#31b0d5] flex-shrink-0 mt-1 animate-pulse"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] leading-snug">
                          <span className="text-[#31708f] font-semibold">Top movers: </span>
                          <span className="text-[#1e1e1e]">HSBC Global Equity Fund dropped </span>
                          <span className="font-bold text-[#a94442]">5%</span>
                          <span className="text-[#1e1e1e]"> yesterday </span>
                          <button className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 cursor-pointer">
                            <span className="underline inline-flex items-center gap-0.5">
                              <span>View details</span>
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#31b0d5] flex-shrink-0 mt-1 animate-pulse"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] leading-snug">
                          <span className="text-[#31708f] font-semibold">Allocation: </span>
                          <span className="text-[#1e1e1e]">Consider adding </span>
                          <span className="font-bold text-[#da0011]">25%</span>
                          <span className="text-[#1e1e1e]"> into Global Equity </span>
                          <button className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 cursor-pointer">
                            <span className="underline inline-flex items-center gap-0.5">
                              <span>Rebalance</span>
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next Section */}
              <div>
                <h4 className="text-[13px] font-bold text-[#1e1e1e] mb-2 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#da0011]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                  <span>What's next</span>
                </h4>
                <div className="bg-gradient-to-br from-[#fff9f0] via-[#fef5f4] to-[#f0f8fc] px-4 py-3 rounded-[20px] border border-[#f5e5d5] shadow-sm">
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#f0ad4e] flex-shrink-0 mt-1 animate-pulse"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] leading-snug">
                          <span className="text-[#8a6d3b] font-semibold">Risk profile: </span>
                          <span className="text-[#1e1e1e]">Your risk assessment is expiring soon </span>
                          <button 
                            onClick={() => onOpenRiskProfile()}
                            className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 relative cursor-pointer"
                          >
                            <span className="underline inline-flex items-center gap-0.5 inline-block">
                              <span>Update now</span>
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#f0ad4e] flex-shrink-0 mt-1 animate-pulse"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] leading-snug">
                          <span className="text-[#8a6d3b] font-semibold">Deposit: </span>
                          <span className="text-[#1e1e1e]">Your </span>
                          <span className="font-bold text-[#da0011]">HKD 1,500,000</span>
                          <span className="text-[#1e1e1e]"> time deposit maturing on </span>
                          <span className="font-bold text-[#1e1e1e]">9 Feb </span>
                          <button className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 cursor-pointer">
                            <span className="underline inline-flex items-center gap-0.5">
                              <span>Renew or withdraw</span>
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#f0ad4e] flex-shrink-0 mt-1 animate-pulse"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] leading-snug">
                          <span className="text-[#8a6d3b] font-semibold">Cashflow: </span>
                          <span className="text-[#1e1e1e]">Bond coupon payment of </span>
                          <span className="font-bold text-[#da0011]">HKD 850,000</span>
                          <span className="text-[#1e1e1e]"> due </span>
                          <span className="font-bold text-[#1e1e1e]">10 Mar </span>
                          <button className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 cursor-pointer">
                            <span className="underline inline-flex items-center gap-0.5">
                              <span>View schedule</span>
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
              <button
                onClick={() => setIsExpanded(false)}
                className="w-full flex items-center justify-center gap-1 pb-1 text-[#da0011] font-semibold text-[10px] active:opacity-70 transition-all cursor-pointer"
              >
                <div className="relative inline-flex items-center">
                  <span className="underline inline-block">Show less</span>
                </div>
                <svg className="w-3 h-3 rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.3), 0 0 10px rgba(168, 85, 247, 0.2); }
          50% { box-shadow: 0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3), 0 0 30px rgba(236, 72, 153, 0.2); }
        }
      `}</style>
    </div>
  );
};

export default AIPortfolioReview;
