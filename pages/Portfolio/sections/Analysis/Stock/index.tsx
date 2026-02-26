import React from 'react';
import { SectionHeader, AISummary, AISuggestionsCard, MoversCarousel } from '../../../components';
import { risers, fallers } from '../../../data';

interface StockAnalysisSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
  onShowStockDetail: () => void;
}

const StockAnalysisSection: React.FC<StockAnalysisSectionProps> = ({ sectionRef, onShowStockDetail }) => {
  const suggestions = [
    {
      icon: 'bell' as const,
      text: 'Tech concentration at 45% exceeds recommended 35% threshold; consider partial profit-taking ',
      action: { label: 'Rebalance Now' }
    },
    {
      text: 'Add defensive stocks in consumer staples or utilities to hedge against market correction ',
      action: { label: 'Explore Defensive Stocks' }
    },
    {
      text: "NVIDIA's revenue surged 262% YOY last quarter, highlighting its dominance in AI chips. ",
      action: { label: 'View Price', onClick: onShowStockDetail }
    }
  ];

  return (
    <div ref={sectionRef} className="scroll-mt-[150px]" data-section="stock">
      <SectionHeader title="Stock" />
      
      <div className="space-y-3">
        <AISummary>
          YTD <span className="text-[#da0011]">+25.3%</span> with strong momentum. Top risers: HSBC <span className="text-[#da0011]">+3.12%</span>, UBTECH <span className="text-[#da0011]">+1.83%</span>; MTR <span className="text-green-600">-1.47%</span>. Tech at 45%—consider profit-taking and diversifying into defensive sectors.
        </AISummary>

        <MoversCarousel risers={risers} fallers={fallers} />

        <AISuggestionsCard 
          suggestions={suggestions}
          secondaryAction={{ label: 'View Details' }}
          primaryAction={{ label: 'Search Stock' }}
        />
      </div>
    </div>
  );
};

export default StockAnalysisSection;
