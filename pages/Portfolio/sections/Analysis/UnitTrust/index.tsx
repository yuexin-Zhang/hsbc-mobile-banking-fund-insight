import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeader, AISummary, AISuggestionsCard } from '../../../components';
import HoldingsPerformanceChart from '../../../charts/HoldingsPerformanceChart';
import { chartData, chartColors } from '../../../data';

interface UnitTrustAnalysisSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const UnitTrustAnalysisSection: React.FC<UnitTrustAnalysisSectionProps> = ({ sectionRef }) => {
  const navigate = useNavigate();

  const suggestions = [
    {
      icon: 'bell' as const,
      text: 'Consider rebalancing: Increase Asia ex-Japan exposure by 3-5% to capture emerging market growth ',
      action: { label: 'View Asia Funds' }
    },
    {
      icon: 'bell' as const,
      text: 'BGF ENERGY showing recent underperformance; monitor for potential reallocation to renewable energy funds ',
      action: { label: 'Compare Alternatives' }
    },
    {
      text: 'Optimal timing to add defensive positions as market volatility indicators suggest caution ahead ',
      action: { label: 'Explore Defensive Funds' }
    }
  ];

  return (
    <div ref={sectionRef} className="scroll-mt-[150px] mt-8 pt-8 border-t-[6px] border-[#f4f5f6]" data-section="unit-trust">
      <SectionHeader title="Unit Trust" />
      
      <div className="space-y-3">
        <AISummary>
          Strong performance <span className="text-[#da0011]">+18.5%</span> YoY, outperforming benchmark by <span className="text-[#da0011]">+3.2%</span>. Tech and healthcare exposure solid. Consider +5% Asia allocation.
        </AISummary>

        <div className="pb-3 border-b border-gray-200">
          <HoldingsPerformanceChart chartData={chartData} colors={chartColors} />
        </div>

        <AISuggestionsCard 
          suggestions={suggestions}
          secondaryAction={{ label: 'View Details', onClick: () => navigate('/fund') }}
          primaryAction={{ label: 'Search Fund' }}
        />
      </div>
    </div>
  );
};

export default UnitTrustAnalysisSection;
