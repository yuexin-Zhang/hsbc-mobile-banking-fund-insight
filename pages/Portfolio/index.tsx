
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMobileDetect } from '../../hooks/useMobileDetect';
import FloatingAIButton from '../../components/FloatingAIButton';
import AIAssistant from '../../components/AIAssistant';
import RiskProfileQuestionnaire from '../../components/RiskProfileQuestionnaire';
import RMContactPage from '../../components/RMContactPage';
import StockDetailPage from './sections/Analysis/Stock/Detail';
import PortfolioStatusBar from './sections/StatusBar';
import PortfolioMarketValueSection from './sections/MarketValue';
import AIInsightsCarousel from './sections/AIInsights';
import StockAnalysisSection from './sections/Analysis/Stock';
import UnitTrustAnalysisSection from './sections/Analysis/UnitTrust';
import BondAnalysisSection from './sections/Analysis/Bond';
import StructuredProductAnalysisSection from './sections/Analysis/StructuredProduct';
import PortfolioOverviewAnalysis from './sections/Overview';
import AlertsModal from './modals/AlertsModal';

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [activeAnalysisTab, setActiveAnalysisTab] = useState('Stock');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showStockDetail, setShowStockDetail] = useState(false);
  const [isRiskProfileOpen, setIsRiskProfileOpen] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(true);
  const [showRMContact, setShowRMContact] = useState(false);
  const isMobile = useMobileDetect();
  
  const unitTrustRef = useRef<HTMLDivElement>(null);
  const stockRef = useRef<HTMLDivElement>(null);
  const structuredProductRef = useRef<HTMLDivElement>(null);
  const bondRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingFromClick = useRef(false);

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

  const handleAnalysisTabClick = (tab: string) => {
    setActiveAnalysisTab(tab);
    isScrollingFromClick.current = true;
    
    let targetRef: React.RefObject<HTMLDivElement> | null = null;
    
    switch (tab) {
      case 'Unit Trust': targetRef = unitTrustRef; break;
      case 'Stock': targetRef = stockRef; break;
      case 'Structured Product': targetRef = structuredProductRef; break;
      case 'Bond': targetRef = bondRef; break;
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

  const handleBellClick = () => {
    setShowAlerts(true);
    setHasUnreadAlerts(false);
  };

  return (
    <>
      <style>{`
        @keyframes bellShake {
          0%, 100% { transform: rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
          20%, 40%, 60%, 80% { transform: rotate(10deg); }
        }
        .bell-shake { animation: bellShake 1s ease-in-out infinite; }
      `}</style>
      <div className="flex flex-col h-full bg-[#f4f5f6] font-sans relative">
        <PortfolioStatusBar currentTime={currentTime} isMobile={isMobile} />

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
              <h1 className="text-[17px] font-semibold text-gray-900 whitespace-nowrap">AI Portfolio Review</h1>
            </div>
            
            <button
              onClick={handleBellClick}
              className="relative w-9 h-9 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <svg 
                className={`w-5 h-5 ${hasUnreadAlerts ? 'text-[#FFA500] bell-shake' : 'text-gray-600'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
              {hasUnreadAlerts && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-[#da0011] rounded-full" />
              )}
            </button>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar">
          <PortfolioMarketValueSection />
          <AIInsightsCarousel onRiskProfileOpen={() => setIsRiskProfileOpen(true)} isPaused={showAlerts} />
          <PortfolioOverviewAnalysis />

          <div className="bg-white rounded-sm border border-gray-200">
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

            <div className="px-4 py-4">
              <StockAnalysisSection 
                sectionRef={stockRef} 
                onShowStockDetail={() => setShowStockDetail(true)} 
              />
              <UnitTrustAnalysisSection sectionRef={unitTrustRef} />
              <BondAnalysisSection sectionRef={bondRef} />
              <StructuredProductAnalysisSection sectionRef={structuredProductRef} />
            </div>
          </div>
        </div>
        
        <FloatingAIButton onClick={() => setShowAIAssistant(true)} />
        
        <AIAssistant 
          isOpen={showAIAssistant} 
          onClose={() => setShowAIAssistant(false)}
          mode="analysis"
        />
        
        {showStockDetail && (
          <div className="absolute inset-0 z-50 bg-white">
            <StockDetailPage onBack={() => setShowStockDetail(false)} />
          </div>
        )}

        <RiskProfileQuestionnaire
          isOpen={isRiskProfileOpen}
          onClose={() => setIsRiskProfileOpen(false)}
        />

        <AlertsModal
          isOpen={showAlerts}
          onClose={() => setShowAlerts(false)}
          onContactRM={() => {
            setShowAlerts(false);
            setShowRMContact(true);
          }}
        />

        {showRMContact && (
          <RMContactPage onBack={() => setShowRMContact(false)} />
        )}
      </div>
    </>
  );
};

export default PortfolioPage;
