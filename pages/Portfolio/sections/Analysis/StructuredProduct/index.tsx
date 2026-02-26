import React from 'react';
import { SectionHeader, AISummary, AISuggestionsCard } from '../../../components';

interface StructuredProductAnalysisSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const products = [
  {
    name: 'Tech Index Autocallable Note',
    linkedTo: 'NASDAQ-100 Index',
    status: 'MONITOR',
    invested: 'HKD 750,000.00',
    current: 'HKD 812,035.42 (+8.27%)',
    barrierStatus: '78%',
    strike: '75%',
    indexLevel: '104% of initial',
    nextEvent: 'Jun 15, 2026',
    eventType: 'Observation',
    structure: '10% p.a. coupon if above 105% at observation | Principal protected if above 75% at maturity'
  },
  {
    name: 'HSI Autocall Note',
    linkedTo: 'Hang Seng Index',
    status: 'AUTOCALL LIKELY',
    invested: 'HKD 680,500.00',
    current: 'HKD 724,531.00 (+6.47%)',
    barrierStatus: '92%',
    strike: '75%',
    indexLevel: '123% of initial',
    nextEvent: 'Mar 15, 2026',
    eventType: 'Autocall Check',
    highlight: true,
    autocallInfo: '68% probability of early redemption at Mar observation | Total return if called: +8.5% annualized'
  }
];

const StructuredProductAnalysisSection: React.FC<StructuredProductAnalysisSectionProps> = ({ sectionRef }) => {
  const suggestions = [
    {
      text: 'Mar 15: HSI Autocall observation—68% early redemption probability (HKD 724,000 at +8.5% annualized). Prepare to reinvest: allocate 50% to AI/semiconductor autocallables (9-11% p.a. yields).',
      action: { label: 'View Tech Products' }
    },
    {
      text: 'Jun 15: Tech Index Note coupon observation—currently at 104% of initial (needs 105% for 10% p.a. coupon payment). Monitor NASDAQ-100 closely.',
      action: { label: 'Set Price Alert' }
    }
  ];

  return (
    <div ref={sectionRef} className="scroll-mt-[150px] mt-8 pt-8 border-t-[6px] border-[#f4f5f6]">
      <SectionHeader title="Structured Product" />
      
      <div className="space-y-3">
        <AISummary>
          <span className="text-[#da0011]">HKD 2,544,000</span> (<span className="text-[#da0011]">+7.6%</span>), all barriers safe. Mar 15: HSI Autocall <span className="text-[#da0011]">68% early redemption</span> at <span className="text-[#da0011]">+8.5% annualized</span>. Tech Note at 104% (needs 105% for Jun coupon).
        </AISummary>

        <div className="space-y-3">
          <h4 className="text-[11px] font-semibold text-gray-700 mb-3">Product Holdings - Key Focus</h4>
          
          {products.map((product, index) => (
            <div key={index} className="border-l-2 border-l-orange-400 p-3 border border-gray-200 bg-white">
              <div className="flex justify-between items-start mb-1.5">
                <div>
                  <div className="text-[11px] font-bold text-gray-900">{product.name}</div>
                  <div className="text-[9px] text-gray-600 mt-0.5">Linked to: {product.linkedTo}</div>
                </div>
                <div className={`px-1.5 py-0.5 border text-[8px] font-semibold ${product.highlight ? 'bg-orange-50 border-orange-300 text-orange-700' : 'bg-orange-50 border-orange-300 text-orange-700'}`}>
                  {product.status}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div>
                  <div className="text-[8px] text-gray-500">Invested / Current</div>
                  <div className="text-[10px] font-bold text-gray-900">{product.invested}</div>
                  <div className="text-[9px] text-[#da0011] font-semibold">{product.current}</div>
                </div>
                <div>
                  <div className="text-[8px] text-gray-500">Barrier Status</div>
                  <div className="text-[10px] font-bold text-orange-600">{product.barrierStatus} <span className="text-gray-900">(Strike: {product.strike})</span></div>
                  <div className="text-[9px] text-gray-600">Index: {product.indexLevel}</div>
                </div>
                <div>
                  <div className="text-[8px] text-gray-500">Next Event</div>
                  <div className={`text-[10px] font-bold ${product.highlight ? 'text-[#da0011]' : 'text-gray-900'}`}>{product.nextEvent}</div>
                  <div className={`text-[9px] ${product.highlight ? 'text-[#da0011] font-semibold' : 'text-gray-600'}`}>{product.eventType}</div>
                </div>
              </div>
              <div className="mt-2 text-[9px] text-gray-700">
                {product.structure && (
                  <><span className="font-semibold">Structure:</span> {product.structure}</>
                )}
                {product.autocallInfo && (
                  <><span className="font-semibold">Autocall trigger:</span> 100% of initial price | <span className="font-semibold text-[#da0011]">68% probability</span> of early redemption at Mar observation | Total return if called: <span className="font-bold text-[#da0011]">+8.5% annualized</span></>
                )}
              </div>
            </div>
          ))}
        </div>

        <AISuggestionsCard 
          suggestions={suggestions}
          secondaryAction={{ label: 'View Details' }}
          primaryAction={{ label: 'Search Products' }}
        />
      </div>
    </div>
  );
};

export default StructuredProductAnalysisSection;
