import React from 'react';

export interface Insight {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  action?: string;
  additionalAction?: string;
}

export const getInsights = (navigate: (path: string) => void): Insight[] => [
  {
    icon: React.createElement('svg', { className: 'w-4 h-4 text-[#da0011]', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' })
    ),
    title: 'Performance Analysis',
    description: React.createElement(React.Fragment, null,
      'Your portfolio is ', React.createElement('span', { className: 'font-bold' }, 'outperforming the market by 8.3%'), ' this month. ', React.createElement('br', null),
      'The ', React.createElement('span', { className: 'font-bold' }, 'HSBC Global Equity Fund'), ' led gains with a ', React.createElement('span', { className: 'font-bold' }, '12.5% return'), ', contributing ', React.createElement('span', { className: 'font-bold' }, 'HKD 145,000'), ' in unrealized gains.'
    ),
    additionalAction: 'CIO House View'
  },
  {
    icon: React.createElement('svg', { className: 'w-4 h-4 text-[#da0011]', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6' })
    ),
    title: 'Top Movers Impact',
    description: React.createElement(React.Fragment, null,
      'The ', React.createElement('span', { className: 'font-bold' }, 'HSBC Global Equity Fund'), ' experienced a ', React.createElement('span', { className: 'font-bold' }, '5% decline'), ' yesterday, reducing portfolio value by ', React.createElement('span', { className: 'font-bold' }, 'HKD 77,271'), '. ', React.createElement('br', null),
      'Our AI analysis suggests recovery expected in ', React.createElement('span', { className: 'font-bold' }, 'Q2 2026'), '.'
    ),
    action: 'View details'
  },
  {
    icon: React.createElement('svg', { className: 'w-4 h-4 text-[#da0011]', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z' }),
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z' })
    ),
    title: 'Strategic Allocation Opportunity',
    description: React.createElement(React.Fragment, null,
      'AI recommends increasing ', React.createElement('span', { className: 'font-bold' }, 'Global Equity allocation by 25%'), ' (', React.createElement('span', { className: 'font-bold' }, 'HKD 2.66M'), '). Suggested allocation:',
      React.createElement('br', null),
      React.createElement('span', { className: 'font-bold' }, '• 15%'), ' Asian technology',
      React.createElement('br', null),
      React.createElement('span', { className: 'font-bold' }, '• 5%'), ' Healthcare innovation',
      React.createElement('br', null),
      React.createElement('span', { className: 'font-bold' }, '• 5%'), ' Sustainable infrastructure'
    ),
    action: 'Rebalance'
  },
  {
    icon: React.createElement('svg', { className: 'w-4 h-4 text-[#da0011]', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
    ),
    title: 'Risk Profile Update Required',
    description: React.createElement(React.Fragment, null,
      'Your risk assessment expires ', React.createElement('span', { className: 'font-bold' }, 'March 15, 2026'), '. Over the past year, volatility increased ', React.createElement('span', { className: 'font-bold' }, '28%'), ' and your equity exposure rose to ', React.createElement('span', { className: 'font-bold' }, '35%'), '. Complete the ', React.createElement('span', { className: 'font-bold' }, '10-minute review'), ' to maintain personalized AI recommendations.'
    ),
    action: 'Update now'
  },
  {
    icon: React.createElement('svg', { className: 'w-4 h-4 text-[#da0011]', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' })
    ),
    title: 'Time Deposit Maturity Decision',
    description: React.createElement(React.Fragment, null,
      'Your ', React.createElement('span', { className: 'font-bold' }, 'HKD 1,500,000'), ' time deposit matures ', React.createElement('span', { className: 'font-bold' }, 'Feb 9, 2026'), '. Options:',
      React.createElement('br', null),
      React.createElement('span', { className: 'font-bold' }, '1.'), ' Renew at ', React.createElement('span', { className: 'font-bold' }, '3.85% APR'), ' for 3 months',
      React.createElement('br', null),
      React.createElement('span', { className: 'font-bold' }, '2.'), ' Deploy 60% into Bond Fund (', React.createElement('span', { className: 'font-bold' }, '4.8%'), ' yield)',
      React.createElement('br', null),
      React.createElement('span', { className: 'font-bold' }, '3.'), ' Structured products with principal protection'
    ),
    action: 'Renew or withdraw'
  },
  {
    icon: React.createElement('svg', { className: 'w-4 h-4 text-[#da0011]', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 2 },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
    ),
    title: 'Bond Coupon Cashflow Planning',
    description: React.createElement(React.Fragment, null,
      'Bond coupon of ', React.createElement('span', { className: 'font-bold' }, 'HKD 850,000'), ' due ', React.createElement('span', { className: 'font-bold' }, 'Mar 10, 2026'), '. AI recommends:',
      React.createElement('br', null),
      React.createElement('span', { className: 'font-bold' }, '1.'), ' Reinvest 70% (', React.createElement('span', { className: 'font-bold' }, 'HKD 595K'), ') into High Yield Fund',
      React.createElement('br', null),
      React.createElement('span', { className: 'font-bold' }, '2.'), ' Deploy 20% (', React.createElement('span', { className: 'font-bold' }, 'HKD 170K'), ') into blue-chips',
      React.createElement('br', null),
      React.createElement('span', { className: 'font-bold' }, '3.'), ' Reserve 10% as tactical dry powder'
    ),
    action: 'View schedule'
  }
];
