import React, { useState } from 'react';

interface ManagerHolding {
  name: string;
  company: string;
  allocation: number;
  amount: number;
  tenure: string;
  return: string;
  fundCount: number;
  totalAUM: string;
  performanceRating: number;
  riskRating: number;
  strengthTags: string[];
  description: string;
}

interface ManagerTabProps {
  managerHoldings: ManagerHolding[];
  totalAssetValue: number;
  isAIGenerated: boolean;
}

const ManagerTab: React.FC<ManagerTabProps> = ({ managerHoldings, totalAssetValue, isAIGenerated }) => {
  const [expandedManager, setExpandedManager] = useState<string | null>(null);

  const toggleManager = (managerName: string) => {
    setExpandedManager(expandedManager === managerName ? null : managerName);
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Section Title */}
      <div className="flex items-start gap-1 mb-4">
        <div className="w-[3px] h-[18px] bg-[#da0011] mt-0.5"></div>
        <h2 className="text-[15px] font-bold text-[#1e1e1e] leading-tight">Fund Manager</h2>
      </div>

      {/* Strategic Insight Box */}
      {isAIGenerated && (
        <div className="p-3 pb-3 bg-[#f0f0f0] rounded-r relative overflow-hidden">
          {/* AI Tag */}
          <div className="absolute top-0 right-0 z-10">
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-[8px] font-bold text-white">AI</span>
            </div>
          </div>
          <p className="text-[10px] text-[#767676] leading-snug relative z-10">
            Your funds are managed by experienced managers with an average tenure of <span className="font-bold">7+ years</span>. Zhou Haitao shows excellent performance with <span className="font-bold">300.09%</span> tenure return.
          </p>
        </div>
      )}

      {/* Manager Distribution Header */}
      <div className="text-[10px] text-[#767676] font-medium mb-2">
        Current Fund Manager Distribution <span className="font-bold text-[#1e1e1e]">by Allocation</span>
      </div>

      {/* Fund Manager List Header */}
      <div className="flex text-[9px] font-bold text-[#767676] uppercase tracking-tighter pb-2 border-b border-gray-100">
        <div className="w-[40%]">Manager Name</div>
        <div className="w-[30%] text-center">Allocation</div>
        <div className="w-[30%] text-right pr-1">Amount</div>
      </div>

      {/* Manager Holdings List */}
      <div className="space-y-2">
        {managerHoldings
          .sort((a, b) => b.allocation - a.allocation)
          .map((manager, idx) => {
            const isExpanded = expandedManager === manager.name;
            const allocationAmount = (totalAssetValue * manager.allocation) / 100;
            
            return (
              <div key={idx} className="border-b border-gray-50 last:border-0 pb-3">
                <div 
                  className="flex items-center py-1 cursor-pointer active:bg-gray-50 rounded transition-colors"
                  onClick={() => toggleManager(manager.name)}
                >
                  <div className="w-[40%] text-[11px] font-bold text-[#1e1e1e] leading-tight pr-2">
                    {manager.name}
                    <div className="text-[9px] text-[#767676] font-medium mt-0.5">{manager.company}</div>
                  </div>
                  <div className="w-[30%] text-center">
                    <div className="text-[11px] font-bold text-[#1e1e1e]">
                      {manager.allocation.toFixed(2)}%
                    </div>
                    <div className="text-[9px] text-[#767676] font-medium mt-0.5">{manager.fundCount} fund(s)</div>
                  </div>
                  <div className="w-[30%] text-right pr-1 flex items-center justify-end gap-1">
                    <div className="text-[11px] font-bold text-[#1e1e1e]">
                      {allocationAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </div>
                    <svg 
                      className={`w-3 h-3 text-[#767676] transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Manager Details */}
                {isExpanded && (
                  <div className="mt-3 p-3 bg-gray-50/80 rounded-lg space-y-3 animate-fade-in">
                    {/* Manager Photo and Basic Info */}
                    <div className="flex gap-3 pb-3 border-b border-gray-200">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {manager.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-[#1e1e1e]">{manager.name}</div>
                        <div className="text-[9px] text-[#767676] mt-0.5">{manager.company}</div>
                        <div className="text-[9px] text-[#767676] mt-1">
                          <span className="font-medium">Tenure:</span> {manager.tenure}
                        </div>
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-2 rounded">
                        <div className="text-[8px] text-[#767676] uppercase tracking-wide mb-1">Tenure Return</div>
                        <div className="text-[13px] font-bold text-[#da0011]">{manager.return}</div>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <div className="text-[8px] text-[#767676] uppercase tracking-wide mb-1">Funds Managed</div>
                        <div className="text-[13px] font-bold text-[#1e1e1e]">{manager.fundCount}</div>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <div className="text-[8px] text-[#767676] uppercase tracking-wide mb-1">Total AUM</div>
                        <div className="text-[13px] font-bold text-[#1e1e1e]">{manager.totalAUM}</div>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <div className="text-[8px] text-[#767676] uppercase tracking-wide mb-1">Experience</div>
                        <div className="text-[13px] font-bold text-[#1e1e1e]">{manager.tenure}</div>
                      </div>
                    </div>

                    {/* Rating Radar Chart */}
                    <div className="bg-white p-3 rounded">
                      <div className="text-[9px] font-bold text-[#1e1e1e] mb-2">Manager Rating</div>
                      <div className="relative w-full h-32 flex items-center justify-center">
                        {/* Pentagon Radar Chart */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Background grid (5 levels) */}
                          {[1, 2, 3, 4, 5].map((level) => {
                            const scale = level * 0.2;
                            const points = [
                              { x: 50, y: 10 * scale + 10 }, // Top
                              { x: 50 + 35 * scale, y: 25 * scale + 10 }, // Top Right
                              { x: 50 + 22 * scale, y: 60 * scale + 10 }, // Bottom Right
                              { x: 50 - 22 * scale, y: 60 * scale + 10 }, // Bottom Left
                              { x: 50 - 35 * scale, y: 25 * scale + 10 }, // Top Left
                            ];
                            const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
                            return (
                              <path
                                key={level}
                                d={pathData}
                                fill="none"
                                stroke="#e5e5e5"
                                strokeWidth="0.5"
                              />
                            );
                          })}
                          
                          {/* Data polygon */}
                          {(() => {
                            const ratings = {
                              performance: manager.performanceRating / 100,
                              risk: manager.riskRating / 100,
                              selection: 0.93,
                              timing: 0.87,
                              stability: 0.95
                            };
                            const values = [ratings.performance, ratings.selection, ratings.risk, ratings.stability, ratings.timing];
                            const points = [
                              { x: 50, y: 10 + (1 - values[0]) * 60 }, // Performance
                              { x: 50 + values[1] * 35, y: 10 + 25 }, // Selection
                              { x: 50 + values[2] * 22, y: 10 + 60 }, // Risk
                              { x: 50 - values[3] * 22, y: 10 + 60 }, // Stability
                              { x: 50 - values[4] * 35, y: 10 + 25 }, // Timing
                            ];
                            const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
                            return (
                              <>
                                <path
                                  d={pathData}
                                  fill="rgba(218, 0, 17, 0.2)"
                                  stroke="#da0011"
                                  strokeWidth="1.5"
                                />
                                {points.map((p, i) => (
                                  <circle key={i} cx={p.x} cy={p.y} r="2" fill="#da0011" />
                                ))}
                              </>
                            );
                          })()}
                          
                          {/* Labels */}
                          <text x="50" y="8" textAnchor="middle" fontSize="5" fill="#767676">Performance</text>
                          <text x="88" y="38" textAnchor="start" fontSize="5" fill="#767676">Selection</text>
                          <text x="75" y="76" textAnchor="start" fontSize="5" fill="#767676">Risk</text>
                          <text x="25" y="76" textAnchor="end" fontSize="5" fill="#767676">Stability</text>
                          <text x="12" y="38" textAnchor="end" fontSize="5" fill="#767676">Timing</text>
                        </svg>
                      </div>
                      <div className="flex justify-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-[#da0011] rounded-full"></div>
                          <span className="text-[8px] text-[#767676]">Score: {manager.performanceRating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Strength Tags */}
                    <div className="space-y-1.5">
                      <div className="text-[9px] font-bold text-[#1e1e1e]">Core Strengths</div>
                      <div className="flex flex-wrap gap-1.5">
                        {manager.strengthTags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 bg-gradient-to-r from-blue-50 to-blue-100 text-[8px] font-medium text-blue-700 rounded-full border border-blue-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <div className="text-[9px] font-bold text-[#1e1e1e]">Profile</div>
                      <p className="text-[9px] text-[#767676] leading-relaxed">
                        {manager.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ManagerTab;
