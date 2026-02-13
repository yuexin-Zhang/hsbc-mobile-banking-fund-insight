import React, { useState } from 'react';
import RMContactPage from '../../components/RMContactPage';

const PortfolioOverviewAnalysis: React.FC = () => {
  const [showRMContact, setShowRMContact] = useState(false);
  return (
    <div className="bg-[#f4f5f6] px-2 py-3 space-y-3">
      {/* Section Title with Icon */}
      <div className="flex items-center px-1">
        <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-[#da0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-[15px] font-bold text-gray-900">Portfolio Overview Analysis</h2>
      </div>
      
      {/* Section 1: Asset Allocation & Diversification */}
      <div className="bg-white p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-[#da0011]"></div>
          <h3 className="text-[14px] font-bold text-gray-900">Asset Allocation Overview (HKD)</h3>
        </div>
        
        {/* Allocation Chart - Single Integrated View */}
        <div className="space-y-2.5 mb-4">
          {/* Stocks - Gain */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <span className="text-[11px] font-bold text-gray-900">Stocks</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-500 mb-1.5">
              <span>Original: 3,551,893</span>
              <span className="text-gray-900 font-medium">Current: 3,742,736</span>
              <span className="font-semibold text-[#da0011]">(+190,843)</span>
            </div>
            <div className="relative h-7 bg-gray-100 rounded-full overflow-hidden">
              {/* Gain portion (red base - below gray) */}
              <div className="absolute left-0 top-0 bottom-0 bg-[#da0011] rounded-full" style={{ width: '38.3%' }}></div>
              {/* Original investment (gray overlay on left) */}
              <div className="absolute left-0 top-0 bottom-0 bg-[#d0d0d0] rounded-full" style={{ width: '35.6%' }}></div>
              <div className="absolute inset-0 flex items-center px-3">
                <span className="text-[11px] font-bold text-[#da0011] absolute" style={{ left: '38.3%', paddingLeft: '8px' }}>
                  +2.7%
                </span>
              </div>
            </div>
          </div>

          {/* Unit Trusts - Gain */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <span className="text-[11px] font-bold text-gray-900 whitespace-nowrap">Unit Trusts</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-500 mb-1.5">
              <span>Original: 2,774,792</span>
              <span className="text-gray-900 font-medium">Current: 3,030,276</span>
              <span className="font-semibold text-[#da0011]">(+255,484)</span>
            </div>
            <div className="relative h-7 bg-gray-100 rounded-full overflow-hidden">
              {/* Gain portion (red base - below gray) */}
              <div className="absolute left-0 top-0 bottom-0 bg-[#da0011] rounded-full" style={{ width: '31.3%' }}></div>
              {/* Original investment (gray overlay on left) */}
              <div className="absolute left-0 top-0 bottom-0 bg-[#d0d0d0] rounded-full" style={{ width: '27.8%' }}></div>
              <div className="absolute inset-0 flex items-center px-3">
                <span className="text-[11px] font-bold text-[#da0011] absolute" style={{ left: '31.3%', paddingLeft: '8px' }}>
                  +3.5%
                </span>
              </div>
            </div>
          </div>

          {/* Bonds - Loss */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <span className="text-[11px] font-bold text-gray-900">Bonds</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-500 mb-1.5">
              <span>Original: 2,638,282</span>
              <span className="text-gray-900 font-medium">Current: 2,530,546</span>
              <span className="font-semibold text-[#00847f]">(-107,736)</span>
            </div>
            <div className="relative h-7 bg-gray-100 rounded-full overflow-hidden">
              {/* Original investment outline (green border) */}
              <div className="absolute left-0 top-0 bottom-0 rounded-full border-2 border-[#00847f]" style={{ width: '25.2%' }}></div>
              {/* Loss portion (green fill - middle layer) */}
              <div className="absolute left-0 top-0 bottom-0 bg-[#00847f] rounded-full" style={{ width: '25.2%' }}></div>
              {/* Current holding (gray fill - top layer) */}
              <div className="absolute left-0 top-0 bottom-0 bg-[#d0d0d0] rounded-full" style={{ width: '23.6%' }}></div>
              <div className="absolute inset-0 flex items-center px-3">
                <span className="text-[11px] font-bold text-[#00847f] absolute" style={{ left: '25.2%', paddingLeft: '8px' }}>
                  -1.6%
                </span>
              </div>
            </div>
          </div>

          {/* Structured Products - Gain */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <span className="text-[11px] font-bold text-gray-900 whitespace-nowrap">Structured Products</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-500 mb-1.5">
              <span>Original: 1,306,443</span>
              <span className="text-gray-900 font-medium">Current: 1,328,989</span>
              <span className="font-semibold text-[#da0011]">(+22,546)</span>
            </div>
            <div className="relative h-7 bg-gray-100 rounded-full overflow-hidden">
              {/* Gain portion (red base - below gray) */}
              <div className="absolute left-0 top-0 bottom-0 bg-[#da0011] rounded-full" style={{ width: '12.1%' }}></div>
              {/* Original investment (gray overlay on left) */}
              <div className="absolute left-0 top-0 bottom-0 bg-[#d0d0d0] rounded-full" style={{ width: '11.4%' }}></div>
              <div className="absolute inset-0 flex items-center px-3">
                <span className="text-[11px] font-bold text-[#da0011] absolute" style={{ left: '12.1%', paddingLeft: '8px' }}>
                  +0.7%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-gray-50 p-3 border border-gray-200">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-[#da0011]" viewBox="0 0 24 24" fill="none">
                <path fill="currentColor" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[11px] text-gray-700 leading-relaxed">
                Equity-heavy allocation at <span className="font-bold text-gray-900">63.7%</span> (stocks + unit trusts) suggests <span className="font-bold text-gray-900">aggressive-growth profile</span>. Bond holdings underperforming at <span className="font-bold text-[#00847f]">-4.1%</span>. Consider rebalancing to reduce equity concentration.
              </div>
              <div className="mt-2">
                <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#da0011] hover:underline">
                  <span>Rebalance Portfolio</span>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Performance & Risk Metrics */}
      <div className="bg-white p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-[#da0011]"></div>
          <h3 className="text-[14px] font-bold text-gray-900">Performance & Risk Analysis</h3>
        </div>
        
        {/* Performance Timeline Chart */}
        <div className="mb-4">
          <div className="flex items-end justify-between gap-1 px-2 pb-2 border-b border-gray-200" style={{ height: '160px' }}>
            {/* Month bars */}
            {[
              { month: 'Aug', height: 72, gain: 5.2 },
              { month: 'Sep', height: 55, gain: -2.8 },
              { month: 'Oct', height: 95, gain: 8.1 },
              { month: 'Nov', height: 65, gain: 3.5 },
              { month: 'Dec', height: 105, gain: 7.8 },
              { month: 'Jan', height: 85, gain: 6.3 },
              { month: 'Feb', height: 115, gain: 8.5 },
            ].map((item, index) => (
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

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 p-2.5 border border-gray-100">
            <div className="text-[10px] text-gray-500 mb-0.5">YTD Return</div>
            <div className="text-[15px] font-bold text-[#da0011]">+14.8%</div>
            <div className="text-[9px] text-gray-500 mt-0.5">vs Market +6.2%</div>
          </div>
          <div className="bg-gray-50 p-2.5 border border-gray-100">
            <div className="text-[10px] text-gray-500 mb-0.5">Volatility (30D)</div>
            <div className="text-[15px] font-bold text-gray-900">12.3%</div>
            <div className="text-[9px] text-gray-500 mt-0.5">Low-Medium Risk</div>
          </div>
          <div className="bg-gray-50 p-2.5 border border-gray-100">
            <div className="text-[10px] text-gray-500 mb-0.5">Sharpe Ratio</div>
            <div className="text-[15px] font-bold text-gray-900">1.84</div>
            <div className="text-[9px] text-gray-500 mt-0.5">Excellent Risk-Adj.</div>
          </div>
          <div className="bg-gray-50 p-2.5 border border-gray-100">
            <div className="text-[10px] text-gray-500 mb-0.5">Max Drawdown</div>
            <div className="text-[15px] font-bold text-[#00847f]">-8.2%</div>
            <div className="text-[9px] text-gray-500 mt-0.5">Oct 15, 2025</div>
          </div>
        </div>

        {/* AI Analysis */}
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
                <button onClick={() => setShowRMContact(true)} className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#da0011] hover:underline cursor-pointer">
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

      {/* Section 3: Top Holdings & Concentration Risk */}
      <div className="bg-white p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-[#da0011]"></div>
          <h3 className="text-[14px] font-bold text-gray-900">Top Holdings & Concentration</h3>
        </div>
        
        {/* Top 5 Holdings */}
        <div className="space-y-2 mb-4">
          {[
            { name: 'HSBC Global Equity Fund', type: 'Unit Trust', value: 1545000, pct: 14.5, return: 12.5 },
            { name: 'Tencent Holdings', type: 'Stock', value: 1232000, pct: 11.6, return: 8.3 },
            { name: 'US Treasury 10Y Bond', type: 'Bond', value: 1189000, pct: 11.2, return: 3.8 },
            { name: 'Hang Seng Index ELN', type: 'Structured', value: 956000, pct: 9.0, return: 5.2 },
            { name: 'Alibaba Group', type: 'Stock', value: 845000, pct: 7.9, return: -2.1 },
          ].map((holding, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 bg-[#da0011] rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="text-[11px] font-semibold text-gray-900 truncate">{holding.name}</div>
                  <div className={`text-[11px] font-bold ${holding.return > 0 ? 'text-[#da0011]' : 'text-[#00847f]'}`}>
                    {holding.return > 0 ? '+' : ''}{holding.return}%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-gray-500">{holding.type}</div>
                  <div className="text-[10px] text-gray-600">
                    <span className="font-semibold">{holding.pct}%</span> · HKD {(holding.value / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Concentration Meter */}
        <div className="bg-gray-50 p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-gray-700">Concentration Risk Level</span>
            <span className="text-[11px] font-bold text-yellow-600">Medium</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="w-1/3 bg-[#00847f]"></div>
              <div className="w-1/3 bg-[#999999]"></div>
              <div className="w-1/3 bg-[#da0011]"></div>
            </div>
            <div 
              className="absolute top-0 left-0 h-full w-1 bg-gray-900 shadow-lg transition-all"
              style={{ left: '54.2%' }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-gray-500">Low</span>
            <span className="text-[9px] text-gray-500">High</span>
          </div>
        </div>

        {/* Concentration Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <div className="text-[13px] font-bold text-gray-900">54.2%</div>
            <div className="text-[9px] text-gray-500">Top 5 Weight</div>
          </div>
          <div className="text-center">
            <div className="text-[13px] font-bold text-gray-900">32</div>
            <div className="text-[9px] text-gray-500">Total Holdings</div>
          </div>
          <div className="text-center">
            <div className="text-[13px] font-bold text-gray-900">0.68</div>
            <div className="text-[9px] text-gray-500">HHI Index</div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-gray-50 p-3 border border-gray-200">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-[#da0011]" viewBox="0 0 24 24" fill="none">
                <path fill="currentColor" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[11px] text-gray-700 leading-relaxed">
                Your top 5 holdings represent <span className="font-bold text-gray-900">54.2% of portfolio value</span>, indicating moderate concentration risk. While diversified across <span className="font-bold text-gray-900">32 positions</span>, consider reducing exposure to HSBC Global Equity Fund (14.5%) and Tencent (11.6%) to enhance resilience. <span className="font-bold text-gray-900">Contact your RM</span> for personalized rebalancing strategies.
              </div>
              <div className="mt-2">
                <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#da0011] hover:underline">
                  <span>View Detailed Holdings</span>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RM Contact Page Modal */}
      {showRMContact && (
        <RMContactPage onBack={() => setShowRMContact(false)} />
      )}
    </div>
  );
};

export default PortfolioOverviewAnalysis;
