
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMobileDetect } from '../../hooks/useMobileDetect';
import FloatingAIButton from '../../components/FloatingAIButton';
import AIAssistant from '../../components/AIAssistant';
import RiskProfileQuestionnaire from '../../components/RiskProfileQuestionnaire';
import StockDetailPage from './StockDetailPage';
import PortfolioStatusBar from './PortfolioStatusBar';
import PortfolioMarketValueSection from './PortfolioMarketValueSection';
import AIInsightsCarousel from './AIInsightsCarousel';
import StockAnalysisSection from './StockAnalysisSection';
import UnitTrustAnalysisSection from './UnitTrustAnalysisSection';
import BondAnalysisSection from './BondAnalysisSection';
import StructuredProductAnalysisSection from './StructuredProductAnalysisSection';

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [activeAnalysisTab, setActiveAnalysisTab] = useState('Stock');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showStockDetail, setShowStockDetail] = useState(false);
  const [isRiskProfileOpen, setIsRiskProfileOpen] = useState(false);
  const isMobile = useMobileDetect();
  
  // Refs for analysis sections
  const unitTrustRef = useRef<HTMLDivElement>(null);
  const stockRef = useRef<HTMLDivElement>(null);
  const structuredProductRef = useRef<HTMLDivElement>(null);
  const bondRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingFromClick = useRef(false);

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
        { ref: stockRef, name: 'Stock' },
        { ref: unitTrustRef, name: 'Unit Trust' },
        { ref: bondRef, name: 'Bond' },
        { ref: structuredProductRef, name: 'Structured Product' }
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
    <>
      <style>{`

      `}</style>
    <div className="flex flex-col h-full bg-[#f4f5f6] font-sans relative">
      {/* Mobile Status Bar */}
      <PortfolioStatusBar currentTime={currentTime} isMobile={isMobile} />

      {/* Header */}
      <div className={`bg-white py-2 px-3 border-b border-gray-200 sticky z-50 ${isMobile ? 'top-0' : 'top-[30px]'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/home')} 
              className="w-7 h-7 -ml-2 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-[17px] font-semibold text-gray-900 whitespace-nowrap">
              AI Portfolio Review
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar">
        {/* Total Market Value Section */}
        <PortfolioMarketValueSection />

        {/* AI Insights Section */}
        <AIInsightsCarousel onRiskProfileOpen={() => setIsRiskProfileOpen(true)} />

        {/* AI Analysis by Asset Type */}
        <div className="bg-white rounded-sm border border-gray-200">
          {/* Sticky Tab Group */}
          <div className="sticky top-[0px] z-40 bg-white overflow-x-auto no-scrollbar shadow-sm border-b border-gray-200">
            <div className="flex">
              {['Stock', 'Unit Trust', 'Bond', 'Structured Product'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleAnalysisTabClick(tab)}
                  className={`flex-1 py-4 text-[12px] font-bold relative whitespace-nowrap transition-colors cursor-pointer ${
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
            <StockAnalysisSection 
              sectionRef={stockRef} 
              onShowStockDetail={() => setShowStockDetail(true)} 
            />

            {/* Unit Trust Section */}
            <UnitTrustAnalysisSection sectionRef={unitTrustRef} />

            {/* Bond Section */}
            <BondAnalysisSection sectionRef={bondRef} />

            {/* Structured Product Section */}
            <StructuredProductAnalysisSection sectionRef={structuredProductRef} />
          </div>
        </div>
      </div>
      
      {/* Floating AI Button */}
      <FloatingAIButton onClick={() => setShowAIAssistant(true)} />
      
      {/* AI Assistant Modal */}
      <AIAssistant 
        isOpen={showAIAssistant} 
        onClose={() => setShowAIAssistant(false)}
        mode="analysis"
      />
      
      {/* Stock Detail Overlay */}
      {showStockDetail && (
        <div className="absolute inset-0 z-50 bg-white">
          <StockDetailPage onBack={() => setShowStockDetail(false)} />
        </div>
      )}

      {/* Risk Profile Questionnaire */}
      <RiskProfileQuestionnaire
        isOpen={isRiskProfileOpen}
        onClose={() => setIsRiskProfileOpen(false)}
      />
    </div>
    </>
  );
};

export default PortfolioPage;
