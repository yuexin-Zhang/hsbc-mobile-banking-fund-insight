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

      {/* AI Chat Button */}
      <button
        onClick={() => setIsAIAssistantOpen(true)}
        className="absolute bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg flex items-center justify-center hover:shadow-xl transition-transform ease-out duration-200 will-change-transform hover:scale-110 z-50 cursor-pointer"
        aria-label="Open AI Assistant"
      >
        {/* Female Avatar */}
        <svg className="w-11 h-11" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffe8d6"/>
              <stop offset="100%" stopColor="#ffd4ba"/>
            </linearGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a3728"/>
              <stop offset="100%" stopColor="#2d1f14"/>
            </linearGradient>
          </defs>
          
          {/* Hair back */}
          <ellipse cx="50" cy="48" rx="26" ry="24" fill="url(#hairGrad)"/>
          
          {/* Neck */}
          <rect x="44" y="62" width="12" height="10" rx="2" fill="#f5c9a8"/>
          
          {/* Face */}
          <ellipse cx="50" cy="46" rx="17" ry="19" fill="url(#skinGrad)"/>
          
          {/* Hair front */}
          <path d="M32 44 C32 26 40 18 50 18 C60 18 68 26 68 44 C68 34 62 28 50 28 C38 28 32 34 32 44" fill="url(#hairGrad)"/>
          
          {/* Bangs */}
          <path d="M35 32 Q50 28 65 32 Q60 38 50 36 Q40 38 35 32" fill="#3d2b1f"/>
          
          {/* Eyes */}
          <ellipse cx="44" cy="46" rx="2.5" ry="3" fill="#1a1a1a"/>
          <ellipse cx="56" cy="46" rx="2.5" ry="3" fill="#1a1a1a"/>
          
          {/* Smile */}
          <path d="M46 54 Q50 57 54 54" stroke="#d4a574" stroke-width="1.5" stroke-linecap="round" fill="none"/>
          
          {/* Blush */}
          <ellipse cx="40" cy="52" rx="3" ry="2" fill="#ffb5a0" opacity="0.6"/>
          <ellipse cx="60" cy="52" rx="3" ry="2" fill="#ffb5a0" opacity="0.6"/>
          
          {/* Clothing - white/light color for contrast */}
          <path d="M32 76 Q32 66 42 64 L50 72 L58 64 Q68 66 68 76 Q68 82 50 82 Q32 82 32 76" fill="white"/>
        </svg>
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
