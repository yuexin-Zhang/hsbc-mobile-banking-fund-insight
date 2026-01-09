
import React, { useState, useRef, useMemo, useEffect } from 'react';

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

  // State for line visibility toggles
  const [visibleLines, setVisibleLines] = useState({
    all: true,
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
    { date: '2024-08', all: 0, fund: 0, saa: 0 },
    { date: '2024-09', all: -2, fund: -1, saa: 1.5 },
    { date: '2024-10', all: 5, fund: 6, saa: 4 },
    { date: '2024-11', all: 3, fund: 5.5, saa: 7 },
    { date: '2024-12', all: 8, fund: 7, saa: 9.5 },
    { date: '2025-01', all: 12, fund: 13.5, saa: 11 },
    { date: '2025-02', all: 10, fund: 11, saa: 14 },
    { date: '2025-03', all: 18, fund: 16, saa: 19.5 },
    { date: '2025-04', all: 15, fund: 17, saa: 16.5 },
    { date: '2025-05', all: 25, fund: 23, saa: 27 },
    { date: '2025-06', all: 22, fund: 24.5, saa: 23.5 },
    { date: '2025-07', all: 32.23, fund: 30, saa: 35.8 },
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

  const toggleLine = (line: 'all' | 'fund' | 'saa') => {
    setVisibleLines(prev => ({ ...prev, [line]: !prev[line] }));
  };

  const getFilteredChartData = () => {
    const allData = chartData;
    const now = new Date(2025, 6, 31); // 使用数据中的最后日期
    
    let startIndex = 0;
    
    switch (dateRange) {
      case '1M':
        // 最后1个月（最后3个数据点）
        startIndex = Math.max(0, allData.length - 3);
        break;
      case '3M':
        // 最后3个月（最后4个数据点）
        startIndex = Math.max(0, allData.length - 4);
        break;
      case '6M':
        // 最后6个月（最后7个数据点）
        startIndex = Math.max(0, allData.length - 7);
        break;
      case '1Y':
        // 最后1年（所有数据）
        startIndex = 0;
        break;
      case 'YTD':
        // 年初至今（从2025-01开始）
        startIndex = allData.findIndex(d => d.date.startsWith('2025-01'));
        break;
    }
    
    return allData.slice(startIndex);
  };

  const renderLineChart = () => {
    const filteredData = getFilteredChartData();
    const yTicks = [40, 20, 0, -10];
    
    // 根据过滤后的数据重新计算 x 轴刻度
    const xTicksIndices = filteredData.length > 1 
      ? [...new Set([0, Math.floor(filteredData.length / 3), Math.floor((filteredData.length * 2) / 3), filteredData.length - 1])]
      : [0];

    const getYForFiltered = (val: number) => 100 - ((val + 10) / 50) * 100;
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
      <div className="relative w-full mt-6 bg-white rounded-[3px] pb-2">
        {/* Toggle Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={() => toggleLine('all')}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] border text-[9px] font-bold transition-all ${visibleLines.all ? 'bg-red-50 border-red-200 text-[#da0011]' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'}`}
          >
            <div className={`w-1.5 h-0.5 ${visibleLines.all ? 'bg-[#da0011]' : 'bg-gray-300'}`}></div>
            All
          </button>
          <button 
            onClick={() => toggleLine('fund')}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] border text-[9px] font-bold transition-all ${visibleLines.fund ? 'bg-red-50 border-red-100 text-[#fca5a5]' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'}`}
          >
            <div className={`w-1.5 h-0.5 ${visibleLines.fund ? 'bg-[#fca5a5]' : 'bg-gray-300'}`}></div>
            Fund
          </button>
          <button 
            onClick={() => toggleLine('saa')}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] border text-[9px] font-bold transition-all ${visibleLines.saa ? 'bg-gray-100 border-gray-200 text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'}`}
          >
            <div className={`w-1.5 h-0.5 ${visibleLines.saa ? 'bg-[#9ca3af]' : 'bg-gray-300'}`}></div>
            SAA
          </button>
        </div>

        <div className="flex h-36 relative">
          <div className="w-10 relative h-full pointer-events-none flex flex-col justify-between">
            {yTicks.map((val) => (
              <div key={val} className="absolute right-2 text-[8px] font-medium text-[#767676] -translate-y-1/2" style={{ top: `${getYForFiltered(val)}%` }}>
                {val > 0 ? `+${val}%` : `${val}%`}
              </div>
            ))}
          </div>
          
          <div className="flex-1 relative h-full" onMouseMove={(e) => {
              if (!containerRef.current || filteredData.length === 0) return;
              const rect = containerRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const index = Math.min(filteredData.length - 1, Math.max(0, Math.round((x / rect.width) * (filteredData.length - 1))));
              setHoverData({ index, x, y: getYForFiltered(filteredData[index].all) });
            }} onMouseLeave={() => setHoverData(null)} ref={containerRef}>
            
            <div className="absolute inset-0 flex flex-col justify-between opacity-[0.03] pointer-events-none">
              {yTicks.map((_, i) => <div key={i} className="border-t border-black w-full"></div>)}
            </div>
            
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="0" y2="100" stroke={colors.axis} strokeWidth="0.5" />
              <line x1="0" y1="100" x2="100" y2="100" stroke={colors.axis} strokeWidth="0.5" />
              
              {visibleLines.all && (
                <path d={getSmoothPathForFiltered(filteredData, 'all')} fill="none" stroke={colors.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              )}
              
              {visibleLines.fund && (
                <path d={getSmoothPathForFiltered(filteredData, 'fund')} fill="none" stroke={colors.lightRed} strokeWidth="1.2" strokeLinecap="round" />
              )}
              
              {visibleLines.saa && (
                <path d={getSmoothPathForFiltered(filteredData, 'saa')} fill="none" stroke={colors.grey} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
              )}

              {hoverData && <line x1={getXForFiltered(hoverData.index)} y1="0" x2={getXForFiltered(hoverData.index)} y2="100" stroke={colors.muted} strokeWidth="0.5" strokeDasharray="3 2" />}
            </svg>
            
            <div className="absolute top-[108%] left-0 right-0 pointer-events-none">
              {xTicksIndices.map((idx, i) => (
                <div key={`tick-${i}-${idx}`} className="absolute text-[8px] font-medium text-[#767676] -translate-x-1/2" style={{ left: `${getXForFiltered(idx)}%` }}>
                  {filteredData[idx]?.date.substring(2) || ''}
                </div>
              ))}
            </div>

            {hoverData && (
              <div className="absolute z-20 bg-[#1e1e1e]/90 shadow-2xl rounded-[2px] p-1.5 text-white pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2" style={{ left: `${getXForFiltered(hoverData.index)}%`, top: `${getYForFiltered(filteredData[hoverData.index]?.all || 0)}%` }}>
                <div className="text-[7px] opacity-60 text-center leading-none mb-1">{filteredData[hoverData.index]?.date}</div>
                <div className="space-y-0.5">
                  {visibleLines.all && <div className="flex justify-between items-center gap-2 text-[8px]"><span className="opacity-70">Total:</span><span className="font-bold text-red-400">{filteredData[hoverData.index]?.all.toFixed(2)}%</span></div>}
                  {visibleLines.fund && <div className="flex justify-between items-center gap-2 text-[8px]"><span className="opacity-70">Fund:</span><span className="font-bold text-red-200">{filteredData[hoverData.index]?.fund.toFixed(2)}%</span></div>}
                  {visibleLines.saa && <div className="flex justify-between items-center gap-2 text-[8px]"><span className="opacity-70">SAA:</span><span className="font-bold text-gray-300">{filteredData[hoverData.index]?.saa.toFixed(2)}%</span></div>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="flex flex-wrap gap-2 pt-4 mt-4 border-gray-100 justify-center">
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
        <div className="bg-[#fcfcfc] border-[#f4f5f6] px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#da0011] rounded-full"></div>
            <h3 className="text-sm font-bold text-[#1e1e1e] uppercase tracking-wide">Holdings Overview</h3>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <p className="text-[12px] text-[#767676] leading-relaxed">
              <span className="font-bold text-[#1e1e1e]">Performance:</span> Past 1Y, return of all funds (excl. money market) is <span className="font-bold text-[#da0011]">28.59%</span>, max drawdown <span className="font-bold text-[#da0011]">16.70%</span>.
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#767676] leading-relaxed">
              <span className="font-bold text-[#1e1e1e]">Category:</span> Domestic Equity funds account for the highest proportion at <span className="font-bold text-[#da0011]">92%</span>.
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#767676] leading-relaxed">
              <span className="font-bold text-[#1e1e1e]">Style:</span> Balanced Style proportion is too high, reaching <span className="font-bold text-[#da0011]">70%</span>.
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#767676] leading-relaxed">
              <span className="font-bold text-[#1e1e1e]">Manager:</span> Fund manager distribution is relatively balanced.
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#767676] leading-relaxed">
              <span className="font-bold text-[#1e1e1e]">Assets:</span> Sector distribution of underlying assets is relatively balanced.
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col h-full bg-[#f4f5f6] overflow-y-auto no-scrollbar font-sans relative">
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
             <h1 className="text-sm font-bold tracking-widest uppercase">Portfolio Review</h1>
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

      <div className="p-4 space-y-4 pb-12">
        {/* Total Holding with Link */}
        <div 
          onClick={onGoToDetails}
          className="bg-white rounded-[3px] p-6 border border-[#ebeef0] shadow-sm flex justify-between items-center active:bg-gray-50 transition-colors cursor-pointer"
        >
          <div>
            <div className="text-[11px] text-[#767676] mb-1 font-bold uppercase tracking-tight">Total Holding (CNY)</div>
            <div className="text-2xl font-bold text-[#1e1e1e] tracking-tight">124,835,470.05</div>
          </div>
          <div className="flex items-center gap-2 text-[#da0011]">
            <span className="text-[10px] font-bold uppercase">Details</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>

        {HoldingsOverview()}
        {/* Portfolio Performance Section */}
        <div className="bg-white rounded-[3px] p-5 border border-[#ebeef0] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-[#da0011] rounded-full"></div>
            <h3 className="text-sm font-bold text-[#1e1e1e] uppercase">Performance (Past 1Y)</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center mb-6">
            <div className="p-2 bg-[#f4f5f6] rounded-[2px]">
              <div className="text-[9px] text-[#767676] font-bold uppercase mb-1">Return</div>
              <div className="text-lg font-bold text-[#da0011]">+12.45%</div>
            </div>
            <div className="p-2 bg-[#f4f5f6] rounded-[2px]">
              <div className="text-[9px] text-[#767676] font-bold uppercase mb-1">Max Drawdown</div>
              <div className="text-lg font-bold text-[#1e1e1e]">-8.12%</div>
            </div>
            <div className="p-2 bg-[#f4f5f6] rounded-[2px]">
              <div className="text-[9px] text-[#767676] font-bold uppercase mb-1">Sharpe</div>
              <div className="text-lg font-bold text-[#1e1e1e]">1.25</div>
            </div>
          </div>
          {renderLineChart()}
        </div>

        {/* Asset Allocation Comparison Section */}
        {renderSAAComparison()}

      </div>
    </div>
  );
};

export default FundInsightOverview;
