
import React, { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import WealthHeader from './components/WealthHeader';
import NavGrid from './components/NavGrid';
import ContactSection from './components/ContactSection';
import PromoBanner from './components/PromoBanner';
import BottomNav from './components/BottomNav';
import FundInsightOverview from './components/FundInsightOverview';
import FundInsightDetails from './components/FundInsightDetails';
import PortfolioSimulation from './components/PortfolioSimulation';
import MyHoldings from './components/MyHoldings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'overview' | 'details' | 'simulation' | 'holdings'>('home');

  const navigateToOverview = () => setCurrentPage('overview');
  const navigateToDetails = () => setCurrentPage('details');
  const navigateToSimulation = () => setCurrentPage('simulation');
  const navigateToHoldings = () => setCurrentPage('holdings');
  const navigateToHome = () => setCurrentPage('home');

  return (
    <div className="flex justify-center items-center w-full">
      <PhoneFrame>
        {currentPage === 'home' && (
          <div className="flex flex-col h-full bg-[#F5F5F5] overflow-y-auto no-scrollbar">
            <WealthHeader onWealthAssetsClick={navigateToHoldings} />
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
            onBack={navigateToHome} 
            onGoToDetails={navigateToDetails} 
            onGoToSimulation={navigateToSimulation}
          />
        )}

        {currentPage === 'details' && (
          <FundInsightDetails 
            onBack={navigateToOverview} 
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
      </PhoneFrame>
    </div>
  );
};

export default App;
