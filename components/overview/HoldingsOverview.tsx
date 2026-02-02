import React from 'react';

interface HoldingsOverviewProps {
  totalAssetValue: number;
}

const HoldingsOverview: React.FC<HoldingsOverviewProps> = ({ totalAssetValue }) => {
  const weekDays = [
    { day: 'Mon', value: '+0.24%', isPositive: true },
    { day: 'Tue', value: '-0.22%', isPositive: false },
    { day: 'Wed', value: '+0.14%', isPositive: true },
    { day: 'Thu', value: '+0.07%', isPositive: true },
    { day: 'Fri', value: '-0.13%', isPositive: false },
    { day: 'Sat', value: '0.00%', isPositive: null },
    { day: 'Sun', value: '0.00%', isPositive: null },
  ];

  return (
    <div className="space-y-2">
      {/* Revenue Analysis Section */}
      <div className="bg-white rounded-[3px] border border-[#ebeef0] shadow-sm overflow-hidden px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-bold">My total assets</div>
          <div className="flex items-center gap-0.5 text-[#9ca3af] cursor-pointer">
            <span className="text-[12px] font-medium">Earnings Analysis</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Assets and Returns Summary */}
        <div className="mb-2">
          {/* Total Assets */}
          <div className="text-[24px] font-bold text-[#1e1e1e] mb-1">{totalAssetValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          
          {/* Three Metrics Row */}
          <div className="flex items-start gap-4 text-[12px]">
            <div className="flex flex-col gap-0.5 pr-4 border-r border-[#e5e7eb]">
              <span className="text-[#767676] whitespace-nowrap">Yesterday's Return</span>
              <div className="flex items-center gap-1">
                <span className="text-[#da0011] font-bold">+0.09</span>
                <span className="text-[#da0011]">▲</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 pr-4 border-r border-[#e5e7eb]">
              <span className="text-[#767676] whitespace-nowrap">Annual Return</span>
              <span className="text-[#da0011] font-bold">+1.72</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#767676] whitespace-nowrap">Return Rate</span>
              <span className="text-[#da0011] font-bold">+0.48%</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#f3f4f6] my-2"></div>

        {/* Weekly Return Message */}
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-[13px] font-bold text-[#1e1e1e]">Revenue Analysis</div>
            </div>
            <div className="flex items-center gap-0.5 text-[#9ca3af] cursor-pointer">
              <span className="text-[11px] font-medium">View Analysis</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <span className="text-[10px] text-[#1e1e1e]">Last week's return has been realized, weekly return </span>
          <span className="text-[12px] text-[#10b981] font-bold">-0.17%</span>
        </div>

        {/* Weekly Calendar */}
        <div className="flex gap-1.5 mb-1">
          {weekDays.map((day, index) => (
            <div key={index} className="flex-1 min-w-0">
              <div 
                className={`w-full py-1.5 px-0.5 rounded text-[10px] font-medium text-center ${
                  day.isPositive === true 
                    ? 'bg-[#fef2f2]' 
                    : day.isPositive === false 
                      ? 'bg-[#dcfce7]'
                      : 'bg-[#f9fafb]'
                }`}
              >
                <div className="text-[#1e1e1e] mb-0.5 leading-tight">{day.day}</div>
                <div className={`leading-tight ${
                  day.isPositive === true 
                    ? 'text-[#da0011]' 
                    : day.isPositive === false 
                      ? 'text-[#10b981]'
                      : 'text-[#9ca3af]'
                }`}>{day.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Holdings Overview Section */}
      <div className="bg-white rounded-[3px] border border-[#ebeef0] shadow-sm overflow-hidden">
        <div className="px-3 py-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-[#da0011] rounded-sm"></div>
            <h3 className="text-[15px] font-bold text-[#1e1e1e]">Holdings Summary</h3>
          </div>
          <div className="flex items-center gap-1 text-[#9ca3af] cursor-pointer hover:text-[#767676] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <span className="text-[12px] font-medium">Rebalancing tips</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="space-y-1">
          {/* Performance */}
          <div className="flex items-start">
            <div className="w-[85px] flex-shrink-0">
              <div className="relative inline-block">
                <span className="text-[12px] text-[#767676] font-medium">Performance</span>
                <div className="absolute left-0 bottom-0 w-full h-[4px] bg-[#fef3c7]"></div>
              </div>
            </div>
            <div className="flex-1 text-[12px] mt-[4px]">
              <span>YTD return of all funds (excluding monetary funds) is </span>
              <span className="font-bold text-[#da0011] whitespace-nowrap">12.00%</span>
              <span>, max drawdown is </span>
              <span className="font-bold text-[#1e1e1e] whitespace-nowrap">1.17%</span>
            </div>
          </div>
          {/* Asset Classes */}
          <div className="flex items-start">
            <div className="w-[85px] flex-shrink-0">
              <div className="relative inline-block">
                <span className="text-[12px] text-[#767676] font-medium">Classes</span>
                <div className="absolute left-0 bottom-0 w-full h-[4px] bg-[#fef3c7]"></div>
              </div>
            </div>
            <div className="flex-1 text-[12px] mt-[4px]">
              <span>Domestic equity funds account for the highest proportion at </span>
              <span className="font-bold text-[#da0011]">80%</span>
            </div>
          </div>

          {/* underlying assets */}
          <div className="flex items-start">
            <div className="w-[85px] flex-shrink-0">
              <div className="relative inline-block">
                <span className="text-[12px] text-[#767676] font-medium">Underlying</span>
                <div className="absolute left-0 bottom-[0px] w-full h-[4px] bg-[#fef3c7]"></div>
              </div>
            </div>
            <div className="flex-1 text-[12px] mt-[4px]">
              <span>Sector distribution is highly concentrated, with cyclical at </span>
              <span className="font-bold text-[#f97316]">63%</span>
            </div>
          </div>

          {/* Style */}
          {/* <div className="flex items-start">
            <span className="text-[12px] text-[#767676] font-medium w-[85px] flex-shrink-0">Style</span>
            <div className="flex-1 flex items-center">
              <span className="text-[12px] font-bold text-[#da0011]">70%</span>
              <span className="text-[12px] ml-[2px]">Balanced Style</span>
              <span className="text-[10px] font-medium text-[#da0011] border border-[#da0011] px-0.5 rounded-sm ml-[4px] bg-[#FFF1F0]">Concentrated</span>
            </div>
          </div> */}

          {/* Manager */}
          {/* <div className="flex items-start">
            <span className="text-[12px] text-[#767676] font-medium w-[85px] flex-shrink-0">Manager</span>
            <div className="flex-1">
              <span className="text-[12px]">Balanced Manager Distribution</span>
            </div>
          </div> */}

          
        </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingsOverview;
