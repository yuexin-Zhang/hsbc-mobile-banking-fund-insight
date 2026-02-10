
import React, { useState, useEffect } from 'react';
import AIAssistant from './AIAssistant';
import RiskProfileQuestionnaire from './RiskProfileQuestionnaire';
import { useMobileDetect } from '../hooks/useMobileDetect';

interface WealthOverviewProps {
  onBack: () => void;
  onGoToPortfolioOverview: () => void;
  shouldNavigateToInsights?: boolean;
  onInsightsNavigated?: () => void;
}

const WealthOverview: React.FC<WealthOverviewProps> = ({ onBack, onGoToPortfolioOverview, shouldNavigateToInsights, onInsightsNavigated }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRiskProfileOpen, setIsRiskProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'insights'>('overview');
  const isMobile = useMobileDetect();

  // Insights articles data
  const insightsArticles = [
    {
      id: 1,
      image: `${import.meta.env.BASE_URL}insight-01.png`,
      title: 'FX Viewpoint: USD and CAD: Continued underperformance?',
      date: '02 Feb 2026'
    },
    {
      id: 2,
      image: `${import.meta.env.BASE_URL}insight-02.png`,
      title: 'Investment Monthly: Diversifying further amid evolving geopolitical risks',
      date: '30 Jan 2026'
    },
    {
      id: 3,
      image: `${import.meta.env.BASE_URL}insight-03.png`,
      title: 'Investment Weekly: Broadening out in 2026',
      date: '09 Feb 2026'
    },
    {
      id: 4,
      image: `${import.meta.env.BASE_URL}insight-04.png`,
      title: 'Special Coverage: Policy on hold as the Fed signals patience',
      date: '29 Jan 2026'
    },
    {
      id: 5,
      image: `${import.meta.env.BASE_URL}insight-05.png`,
      title: 'Think Future 2026: Your guide to the global investment landscape',
      date: '20 Nov 2025'
    }
  ];

  // 6 pieces of information to cycle through
  const infoItems = [
    {
      label: 'Performance',
      text: 'Outperforming market by ',
      highlight: '8.3%',
      suffix: ' this month',
      color: '#31b0d5',
      labelColor: '#31708f'
    },
    {
      label: 'Top movers',
      text: 'HSBC Global Equity Fund dropped ',
      highlight: '5%',
      suffix: ' yesterday',
      color: '#31b0d5',
      labelColor: '#31708f'
    },
    {
      label: 'Allocation',
      text: 'Consider adding ',
      highlight: '25%',
      suffix: ' into Global Equity',
      color: '#31b0d5',
      labelColor: '#31708f'
    },
    {
      label: 'Risk profile',
      text: 'Your risk assessment is expiring soon',
      highlight: '',
      suffix: '',
      color: '#f0ad4e',
      labelColor: '#8a6d3b'
    },
    {
      label: 'Cashflow',
      text: 'Your ',
      highlight: 'HKD 1,500,000',
      suffix: ' time deposit maturing on 9 Feb',
      color: '#f0ad4e',
      labelColor: '#8a6d3b'
    },
    {
      label: 'Cashflow',
      text: 'Bond coupon payment of ',
      highlight: 'HKD 850,000',
      suffix: ' due 10 Mar',
      color: '#f0ad4e',
      labelColor: '#8a6d3b'
    }
  ];

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);



  // Handle navigation to Insights tab
  useEffect(() => {
    if (shouldNavigateToInsights) {
      setActiveTab('insights');
      // Scroll to Insights tab section
      setTimeout(() => {
        const insightsSection = document.querySelector('[data-insights-section]');
        if (insightsSection) {
          insightsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Reset the flag after navigation
        if (onInsightsNavigated) {
          onInsightsNavigated();
        }
      }, 100);
    }
  }, [shouldNavigateToInsights, onInsightsNavigated]);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(168, 85, 247, 0.3), 0 0 10px rgba(168, 85, 247, 0.2);
          }
          50% {
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3), 0 0 30px rgba(236, 72, 153, 0.2);
          }
        }

        .info-item-enter {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes continuousScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .continuous-scroll {
          animation: continuousScroll 15s linear infinite;
        }
      `}</style>
      <div className="flex flex-col h-full bg-[#f5f5f5] font-sans relative">
      {/* Combined Status Bar and Navigation */}
      <div className="bg-white shrink-0">
        {/* Status Bar - Hidden on mobile */}
        {!isMobile && (
        <div className="pt-2 pb-1 px-4">
          <div className="flex items-center justify-between text-[15px] font-semibold text-gray-900">
            <span>{currentTime || '9:41'}</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M0 6v8h2V6H0zm4 8h12V6H4v8zm14 0h2V6h-2v8z" />
              </svg>
              <span className="text-[11px] ml-0.5">5G</span>
              <svg className="w-6 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 12">
                <rect x="1" y="1" width="18" height="10" rx="2" />
                <rect x="3" y="3" width="14" height="6" fill="currentColor" />
                <path d="M19 4v4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
        )}

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-around py-1 px-2">
            <button className="flex items-center justify-center p-2">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button className="text-[15px] text-gray-600 px-4 py-2">Pay</button>
            <button className="text-[15px] text-gray-600 px-4 py-2">Cards</button>
            <button className="text-[15px] text-gray-900 font-semibold px-4 py-2 border-b-4 border-[#da0011]">
              Wealth
            </button>
            <button className="text-[15px] text-gray-600 px-4 py-2">Ins...</button>
            <button className="flex items-center justify-center p-2">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Total Market Value */}
        <div className="px-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[13px] text-gray-600">Total market value</span>
            <button className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-[10px] text-gray-600">?</span>
            </button>
          </div>
          <div className="mb-1">
            <span className="text-[32px] font-bold text-gray-900">10,632,546</span>
            <span className="text-[20px] text-gray-600">.65</span>
            <span className="text-[14px] text-gray-600 ml-2">HKD</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[11px] text-gray-500">As at 5 Sep 2024, 12:18:34 (HKT)</div>
          </div>
        </div>

        {/* Unrealised gain/loss */}
        <div className="px-4 mt-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-900">Unrealised gain/loss</span>
              <button className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                <span className="text-[10px] text-gray-600">?</span>
              </button>
            </div>
            <div className="text-right">
              <span className="text-[13px] font-semibold text-[#da0011]">▲ 231,617.06</span>
              <span className="text-[12px] text-[#da0011] ml-1">(+2.23%)</span>
            </div>
          </div>
        </div>

        {/* Realised gain/loss */}
        <div className="px-4">
          <button 
            className="w-full flex items-center justify-between active:bg-gray-50 transition-colors py-1"
          >
            <span className="text-[13px] text-gray-900">Realised gain/loss</span>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600">View details</span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>

        {/* Overall AI Portfolio Summary */}
        <div className="mt-4">
          <div className="overflow-hidden relative bg-white">
            
            <div className="px-3 pt-3 relative z-20">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[15px] font-bold whitespace-nowrap inline-flex items-stretch">
                  {/* AI section with borders */}
                  <span className="relative inline-flex items-center overflow-hidden">
                    {/* Left border with glow animation */}
                    <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                      <span className="absolute inset-0 bg-gradient-to-b from-purple-500 to-pink-500 animate-pulse opacity-50"></span>
                    </span>
                    {/* Top border with glow */}
                    <span className="absolute left-0 top-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
                    {/* Bottom border with glow */}
                    <span className="absolute left-0 bottom-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
                    {/* AI text with icon */}
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
                
                {/* View Details Button - Inline with title */}
                <button
                  onClick={onGoToPortfolioOverview}
                  className="bg-white border border-[#da0011] px-3 py-1.5 flex items-center cursor-pointer active:bg-[#fff5f5] transition-all duration-200 hover:shadow-sm flex-shrink-0 ml-2 relative"
                >
                  <span className="text-[12px] font-semibold text-[#da0011] leading-none inline-block">View details</span>
                </button>
              </div>

              {/* Collapsed State - Static Two Lines */}
              {!isExpanded ? (
                <div className="relative">
                  <div 
                    className="bg-gradient-to-br from-[#e8f4f8] via-[#fef5f4] to-[#f0f8fc] rounded-[20px] border border-[#d5e5ec] shadow-sm px-4 py-3"
                    style={{ animation: 'glow 3s ease-in-out infinite' }}
                  >
                    <div className="space-y-2.5">
                      {/* Performance */}
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
                      
                      {/* Risk Profile */}
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#f0ad4e] flex-shrink-0 mt-1 animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] leading-snug">
                            <span className="text-[#8a6d3b] font-semibold">Risk profile: </span>
                            <span className="text-[#1e1e1e]">Your risk assessment is expiring soon </span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsRiskProfileOpen(true);
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
                  
                  {/* Expand Button */}
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
              ) : null}

              {/* Expanded State */}
              {isExpanded && (
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
                      {/* Performance */}
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
                                setActiveTab('insights');
                                // Scroll to Insights tab section
                                setTimeout(() => {
                                  const insightsSection = document.querySelector('[data-insights-section]');
                                  if (insightsSection) {
                                    insightsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }
                                }, 100);
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
                      
                      {/* Top Movers */}
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#31b0d5] flex-shrink-0 mt-1 animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] leading-snug">
                            <span className="text-[#31708f] font-semibold">Top movers: </span>
                            <span className="text-[#1e1e1e]">HSBC Global Equity Fund dropped </span>
                            <span className="font-bold text-[#a94442]">5%</span>
                            <span className="text-[#1e1e1e]"> yesterday </span>
                            <button className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5">
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

                      {/* Allocation */}
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#31b0d5] flex-shrink-0 mt-1 animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] leading-snug">
                            <span className="text-[#31708f] font-semibold">Allocation: </span>
                            <span className="text-[#1e1e1e]">Consider adding </span>
                            <span className="font-bold text-[#da0011]">25%</span>
                            <span className="text-[#1e1e1e]"> into Global Equity </span>
                            <button className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5">
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
                      {/* Risk Profile */}
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#f0ad4e] flex-shrink-0 mt-1 animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] leading-snug">
                            <span className="text-[#8a6d3b] font-semibold">Risk profile: </span>
                            <span className="text-[#1e1e1e]">Your risk assessment is expiring soon </span>
                            <button 
                              onClick={() => setIsRiskProfileOpen(true)}
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
                      
                      {/* Time Deposit Maturity */}
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#f0ad4e] flex-shrink-0 mt-1 animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] leading-snug">
                            <span className="text-[#8a6d3b] font-semibold">Deposit: </span>
                            <span className="text-[#1e1e1e]">Your </span>
                            <span className="font-bold text-[#da0011]">HKD 1,500,000</span>
                            <span className="text-[#1e1e1e]"> time deposit maturing on </span>
                            <span className="font-bold text-[#1e1e1e]">9 Feb </span>
                            <button className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5">
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

                      {/* Bond Coupon */}
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#f0ad4e] flex-shrink-0 mt-1 animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] leading-snug">
                            <span className="text-[#8a6d3b] font-semibold">Cashflow: </span>
                            <span className="text-[#1e1e1e]">Bond coupon payment of </span>
                            <span className="font-bold text-[#da0011]">HKD 850,000</span>
                            <span className="text-[#1e1e1e]"> due </span>
                            <span className="font-bold text-[#1e1e1e]">10 Mar </span>
                            <button className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5">
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
                  
                {/* Collapse Button */}
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
        </div>

        {/* Action Buttons Grid */}
        <div className="bg-white px-4 pt-6 pb-4 mt-4">
          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src={`${import.meta.env.BASE_URL}icon1.png`} alt="Trade stocks" className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] text-center text-gray-900 leading-tight">Trade<br/>stocks</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src={`${import.meta.env.BASE_URL}icon2.png`} alt="Wealth Portfolio Lending" className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] text-center text-gray-900 leading-tight">Wealth<br/>Portfolio<br/>Lending</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src={`${import.meta.env.BASE_URL}icon3.png`} alt="Trade funds" className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] text-center text-gray-900 leading-tight">Trade<br/>funds</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src={`${import.meta.env.BASE_URL}icon4.png`} alt="Analyse your portfolio" className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] text-center text-gray-900 leading-tight">Analyse<br/>your<br/>portfolio</span>
            </button>
          </div>
        </div>

        {/* Overview/Insights Tabs */}
        <div className="bg-white border-b-2 border-gray-200" data-insights-section>
          <div className="flex px-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-1 py-3 text-[15px] font-semibold cursor-pointer ${
                activeTab === 'overview' 
                  ? 'text-gray-900 border-b-2 border-[#da0011] -mb-[2px]' 
                  : 'text-gray-600'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('insights')}
              className={`px-6 py-3 text-[15px] ml-8 cursor-pointer ${
                activeTab === 'insights' 
                  ? 'font-semibold text-gray-900 border-b-2 border-[#da0011] -mb-[2px]' 
                  : 'text-gray-600'
              }`}
            >
              <div className="relative inline-flex items-center">
                <span className="inline-block">Insights</span>
              </div>
            </button>
          </div>
        </div>

        {/* Your holdings section */}
        {activeTab === 'overview' && (
        <div className="bg-white px-4 pb-20 pt-6">
          <h3 className="text-[17px] font-semibold text-gray-900 mb-4">Your holdings</h3>
          
          {/* Holdings bar chart */}
          <div className="h-6 flex rounded-sm overflow-hidden mb-3">
            <div className="bg-[#31708f]" style={{ width: '34.85%' }}></div>
            <div className="bg-[#5cb85c]" style={{ width: '14.54%' }}></div>
            <div className="bg-[#a94442]" style={{ width: '13.01%' }}></div>
            <div className="bg-[#f0ad4e]" style={{ width: '12.93%' }}></div>
            <div className="bg-[#31b0d5]" style={{ width: '11.49%' }}></div>
            <div className="bg-[#d9534f]" style={{ width: '13.18%' }}></div>
          </div>

          {/* Holdings list */}
          <div className="space-y-4">
            {/* Stocks */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#31708f] rounded-sm"></div>
                <div>
                  <div className="text-[15px] text-gray-900">Stocks (34.85%)</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-gray-900">3,705,442</span>
                    <span className="text-[13px] text-gray-600">.00 HKD</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#da0011]">
                <span className="text-[15px] font-medium">▲ 19,939.05</span>
              </div>
            </div>

            {/* Unit Trusts */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#5cb85c] rounded-sm"></div>
                <div>
                  <div className="text-[15px] text-gray-900">Unit Trusts (14.54%)</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-gray-900">1,545,972</span>
                    <span className="text-[13px] text-gray-600">.28 HKD</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#5cb85c]">
                <span className="text-[15px] font-medium">▼ 5,223.18</span>
              </div>
            </div>

            {/* Investment-linked insurance */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-[#a94442] rounded-sm"></div>
                <div className="text-[15px] text-gray-900">Investment-linked insurance (13.01%)</div>
              </div>
              <div className="ml-6">
                <div className="text-[12px] text-gray-600 mb-1">Total fund balance</div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-gray-900">1,383,294</span>
                  <span className="text-[13px] text-gray-600">.32 HKD</span>
                </div>
              </div>
            </div>

            {/* Insurance with saving benefit */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-[#f0ad4e] rounded-sm"></div>
                <div className="text-[15px] text-gray-900">Insurance with saving benefit (12.93%)</div>
              </div>
              <div className="ml-6">
                <div className="text-[12px] text-gray-600 mb-1">Policy value</div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-gray-900">1,374,788</span>
                  <span className="text-[13px] text-gray-600">.28 HKD</span>
                </div>
              </div>
            </div>

            {/* Bonds and CDs */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#31b0d5] rounded-sm"></div>
                <div>
                  <div className="text-[15px] text-gray-900">Bonds and CDs (11.49%)</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-gray-900">1,221,679</span>
                    <span className="text-[13px] text-gray-600">.61 HKD</span>
                  </div>
                </div>
              </div>
              <div className="text-[15px] text-gray-600">0.00%</div>
            </div>

            {/* Other holdings */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-[#d9534f] rounded-sm"></div>
                <div className="text-[15px] text-gray-900">Other holdings</div>
              </div>
              
              <div className="ml-6 space-y-3">
                <div>
                  <div className="text-[13px] text-gray-900 mb-1">ELIs and Structured Notes (3.45%)</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold text-gray-900">366,822</span>
                      <span className="text-[13px] text-gray-600">.86 HKD</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#5cb85c]">
                      <span className="text-[15px] font-medium">▲ 4,883.96</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[13px] text-gray-900 mb-1">HSBC Gold Token (3.02%)</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold text-gray-900">321,102</span>
                      <span className="text-[13px] text-gray-600">.91 HKD</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#5cb85c]">
                      <span className="text-[15px] font-medium">▲ 3,791.34</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Insights Tab Content */}
        {activeTab === 'insights' && (
        <div className="bg-white px-4 pb-20 pt-4">
          <div className="space-y-4">
            {insightsArticles.map((article) => (
              <button
                key={article.id}
                className="w-full flex items-start gap-3 text-left active:bg-gray-50 transition-colors py-2"
              >
                {/* Article Image */}
                <div className="w-[100px] h-[100px] flex-shrink-0 overflow-hidden bg-gray-200">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback: Display a gradient background if image fails to load
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                      }
                    }}
                  />
                </div>

                {/* Article Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <h4 className="text-[15px] font-normal text-gray-900 leading-snug mb-3">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[13px]">{article.date}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Important information section */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <h4 className="text-[15px] font-semibold text-gray-900 mb-3">Important information</h4>
            <div className="text-[12px] text-gray-600 leading-relaxed space-y-2">
              <p>• Unrealised gain/loss and market value are not available for certain product types including Insurance with saving benefit, Investment-linked insurance, Structured products and Payment Protection Policies</p>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* HSBC Lion AI Button - Fixed at bottom right within phone area */}
      <button
        onClick={() => setIsAIAssistantOpen(true)}
        className="absolute bottom-24 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 z-50 overflow-hidden cursor-pointer"
        aria-label="Open AI Assistant"
      >
        <img 
          src={`${import.meta.env.BASE_URL}icon-lion.png`} 
          alt="HSBC Lion" 
          className="w-full h-full object-cover"
        />
      </button>

      {/* AI Assistant Dialog */}
      <AIAssistant 
        isOpen={isAIAssistantOpen} 
        onClose={() => setIsAIAssistantOpen(false)} 
      />

      {/* Risk Profile Questionnaire */}
      <RiskProfileQuestionnaire
        isOpen={isRiskProfileOpen}
        onClose={() => setIsRiskProfileOpen(false)}
      />
    </div>
    </>
  );
};

export default WealthOverview;
