import React, { useState } from 'react';
import { SectionHeader } from '../../components';
import { AssetAllocation } from './AssetAllocation';
import { PerformanceMetrics } from './PerformanceMetrics';
import { HoldingsConcentration } from './HoldingsConcentration';
import RMContactPage from '../../../../components/RMContactPage';

const PortfolioOverviewAnalysis: React.FC = () => {
  const [showRMContact, setShowRMContact] = useState(false);

  return (
    <div className="bg-[#f4f5f6] px-2 py-3 space-y-3">
      <SectionHeader 
        title="Portfolio Overview Analysis" 
        icon={
          <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      />
      
      <AssetAllocation />
      <PerformanceMetrics onContactRM={() => setShowRMContact(true)} />
      <HoldingsConcentration />

      {showRMContact && (
        <RMContactPage onBack={() => setShowRMContact(false)} />
      )}
    </div>
  );
};

export default PortfolioOverviewAnalysis;
