import React from 'react';

interface HoldingsOverviewProps {
  totalAssetValue: number;
  isAIGenerated: boolean;
}

const HoldingsOverview: React.FC<HoldingsOverviewProps> = ({ totalAssetValue, isAIGenerated }) => {
  const weekDays = [
    { day: 'Mon', value: '+0.24%', isPositive: true },
    { day: 'Tue', value: '-0.22%', isPositive: false },
    { day: 'Wed', value: '+0.14%', isPositive: true },
    { day: 'Thu', value: '+0.07%', isPositive: true },
    { day: 'Fri', value: '-0.13%', isPositive: false },
  ];

  return (
    <div className="space-y-2">
      {/* Revenue Analysis Section */}
      <div className="bg-white rounded-[3px] border border-[#ebeef0] shadow-sm overflow-hidden px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-bold">My total assets</div>
          <div className="flex items-center gap-0.5 text-[#f0ad4e] cursor-pointer hover:text-[#e09d3d] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <span className="text-[12px] font-medium">Rebalancing tips</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <div className="flex flex-col gap-0.5 pr-4 border-r border-[#e5e5e5]">
              <span className="text-[#767676] whitespace-nowrap">Yesterday's Return</span>
              <div className="flex items-center gap-1">
                <span className="text-[#da0011] font-bold">+0.09</span>
                <span className="text-[#da0011]">▲</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 pr-4 border-r border-[#e5e5e5]">
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
        <div className="border-t border-[#f3f3f3] my-2"></div>

        {/* Weekly Return Message */}
        <div className="mb-2">
          <div className="text-[13px] font-bold text-[#1e1e1e]">Revenue Calendar</div>
        </div>

        {/* Weekly Calendar */}
        <div className="flex gap-1.5 mb-1">
          {weekDays.map((day, index) => (
            <div key={index} className="flex-1 min-w-0">
              <div 
                className={`w-full py-1.5 px-0.5 text-[10px] font-medium text-center ${
                  day.isPositive === true 
                    ? 'bg-[#f2dede]' 
                    : day.isPositive === false 
                      ? 'bg-[#dff0d8]'
                      : 'bg-[#f5f5f5]'
                }`}
              >
                <div className="text-[#1e1e1e] mb-0.5 leading-tight">{day.day}</div>
                <div className={`leading-tight ${
                  day.isPositive === true 
                    ? 'text-[#da0011]' 
                    : day.isPositive === false 
                      ? 'text-[#5cb85c]'
                      : 'text-[#999]'
                }`}>{day.value}</div>
              </div>
            </div>
          ))}
          {/* More Button */}
          <div className="flex-1 min-w-0">
            <div className="w-full py-1.5 px-0.5 text-[10px] font-medium text-center bg-[#f5f5f5] cursor-pointer hover:bg-[#e5e5e5] transition-colors flex items-center justify-center h-full">
              <span className="text-[#767676]">More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Overview Section */}
      <div className="rounded-[3px] border border-[#ebeef0] shadow-sm overflow-hidden relative bg-white">
        {/* AI Tag */}
        {isAIGenerated && (
          <div className="absolute top-2 right-2 z-10">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-md">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-[9px] font-bold text-white">AI</span>
            </div>
          </div>
        )}
        
        <div className="px-3 py-3 relative z-20">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-1 h-5 bg-[#da0011]"></div>
          <h3 className="text-[15px] font-bold text-[#1e1e1e]">Holdings Summary</h3>
        </div>

        <div className="space-y-2">
          {/* Performance */}
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-[#767676] flex-shrink-0 mt-1.5"></div>
            <div className="flex-1 text-[12px] leading-relaxed">
              {isAIGenerated ? (
                // AI Mode: Concise insight
                <>
                  <span className="text-[#767676] font-medium">Performance: </span>
                  <span>Strong YTD returns of </span>
                  <span className="font-bold text-[#da0011]">12.00%</span>
                  <span> with low </span>
                  <span className="font-bold text-[#5cb85c]">1.17%</span>
                  <span> drawdown</span>
                </>
              ) : (
                // Non-AI Mode: Direct data
                <>
                  <span className="text-[#767676] font-medium">Performance: </span>
                  <span>YTD return </span>
                  <span className="font-bold text-[#da0011]">12.00%</span>
                  <span>, max drawdown </span>
                  <span className="font-bold text-[#1e1e1e]">1.17%</span>
                </>
              )}
            </div>
          </div>
          
          {/* Asset Classes */}
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-[#767676] flex-shrink-0 mt-1.5"></div>
            <div className="flex-1 text-[12px] leading-relaxed">
              {isAIGenerated ? (
                // AI Mode: Strategic insight
                <>
                  <span className="text-[#767676] font-medium">Classes: </span>
                  <span>Growth-focused with </span>
                  <span className="font-bold text-[#da0011]">80%</span>
                  <span> in domestic equity</span>
                </>
              ) : (
                // Non-AI Mode: Simple fact
                <>
                  <span className="text-[#767676] font-medium">Classes: </span>
                  <span>Domestic equity funds </span>
                  <span className="font-bold text-[#da0011]">80%</span>
                </>
              )}
            </div>
          </div>

          {/* underlying assets */}
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-[#767676] flex-shrink-0 mt-1.5"></div>
            <div className="flex-1 text-[12px] leading-relaxed">
              {isAIGenerated ? (
                // AI Mode: Sector summary
                <>
                  <span className="text-[#767676] font-medium">Underlying: </span>
                  <span>HK equities </span>
                  <span className="font-bold text-[#da0011]">28.0%</span>
                  <span>, cyclical </span>
                  <span className="font-bold text-[#f0ad4e]">18.0%</span>
                </>
              ) : (
                // Non-AI Mode: Concentration risk
                <>
                  <span className="text-[#767676] font-medium">Underlying: </span>
                  <span>NVIDIA </span>
                  <span className="font-bold text-[#da0011]">79.84%</span>
                  <span>. Diversify to reduce risk</span>
                </>
              )}
            </div>
          </div>

          {/* Style */}
          {/* <div className="flex items-start">
            <span className="text-[12px] text-[#767676] font-medium w-[85px] flex-shrink-0">Style</span>
            <div className="flex-1 flex items-center">
              <span className="text-[12px] font-bold text-[#da0011]">70%</span>
              <span className="text-[12px] ml-[2px]">Balanced Style</span>
              <span className="text-[10px] font-medium text-[#da0011] border border-[#da0011] px-0.5 rounded-sm ml-[4px] bg-[#f2dede]">Concentrated</span>
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
