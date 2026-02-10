import React, { useState, useRef } from 'react';

interface ChartDataPoint {
  date: string;
  all: number;
  fund: number;
  saa: number;
}

interface HoldingsPerformanceChartProps {
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

const HoldingsPerformanceChart: React.FC<HoldingsPerformanceChartProps> = ({ chartData, colors }) => {
  const [hoverData, setHoverData] = useState<{ index: number; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dateRange, setDateRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'YTD'>('1Y');
  const [visibleLines, setVisibleLines] = useState({
    fund: true,
    saa: true
  });

  const toggleLine = (line: 'fund' | 'saa') => {
    setVisibleLines(prev => ({ ...prev, [line]: !prev[line] }));
  };

  const getFilteredChartData = () => {
    const allData = chartData;
    let startIndex = 0;
    
    switch (dateRange) {
      case '1M':
        startIndex = Math.max(0, allData.length - 3);
        break;
      case '3M':
        startIndex = allData.findIndex(d => d.date >= '2025-11');
        if (startIndex === -1) startIndex = Math.max(0, allData.length - 12);
        break;
      case '6M':
        startIndex = allData.findIndex(d => d.date >= '2025-08');
        if (startIndex === -1) startIndex = Math.max(0, allData.length - 18);
        break;
      case '1Y':
        startIndex = 0;
        break;
      case 'YTD':
        startIndex = allData.findIndex(d => d.date.startsWith('2026-01'));
        if (startIndex === -1) startIndex = 0;
        break;
    }
    
    return allData.slice(startIndex);
  };

  const filteredData = getFilteredChartData();
  const maxValue = Math.max(...filteredData.map(d => Math.max(d.fund, d.saa)));
  const minValue = Math.min(...filteredData.map(d => Math.min(d.fund, d.saa)));
  const yMax = maxValue;
  const yMin = Math.min(minValue, 0);
  const yTicks = [
    Math.ceil(yMax),
    Math.ceil(yMax * 0.8),
    Math.ceil(yMax * 0.6),
    Math.ceil(yMax * 0.4),
    Math.ceil(yMax * 0.2),
    yMin >= 0 ? 0 : Math.floor(yMin * 0.5)
  ].filter(val => val !== undefined && !isNaN(val)).sort((a, b) => b - a);

  const getXTicksIndices = () => {
    if (filteredData.length <= 1) return [0];
    
    const monthsMap = new Map<string, number>();
    filteredData.forEach((d, idx) => {
      if (!monthsMap.has(d.date)) {
        monthsMap.set(d.date, idx);
      }
    });
    
    const uniqueMonths = Array.from(monthsMap.entries());
    
    if (dateRange === '1M' || dateRange === 'YTD') {
      return [0, filteredData.length - 1];
    } else if (dateRange === '3M') {
      const indices = uniqueMonths.map(([_, idx]) => idx);
      if (indices.length <= 4) return [...indices, filteredData.length - 1].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
      return [indices[0], indices[Math.floor(indices.length / 2)], filteredData.length - 1];
    } else if (dateRange === '6M') {
      const indices = uniqueMonths.map(([_, idx]) => idx);
      if (indices.length <= 6) return [...indices, filteredData.length - 1].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
      return [indices[0], indices[Math.floor(indices.length / 3)], indices[Math.floor(indices.length * 2 / 3)], filteredData.length - 1];
    } else {
      const indices = uniqueMonths.map(([_, idx]) => idx);
      if (indices.length <= 8) return [...indices].sort((a, b) => a - b);
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
          className={`flex items-center gap-1.5 px-2 py-0.5 border text-[9px] font-bold transition-all cursor-pointer ${visibleLines.fund ? 'bg-red-50 border-red-100 text-[#da0011]' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'}`}
        >
          <div className={`w-1.5 h-0.5 ${visibleLines.fund ? 'bg-[#da0011]' : 'bg-gray-300'}`}></div>
          Your Holdings
        </button>
        <button 
          onClick={() => toggleLine('saa')}
          className={`flex items-center gap-1.5 px-2 py-0.5 border text-[9px] font-bold transition-all cursor-pointer ${visibleLines.saa ? 'bg-gray-100 border-gray-300 text-[#767676]' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'}`}
        >
          <div className={`w-1.5 h-0.5 ${visibleLines.saa ? 'bg-[#999]' : 'bg-gray-300'}`}></div>
          Benchmark
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
          
        <div className="flex-1 relative h-full cursor-pointer" onMouseMove={(e) => {
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
              <path d={getSmoothPathForFiltered(filteredData, 'fund')} fill="none" stroke="#da0011" strokeWidth="0.8" strokeLinecap="round" />
            )}
                          
            {visibleLines.saa && (
              <path d={getSmoothPathForFiltered(filteredData, 'saa')} fill="none" stroke="#999" strokeWidth="1.0" strokeLinecap="round" strokeDasharray="3 2" />
            )}
          
            {/* Drawdown area */}
            {visibleLines.fund && (() => {
              let peakIndex = 0;
              let troughIndex = 0;
              let maxDrawdown = 0;
              let runningPeakIndex = 0;
              let runningPeakValue = filteredData[0]?.fund || 0;
              
              // Calculate max drawdown using simple difference (peak - trough)
              for (let i = 0; i < filteredData.length; i++) {
                const currentValue = filteredData[i].fund;
                
                // Update running peak if current value is higher
                if (currentValue > runningPeakValue) {
                  runningPeakValue = currentValue;
                  runningPeakIndex = i;
                }
                
                // Calculate drawdown as simple difference (peak - trough)
                const drawdown = runningPeakValue - currentValue;
                
                // Update max drawdown if current drawdown is larger
                if (drawdown > maxDrawdown) {
                  maxDrawdown = drawdown;
                  peakIndex = runningPeakIndex;
                  troughIndex = i;
                }
              }
              
              if (maxDrawdown > 5) {
                const peakX = getXForFiltered(peakIndex);
                const peakY = getYForFiltered(filteredData[peakIndex].fund);
                const troughX = getXForFiltered(troughIndex);
                const troughY = getYForFiltered(filteredData[troughIndex].fund);
                
                return (
                  <>
                    <path 
                      d={`M ${peakX},${peakY} L ${troughX},${troughY} L ${troughX},${peakY} Z`}
                      fill="#5cb85c" 
                      fillOpacity="0.15" 
                      stroke="#5cb85c" 
                      strokeWidth="0.8" 
                      strokeDasharray="3 2" 
                    />
                    <line 
                      x1={peakX} 
                      y1={peakY} 
                      x2={peakX} 
                      y2="100" 
                      stroke="#5cb85c" 
                      strokeWidth="0.5" 
                      strokeDasharray="2 2" 
                      opacity="0.6"
                    />
                    <line 
                      x1={troughX} 
                      y1={troughY} 
                      x2={troughX} 
                      y2="100" 
                      stroke="#5cb85c" 
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
                {visibleLines.fund && <div className="flex justify-between items-center gap-2 text-[8px]"><span className="opacity-70">Your Holdings:</span><span className="font-bold text-red-200">{filteredData[hoverData.index]?.fund.toFixed(2)}%</span></div>}
                {visibleLines.saa && <div className="flex justify-between items-center gap-2 text-[8px]"><span className="opacity-70">Benchmark:</span><span className="font-bold text-gray-300">{filteredData[hoverData.index]?.saa.toFixed(2)}%</span></div>}
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
            className={`px-3 py-1.5 text-[9px] font-bold transition-all border cursor-pointer ${
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

export default HoldingsPerformanceChart;
