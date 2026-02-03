
import React, { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import WealthHeader from './components/WealthHeader';
import NavGrid from './components/NavGrid';
import ContactSection from './components/ContactSection';
import PromoBanner from './components/PromoBanner';
import BottomNav from './components/BottomNav';
import FundInsightOverview from './components/FundInsightOverview';
import PortfolioSimulation from './components/PortfolioSimulation';
import MyHoldings from './components/MyHoldings';
import WealthOverview from './components/WealthOverview';
import PortfolioOverviewPage from './components/PortfolioOverviewPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'overview' | 'details' | 'simulation' | 'holdings' | 'wealthOverview' | 'portfolioOverview'>('wealthOverview');
  const [isAIGenerated, setIsAIGenerated] = useState(false);

  const navigateToOverview = () => setCurrentPage('overview');
  const navigateToDetails = () => setCurrentPage('details');
  const navigateToSimulation = () => setCurrentPage('simulation');
  const navigateToHoldings = () => setCurrentPage('holdings');
  const navigateToHome = () => setCurrentPage('home');
  const navigateToWealthOverview = () => setCurrentPage('wealthOverview');
  const navigateToPortfolioOverview = () => {
    console.log('Navigating to Portfolio Overview');
    setCurrentPage('portfolioOverview');
  };

  return (
    <div className="flex justify-center items-center w-full">
      <PhoneFrame>
        {currentPage === 'home' && (
          <div className="flex flex-col h-full bg-[#f5f5f5] overflow-y-auto no-scrollbar">
            <WealthHeader onWealthAssetsClick={navigateToWealthOverview} />
            <NavGrid onInsightClick={navigateToOverview} />
            <div className="px-4 py-4 space-y-4">
              <ContactSection />
              <PromoBanner />
            </div>
            <div className="h-24 shrink-0" />
            <BottomNav />
          </div>
        )}
        
        {currentPage === 'overview' && (
          <FundInsightOverview 
            onBack={navigateToPortfolioOverview} 
            onGoToDetails={navigateToDetails} 
            onGoToSimulation={navigateToSimulation}
            isAIGenerated={isAIGenerated}
            onToggleAIMode={setIsAIGenerated}
          />
        )}

        {currentPage === 'simulation' && (
          <PortfolioSimulation 
            onBack={navigateToOverview} 
          />
        )}

        {currentPage === 'holdings' && (
          <MyHoldings 
            onBack={navigateToHome}
            onGoToFundInsight={navigateToOverview}
          />
        )}

        {currentPage === 'wealthOverview' && (
          <WealthOverview 
            onBack={navigateToHome}
            onGoToPortfolioOverview={navigateToPortfolioOverview}
          />
        )}

        {currentPage === 'portfolioOverview' && (
          <PortfolioOverviewPage 
            onBack={navigateToWealthOverview}
            onGoToUnitTrusts={navigateToOverview}
          />
        )}
      </PhoneFrame>
    </div>
  );
};

export default App;
