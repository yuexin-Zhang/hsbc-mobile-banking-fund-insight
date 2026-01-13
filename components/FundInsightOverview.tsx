
import React, { useState, useRef, useMemo, useEffect } from 'react';
import AIAssistant from './AIAssistant';

interface FundInsightOverviewProps {
  onBack: () => void;
  onGoToDetails: () => void;
  onGoToSimulation: () => void;
}

const FundInsightOverview: React.FC<FundInsightOverviewProps> = ({ onBack, onGoToDetails, onGoToSimulation }) => {
  const [hoverData, setHoverData] = useState<{ index: number; x: number; y: number } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dateRange, setDateRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'YTD'>('1Y');
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // State for line visibility toggles
  const [visibleLines, setVisibleLines] = useState({
    fund: true,
    saa: true
  });

  const colors = {
    red: '#da0011',
    lightRed: '#fca5a5',
    grey: '#9ca3af',
    dark: '#1e1e1e',
    greyBg: '#f4f5f6',
    border: '#ebeef0',
    muted: '#767676',
    axis: '#dcddde'
  };

  const chartData = useMemo(() => [
    { date: '2025-01', all: 0, fund: 0, saa: 0 },
    { date: '2025-01', all: 1.2, fund: 0.8, saa: 0.5 },
    { date: '2025-01', all: 2.8, fund: 2.1, saa: 1.2 },
    { date: '2025-01', all: 4.5, fund: 4.2, saa: 2.8 },
    { date: '2025-02', all: 6.2, fund: 6.8, saa: 4.5 },
    { date: '2025-02', all: 8.9, fund: 9.5, saa: 6.2 },
    { date: '2025-02', all: 10.5, fund: 11.8, saa: 7.8 },
    { date: '2025-03', all: 12.8, fund: 14.2, saa: 9.5 },
    { date: '2025-03', all: 11.5, fund: 12.8, saa: 8.9 },
    { date: '2025-03', all: 13.2, fund: 15.5, saa: 10.2 },
    { date: '2025-04', all: 10.8, fund: 12.2, saa: 9.1 },
    { date: '2025-04', all: 9.2, fund: 10.5, saa: 7.8 },
    { date: '2025-04', all: 8.5, fund: 9.2, saa: 6.9 },
    { date: '2025-05', all: 7.8, fund: 8.1, saa: 6.2 },
    { date: '2025-05', all: 6.5, fund: 6.8, saa: 5.5 },
    { date: '2025-05', all: 5.8, fund: 5.2, saa: 4.8 },
    { date: '2025-06', all: 7.2, fund: 7.5, saa: 6.1 },
    { date: '2025-06', all: 9.5, fund: 10.2, saa: 8.2 },
    { date: '2025-07', all: 11.8, fund: 12.8, saa: 9.8 },
    { date: '2025-07', all: 14.2, fund: 15.5, saa: 11.5 },
    { date: '2025-08', all: 16.8, fund: 18.2, saa: 13.8 },
    { date: '2025-08', all: 19.5, fund: 21.5, saa: 16.2 },
    { date: '2025-09', all: 22.8, fund: 25.2, saa: 18.9 },
    { date: '2025-09', all: 26.5, fund: 28.59, saa: 21.8 }, // Peak for fund
    { date: '2025-10', all: 24.2, fund: 26.8, saa: 20.5 },
    { date: '2025-10', all: 21.8, fund: 23.8, saa: 19.2 }, // Start of max drawdown
    { date: '2025-10', all: 19.5, fund: 21.2, saa: 17.8 },
    { date: '2025-11', all: 17.2, fund: 18.5, saa: 16.5 },
    { date: '2025-11', all: 16.8, fund: 17.8, saa: 15.9 },
    { date: '2025-11', all: 18.5, fund: 20.2, saa: 17.2 },
    { date: '2025-12', all: 20.8, fund: 22.8, saa: 19.1 },
    { date: '2025-12', all: 23.5, fund: 25.5, saa: 21.2 },
    { date: '2025-12', all: 26.2, fund: 28.2, saa: 23.5 },
    { date: '2026-01', all: 28.8, fund: 30.5, saa: 25.2 },
    { date: '2026-01', all: 30.5, fund: 32.8, saa: 26.8 },
    { date: '2026-01', all: 29.2, fund: 31.5, saa: 25.83 },
  ], []);

  const saaComparisonData = [
    { class: 'China Equity', saa: 19.4, current: 25.7, comp: '+6.3%', lpChange: '+1.2%', trend: 'up' },
    { class: 'Asia ex Japan Equity', saa: 9.6, current: 1.5, comp: '-8.1%', lpChange: '-0.4%', trend: 'down' },
    { class: 'Dev. Markets Equity', saa: 29.5, current: 1.6, comp: '-27.9%', lpChange: '+0.1%', trend: 'up' },
    { class: 'China Fixed Income', saa: 14.9, current: 6.0, comp: '-8.9%', lpChange: '-1.5%', trend: 'down' },
    { class: 'Asia Invest. Grade', saa: 4.2, current: 0.6, comp: '-3.6%', lpChange: '+0.2%', trend: 'up' },
    { class: 'Global Invest. Grade', saa: 16.8, current: 8.5, comp: '-8.3%', lpChange: '-2.1%', trend: 'down' },
    { class: 'Liquidity', saa: 2.0, current: 53.7, comp: '+51.7%', lpChange: '+4.5%', trend: 'up' },
    { class: 'Others', saa: 0.9, current: 0.9, comp: '0.0%', lpChange: '0.0%', trend: 'none' },
  ];

  const handleExport = () => {
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const toggleLine = (line: 'fund' | 'saa') => {
    setVisibleLines(prev => ({ ...prev, [line]: !prev[line] }));
  };

  const getFilteredChartData = () => {
    const allData = chartData;
    // Data goes from 2025-01 to 2026-01 (latest date in data)
    // Total 36 data points across 13 months
    
    let startIndex = 0;
    
    switch (dateRange) {
      case '1M':
        // Last 1 month (2026-01): last 3 data points
        startIndex = Math.max(0, allData.length - 3);
        break;
      case '3M':
        // Last 3 months (2025-11, 2025-12, 2026-01): ~12 data points
        // Find first data point from 2025-11
        startIndex = allData.findIndex(d => d.date >= '2025-11');
        if (startIndex === -1) startIndex = Math.max(0, allData.length - 12);
        break;
      case '6M':
        // Last 6 months (2025-08 to 2026-01): ~18 data points
        // Find first data point from 2025-08
        startIndex = allData.findIndex(d => d.date >= '2025-08');
        if (startIndex === -1) startIndex = Math.max(0, allData.length - 18);
        break;
      case '1Y':
        // Last 1 year (all data from 2025-01 to 2026-01)
        startIndex = 0;
        break;
      case 'YTD':
        // Year to date (from 2026-01-01 to current)
        // Since we're in Jan 2026, this should only show 2026-01 data
        startIndex = allData.findIndex(d => d.date.startsWith('2026-01'));
        if (startIndex === -1) startIndex = 0;
        break;
    }
    
    return allData.slice(startIndex);
  };

  const renderLineChart = () => {
    const filteredData = getFilteredChartData();
    // 动态计算Y轴刻度，基于当前数据范围
    const maxValue = Math.max(...filteredData.map(d => Math.max(d.fund, d.saa)));
    const minValue = Math.min(...filteredData.map(d => Math.min(d.fund, d.saa)));
    // 如果最小值大于0，则Y轴范围从0开始
    const yMax = maxValue;
    const yMin = Math.min(minValue, 0);
    const yTicks = [
      Math.ceil(yMax),
      Math.ceil(yMax * 0.8),
      Math.ceil(yMax * 0.6),
      Math.ceil(yMax * 0.4),
      Math.ceil(yMax * 0.2),
      yMin >= 0 ? 0 : Math.floor(yMin * 0.5)
    ].filter(val => val !== undefined && !isNaN(val)).sort((a, b) => b - a); // 确保去重并排序
      
    // 根据过滤后的数据重新计算 x 轴刻度，确保显示不同的月份
    const getXTicksIndices = () => {
      if (filteredData.length <= 1) return [0];
      
      // Get unique months from filtered data
      const monthsMap = new Map<string, number>();
      filteredData.forEach((d, idx) => {
        if (!monthsMap.has(d.date)) {
          monthsMap.set(d.date, idx);
        }
      });
      
      const uniqueMonths = Array.from(monthsMap.entries());
      
      // For different ranges, show appropriate month labels
      if (dateRange === '1M' || dateRange === 'YTD') {
        // Show first and last
        return [0, filteredData.length - 1];
      } else if (dateRange === '3M') {
        // Show 3-4 labels distributed across 3 months
        const indices = uniqueMonths.map(([_, idx]) => idx);
        if (indices.length <= 4) return [...indices, filteredData.length - 1].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
        // Select evenly distributed indices
        return [indices[0], indices[Math.floor(indices.length / 2)], filteredData.length - 1];
      } else if (dateRange === '6M') {
        // Show 4-6 labels distributed across 6 months
        const indices = uniqueMonths.map(([_, idx]) => idx);
        if (indices.length <= 6) return [...indices, filteredData.length - 1].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
        // Select evenly distributed indices
        return [indices[0], indices[Math.floor(indices.length / 3)], indices[Math.floor(indices.length * 2 / 3)], filteredData.length - 1];
      } else {
        // 1Y: Show more labels
        const indices = uniqueMonths.map(([_, idx]) => idx);
        if (indices.length <= 8) return [...indices].sort((a, b) => a - b);
        // Select evenly distributed indices every 2-3 months
        const step = Math.floor(indices.length / 6);
        return indices.filter((_, i) => i % step === 0 || i === indices.length - 1).sort((a, b) => a - b);
      }
    };
    
    const xTicksIndices = getXTicksIndices();
  
    const getYForFiltered = (val: number) => 100 - ((val - yMin) / (yMax - yMin)) * 100;
    const getXForFiltered = (index: number) => (index / Math.max(1, filteredData.length - 1)) * 100;
  
    const getSmoothPathForFiltered = (data: typeof chartData, key: 'all' | 'fund' | 'saa') => {
      if (data.length < 2) return '';
      const points = data.map((d, i) => ({ x: getXForFiltered(i), y: getYForFiltered(d[key]) }));
      let d = `M ${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cp1x = p0.x + (p1.x - p0.x) / 2;
        d += ` C ${cp1x},${p0.y} ${cp1x},${p1.y} ${p1.x},${p1.y}`;
      }
      return d;
    };
  
    return (
      <div className="relative w-full mt-4 bg-white rounded-[3px] pb-2">
        {/* Toggle Controls */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button 
            onClick={() => toggleLine('fund')}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] border text-[9px] font-bold transition-all ${visibleLines.fund ? 'bg-red-50 border-red-100 text-[#fca5a5]' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'}`}
          >
            <div className={`w-1.5 h-0.5 ${visibleLines.fund ? 'bg-[#fca5a5]' : 'bg-gray-300'}`}></div>
            Fund
          </button>
          <button 
            onClick={() => toggleLine('saa')}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] border text-[9px] font-bold transition-all ${visibleLines.saa ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'}`}
          >
            <div className={`w-1.5 h-0.5 ${visibleLines.saa ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            SAA
          </button>
        </div>
  
        <div className="flex h-32 relative">
          <div className="w-8 relative h-full pointer-events-none flex flex-col justify-between">
            {yTicks.map((val) => (
              <div key={val} className="absolute right-1 text-[7px] font-medium text-[#767676] -translate-y-1/2" style={{ top: `${getYForFiltered(val)}%` }}>
                {val > 0 ? `+${val}%` : `${val}%`}
              </div>
            ))}
          </div>
            
          <div className="flex-1 relative h-full" onMouseMove={(e) => {
              if (!containerRef.current || filteredData.length === 0) return;
              const rect = containerRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const index = Math.min(filteredData.length - 1, Math.max(0, Math.round((x / rect.width) * (filteredData.length - 1))));
              setHoverData({ index, x, y: getYForFiltered(filteredData[index].fund) });
            }} onMouseLeave={() => setHoverData(null)} ref={containerRef}>
                          
            <div className="absolute inset-0 flex flex-col justify-between opacity-[0.03] pointer-events-none">
              {yTicks.map((_, i) => <div key={i} className="border-t border-black w-full"></div>)}
            </div>
              
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="0" y2="100" stroke={colors.axis} strokeWidth="0.5" />
              <line x1="0" y1="100" x2="100" y2="100" stroke={colors.axis} strokeWidth="0.5" />
                            
              {visibleLines.fund && (
                <path d={getSmoothPathForFiltered(filteredData, 'fund')} fill="none" stroke={colors.lightRed} strokeWidth="1.2" strokeLinecap="round" />
              )}
                            
              {visibleLines.saa && (
                <path d={getSmoothPathForFiltered(filteredData, 'saa')} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
              )}
            
              {/* Drawdown area - highlighting the maximum drawdown period */}
              {visibleLines.fund && (() => {
                // Find peak and trough for max drawdown
                let peakIndex = 0;
                let troughIndex = 0;
                let maxDrawdown = 0;
                
                for (let i = 0; i < filteredData.length; i++) {
                  for (let j = i + 1; j < filteredData.length; j++) {
                    const drawdown = ((filteredData[i].fund - filteredData[j].fund) / filteredData[i].fund) * 100;
                    if (drawdown > maxDrawdown) {
                      maxDrawdown = drawdown;
                      peakIndex = i;
                      troughIndex = j;
                    }
                  }
                }
                
                if (maxDrawdown > 5) { // Only show if drawdown is significant
                  const peakX = getXForFiltered(peakIndex);
                  const peakY = getYForFiltered(filteredData[peakIndex].fund);
                  const troughX = getXForFiltered(troughIndex);
                  const troughY = getYForFiltered(filteredData[troughIndex].fund);
                  
                  // Create path for drawdown area (vertical rectangle)
                  return (
                    <>
                      <path 
                        d={`M ${peakX},${peakY} L ${troughX},${troughY} L ${troughX},${peakY} Z`}
                        fill="#34d399" 
                        fillOpacity="0.15" 
                        stroke="#34d399" 
                        strokeWidth="0.8" 
                        strokeDasharray="3 2" 
                      />
                      {/* Vertical line at peak */}
                      <line 
                        x1={peakX} 
                        y1={peakY} 
                        x2={peakX} 
                        y2="100" 
                        stroke="#34d399" 
                        strokeWidth="0.5" 
                        strokeDasharray="2 2" 
                        opacity="0.6"
                      />
                      {/* Vertical line at trough */}
                      <line 
                        x1={troughX} 
                        y1={troughY} 
                        x2={troughX} 
                        y2="100" 
                        stroke="#34d399" 
                        strokeWidth="0.5" 
                        strokeDasharray="2 2" 
                        opacity="0.6"
                      />
                    </>
                  );
                }
                return null;
              })()}
            
              {hoverData && <line x1={getXForFiltered(hoverData.index)} y1="0" x2={getXForFiltered(hoverData.index)} y2="100" stroke={colors.muted} strokeWidth="0.5" strokeDasharray="3 2" />}
            </svg>
              
            <div className="absolute top-[108%] left-0 right-0 pointer-events-none">
              {xTicksIndices.map((idx, i) => (
                <div key={`tick-${i}-${idx}`} className="absolute text-[7px] font-medium text-[#767676] -translate-x-1/2" style={{ left: `${getXForFiltered(idx)}%` }}>
                  {filteredData[idx]?.date.substring(2) || ''}
                </div>
              ))}
            </div>
  
            {hoverData && (
              <div className="absolute z-20 bg-[#1e1e1e]/90 shadow-2xl rounded-[2px] p-1.5 text-white pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2" style={{ left: `${getXForFiltered(hoverData.index)}%`, top: `${getYForFiltered(filteredData[hoverData.index]?.fund || 0)}%` }}>
                <div className="text-[7px] opacity-60 text-center leading-none mb-1">{filteredData[hoverData.index]?.date}</div>
                <div className="space-y-0.5">
                  {visibleLines.fund && <div className="flex justify-between items-center gap-2 text-[8px]"><span className="opacity-70">Fund:</span><span className="font-bold text-red-200">{filteredData[hoverData.index]?.fund.toFixed(2)}%</span></div>}
                  {visibleLines.saa && <div className="flex justify-between items-center gap-2 text-[8px]"><span className="opacity-70">SAA:</span><span className="font-bold text-blue-300">{filteredData[hoverData.index]?.saa.toFixed(2)}%</span></div>}
                  {/* Show only fund drawdown when hovering over any period where fund value drops */}
                  {hoverData.index > 0 && filteredData[hoverData.index]?.fund < filteredData[hoverData.index - 1]?.fund && (
                    <div className="flex justify-between items-center gap-2 text-[8px] border-t border-white/20 pt-0.5 mt-0.5">
                      <span className="opacity-70">Drawdown:</span>
                      <span className="font-bold text-emerald-400">{(filteredData[hoverData.index - 1]?.fund - filteredData[hoverData.index]?.fund).toFixed(2)}%</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
  
        {/* Date Range Filter */}
        <div className="flex flex-wrap gap-2 pt-3 mt-3 border-gray-100 justify-center">
          {(['1M', '3M', '6M', '1Y', 'YTD'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 rounded-[2px] text-[9px] font-bold transition-all border ${
                dateRange === range
                  ? 'bg-[#da0011] text-white border-[#da0011]'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSAAComparison = () => {
    return (
      <div className="bg-white rounded-[3px] p-5 border border-[#ebeef0] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#da0011] rounded-full"></div>
            <h3 className="text-[10px] font-bold text-[#1e1e1e] uppercase">Asset Allocation vs SAA</h3>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-0.5 rounded-full">
            <span className="text-[9px] font-bold text-[#767676]">Adventurous</span>
            <div className="w-3.5 h-3.5 bg-[#767676] rounded-full flex items-center justify-center text-white text-[8px] font-bold">4</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-4 justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#da0011]"></div>
            <span className="text-[9px] text-[#767676] font-medium">SAA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#dcddde]"></div>
            <span className="text-[9px] text-[#767676] font-medium">Your Allocation</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Header Row */}
          <div className="flex text-[9px] font-bold text-[#767676] uppercase tracking-tighter pb-2 border-b border-gray-100">
            <div className="w-[35%]">Asset Class</div>
            <div className="w-[35%] text-center">Percentage</div>
            <div className="w-[15%] text-center">Comp</div>
            <div className="w-[15%] text-right pr-1">vs L/P</div>
          </div>

          {/* Data Rows */}
          {saaComparisonData.map((item, idx) => (
            <div key={idx} className="flex items-center py-0.5">
              <div className="w-[35%] text-[10px] font-bold text-[#1e1e1e] leading-tight pr-2">
                {item.class}
              </div>
              <div className="w-[35%] space-y-1">
                {/* SAA Bar */}
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-2.5 bg-gray-50 rounded-sm overflow-hidden">
                    <div className="h-full bg-[#da0011]" style={{ width: `${item.saa}%` }}></div>
                  </div>
                  <span className="text-[8px] font-bold text-[#da0011] w-6 shrink-0">{item.saa}%</span>
                </div>
                {/* Current Bar */}
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-2.5 bg-gray-50 rounded-sm overflow-hidden">
                    <div className="h-full bg-[#dcddde]" style={{ width: `${item.current}%` }}></div>
                  </div>
                  <span className="text-[8px] font-bold text-[#767676] w-6 shrink-0">{item.current}%</span>
                </div>
              </div>
              <div className={`w-[15%] text-center text-[10px] font-bold ${item.comp.startsWith('+') ? 'text-[#da0011]' : item.comp.startsWith('-') ? 'text-[#008c4a]' : 'text-[#1e1e1e]'}`}>
                {item.comp}
              </div>
              <div className="w-[15%] text-right text-[10px] font-bold text-[#1e1e1e] pr-1 flex items-center justify-end gap-0.5">
                {item.lpChange}
                {item.trend === 'up' && <span className="text-[#da0011] text-[7px] scale-90">▲</span>}
                {item.trend === 'down' && <span className="text-[#008c4a] text-[7px] scale-90">▼</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded-[2px] border border-gray-100">
          <p className="text-[9px] text-[#767676] italic leading-tight">
            *SAA (Strategic Asset Allocation) refers to the optimal long-term allocation for your risk profile (Adventurous 4).
          </p>
        </div>
      </div>
    );
  };

  const HoldingsOverview = () => {
    return (
      <div className="bg-white rounded-[3px] border border-[#ebeef0] shadow-sm overflow-hidden">
        <div className="px-5 py-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-[#4a90e2] rounded-sm"></div>
            <h3 className="text-[15px] font-bold text-[#1e1e1e]">Holdings Overview</h3>
          </div>

          <div className="space-y-2.5">
            {/* Performance */}
            <div className="flex items-start">
              <span className="text-[12px] text-[#767676] font-medium w-[85px] flex-shrink-0">Performance</span>
              <div className="flex-1 flex items-center gap-1 flex-wrap">
                <span className="text-[12px]">1Y Return: </span>
                <span className="text-[12px] font-bold text-[#da0011]">28.59%</span>
                <span className="text-[12px]">| Max Drawdown: </span>
                <span className="text-[12px] font-bold text-[#da0011]">16.70%</span>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-start">
              <span className="text-[12px] text-[#767676] font-medium w-[85px] flex-shrink-0">Category</span>
              <div className="flex-1 flex items-center">
                <span className="text-[12px] font-bold text-[#da0011]">92%</span>
                <span className="text-[12px] ml-[2px]">Domestic Equity</span>
                <span className="text-[10px] font-medium text-[#da0011] border border-[#da0011] px-0.5 rounded-sm ml-[4px] bg-[#FFF1F0]">Highest</span>
              </div>
            </div>

            {/* Style */}
            <div className="flex items-start">
              <span className="text-[12px] text-[#767676] font-medium w-[85px] flex-shrink-0">Style</span>
              <div className="flex-1 flex items-center">
                <span className="text-[12px] font-bold text-[#da0011]">70%</span>
                <span className="text-[12px] ml-[2px]">Balanced Style</span>
                <span className="text-[10px] font-medium text-[#da0011] border border-[#da0011] px-0.5 rounded-sm ml-[4px] bg-[#FFF1F0]">Concentrated</span>
              </div>
            </div>

            {/* Manager */}
            <div className="flex items-start">
              <span className="text-[12px] text-[#767676] font-medium w-[85px] flex-shrink-0">Manager</span>
              <div className="flex-1">
                <span className="text-[12px]">Balanced Manager Distribution</span>
              </div>
            </div>

            {/* Assets */}
            <div className="flex items-start">
              <span className="text-[12px] text-[#767676] font-medium w-[85px] flex-shrink-0">Assets</span>
              <div className="flex-1">
                <span className="text-[12px]">Diversified Sector Allocation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PortfolioTable = () => {
    // 模拟图片中的数据
    const holdings = [
      { name: 'BGF WLD MIN', id: 'IPFD3004', mktValue: '$134,832.39', returnVal: '+$24,098.31', returnPct: '21.76%', isPositive: true },
      { name: 'BGF ENERGY', id: 'IPFD3145', mktValue: '$160,062.60', returnVal: '-$1,390.27', returnPct: '0.86%', isPositive: false },
      { name: 'BGF GOLD', id: 'IPFD3131', mktValue: '$59,266.81', returnVal: '+$9,266.81', returnPct: '18.53%', isPositive: true },
      { name: 'BLK Sys GE High Inc', id: 'IPFD3116', mktValue: '$215,204.06', returnVal: '+$85,395.59', returnPct: '42.56%', isPositive: true },
      { name: 'BLK Sys GE High Inc', id: 'IPFD2116', mktValue: '$213,257.23', returnVal: '+$23,283.08', returnPct: '11.10%', isPositive: true },
      { name: 'BIK World Tech', id: 'IPFD2254', mktValue: '$76,635.33', returnVal: '+$156.18', returnPct: '0.20%', isPositive: true },
      { name: 'JPM GEHI USD', id: 'IPFD3540', mktValue: '$83,452.34', returnVal: '+$3,592.43', returnPct: '4.41%', isPositive: true },
    ];

    const trustHoldings = [
      { name: 'CR Trust FirstEagle No.1', id: 'T1C477', mktValue: '¥1,269,517.24', returnVal: '+¥219,517.24', returnPct: '20.91%', isPositive: true },
      { name: 'CR Trust FirstEagle No.8', id: 'T1E648', mktValue: '¥1,034,379.31', returnVal: '-¥15,620.69', returnPct: '1.49%', isPositive: false },
    ];

    // 渲染行的组件
    const Row = ({ item }) => (
      <div className="flex items-center py-2.5 border-b border-gray-100 last:border-0">
        <div className="w-[45%] text-[10px] font-bold text-[#1e1e1e] leading-tight pr-2">
          {item.name}
          <div className="text-[#767676] font-normal">{item.id}</div>
        </div>
        <div className="w-[30%] text-[10px] font-bold text-[#1e1e1e] text-center">
          {item.mktValue}
        </div>
        <div className="w-[25%] text-right">
          <div className={`text-[10px] font-bold ${item.isPositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
            {item.returnVal}
          </div>
          <div className={`text-[10px] flex items-center justify-end font-medium ${item.isPositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
            {item.returnPct}
            <span className="ml-1">{item.isPositive ? '▲' : '▼'}</span>
          </div>
        </div>
      </div>
    );

    return (
      <div className="bg-white rounded-[3px] p-5 border border-[#ebeef0] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-[#4a90e2] rounded-sm"></div>
            <h3 className="text-[15px] font-bold text-[#1e1e1e]">Holdings Overview</h3>
          </div>
        </div>

        {/* Header Row */}
        <div className="flex text-[9px] font-bold text-[#767676] tracking-tighter pb-2 border-b border-gray-100">
          <div className="w-[45%]">Holding</div>
          <div className="w-[30%] text-center">Mkt Value</div>
          <div className="w-[25%] text-right">Total Return</div>
        </div>

        {/* 第一部分内容 */}
        <div className="space-y-2.5 py-2.5">
          {holdings.map((h, i) => (
            <div key={`holdings-${i}`}>
              <Row item={h} />
            </div>
          ))}
        </div>

        {/* 分隔标题 (CNY 部分) */}
        <div className="bg-gray-100 px-3 py-2.5 my-3 border border-gray-100 rounded-[2px]">
          <div className="text-[#767676] font-bold text-[10px] uppercase">ASSET MANAGEMENT & TRUST</div>
          <div className="flex text-[9px] font-bold text-[#767676] uppercase tracking-tighter pt-2 border-t border-gray-100 mt-2">
            <div className="w-[45%]">Holding</div>
            <div className="w-[30%] text-center">Mkt Value</div>
            <div className="w-[25%] text-right">Total Return</div>
          </div>
        </div>

        {/* 第二部分内容 */}
        <div className="space-y-2.5 py-2.5">
          {trustHoldings.map((h, i) => (
            <div key={`trust-${i}`}>
              <Row item={h} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col h-full bg-[#f4f5f6] font-sans relative">
      {/* Scrollable content wrapper */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[100] animate-fade-in">
          <div className="bg-[#1e1e1e]/90 text-white px-4 py-2 rounded-full text-[11px] font-bold shadow-xl flex items-center gap-2 whitespace-nowrap border border-white/10">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Export report successful
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#da0011] pt-12 pb-4 px-4 sticky top-0 z-50">
        <div className="flex items-center justify-between text-white">
          <button onClick={onBack} className="p-1 active:opacity-60 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <div className="flex flex-col items-center">
             <h1 className="text-sm font-bold tracking-widest">Fund Holding Insights</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleExport}
              className="p-1 active:opacity-60 transition-opacity text-white/90 hover:text-white"
              title="Export Report"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </button>
            <button 
              onClick={onGoToSimulation}
              className="p-1 active:opacity-60 transition-opacity text-white/90 hover:text-white"
              title="Simulation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-10">
        {/* Total Holding with Link */}
        <div 
          className="bg-white rounded-[3px] p-5 border border-[#ebeef0] shadow-sm active:bg-gray-50 transition-colors cursor-pointer"
        >
          {/* Checkbox and label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded bg-[#4a90e2] flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-[11px] text-[#767676] font-medium">Include Money Market Funds</span>
          </div>

          {/* Amount and link row */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[28px] font-bold text-[#1e1e1e] tracking-tight leading-none mb-1.5">9,395,746.24</div>
              <div className="text-[11px] text-[#767676] font-medium">Holding Amount (CNY)</div>
            </div>
            <div className="flex items-center gap-1 text-[#767676] pb-0.5">
              <span className="text-[11px] font-medium">Total 9 Funds</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>

        {HoldingsOverview()}
        {/* Portfolio Performance Section */}
        <div className="bg-white rounded-[3px] p-4 border border-[#ebeef0] shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-[#4a90e2] rounded-sm"></div>
            <h3 className="text-[15px] font-bold text-[#1e1e1e]">Holdings Performance</h3>
          </div>

          {/* Metrics with dots */}
          <div class="flex items-center text-[10px] gap-2">
            <div class="flex items-center">
              <span class="w-2 h-2 rounded-full bg-red-600 mr-1"></span>
              <span class="text-gray-900 font-medium">Funds:</span>
              <span class="ml-1 text-red-600 font-bold">28.59%</span>
            </div>

            <div class="flex items-center">
              <span class="w-2 h-2 rounded-full bg-emerald-400 mr-1"></span>
              <span class="text-gray-900 font-medium">Drawdown:</span>
              <span class="ml-1 text-gray-900 font-medium">16.70%</span>
            </div>

            <div class="flex items-center">
              <span class="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
              <span class="text-gray-900 font-medium">SAA:</span>
              <span class="ml-1 text-gray-900 font-medium">25.83%</span>
            </div>
          </div>

          {/* Chart Section */}
          {renderLineChart()}

          
        </div>
        {/* Holding Performance Table */}
        {PortfolioTable()}

        {/* Asset Allocation Comparison Section */}
        {/* {renderSAAComparison()} */}

      </div>

      {/* Floating Action Button */}
      <div className="sticky bottom-4 left-0 right-0 z-50 pointer-events-none px-4">
        <div className="flex justify-center">
          <button 
            className="group relative flex items-center gap-3 px-6 py-3.5 rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 pointer-events-auto"
            style={{
              background: 'linear-gradient(135deg, #da0011 0%, #ff4757 50%, #ff6b7a 100%)',
            }}
            onClick={() => {
              setShowAIAssistant(true);
            }}
          >
          {/* Animated background gradient overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #ff4757 0%, #da0011 50%, #b8000e 100%)',
            }}
          />
          
          {/* Microphone Icon */}
          <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </div>

          {/* Button Text */}
          <span className="relative z-10 text-white font-bold text-[10px] tracking-wide whitespace-nowrap">
            Ask: "Will the market continue to rise?"
          </span>

          {/* Chat Icon */}
          <div className="relative z-10 flex items-center justify-center">
            <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </button>
        </div>
      </div>
      </div>

      {/* AI Assistant Modal - Outside scrollable area */}
      {showAIAssistant && <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />}
    </div>
  );
};

export default FundInsightOverview;
