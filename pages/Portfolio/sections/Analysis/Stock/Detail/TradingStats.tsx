import React from 'react';

interface StatItem {
  label: string;
  value: string;
}

const stats: StatItem[][] = [
  [
    { label: 'Open', value: '0.000' },
    { label: 'Volume', value: '0.00' },
  ],
  [
    { label: 'Day low', value: '0.000' },
    { label: 'Day high', value: '0.000' },
  ],
  [
    { label: '52 wk low', value: '86.620' },
    { label: '52 wk high', value: '212.1899' },
  ],
  [
    { label: 'Turnover', value: 'N/A' },
    { label: 'Currency', value: 'USD' },
  ],
  [
    { label: 'P/E ratio', value: '42.57x' },
    { label: 'Market cap', value: 'N/A' },
  ],
  [
    { label: 'Div yield', value: '0.02%' },
    { label: 'Ex. div', value: '4 Dec 2025' },
  ],
];

export const TradingStats: React.FC = () => {
  return (
    <div className="px-4 py-4 border-b border-gray-200">
      <div className="grid grid-cols-2 gap-y-4">
        {stats.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((stat, statIndex) => (
              <div key={statIndex} className={statIndex === 1 ? 'text-right' : ''}>
                <div className="text-[15px] text-gray-900">{stat.label}</div>
                <div className="text-[15px] font-medium text-gray-900 mt-1">{stat.value}</div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TradingStats;
