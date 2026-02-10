import React, { useState, useEffect } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import MarketValueSection from '../../components/shared/MarketValueSection';
import AIPortfolioReview from './AIPortfolioReview';
import ActionButtons from '../../components/shared/ActionButtons';
import HoldingsOverviewSection from './HoldingsOverviewSection';
import InsightsSection from './InsightsSection';
import AIAssistant from '../../components/AIAssistant';
import RiskProfileQuestionnaire from '../../components/RiskProfileQuestionnaire';

const HomePage: React.FC = () => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isRiskProfileOpen, setIsRiskProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'insights'>('overview');

  const handleScrollToInsights = () => {
    setActiveTab('insights');
    setTimeout(() => {
      const insightsSection = document.querySelector('[data-insights-section]');
      if (insightsSection) {
        insightsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <PageLayout>
      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <MarketValueSection />
        
        <AIPortfolioReview 
          onOpenRiskProfile={() => setIsRiskProfileOpen(true)}
          onScrollToInsights={handleScrollToInsights}
        />

        <ActionButtons />

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

        {/* Tab Content */}
        {activeTab === 'overview' && <HoldingsOverviewSection />}
        {activeTab === 'insights' && <InsightsSection />}
      </div>

      {/* HSBC Lion AI Button */}
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
    </PageLayout>
  );
};

export default HomePage;
