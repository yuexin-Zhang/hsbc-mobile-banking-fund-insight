
import React, { useState, useEffect, useRef } from 'react';
import FloatingAIButton from './FloatingAIButton';

interface PortfolioOverviewPageProps {
  onBack: () => void;
  onGoToUnitTrusts: () => void;
}

const PortfolioOverviewPage: React.FC<PortfolioOverviewPageProps> = ({ onBack, onGoToUnitTrusts }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState('Unit Trust');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs for analysis sections
  const unitTrustRef = useRef<HTMLDivElement>(null);
  const stockRef = useRef<HTMLDivElement>(null);
  const structuredProductRef = useRef<HTMLDivElement>(null);
  const bondRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingFromClick = useRef(false);
  
  // Ref for carousel
  const carouselRef = useRef<HTMLDivElement>(null);

  // AI Insights data
  const insights = [
    {
      icon: (
        <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Performance Attribution',
      description: '90% of your gains came from Unit Trust holdings. Tech sector rally contributed HKD 120K to net value, driven by strong YTD +18.5% returns.'
    },
    {
      icon: (
        <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: 'Stress Test Scenario',
      description: 'If rates rise 50bps, your 28% stock concentration faces simulated -3.8% drawdown. Bond allocation provides cushion with stable 4.2% yield.'
    },
    {
      icon: (
        <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Tactical Profit-Locking',
      description: 'With +18.5% gains in Unit Trust, AI recommends locking profits. Shifting 5% to Bond (41%) protects gains, aligns with HSBC House View.'
    },
    {
      icon: (
        <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: 'Style Drift Alert',
      description: 'AI detected style rotation in growth funds towards value stocks. Creates 15% overlap with bond holdings, potentially diluting growth target.'
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
    <div className="flex flex-col h-full bg-[#f4f5f6] font-sans">
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
            <span className="text-[32px] font-bold text-gray-900">632,546</span>
            <span className="text-[20px] text-gray-600">.65</span>
            <span className="text-[14px] text-gray-600 ml-2">HKD</span>
          </div>
          
          {/* Yesterday's Return Label */}
          <div className="mb-1">
            <span className="text-[11px] text-[#767676]">Yesterday's Return</span>
          </div>
          
          {/* Yesterday's Returns Row */}
          <div className="flex items-start gap-3 text-[12px]">
            <div className="flex flex-col gap-0.5 pr-3 border-r border-[#e5e5e5]">
              <span className="text-[#767676] whitespace-nowrap text-[11px]">Unit Trust</span>
              <span className="text-[#da0011] font-bold">+0.32%</span>
            </div>
            <div className="flex flex-col gap-0.5 pr-3 border-r border-[#e5e5e5]">
              <span className="text-[#767676] whitespace-nowrap text-[11px]">Stock</span>
              <span className="text-[#5cb85c] font-bold">-0.18%</span>
            </div>
            <div className="flex flex-col gap-0.5 pr-3 border-r border-[#e5e5e5]">
              <span className="text-[#767676] whitespace-nowrap text-[11px]">Structured Product</span>
              <span className="text-[#da0011] font-bold">+0.05%</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#767676] whitespace-nowrap text-[11px]">Bond</span>
              <span className="text-[#5cb85c] font-bold">-0.12%</span>
            </div>
          </div>
        </div>

        {/* AI Insights Section - Horizontal Scroll */}
        <div className="bg-[#f4f5f6] px-2 py-2 relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[14px] font-semibold text-gray-900">AI Deep Dive Insights</span>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-[11px] text-gray-500">{currentInsightIndex + 1}/{insights.length}</span>
            </div>
          </div>

          {/* AI Deep Dive Insights - Mobile-style Carousel */}
          <div 
            className="relative overflow-hidden"
            style={{ 
              perspective: '1000px',
              touchAction: 'pan-y',
            }}
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
            <div className="relative min-h-[140px]">
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
                          <div className="text-[11px] text-gray-600 leading-relaxed">
                            {insight.description}
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
              {['Unit Trust', 'Stock', 'Structured Product', 'Bond'].map((tab) => (
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
            {/* Unit Trust Section */}
            <div ref={unitTrustRef} className="scroll-mt-[150px]">
              {/* Section Title */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#da0011]"></div>
                  <h2 className="text-[16px] font-bold text-gray-900">Unit Trust</h2>
                </div>
                <button 
                  onClick={onGoToUnitTrusts}
                  className="flex items-center gap-0.5 text-[10px] text-white bg-[#da0011] px-2 py-1 active:opacity-80 transition-opacity rounded-l-full rounded-r-full"
                >
                  <span>Details</span>
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
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
                  <div className="bg-white rounded p-3">
                    <h4 className="text-[11px] font-semibold text-gray-700 mb-3">12-Month Performance Trend</h4>
                    <div className="relative h-32">
                      <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="25" x2="300" y2="25" stroke="#e5e7eb" strokeWidth="0.5"/>
                        <line x1="0" y1="50" x2="300" y2="50" stroke="#e5e7eb" strokeWidth="0.5"/>
                        <line x1="0" y1="75" x2="300" y2="75" stroke="#e5e7eb" strokeWidth="0.5"/>
                        {/* Benchmark line */}
                        <polyline
                          points="0,85 25,82 50,80 75,78 100,75 125,73 150,70 175,68 200,65 225,63 250,60 275,58 300,55"
                          fill="none"
                          stroke="#94a3b8"
                          strokeWidth="1.5"
                          strokeDasharray="3,3"
                        />
                        {/* Portfolio line */}
                        <polyline
                          points="0,90 25,88 50,84 75,80 100,75 125,70 150,65 175,58 200,52 225,48 250,42 275,38 300,32"
                          fill="none"
                          stroke="#db0011"
                          strokeWidth="2"
                        />
                        {/* End point */}
                        <circle cx="300" cy="32" r="3" fill="#db0011"/>
                      </svg>
                      <div className="absolute top-0 right-0 flex gap-3 text-[9px]">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-0.5 bg-[#db0011]"></div>
                          <span className="text-gray-600">Portfolio +18.5%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-0.5 bg-[#94a3b8] border-dashed"></div>
                          <span className="text-gray-600">Benchmark +15.3%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-white border border-gray-300 rounded p-4">
                  <div className="mb-3">
                    <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Recommendations</h4>
                    <ul className="space-y-2 text-[11px] text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>Consider rebalancing: Increase Asia ex-Japan exposure by 3-5% to capture emerging market growth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>BGF ENERGY showing recent underperformance; monitor for potential reallocation to renewable energy funds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>Optimal timing to add defensive positions as market volatility indicators suggest caution ahead</span>
                      </li>
                    </ul>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-300">
                    <button className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 rounded-sm active:opacity-80 transition-opacity">
                      Rebalance Portfolio
                    </button>
                    <button className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 rounded-sm border border-[#db0011] active:opacity-80 transition-opacity">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Section */}
            <div ref={stockRef} className="scroll-mt-[150px] mt-8 pt-8 border-t-[6px] border-[#f4f5f6]">
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

                <div className="bg-white border border-gray-300 rounded p-4">
                  <div className="mb-3">
                    <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Recommendations</h4>
                    <ul className="space-y-2 text-[11px] text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>Tech concentration at 45% exceeds recommended 35% threshold; consider partial profit-taking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>Add defensive stocks in consumer staples or utilities to hedge against market correction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>NVIDIA valuation stretched; set stop-loss at 12% below current price to protect gains</span>
                      </li>
                    </ul>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-300">
                    <button className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 rounded-sm active:opacity-80 transition-opacity">
                      Adjust Holdings
                    </button>
                    <button className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 rounded-sm border border-[#db0011] active:opacity-80 transition-opacity">
                      Set Alert
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

                <div className="bg-white border border-gray-300 rounded p-4">
                  <div className="mb-3">
                    <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Recommendations</h4>
                    <ul className="space-y-2 text-[11px] text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>Two products maturing in Q2 2025; consider reinvesting in higher-yield structures as rates stabilize</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>Current market conditions favor autocallable notes on tech indices for enhanced returns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>Monitor barrier levels closely; one product approaching 75% barrier threshold (currently at 78%)</span>
                      </li>
                    </ul>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-300">
                    <button className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 rounded-sm active:opacity-80 transition-opacity">
                      Explore Products
                    </button>
                    <button className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 rounded-sm border border-[#db0011] active:opacity-80 transition-opacity">
                      Monitor Status
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

                <div className="bg-white border border-gray-300 rounded p-4">
                  <div className="mb-3">
                    <h4 className="text-[13px] font-bold text-gray-900 mb-2">AI Recommendations</h4>
                    <ul className="space-y-2 text-[11px] text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>Consider ladder strategy: Stagger maturities to balance reinvestment risk as rates may fluctuate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>Increase Asia corporate bond exposure by 5-7% to capture higher yields with manageable credit risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#db0011] font-bold mt-0.5">•</span>
                        <span>Review high-yield positions: Two issuers showing credit deterioration, suggest reallocation to IG bonds</span>
                      </li>
                    </ul>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-300">
                    <button className="flex-1 bg-[#db0011] text-white text-[11px] font-semibold py-2 px-3 rounded-sm active:opacity-80 transition-opacity">
                      Optimize Portfolio
                    </button>
                    <button className="flex-1 bg-white text-[#db0011] text-[11px] font-semibold py-2 px-3 rounded-sm border border-[#db0011] active:opacity-80 transition-opacity">
                      Review Holdings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating AI Button */}
      <FloatingAIButton />
    </div>
  );
};

export default PortfolioOverviewPage;
