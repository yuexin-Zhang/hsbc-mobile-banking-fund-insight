import React from 'react';

const monthData = [
  { month: 'Aug', height: 72, gain: 5.2 },
  { month: 'Sep', height: 55, gain: -2.8 },
  { month: 'Oct', height: 95, gain: 8.1 },
  { month: 'Nov', height: 65, gain: 3.5 },
  { month: 'Dec', height: 105, gain: 7.8 },
  { month: 'Jan', height: 85, gain: 6.3 },
  { month: 'Feb', height: 115, gain: 8.5 },
];

const metrics = [
  { label: 'YTD Return', value: '+14.8%', subtext: 'vs Market +6.2%', isPositive: true },
  { label: 'Volatility (30D)', value: '12.3%', subtext: 'Low-Medium Risk' },
  { label: 'Sharpe Ratio', value: '1.84', subtext: 'Excellent Risk-Adj.' },
  { label: 'Max Drawdown', value: '-8.2%', subtext: 'Oct 15, 2025', isNegative: true },
];

interface PerformanceMetricsProps {
  onContactRM: () => void;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ onContactRM }) => {
  return (
    <div className="bg-white p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5 bg-[#da0011]"></div>
        <h3 className="text-[14px] font-bold text-gray-900">Performance & Risk Analysis</h3>
      </div>
      
      <div className="mb-4">
        <div className="flex items-end justify-between gap-1 px-2 pb-2 border-b border-gray-200" style={{ height: '160px' }}>
          {monthData.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-end gap-1 flex-1 h-full">
              <div className="text-[9px] font-semibold mb-1" style={{ color: item.gain > 0 ? '#da0011' : '#00847f' }}>
                {item.gain > 0 ? `+${item.gain}%` : `${item.gain}%`}
              </div>
              <div 
                className={`w-full ${item.gain > 0 ? 'bg-[#da0011]' : 'bg-[#00847f]'} rounded-t transition-all duration-500`}
                style={{ height: `${item.height}px`, maxWidth: '32px' }}
              ></div>
              <div className="text-[9px] text-gray-500 mt-1.5">{item.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 p-2.5 border border-gray-100">
            <div className="text-[10px] text-gray-500 mb-0.5">{metric.label}</div>
            <div className={`text-[15px] font-bold ${metric.isPositive ? 'text-[#da0011]' : metric.isNegative ? 'text-[#00847f]' : 'text-gray-900'}`}>
              {metric.value}
            </div>
            <div className="text-[9px] text-gray-500 mt-0.5">{metric.subtext}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-3 border border-gray-200">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5 text-[#da0011]" viewBox="0 0 24 24" fill="none">
              <path fill="currentColor" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[11px] text-gray-700 leading-relaxed">
              Your portfolio demonstrates <span className="font-bold text-gray-900">strong risk-adjusted returns</span> with a Sharpe Ratio of 1.84, outperforming 82% of comparable portfolios. Recent 7-month uptrend indicates solid momentum. <span className="font-bold text-gray-900">Contact your RM</span> to discuss tactical rebalancing opportunities in current market conditions.
            </div>
            <div className="mt-2">
              <button onClick={onContactRM} className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#da0011] hover:underline cursor-pointer">
                <span>Contact Relationship Manager</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
