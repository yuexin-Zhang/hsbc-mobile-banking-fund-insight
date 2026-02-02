import React, { useState } from 'react';
import PerformanceChart from '../charts/PerformanceChart';

interface ChartDataPoint {
  date: string;
  all: number;
  fund: number;
  saa: number;
}

interface PerformanceTabProps {
  chartData: ChartDataPoint[];
  colors: {
    red: string;
    lightRed: string;
    grey: string;
    dark: string;
    greyBg: string;
    border: string;
    muted: string;
    axis: string;
  };
}

const PerformanceTab: React.FC<PerformanceTabProps> = ({ chartData, colors }) => {
  const [isEarningsExpanded, setIsEarningsExpanded] = useState(true);

  return (
    <div className="animate-fade-in space-y-5">
      {/* Metrics with dots */}
      <div className="flex items-center text-[10px] gap-2">
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-red-600 mr-1"></span>
          <span className="text-gray-900 font-medium">Funds:</span>
          <span className="ml-1 text-red-600 font-bold">28.59%</span>
        </div>

        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1"></span>
          <span className="text-gray-900 font-medium">Drawdown:</span>
          <span className="ml-1 text-gray-900 font-medium">16.70%</span>
        </div>

        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
          <span className="text-gray-900 font-medium">SAA:</span>
          <span className="ml-1 text-gray-900 font-medium">25.83%</span>
        </div>
      </div>

      {/* Chart Section */}
      <PerformanceChart chartData={chartData} colors={colors} />

      {/* Core Metrics Table */}
      <div className="mt-6 space-y-3">
        {/* Table Header */}
        <div className="flex text-[9px] font-bold text-[#767676] uppercase tracking-tighter pb-2 border-b border-gray-100">
          <div className="w-[40%]">Core Metrics</div>
          <div className="w-[30%] text-right pr-4">All Funds (Excl. Liquidity)</div>
          <div className="w-[30%] text-right">SAA</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-4">
          {/* Return Rate */}
          <div className="flex items-center py-1 border-b border-gray-50">
            <div className="w-[40%] text-[11px] font-bold text-[#1e1e1e]">Return Rate</div>
            <div className="w-[30%] text-right pr-4">
              <div className="text-[11px] font-bold text-[#da0011]">+32.80%</div>
            </div>
            <div className="w-[30%] text-right">
              <div className="text-[11px] font-bold text-[#da0011]">+25.83%</div>
            </div>
          </div>

          {/* Max Drawdown */}
          <div className="flex items-center py-1 border-b border-gray-50">
            <div className="w-[40%] text-[11px] font-bold text-[#1e1e1e]">Max Drawdown</div>
            <div className="w-[30%] text-right pr-4">
              <div className="text-[11px] font-bold text-[#1e1e1e]">16.70%</div>
            </div>
            <div className="w-[30%] text-right">
              <div className="text-[11px] font-bold text-[#1e1e1e]">14.25%</div>
            </div>
          </div>

          {/* Sharpe Ratio */}
          <div className="flex items-center py-1">
            <div className="w-[40%] text-[11px] font-bold text-[#1e1e1e]">Sharpe Ratio</div>
            <div className="w-[30%] text-right pr-4">
              <div className="text-[11px] font-bold text-[#1e1e1e]">1.85</div>
            </div>
            <div className="w-[30%] text-right">
              <div className="text-[11px] font-bold text-[#1e1e1e]">1.52</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Earnings Data Section */}
      <div className="mt-8 space-y-5">
        {/* Section Title with Expand/Collapse */}
        <button 
          onClick={() => setIsEarningsExpanded(!isEarningsExpanded)}
          className="flex items-center gap-2 w-full text-left group"
        >
          <div className="w-[3px] h-[14px] bg-[#da0011] rounded-full"></div>
          <h3 className="text-[12px] font-bold text-[#1e1e1e] flex-1">Detailed Earnings Data</h3>
          <svg 
            className={`w-4 h-4 text-[#767676] transition-transform duration-200 flex-shrink-0 ${isEarningsExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {/* Collapsible Content */}
        {isEarningsExpanded && (
        <div className="space-y-5">
          {/* Period Performance Subsection */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-[#1e1e1e] bg-[#f4f5f6] py-2 rounded-[3px]">Period Performance</h4>
          
          {/* Period Performance Table Header */}
          <div className="flex text-[9px] font-bold text-[#767676] uppercase tracking-tighter pb-2 border-b border-gray-100">
            <div className="w-[25%]">Period</div>
            <div className="w-[25%] text-right">Change</div>
            <div className="w-[25%] text-right">Category Avg</div>
            <div className="w-[25%] text-right">Category Rank</div>
          </div>

          {/* Period Performance Table Rows */}
          <div className="space-y-4">
            {/* 1 Month */}
            <div className="flex items-center py-1 border-b border-gray-50">
              <div className="w-[25%] text-[11px] font-bold text-[#1e1e1e]">1 Month</div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold text-[#da0011]">+5.42%</div>
              </div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold text-[#da0011]">+3.85%</div>
              </div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold">
                  <span className="text-[#1e1e1e]">245</span>
                  <span className="text-[#767676]">/312</span>
                </div>
                <div className="text-[9px] font-medium text-[#767676] mt-0.5">Poor</div>
              </div>
            </div>

            {/* 3 Months */}
            <div className="flex items-center py-1 border-b border-gray-50">
              <div className="w-[25%] text-[11px] font-bold text-[#1e1e1e]">3 Months</div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold text-[#da0011]">+12.68%</div>
              </div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold text-[#008c4a]">-2.15%</div>
              </div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold">
                  <span className="text-[#1e1e1e]">42</span>
                  <span className="text-[#767676]">/285</span>
                </div>
                <div className="text-[9px] font-medium text-[#767676] mt-0.5">Excellent</div>
              </div>
            </div>

            {/* 6 Months */}
            <div className="flex items-center py-1 border-b border-gray-50">
              <div className="w-[25%] text-[11px] font-bold text-[#1e1e1e]">6 Months</div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold text-[#da0011]">+18.95%</div>
              </div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold text-[#da0011]">+14.52%</div>
              </div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold">
                  <span className="text-[#1e1e1e]">35</span>
                  <span className="text-[#767676]">/268</span>
                </div>
                <div className="text-[9px] font-medium text-[#767676] mt-0.5">Excellent</div>
              </div>
            </div>

            {/* 1 Year */}
            <div className="flex items-center py-1">
              <div className="w-[25%] text-[11px] font-bold text-[#1e1e1e]">1 Year</div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold text-[#da0011]">+32.80%</div>
              </div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold text-[#da0011]">+25.16%</div>
              </div>
              <div className="w-[25%] text-right">
                <div className="text-[11px] font-bold">
                  <span className="text-[#1e1e1e]">28</span>
                  <span className="text-[#767676]">/245</span>
                </div>
                <div className="text-[9px] font-medium text-[#767676] mt-0.5">Excellent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profit Probability Subsection */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-[#1e1e1e] bg-[#f4f5f6] py-2 rounded-[3px]">Profit Probability</h4>
          
          {/* Profit Probability Table Header */}
          <div className="flex text-[9px] font-bold text-[#767676] uppercase tracking-tighter pb-2 border-b border-gray-100">
            <div className="w-[25%]">Holding 7 Days</div>
            <div className="w-[25%] text-right">Holding 3 Months</div>
            <div className="w-[25%] text-right">Holding 6 Months</div>
            <div className="w-[25%] text-right">Holding 1 Year</div>
          </div>

          {/* Profit Probability Data Row */}
          <div className="flex items-center py-2">
            <div className="w-[25%] text-[11px] font-bold text-[#1e1e1e]">52.8%</div>
            <div className="w-[25%] text-right">
              <div className="text-[11px] font-bold text-[#1e1e1e]">68.5%</div>
            </div>
            <div className="w-[25%] text-right">
              <div className="text-[11px] font-bold text-[#1e1e1e]">78.2%</div>
            </div>
            <div className="w-[25%] text-right">
              <div className="text-[11px] font-bold text-[#1e1e1e]">85.6%</div>
            </div>
          </div>

          {/* Disclaimer */}
            <div className="pt-2 text-[9px] text-[#767676] leading-relaxed">
              Profit probability represents the likelihood of profit after holding for a specified period, calculated based on historical data from the past three years. Past performance does not guarantee future results. This data does not constitute investment advice.
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceTab;
