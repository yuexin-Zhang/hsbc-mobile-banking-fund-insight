
import React, { useState, useEffect, useRef } from 'react';
import FloatingAIButton from './FloatingAIButton';
import AIAssistant from './AIAssistant';
import HoldingsPerformanceChart from './charts/HoldingsPerformanceChart';
import StockDetailPage from './StockDetailPage';

interface PortfolioOverviewPageProps {
  onBack: () => void;
  onGoToUnitTrusts: () => void;
}

const PortfolioOverviewPage: React.FC<PortfolioOverviewPageProps> = ({ onBack, onGoToUnitTrusts }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
    const [activeAnalysisTab, setActiveAnalysisTab] = useState('Stock');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [showStockDetail, setShowStockDetail] = useState(false);
  
  // Refs for analysis sections
  const unitTrustRef = useRef<HTMLDivElement>(null);
  const stockRef = useRef<HTMLDivElement>(null);
  const structuredProductRef = useRef<HTMLDivElement>(null);
  const bondRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingFromClick = useRef(false);
  
  // Ref for carousel
  const carouselRef = useRef<HTMLDivElement>(null);

  // Chart data for Holdings Performance - Same as Fund Holding Analysis
  const chartData = [
    { date: '2025-01', all: 0, fund: 0, saa: 0 },
    { date: '2025-01', all: 1.2, fund: 0.8, saa: 0.5 },
    { date: '2025-01', all: 2.8, fund: 2.1, saa: 1.2 },
    { date: '2025-01', all: 4.5, fund: 4.2, saa: 2.8 },
    { date: '2025-02', all: 6.2, fund: 6.8, saa: 4.5 },
    { date: '2025-02', all: 8.9, fund: 9.5, saa: 6.2 },
    { date: '2025-02', all: 10.5, fund: 11.8, saa: 7.8 },
    { date: '2025-03', all: 12.8, fund: 14.2, saa: 9.5 },
    { date: '2025-03', all: 11.5, fund: 12.8, saa: 8.9 },
    { date: '2025-03', all: 13.2, fund: 15.5, saa: 10.2 },
    { date: '2025-04', all: 10.8, fund: 12.2, saa: 9.1 },
    { date: '2025-04', all: 9.2, fund: 10.5, saa: 7.8 },
    { date: '2025-04', all: 8.5, fund: 9.2, saa: 6.9 },
    { date: '2025-05', all: 7.8, fund: 8.1, saa: 6.2 },
    { date: '2025-05', all: 6.5, fund: 6.8, saa: 5.5 },
    { date: '2025-05', all: 5.8, fund: 5.2, saa: 4.8 },
    { date: '2025-06', all: 7.2, fund: 7.5, saa: 6.1 },
    { date: '2025-06', all: 9.5, fund: 10.2, saa: 8.2 },
    { date: '2025-07', all: 11.8, fund: 12.8, saa: 9.8 },
    { date: '2025-07', all: 14.2, fund: 15.5, saa: 11.5 },
    { date: '2025-08', all: 16.8, fund: 18.2, saa: 13.8 },
    { date: '2025-08', all: 19.5, fund: 21.5, saa: 16.2 },
    { date: '2025-09', all: 22.8, fund: 25.2, saa: 18.9 },
    { date: '2025-09', all: 26.5, fund: 28.59, saa: 21.8 }, // Peak for fund
    { date: '2025-10', all: 24.2, fund: 26.8, saa: 20.5 },
    { date: '2025-10', all: 21.8, fund: 23.8, saa: 19.2 }, // Start of max drawdown
    { date: '2025-10', all: 19.5, fund: 21.2, saa: 17.8 },
    { date: '2025-11', all: 17.2, fund: 18.5, saa: 16.5 },
    { date: '2025-11', all: 16.8, fund: 17.8, saa: 15.9 },
    { date: '2025-11', all: 18.5, fund: 20.2, saa: 17.2 },
    { date: '2025-12', all: 20.8, fund: 22.8, saa: 19.1 },
    { date: '2025-12', all: 23.5, fund: 25.5, saa: 21.2 },
    { date: '2025-12', all: 26.2, fund: 28.2, saa: 23.5 },
    { date: '2026-01', all: 28.8, fund: 30.5, saa: 25.2 },
    { date: '2026-01', all: 30.5, fund: 32.8, saa: 26.8 },
    { date: '2026-01', all: 29.2, fund: 31.5, saa: 25.83 },
  ];

  const chartColors = {
    red: '#da0011',
    lightRed: '#fff5f5',
    grey: '#999',
    dark: '#1e1e1e',
    greyBg: '#f5f5f5',
    border: '#ebeef0',
    muted: '#767676',
    axis: '#dcddde'
  };

  // AI Insights data - 6 cards corresponding to What happened (3) and What's next (3)
  const insights = [
    // What happened - Performance (Chart/Graph icon)
    {
      icon: (
        <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Performance Analysis',
      description: (
        <>
          Your portfolio is <span className="font-bold">outperforming the market by 8.3%</span> this month. The <span className="font-bold">HSBC Global Equity Fund</span> led gains with a <span className="font-bold">12.5% return</span>, contributing <span className="font-bold">HKD 145,000</span> in unrealized gains.
        </>
      ),
      additionalAction: 'CIO House View'
    },
    // What happened - Top Movers (Trending Down icon)
    {
      icon: (
        <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
      title: 'Top Movers Impact',
      description: (
        <>
          The <span className="font-bold">HSBC Global Equity Fund</span> experienced a <span className="font-bold">5% decline</span> yesterday, reducing portfolio value by <span className="font-bold">HKD 77,271</span>. Our AI analysis suggests recovery expected in <span className="font-bold">Q2 2026</span>.
        </>
      ),
      action: 'View details'
    },
    // What happened - Allocation (Pie Chart icon)
    {
      icon: (
        <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      title: 'Strategic Allocation Opportunity',
      description: (
        <>
          AI recommends increasing <span className="font-bold">Global Equity allocation by 25%</span> (<span className="font-bold">HKD 2.66M</span>). Suggested allocation:
          <br />
          <span className="font-bold">• 15%</span> Asian technology
          <br />
          <span className="font-bold">• 5%</span> Healthcare innovation
          <br />
          <span className="font-bold">• 5%</span> Sustainable infrastructure
        </>
      ),
      action: 'Rebalance'
    },
    // What's next - Risk Profile (Shield Check icon)
    {
      icon: (
        <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Risk Profile Update Required',
      description: (
        <>
          Your risk assessment expires <span className="font-bold">March 15, 2026</span>. Over the past year, volatility increased <span className="font-bold">28%</span> and your equity exposure rose to <span className="font-bold">35%</span>. Complete the <span className="font-bold">10-minute review</span> to maintain personalized AI recommendations.
        </>
      ),
      action: 'Update now'
    },
    // What's next - Time Deposit (Cash/Money icon)
    {
      icon: (
        <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Time Deposit Maturity Decision',
      description: (
        <>
          Your <span className="font-bold">HKD 1,500,000</span> time deposit matures <span className="font-bold">Feb 9, 2026</span>. Options:
          <br />
          <span className="font-bold">1.</span> Renew at <span className="font-bold">3.85% APR</span> for 3 months
          <br />
          <span className="font-bold">2.</span> Deploy 60% into Bond Fund (<span className="font-bold">4.8%</span> yield)
          <br />
          <span className="font-bold">3.</span> Structured products with principal protection
        </>
      ),
      action: 'Renew or withdraw'
    },
    // What's next - Bond Coupon (Document/Receipt icon)
    {
      icon: (
        <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Bond Coupon Cashflow Planning',
      description: (
        <>
          Bond coupon of <span className="font-bold">HKD 850,000</span> due <span className="font-bold">Mar 10, 2026</span>. AI recommends:
          <br />
          <span className="font-bold">1.</span> Reinvest 70% (<span className="font-bold">HKD 595K</span>) into High Yield Fund
          <br />
          <span className="font-bold">2.</span> Deploy 20% (<span className="font-bold">HKD 170K</span>) into blue-chips
          <br />
          <span className="font-bold">3.</span> Reserve 10% as tactical dry powder
        </>
      ),
      action: 'View schedule'
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

  // Auto-carousel for AI Deep Dive Insights
  useEffect(() => {
    if (isCarouselPaused || isTransitioning) return;
    
    const carouselInterval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 3000);
    
    return () => clearInterval(carouselInterval);
  }, [isCarouselPaused, isTransitioning, insights.length]);

  // Handle scroll to update active analysis tab
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (isScrollingFromClick.current) return;
      
      const scrollTop = scrollContainer.scrollTop;
      const offset = 150;

      const sections = [
        { ref: unitTrustRef, name: 'Unit Trust' },
        { ref: stockRef, name: 'Stock' },
        { ref: structuredProductRef, name: 'Structured Product' },
        { ref: bondRef, name: 'Bond' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop - offset;
          if (scrollTop >= sectionTop - 50) {
            setActiveAnalysisTab(section.name);
            break;
          }
        }
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle analysis tab click to scroll to section
  const handleAnalysisTabClick = (tab: string) => {
    setActiveAnalysisTab(tab);
    isScrollingFromClick.current = true;
    
    let targetRef: React.RefObject<HTMLDivElement> | null = null;
    
    switch (tab) {
      case 'Unit Trust':
        targetRef = unitTrustRef;
        break;
      case 'Stock':
        targetRef = stockRef;
        break;
      case 'Structured Product':
        targetRef = structuredProductRef;
        break;
      case 'Bond':
        targetRef = bondRef;
        break;
    }

    if (targetRef?.current && scrollContainerRef.current) {
      const headerOffset = 150;
      const elementPosition = targetRef.current.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      scrollContainerRef.current.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        isScrollingFromClick.current = false;
      }, 800);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f5f6] font-sans relative">
      {/* Mobile Status Bar */}
      <div className="bg-white pt-2 pb-1 px-4 sticky top-0 z-50">
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

      {/* Header */}
      <div className="bg-white py-2 px-3 border-b border-gray-200 sticky top-[30px] z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack} 
              className="w-7 h-7 -ml-2 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-[17px] font-semibold text-gray-900 whitespace-nowrap">AI Portfolio Review</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar">
        {/* Total Market Value Section */}
        <div className="bg-white px-2 pt-4 pb-3">
          <div className="">
            <span className="text-[14px] text-gray-600">Total market value</span>
          </div>
          <div className="">
            <span className="text-[32px] font-bold text-gray-900">10,632,546</span>
            <span className="text-[20px] text-gray-600">.65</span>
            <span className="text-[14px] text-gray-600 ml-2">HKD</span>
          </div>
          
          {/* Unrealised gain/loss */}
          <div className="mb-1">
            <span className="text-[13px] text-gray-900">Unrealised gain/loss </span>
            <span className="text-[13px] font-semibold text-[#da0011]">▲ 231,617.06</span>
            <span className="text-[12px] text-[#da0011] ml-1">(+2.23%)</span>
          </div>
          
          {/* Macro Indicators - Horizontal Scroll */}
          <div className="">
            <div className="overflow-x-auto no-scrollbar -mx-2 px-2">
              <div className="flex gap-2 pb-1">
                {/* HSI Card - Increase (Red up) */}
                <div className="flex-shrink-0 w-[88px] bg-white rounded border border-gray-200 overflow-hidden shadow-md">
                  <div className="px-2 pt-2.5">
                    <div className="text-[11px] font-bold text-gray-900 mb-0.5 leading-tight">HSI</div>
                    <div className="text-[10px] text-gray-500 mb-1.5 leading-tight">7,649.60</div>
                  </div>
                  <div className="bg-[#ffebee] px-2 py-1 flex items-center gap-0.5">
                    <span className="text-[9px] text-[#c62828]">▲</span>
                    <span className="text-[10px] font-medium text-gray-600">1.28%</span>
                  </div>
                </div>

                {/* HSAHP Card - Decrease (Green down) */}
                <div className="flex-shrink-0 w-[88px] bg-white rounded border border-gray-200 overflow-hidden shadow-md">
                  <div className="px-2 pt-2.5">
                    <div className="text-[11px] font-bold text-gray-900 mb-0.5 leading-tight">HSAHP</div>
                    <div className="text-[10px] text-gray-500 mb-1.5 leading-tight">16,475.82</div>
                  </div>
                  <div className="bg-[#e8f5e9] px-2 py-1 flex items-center gap-0.5">
                    <span className="text-[9px] text-[#2e7d32]">▼</span>
                    <span className="text-[10px] font-medium text-gray-600">1.28%</span>
                  </div>
                </div>

                {/* HSCEI Card - Increase (Red up) */}
                <div className="flex-shrink-0 w-[88px] bg-white rounded border border-gray-200 overflow-hidden shadow-md">
                  <div className="px-2 pt-2.5">
                    <div className="text-[11px] font-bold text-gray-900 mb-0.5 leading-tight">HSCEI</div>
                    <div className="text-[10px] text-gray-500 mb-1.5 leading-tight">7,369.66</div>
                  </div>
                  <div className="bg-[#ffebee] px-2 py-1 flex items-center gap-0.5">
                    <span className="text-[9px] text-[#c62828]">▲</span>
                    <span className="text-[10px] font-medium text-gray-600">0.28%</span>
                  </div>
                </div>

                {/* HSTEC Card - Increase (Red up) */}
                <div className="flex-shrink-0 w-[88px] bg-white rounded border border-gray-200 overflow-hidden shadow-md">
                  <div className="px-2 pt-2.5">
                    <div className="text-[11px] font-bold text-gray-900 mb-0.5 leading-tight">HSTEC</div>
                    <div className="text-[10px] text-gray-500 mb-1.5 leading-tight">10,389.0</div>
                  </div>
                  <div className="bg-[#ffebee] px-2 py-1 flex items-center gap-0.5">
                    <span className="text-[9px] text-[#c62828]">▲</span>
                    <span className="text-[10px] font-medium text-gray-600">0.23%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Section - Horizontal Scroll */}
        <div className="bg-[#f4f5f6] px-2 py-2 pb-4 relative">
          <div className="flex items-center justify-between mb-3">
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
                      <linearGradient id="lightning-gradient-deepdive" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(168, 85, 247)'}} />
                        <stop offset="100%" style={{stopColor: 'rgb(236, 72, 153)'}} />
                      </linearGradient>
                      <filter id="glow-deepdive">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path fill="url(#lightning-gradient-deepdive)" d="M13 10V3L4 14h7v7l9-11h-7z" filter="url(#glow-deepdive)" />
                  </svg>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">AI</span>
                </span>
              </span>
              
              {/* Deep Dive Insights with background and shimmer effect */}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 flex items-center rounded-r-full relative overflow-hidden shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]"></span>
                <span className="relative">Deep Dive Insights</span>
              </span>
            </h3>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-gray-500">{currentInsightIndex + 1}/{insights.length}</span>
            </div>
          </div>

          {/* AI Deep Dive Insights - Mobile-style Carousel */}
          <div 
            className="relative overflow-hidden"
            style={{ 
              perspective: '1000px',
              touchAction: 'pan-y',
              minHeight: '180px',
            }}
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            onWheel={(e) => {
              e.preventDefault();
              if (isTransitioning) return;
              
              setIsTransitioning(true);
              
              if (e.deltaY > 0) {
                setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
              } else if (e.deltaY < 0) {
                setCurrentInsightIndex((prev) => (prev - 1 + insights.length) % insights.length);
              }
              
              setTimeout(() => setIsTransitioning(false), 500);
            }}
          >
            <div className="relative pb-4">
              {insights.map((insight, index) => {
                const offset = index - currentInsightIndex;
                const isActive = offset === 0;
                const isPrev = offset === -1 || (currentInsightIndex === 0 && index === insights.length - 1);
                const isNext = offset === 1 || (currentInsightIndex === insights.length - 1 && index === 0);
                const isVisible = isActive || isPrev || isNext;
                
                // Calculate position and transform
                let translateX = 0;
                let translateZ = 0;
                let rotateY = 0;
                let scale = 1;
                let opacity = 0;
                let zIndex = 0;
                
                if (isActive) {
                  translateX = 0;
                  translateZ = 0;
                  rotateY = 0;
                  scale = 1;
                  opacity = 1;
                  zIndex = 30;
                } else if (isPrev) {
                  translateX = -85;
                  translateZ = -100;
                  rotateY = 25;
                  scale = 0.85;
                  opacity = 0.4;
                  zIndex = 10;
                } else if (isNext) {
                  translateX = 85;
                  translateZ = -100;
                  rotateY = -25;
                  scale = 0.85;
                  opacity = 0.4;
                  zIndex = 10;
                }
                
                return (
                  <div
                    key={index}
                    className="absolute top-0 left-1/2 cursor-pointer"
                    style={{
                      width: 'calc(100% - 32px)',
                      transform: `translateX(-50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity: isVisible ? opacity : 0,
                      zIndex,
                      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      pointerEvents: isVisible ? 'auto' : 'none',
                    }}
                    onClick={() => {
                      if (!isActive && !isTransitioning) {
                        setIsTransitioning(true);
                        if (isPrev) {
                          setCurrentInsightIndex((prev) => (prev - 1 + insights.length) % insights.length);
                        } else if (isNext) {
                          setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
                        }
                        setTimeout(() => setIsTransitioning(false), 500);
                      }
                    }}
                  >
                    <div className="bg-white rounded-sm p-3 pb-4 border border-gray-200 shadow-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          {insight.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-semibold text-gray-900 mb-1">
                            {insight.title}
                          </div>
                          <div className="text-[11px] text-gray-600 leading-relaxed whitespace-normal mb-2">
                            {insight.description}
                          </div>
                          <div className="flex items-center gap-3">
                            {insight.action && (
                              <button className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5">
                                <span className="underline inline-flex items-center gap-0.5">
                                  <span>{insight.action}</span>
                                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                </span>
                              </button>
                            )}
                            {insight.additionalAction && (
                              <button className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5">
                                <span className="underline inline-flex items-center gap-0.5">
                                  <span>{insight.additionalAction}</span>
                                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Analysis by Asset Type */}
        <div className="bg-white rounded-sm border border-gray-200">
          {/* Sticky Tab Group */}
          <div className="sticky top-[0px] z-40 bg-white overflow-x-auto no-scrollbar shadow-sm border-b border-gray-200">
            <div className="flex">
              {['Stock', 'Unit Trust', 'Structured Product', 'Bond'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleAnalysisTabClick(tab)}
                  className={`flex-1 py-4 text-[12px] font-bold relative whitespace-nowrap transition-colors ${
                    activeAnalysisTab === tab ? 'text-[#da0011]' : 'text-[#767676]'
                  }`}
                >
                  {tab}
                  {activeAnalysisTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#da0011]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Content */}
          <div className="px-4 py-4">
            {/* Stock Section */}
            <div ref={stockRef} className="scroll-mt-[150px]">
              {/* Section Title */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-[#da0011]"></div>
                <h2 className="text-[16px] font-bold text-gray-900">Stock</h2>
              </div>
              
              <div className="space-y-3">
                {/* AI Summary */}
                <div className="bg-[#f0f8ff] p-2 rounded-sm">
                  <p className="text-[11px] text-gray-700 leading-snug">
                    Tech concentration <span className="font-bold">45%</span> exceeds threshold. YTD <span className="font-bold text-[#da0011]">+25.3%</span> but volatility elevated. Diversify into defensive sectors for risk balance.
                  </p>
                </div>

                {/* Sector Allocation Pie Chart */}
                <div className="pb-3 border-b border-gray-200">
                  <div className="bg-white rounded p-3">
                    <h4 className="text-[11px] font-semibold text-gray-700 mb-3">Sector Allocation</h4>
                    <div className="flex items-center gap-4">
                      {/* Pie Chart */}
                      <div className="flex-shrink-0">
                        <svg className="w-24 h-24" viewBox="0 0 100 100">
                          {/* Technology 45% */}
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#266076" strokeWidth="20" strokeDasharray="113 282" strokeDashoffset="0" transform="rotate(-90 50 50)"/>
                          {/* Finance 25% */}
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#4DA90F" strokeWidth="20" strokeDasharray="63 282" strokeDashoffset="-113" transform="rotate(-90 50 50)"/>
                          {/* Healthcare 18% */}
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#C03954" strokeWidth="20" strokeDasharray="45 282" strokeDashoffset="-176" transform="rotate(-90 50 50)"/>
                          {/* Others 12% */}
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#EC7046" strokeWidth="20" strokeDasharray="30 282" strokeDashoffset="-221" transform="rotate(-90 50 50)"/>
                        </svg>
                      </div>
                      {/* Legend */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#266076]"></div>
                            <span className="text-gray-700">Technology</span>
                          </div>
                          <span className="font-bold text-gray-900">45%</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#4DA90F]"></div>
                            <span className="text-gray-700">Finance</span>
                          </div>
                          <span className="font-bold text-gray-900">25%</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#C03954]"></div>
                            <span className="text-gray-700">Healthcare</span>
                          </div>
                          <span className="font-bold text-gray-900">18%</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#EC7046]"></div>
                            <span className="text-gray-700">Others</span>
                          </div>
                          <span className="font-bold text-gray-900">12%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#e8f4f8] via-[#fef5f4] to-[#f0f8fc] px-4 py-3 rounded-[20px] border border-[#d5e5ec] shadow-sm">
                  <div className="mb-3">
                    <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Suggestions</h4>
                    <div className="space-y-3">
                      {/* Suggestion 1 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>Tech concentration at 45% exceeds recommended 35% threshold; consider partial profit-taking </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>Rebalance Now</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Suggestion 2 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>Add defensive stocks in consumer staples or utilities to hedge against market correction </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>Explore Defensive Stocks</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Suggestion 3 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>NVIDIA's revenue surged 262% YOY last quarter, highlighting its dominance in AI chips. </span>
                          <button onClick={() => setShowStockDetail(true)} className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>View Price</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-[#d5e5ec]">
                    <button className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 rounded-sm border border-[#db0011] active:opacity-80 transition-opacity">
                      View Details
                    </button>
                    <button className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 rounded-sm active:opacity-80 transition-opacity">
                      Search Stock
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Unit Trust Section */}
            <div ref={unitTrustRef} className="scroll-mt-[150px] mt-8 pt-8 border-t-[6px] border-[#f4f5f6]">
              {/* Section Title */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-[#da0011]"></div>
                <h2 className="text-[16px] font-bold text-gray-900">Unit Trust</h2>
              </div>
              
              <div className="space-y-3">
                {/* AI Summary */}
                <div className="bg-[#f0f8ff] p-2 rounded-sm">
                  <p className="text-[11px] text-gray-700 leading-snug">
                    Strong performance <span className="font-bold text-[#da0011]">+18.5%</span> YoY, outperforming benchmark by <span className="font-bold text-[#da0011]">+3.2%</span>. Tech and healthcare exposure solid. Consider <span className="font-bold">+5%</span> Asia allocation.
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
                      {/* Suggestion 1 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>Consider rebalancing: Increase Asia ex-Japan exposure by 3-5% to capture emerging market growth </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>View Asia Funds</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Suggestion 2 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>BGF ENERGY showing recent underperformance; monitor for potential reallocation to renewable energy funds </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>Compare Alternatives</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Suggestion 3 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>Optimal timing to add defensive positions as market volatility indicators suggest caution ahead </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>Explore Defensive Funds</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-[#d5e5ec]">
                    <button 
                      onClick={onGoToUnitTrusts}
                      className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 rounded-sm border border-[#db0011] active:opacity-80 transition-opacity"
                    >
                      View Details
                    </button>
                    <button className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 rounded-sm active:opacity-80 transition-opacity">
                      Search Fund
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Structured Product Section */}
            <div ref={structuredProductRef} className="scroll-mt-[150px] mt-8 pt-8 border-t-[6px] border-[#f4f5f6]">
              {/* Section Title */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-[#da0011]"></div>
                <h2 className="text-[16px] font-bold text-gray-900">Structured Product</h2>
              </div>
              
              <div className="space-y-3">
                {/* AI Summary */}
                <div className="bg-[#f0f8ff] p-2 rounded-sm">
                  <p className="text-[11px] text-gray-700 leading-snug">
                    <span className="font-bold">85%</span> capital protection with avg return <span className="font-bold text-[#da0011]">+6.8%</span>. Two products maturing Q2 2025. Monitor barrier: <span className="font-bold">78%</span> (target <span className="font-bold">75%</span>).
                  </p>
                </div>

                {/* Product Status Table */}
                <div className="pb-3 border-b border-gray-200">
                  <div className="bg-white rounded p-3">
                    <h4 className="text-[11px] font-semibold text-gray-700 mb-3">Product Overview</h4>
                    <div className="space-y-2">
                      {/* Table Header */}
                      <div className="grid grid-cols-4 gap-2 pb-2 border-b border-gray-200">
                        <div className="text-[9px] font-semibold text-gray-600">Product</div>
                        <div className="text-[9px] font-semibold text-gray-600 text-right">Barrier</div>
                        <div className="text-[9px] font-semibold text-gray-600 text-right">Yield</div>
                        <div className="text-[9px] font-semibold text-gray-600 text-right">Maturity</div>
                      </div>
                      {/* Row 1 */}
                      <div className="grid grid-cols-4 gap-2 py-1.5">
                        <div className="text-[10px] text-gray-900">Tech Index Note</div>
                        <div className="text-[10px] text-right font-medium text-gray-900">78%</div>
                        <div className="text-[10px] text-right font-medium text-[#da0011]">+8.2%</div>
                        <div className="text-[10px] text-right text-gray-700">2025-06</div>
                      </div>
                      {/* Row 2 */}
                      <div className="grid grid-cols-4 gap-2 py-1.5 bg-gray-50">
                        <div className="text-[10px] text-gray-900">HSI Autocall</div>
                        <div className="text-[10px] text-right font-medium text-gray-900">92%</div>
                        <div className="text-[10px] text-right font-medium text-[#da0011]">+6.5%</div>
                        <div className="text-[10px] text-right text-gray-700">2025-04</div>
                      </div>
                      {/* Row 3 */}
                      <div className="grid grid-cols-4 gap-2 py-1.5">
                        <div className="text-[10px] text-gray-900">US Equity Note</div>
                        <div className="text-[10px] text-right font-medium text-gray-900">88%</div>
                        <div className="text-[10px] text-right font-medium text-[#da0011]">+7.1%</div>
                        <div className="text-[10px] text-right text-gray-700">2026-03</div>
                      </div>
                      {/* Row 4 */}
                      <div className="grid grid-cols-4 gap-2 py-1.5 bg-gray-50">
                        <div className="text-[10px] text-gray-900">Asia Bond Link</div>
                        <div className="text-[10px] text-right font-medium text-gray-900">95%</div>
                        <div className="text-[10px] text-right font-medium text-[#da0011]">+5.8%</div>
                        <div className="text-[10px] text-right text-gray-700">2025-12</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#e8f4f8] via-[#fef5f4] to-[#f0f8fc] px-4 py-3 rounded-[20px] border border-[#d5e5ec] shadow-sm">
                  <div className="mb-3">
                    <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Suggestions</h4>
                    <div className="space-y-3">
                      {/* Suggestion 1 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>Two products maturing in Q2 2025; consider reinvesting in higher-yield structures as rates stabilize </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>View New Issues</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Suggestion 2 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>Current market conditions favor autocallable notes on tech indices for enhanced returns </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>Explore Autocallables</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Suggestion 3 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>Monitor barrier levels closely; one product approaching 75% barrier threshold (currently at 78%) </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>Set Barrier Alert</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-[#d5e5ec]">
                    <button className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 rounded-sm border border-[#db0011] active:opacity-80 transition-opacity">
                      View Details
                    </button>
                    <button className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 rounded-sm active:opacity-80 transition-opacity">
                      Search Product
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bond Section */}
            <div ref={bondRef} className="scroll-mt-[150px] mt-8 pt-8 border-t-[6px] border-[#f4f5f6]">
              {/* Section Title */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-[#da0011]"></div>
                <h2 className="text-[16px] font-bold text-gray-900">Bond</h2>
              </div>
              
              <div className="space-y-3">
                {/* AI Summary */}
                <div className="bg-[#f0f8ff] p-2 rounded-sm">
                  <p className="text-[11px] text-gray-700 leading-snug">
                    Well-diversified allocation with avg yield <span className="font-bold text-[#da0011]">4.2%</span>. Consider laddering for rate flexibility. <span className="font-bold">15%</span> high-yield shows credit deterioration.
                  </p>
                </div>

                {/* Bond Portfolio Table */}
                <div className="pb-3 border-b border-gray-200">
                  <div className="bg-white rounded p-3">
                    <h4 className="text-[11px] font-semibold text-gray-700 mb-3">Holdings Breakdown</h4>
                    <div className="space-y-2">
                      {/* Table Header */}
                      <div className="grid grid-cols-4 gap-2 pb-2 border-b border-gray-200">
                        <div className="text-[9px] font-semibold text-gray-600">Category</div>
                        <div className="text-[9px] font-semibold text-gray-600 text-right">Allocation</div>
                        <div className="text-[9px] font-semibold text-gray-600 text-right">Yield</div>
                        <div className="text-[9px] font-semibold text-gray-600 text-right">Duration</div>
                      </div>
                      {/* Row 1 - Government */}
                      <div className="grid grid-cols-4 gap-2 py-1.5">
                        <div className="text-[10px] text-gray-900">Government</div>
                        <div className="text-[10px] text-right font-medium text-gray-900">45%</div>
                        <div className="text-[10px] text-right font-medium text-[#da0011]">3.8%</div>
                        <div className="text-[10px] text-right text-gray-700">6.2y</div>
                      </div>
                      {/* Row 2 - Corporate IG */}
                      <div className="grid grid-cols-4 gap-2 py-1.5 bg-gray-50">
                        <div className="text-[10px] text-gray-900">Corporate IG</div>
                        <div className="text-[10px] text-right font-medium text-gray-900">32%</div>
                        <div className="text-[10px] text-right font-medium text-[#da0011]">4.5%</div>
                        <div className="text-[10px] text-right text-gray-700">4.8y</div>
                      </div>
                      {/* Row 3 - High Yield */}
                      <div className="grid grid-cols-4 gap-2 py-1.5">
                        <div className="text-[10px] text-gray-900">High Yield</div>
                        <div className="text-[10px] text-right font-medium text-gray-900">15%</div>
                        <div className="text-[10px] text-right font-medium text-[#da0011]">6.2%</div>
                        <div className="text-[10px] text-right text-gray-700">3.5y</div>
                      </div>
                      {/* Row 4 - EM Bonds */}
                      <div className="grid grid-cols-4 gap-2 py-1.5 bg-gray-50">
                        <div className="text-[10px] text-gray-900">EM Bonds</div>
                        <div className="text-[10px] text-right font-medium text-gray-900">8%</div>
                        <div className="text-[10px] text-right font-medium text-[#da0011]">5.1%</div>
                        <div className="text-[10px] text-right text-gray-700">4.2y</div>
                      </div>
                      {/* Total Row */}
                      <div className="grid grid-cols-4 gap-2 py-1.5 border-t-2 border-gray-300 mt-1">
                        <div className="text-[10px] font-bold text-gray-900">Total</div>
                        <div className="text-[10px] text-right font-bold text-gray-900">100%</div>
                        <div className="text-[10px] text-right font-bold text-[#da0011]">4.2%</div>
                        <div className="text-[10px] text-right font-bold text-gray-900">5.3y</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#e8f4f8] via-[#fef5f4] to-[#f0f8fc] px-4 py-3 rounded-[20px] border border-[#d5e5ec] shadow-sm">
                  <div className="mb-3">
                    <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Suggestions</h4>
                    <div className="space-y-3">
                      {/* Suggestion 1 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>Consider ladder strategy: Stagger maturities to balance reinvestment risk as rates may fluctuate </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>Build Ladder</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Suggestion 2 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>Increase Asia corporate bond exposure by 5-7% to capture higher yields with manageable credit risk </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>View Asia Bonds</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Suggestion 3 */}
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <div className="text-gray-700">
                          <span>Review high-yield positions: Two issuers showing credit deterioration, suggest reallocation to IG bonds </span>
                          <button className="inline text-[10px] text-[#db0011] font-semibold underline active:opacity-70 inline-flex items-center gap-0.5">
                            <span>Review Credit Risk</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-[#d5e5ec]">
                    <button className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 rounded-sm border border-[#db0011] active:opacity-80 transition-opacity">
                      View Details
                    </button>
                    <button className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 rounded-sm active:opacity-80 transition-opacity">
                      Search Bond
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating AI Button */}
      <FloatingAIButton onClick={() => setShowAIAssistant(true)} />
      
      {/* AI Assistant Modal */}
      <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />
      
      {/* Stock Detail Overlay */}
      {showStockDetail && (
        <div className="absolute inset-0 z-50 bg-white">
          <StockDetailPage onBack={() => setShowStockDetail(false)} />
        </div>
      )}
    </div>
  );
};

export default PortfolioOverviewPage;
