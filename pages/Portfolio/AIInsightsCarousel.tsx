import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface AIInsightsCarouselProps {
  onRiskProfileOpen: () => void;
  isPaused?: boolean;
}

const AIInsightsCarousel: React.FC<AIInsightsCarouselProps> = ({ onRiskProfileOpen, isPaused = false }) => {
  const navigate = useNavigate();
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

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
          Your portfolio is <span className="font-bold">outperforming the market by 8.3%</span> this month. <br></br>The <span className="font-bold">HSBC Global Equity Fund</span> led gains with a <span className="font-bold">12.5% return</span>, contributing <span className="font-bold">HKD 145,000</span> in unrealized gains.
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
          The <span className="font-bold">HSBC Global Equity Fund</span> experienced a <span className="font-bold">5% decline</span> yesterday, reducing portfolio value by <span className="font-bold">HKD 77,271</span>. <br></br>Our AI analysis suggests recovery expected in <span className="font-bold">Q2 2026</span>.
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

  // Auto-carousel for AI Portfolio Intelligence
  useEffect(() => {
    if (isPaused || isTransitioning || isHovered) return;
    
    const carouselInterval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 1000);
    
    return () => clearInterval(carouselInterval);
  }, [isPaused, isTransitioning, isHovered, insights.length]);

  // Handle wheel event with passive: false to prevent default scroll
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning) return;
      
      setIsTransitioning(true);
      
      if (e.deltaY > 0) {
        setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
      } else if (e.deltaY < 0) {
        setCurrentInsightIndex((prev) => (prev - 1 + insights.length) % insights.length);
      }
      
      setTimeout(() => setIsTransitioning(false), 500);
    };

    carouselElement.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      carouselElement.removeEventListener('wheel', handleWheel);
    };
  }, [isTransitioning, insights.length]);

  return (
    <div className="bg-[#f4f5f6] px-2 py-2 pb-3 relative">
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
          
          {/* Portfolio Intelligence with background and shimmer effect */}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 flex items-center rounded-r-full relative overflow-hidden shadow-[0_0_12px_rgba(168,85,247,0.4)]">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] w-[200%]"></span>
            <span className="relative">Portfolio Intelligence</span>
          </span>
        </h3>
      </div>

      {/* AI Portfolio Intelligence - Mobile-style Carousel */}
      <div 
        ref={carouselRef}
        className="relative overflow-hidden"
        style={{ 
          perspective: '1000px',
          touchAction: 'pan-y',
          minHeight: '180px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
                          <button 
                            onClick={() => {
                              if (insight.action === 'Update now') {
                                onRiskProfileOpen();
                              }
                            }}
                            className={`text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 cursor-pointer ${insight.action === 'Update now' ? 'relative' : ''}`}
                          >
                            <span className="underline inline-flex items-center gap-0.5">
                              <span>{insight.action}</span>
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </button>
                        )}
                        {insight.additionalAction && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (insight.additionalAction === 'CIO House View') {
                                navigate('/home');
                                setTimeout(() => {
                                  const insightsSection = document.querySelector('[data-insights-section]');
                                  if (insightsSection) {
                                    insightsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }
                                }, 300);
                              }
                            }}
                            className="text-[11px] text-[#da0011] font-semibold inline-flex items-center gap-0.5 relative cursor-pointer"
                          >
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
      
      {/* Navigation Controls - Below the carousel */}
      <div className="flex items-center justify-between px-1 pt-1">
        {/* Left Arrow */}
        <button
          onClick={() => {
            if (!isTransitioning) {
              setIsTransitioning(true);
              setCurrentInsightIndex((prev) => (prev - 1 + insights.length) % insights.length);
              setTimeout(() => setIsTransitioning(false), 500);
            }
          }}
          className="p-1 transition-colors cursor-pointer"
          disabled={isTransitioning}
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5">
          {insights.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning && index !== currentInsightIndex) {
                  setIsTransitioning(true);
                  setCurrentInsightIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                index === currentInsightIndex 
                  ? 'w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_6px_rgba(168,85,247,0.6)]' 
                  : 'w-1.5 h-1.5 bg-gray-400'
              }`}
              disabled={isTransitioning}
            />
          ))}
        </div>
        
        {/* Right Arrow */}
        <button
          onClick={() => {
            if (!isTransitioning) {
              setIsTransitioning(true);
              setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
              setTimeout(() => setIsTransitioning(false), 500);
            }
          }}
          className="p-1 transition-colors cursor-pointer"
          disabled={isTransitioning}
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIInsightsCarousel;
