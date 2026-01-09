
import React, { useState } from 'react';

interface Fund {
  id: string;
  name: string;
  code: string;
  type: string;
}

interface PortfolioSimulationProps {
  onBack: () => void;
}

const PortfolioSimulation: React.FC<PortfolioSimulationProps> = ({ onBack }) => {
  const [step, setStep] = useState<'select' | 'configure' | 'result'>('select');
  const [selectedFundIds, setSelectedFundIds] = useState<string[]>(['HGE001', 'HWS003', 'BGA005', 'FWE007']);
  const [allocations, setAllocations] = useState<Record<string, number>>({
    'HGE001': 25,
    'HWS003': 25,
    'BGA005': 25,
    'FWE007': 25,
  });
  const [activeTab, setActiveTab] = useState<'return' | 'drawdown' | 'probability' | 'holdings'>('return');

  const funds: Fund[] = [
    { id: 'HGE001', name: 'HSBC Global Equity Fund', code: 'HGE001', type: 'Equity - Growth' },
    { id: 'HWS003', name: 'HSBC World Selection - Balanced', code: 'HWS003', type: 'Multi-Asset' },
    { id: 'BGA005', name: 'BlackRock Global Allocation', code: 'BGA005', type: 'Asset Allocation' },
    { id: 'FWE007', name: 'Fidelity World Equity', code: 'FWE007', type: 'Equity - Income' },
    { id: 'JEM009', name: 'JPM Emerging Markets', code: 'JEM009', type: 'Equity - EM' },
    { id: 'HAP011', name: 'HSBC Asia Pacific Bond', code: 'HAP011', type: 'Fixed Income' },
    { id: 'HUS013', name: 'HSBC US Growth Fund', code: 'HUS013', type: 'Equity - Growth' },
    { id: 'HTE015', name: 'HSBC Tech Opportunities', code: 'HTE015', type: 'Equity - Sector' },
  ];

  const toggleFund = (id: string) => {
    setSelectedFundIds(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleConfirmSelection = () => {
    if (selectedFundIds.length === 0) return;
    const newAllocations: Record<string, number> = {};
    const equalShare = parseFloat((100 / selectedFundIds.length).toFixed(2));
    selectedFundIds.forEach((id, idx) => {
      newAllocations[id] = idx === selectedFundIds.length - 1 ? 100 - (equalShare * (selectedFundIds.length - 1)) : equalShare;
    });
    setAllocations(newAllocations);
    setStep('configure');
  };

  const updateAllocation = (id: string, value: number) => {
    setAllocations(prev => ({ ...prev, [id]: Math.max(0, Math.min(100, value)) }));
  };

  const handleEqualWeight = () => {
    const equalShare = parseFloat((100 / selectedFundIds.length).toFixed(2));
    const newAllocations: Record<string, number> = {};
    selectedFundIds.forEach((id, idx) => {
      newAllocations[id] = idx === selectedFundIds.length - 1 ? 100 - (equalShare * (selectedFundIds.length - 1)) : equalShare;
    });
    setAllocations(newAllocations);
  };

  // Fix: Explicitly cast Object.values to number[] to resolve 'unknown' type assignment error
  const totalAllocated: number = (Object.values(allocations) as number[]).reduce((a: number, b: number) => a + b, 0);

  const renderSelectStep = () => (
    <div className="flex flex-col h-full bg-white animate-fade-in">
      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search and add funds" 
            className="w-full h-10 bg-[#f4f5f6] rounded-[2px] px-10 text-xs outline-none placeholder:text-gray-400 border border-gray-100 focus:border-gray-200"
          />
          <svg className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-2 border-b border-gray-100 mb-2 overflow-x-auto no-scrollbar">
        {['Recently Viewed', 'Watchlist', 'Holdings', 'History'].map((tab, i) => (
          <div key={tab} className="relative px-3 py-3 text-[11px] font-bold text-gray-800 uppercase tracking-tighter whitespace-nowrap">
            {tab}
            {i === 0 && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#da0011] rounded-full" />}
          </div>
        ))}
      </div>

      {/* Fund List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-24 mt-2">
        {funds.map((fund) => (
          <div key={fund.id} className="flex items-center justify-between group active:bg-gray-50 py-2 border-b border-gray-50 last:border-0" onClick={() => toggleFund(fund.id)}>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#1e1e1e] mb-0.5">{fund.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#767676] font-medium">{fund.code}</span>
                <span className="text-[10px] text-[#767676] opacity-40">|</span>
                <span className="text-[10px] text-[#767676] font-medium">{fund.type}</span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-[2px] border flex items-center justify-center transition-all ${selectedFundIds.includes(fund.id) ? 'bg-[#da0011] border-[#da0011]' : 'border-gray-300 bg-white'}`}>
              {selectedFundIds.includes(fund.id) && (
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleConfirmSelection}
          className={`w-full py-3.5 rounded-[2px] text-[13px] font-bold uppercase tracking-widest transition-all ${selectedFundIds.length > 0 ? 'bg-[#da0011] text-white active:bg-[#b0000e]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          Confirm Selection ({selectedFundIds.length})
        </button>
      </div>
    </div>
  );

  const renderConfigureStep = () => (
    <div className="flex flex-col h-full bg-[#f4f5f6] animate-fade-in">
      {/* Mode Tabs */}
      <div className="flex px-4 bg-white border-b border-gray-100">
        <div className="relative py-3 text-[12px] font-bold text-[#da0011] uppercase tracking-tighter mr-8">
          Percentage Mode
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#da0011] rounded-full" />
        </div>
        <div className="py-3 text-[12px] font-bold text-[#767676] uppercase tracking-tighter opacity-50">Amount Mode</div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto pb-24">
        <div className="bg-white rounded-[3px] p-5 border border-[#ebeef0] shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-[#da0011]"></div>
            <h3 className="text-[12px] font-bold text-[#1e1e1e] uppercase tracking-tighter">Portfolio Allocation</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <div className="text-[11px] text-[#1e1e1e] font-bold">
                {totalAllocated >= 100 ? 'SUCCESS! FULLY ALLOCATED' : 'INCOMPLETE ALLOCATION'} 
              </div>
              <div className="text-[14px] font-bold text-[#da0011]">{totalAllocated.toFixed(2)}%</div>
            </div>
            <div className="w-full h-1.5 bg-[#f4f5f6] rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${totalAllocated > 100 ? 'bg-orange-500' : 'bg-[#da0011]'}`} 
                style={{ width: `${Math.min(100, totalAllocated)}%` }} 
              />
            </div>
          </div>

          <div className="space-y-7 pt-2">
            {selectedFundIds.map((id) => {
              const fund = funds.find(f => f.id === id);
              if (!fund) return null;
              return (
                <div key={id} className="flex items-center justify-between group">
                  <div className="flex-1 mr-4">
                    <div className="text-[13px] font-bold text-[#1e1e1e] line-clamp-1 group-hover:text-[#da0011] transition-colors">{fund.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[#767676] font-medium">{fund.code}</span>
                      <span className="text-[10px] text-[#767676] opacity-30">|</span>
                      <span className="text-[10px] text-[#767676] font-medium">{fund.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#f4f5f6] rounded-[2px] px-2 py-1.5 w-24 border border-gray-100">
                      <input 
                        type="number" 
                        value={allocations[id]} 
                        onChange={(e) => updateAllocation(id, parseFloat(e.target.value) || 0)}
                        className="bg-transparent text-[13px] font-bold text-right w-12 outline-none text-[#1e1e1e]"
                      />
                      <span className="text-[11px] font-bold ml-1 text-[#767676]">%</span>
                    </div>
                    <button className="text-gray-300 hover:text-[#da0011] transition-colors" onClick={() => setSelectedFundIds(prev => prev.filter(fid => fid !== id))}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex border-t border-gray-50 pt-5 gap-4">
            <button 
              onClick={handleEqualWeight}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-[#767676] border border-gray-100 rounded-[2px] active:bg-gray-50 uppercase tracking-tighter"
            >
              Equal Weight
            </button>
            <button 
              onClick={() => setStep('select')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-[#da0011] border border-[#da0011]/20 rounded-[2px] active:bg-red-50 uppercase tracking-tighter"
            >
              Add Fund
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Confirm */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setStep('result')}
          disabled={totalAllocated !== 100}
          className={`w-full py-3.5 rounded-[2px] text-[13px] font-bold uppercase tracking-widest transition-all ${totalAllocated === 100 ? 'bg-[#1e1e1e] text-white active:bg-black' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          View Simulation Result
        </button>
      </div>
    </div>
  );

  const renderResultStep = () => {
    // Fix: Explicitly cast Object.entries to [string, number][] to fix arithmetic type error on 'pct'
    const simulatedReturn = ((Object.entries(allocations) as [string, number][]).reduce((acc: number, [id, pct]) => {
      const fund = funds.find(f => f.id === id);
      const rate: number = fund?.type.includes('Growth') ? 0.11 : fund?.type.includes('Income') ? 0.05 : 0.08;
      return acc + (pct * rate);
    }, 0)).toFixed(2);

    // Generate historical performance data for 3 years
    const generateHistoricalData = () => {
      const months = 36;
      const portfolioData: number[] = [];
      const benchmarkData: number[] = [];
      
      let portfolioValue = 100;
      let benchmarkValue = 100;
      
      for (let i = 0; i < months; i++) {
        const monthlyReturn = (parseFloat(simulatedReturn) / 100) / 12;
        const benchmarkReturn = 0.065 / 12; // 6.5% benchmark annual return
        
        const volatility = Math.random() * 0.04 - 0.02;
        portfolioValue *= (1 + monthlyReturn + volatility);
        benchmarkValue *= (1 + benchmarkReturn + volatility * 0.5);
        
        portfolioData.push(portfolioValue);
        benchmarkData.push(benchmarkValue);
      }
      
      return { portfolioData, benchmarkData };
    };

    const { portfolioData, benchmarkData } = generateHistoricalData();
    const cumulativeReturn = ((portfolioData[portfolioData.length - 1] - 100) / 100 * 100).toFixed(2);
    const benchmarkCumulativeReturn = ((benchmarkData[benchmarkData.length - 1] - 100) / 100 * 100).toFixed(2);
    const excessReturn = (parseFloat(cumulativeReturn) - parseFloat(benchmarkCumulativeReturn)).toFixed(2);
    const annualizedReturn = (Math.pow(portfolioData[portfolioData.length - 1] / 100, 1/3) - 1) * 100;
    const sharpeRatio = (annualizedReturn / 15).toFixed(2); // Simplified Sharpe ratio

    // Calculate drawdown data
    const calculateDrawdown = (data: number[]) => {
      let maxDrawdown = 0;
      let peak = data[0];
      const drawdowns: number[] = [];
      
      for (let i = 0; i < data.length; i++) {
        if (data[i] > peak) peak = data[i];
        const drawdown = ((data[i] - peak) / peak) * 100;
        drawdowns.push(drawdown);
        if (drawdown < maxDrawdown) maxDrawdown = drawdown;
      }
      
      return { maxDrawdown, drawdowns };
    };

    const { maxDrawdown: portfolioMaxDrawdown, drawdowns: portfolioDrawdowns } = calculateDrawdown(portfolioData);
    const { maxDrawdown: benchmarkMaxDrawdown } = calculateDrawdown(benchmarkData);

    // Calculate min/max for chart scaling
    const allValues = [...portfolioData, ...benchmarkData];
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const range = maxValue - minValue;
    const chartHeight = 180;

    const getYPosition = (value: number) => {
      return chartHeight - ((value - minValue) / range) * chartHeight;
    };

    // Generate SVG path with smooth curves (Bezier)
    const generatePath = (data: number[]) => {
      if (data.length < 2) return '';
      const width = 100;
      const points = data.map((value, index) => ({
        x: (index / (data.length - 1)) * width,
        y: getYPosition(value)
      }));
      
      let d = `M ${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cp1x = p0.x + (p1.x - p0.x) / 2;
        d += ` C ${cp1x},${p0.y} ${cp1x},${p1.y} ${p1.x},${p1.y}`;
      }
      return d;
    };

    const portfolioPath = generatePath(portfolioData);
    const benchmarkPath = generatePath(benchmarkData);

    // Generate drawdown chart path with smooth curves
    const generateDrawdownPath = (drawdowns: number[]) => {
      if (drawdowns.length < 2) return '';
      const minDrawdown = Math.min(...drawdowns);
      const drawdownRange = Math.abs(minDrawdown);
      const width = 100;
      
      const points = drawdowns.map((dd, index) => ({
        x: (index / (drawdowns.length - 1)) * width,
        y: 100 - (Math.abs(dd) / drawdownRange) * 100
      }));
      
      let d = `M ${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cp1x = p0.x + (p1.x - p0.x) / 2;
        d += ` C ${cp1x},${p0.y} ${cp1x},${p1.y} ${p1.x},${p1.y}`;
      }
      return d;
    };

    const drawdownPath = generateDrawdownPath(portfolioDrawdowns);

    // Tab content rendering
    const renderTabContent = () => {
      switch (activeTab) {
        case 'return':
          return (
            <>
          {/* Main Metric Card */}
          {/* <div className="bg-white rounded-[3px] p-8 border border-[#ebeef0] shadow-sm text-center">
            <div className="text-[10px] text-[#767676] mb-2 font-bold uppercase tracking-widest">Projected Annual Return</div>
            <div className="text-4xl font-bold text-[#da0011] tracking-tight">+{simulatedReturn}%</div>
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[9px] text-[#767676] font-bold uppercase tracking-tight">Based on 3-year historical data</span>
            </div>
          </div> */}

          {/* Performance Chart */}
          <div className="bg-white rounded-[3px] p-5 border border-[#ebeef0] shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-3.5 bg-[#da0011]"></div>
              <h3 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tighter">Return Performance</h3>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-[#ff8c42] rounded-full"></div>
                <span className="text-[10px] text-[#1e1e1e] font-bold">Portfolio</span>
                <span className="text-[11px] text-[#ff8c42] font-bold ml-1">+{cumulativeReturn}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-[#b0b0b0] rounded-full"></div>
                <span className="text-[10px] text-[#767676] font-bold">MSCI World</span>
                <span className="text-[11px] text-[#767676] font-bold ml-1">+{benchmarkCumulativeReturn}%</span>
              </div>
            </div>

            {/* SVG Line Chart */}
            <div className="relative bg-[#fafafa] rounded-[2px] p-4 border border-gray-50">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 text-[9px] text-[#767676] font-medium pointer-events-none">
                <span>+{((maxValue - 100) / 100 * 100).toFixed(0)}%</span>
                <span>+{(((maxValue + minValue) / 2 - 100) / 100 * 100).toFixed(0)}%</span>
                <span>{((minValue - 100) / 100 * 100).toFixed(0)}%</span>
              </div>

              <div className="ml-8">
                {/* Grid lines overlay */}
                <div className="absolute inset-0 ml-8 flex flex-col justify-between opacity-[0.03] pointer-events-none">
                  {[0, 1, 2].map((i) => <div key={i} className="border-t border-black w-full"></div>)}
                </div>
                
                <svg className="relative w-full h-[180px]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* Axis lines */}
                  <line x1="0" y1="0" x2="0" y2="100" stroke="#dcddde" strokeWidth="0.5" />
                  <line x1="0" y1="100" x2="100" y2="100" stroke="#dcddde" strokeWidth="0.5" />
                  
                  {/* Benchmark line */}
                  <path 
                    d={benchmarkPath}
                    fill="none"
                    stroke="#b0b0b0"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  
                  {/* Portfolio line */}
                  <path 
                    d={portfolioPath}
                    fill="none"
                    stroke="#ff8c42"
                    strokeWidth="1"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2 text-[9px] text-[#767676] font-medium ml-8 pointer-events-none">
                <span>2023-01</span>
                <span>2024-01</span>
                <span>2025-01</span>
                <span>2026-01</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics Table */}
          <div className="bg-white rounded-[3px] border border-[#ebeef0] shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
              <div className="w-1 h-3.5 bg-[#da0011]"></div>
              <h3 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tighter">Return Indicators</h3>
            </div>

            {/* Column Headers */}
            <div className="flex items-center justify-between px-5 py-2 bg-[#fafafa] border-b border-gray-100">
              <span className="text-[9px] text-[#767676] font-bold uppercase tracking-widest">Return Metrics</span>
              <div className="flex items-center gap-0">
                <span className="text-[9px] text-[#767676] font-bold uppercase tracking-widest w-24 text-right">Portfolio</span>
                <span className="text-[9px] text-[#767676] font-bold uppercase tracking-widest w-24 text-right">MSCI World</span>
              </div>
            </div>

            <div className="divide-y divide-gray-50">
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-[12px] text-[#1e1e1e] font-medium">Cumulative Return</span>
                <div className="flex items-center gap-0">
                  <span className="text-[13px] text-[#ff4444] font-bold w-24 text-right">+{cumulativeReturn}%</span>
                  <span className="text-[13px] text-[#ff4444] font-bold w-24 text-right">+{benchmarkCumulativeReturn}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-[12px] text-[#1e1e1e] font-medium">Excess Return</span>
                <div className="flex items-center gap-0">
                  <span className="text-[13px] text-[#ff4444] font-bold w-24 text-right">+{excessReturn}%</span>
                  <span className="text-[13px] text-[#767676] font-medium w-24 text-right">--</span>
                </div>
              </div>

              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-[12px] text-[#1e1e1e] font-medium">Annualized Return</span>
                <div className="flex items-center gap-0">
                  <span className="text-[13px] text-[#ff4444] font-bold w-24 text-right">+{annualizedReturn.toFixed(2)}%</span>
                  <span className="text-[13px] text-[#ff4444] font-bold w-24 text-right">+{((Math.pow(benchmarkData[benchmarkData.length - 1] / 100, 1/3) - 1) * 100).toFixed(2)}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-[12px] text-[#1e1e1e] font-medium">Sharpe Ratio</span>
                <div className="flex items-center gap-0">
                  <span className="text-[13px] text-[#1e1e1e] font-bold w-24 text-right">{sharpeRatio}</span>
                  <span className="text-[13px] text-[#1e1e1e] font-bold w-24 text-right">{(parseFloat(sharpeRatio) * 0.7).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
            </>



          );

        case 'drawdown':
          return (
            <>
              {/* Drawdown Chart */}
              <div className="bg-white rounded-[3px] p-5 border border-[#ebeef0] shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-3.5 bg-[#da0011]"></div>
                  <h3 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tighter">Drawdown Performance</h3>
                </div>

                {/* Chart Legend */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-[#ff8c42] rounded-full"></div>
                    <span className="text-[10px] text-[#1e1e1e] font-bold">Portfolio</span>
                    <span className="text-[11px] text-[#22c55e] font-bold ml-1">{portfolioMaxDrawdown.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-[#b0b0b0] rounded-full"></div>
                    <span className="text-[10px] text-[#767676] font-bold">MSCI World ▼</span>
                    <span className="text-[11px] text-[#22c55e] font-bold ml-1">{benchmarkMaxDrawdown.toFixed(2)}%</span>
                  </div>
                </div>

                {/* SVG Drawdown Chart */}
                <div className="relative bg-[#fafafa] rounded-[2px] p-4 border border-gray-50">
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 text-[9px] text-[#767676] font-medium pointer-events-none">
                    <span>0.00%</span>
                    <span>-7.00%</span>
                    <span>-14.00%</span>
                    <span>-21.00%</span>
                    <span>-28.00%</span>
                  </div>

                  <div className="ml-8">
                    {/* Grid lines overlay */}
                    <div className="absolute inset-0 ml-8 flex flex-col justify-between opacity-[0.03] pointer-events-none">
                      {[0, 1, 2, 3, 4].map((i) => <div key={i} className="border-t border-black w-full"></div>)}
                    </div>
                    
                    <svg className="relative w-full h-[180px]" preserveAspectRatio="none" viewBox="0 0 100 100">
                      {/* Axis lines */}
                      <line x1="0" y1="0" x2="0" y2="100" stroke="#dcddde" strokeWidth="0.5" />
                      <line x1="0" y1="100" x2="100" y2="100" stroke="#dcddde" strokeWidth="0.5" />
                      
                      <path 
                        d={drawdownPath}
                        fill="none"
                        stroke="#ff8c42"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="flex justify-between mt-2 text-[9px] text-[#767676] font-medium ml-8 pointer-events-none">
                    <span>2023-01-06</span>
                    <span>2026-01-07</span>
                  </div>
                </div>
              </div>

              {/* Drawdown Metrics */}
              <div className="bg-white rounded-[3px] border border-[#ebeef0] shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                  <div className="w-1 h-3.5 bg-[#da0011]"></div>
                  <h3 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tighter">Risk Indicators</h3>
                </div>

                <div className="flex items-center justify-between px-5 py-2 bg-[#fafafa] border-b border-gray-100">
                  <span className="text-[9px] text-[#767676] font-bold uppercase tracking-widest">Risk Metrics</span>
                  <div className="flex items-center gap-12">
                    <span className="text-[9px] text-[#767676] font-bold uppercase tracking-widest">Portfolio</span>
                    <span className="text-[9px] text-[#767676] font-bold uppercase tracking-widest">MSCI World</span>
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[12px] text-[#1e1e1e] font-medium">Maximum Drawdown</span>
                    <div className="flex items-center gap-12">
                      <span className="text-[13px] text-[#1e1e1e] font-bold">{portfolioMaxDrawdown.toFixed(2)}%</span>
                      <span className="text-[13px] text-[#1e1e1e] font-bold">{benchmarkMaxDrawdown.toFixed(2)}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[12px] text-[#1e1e1e] font-medium">Max Drawdown Recovery</span>
                    <div className="flex items-center gap-12">
                      <span className="text-[13px] text-[#1e1e1e] font-bold">387 Days</span>
                      <span className="text-[13px] text-[#1e1e1e] font-bold">25 Days</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[12px] text-[#1e1e1e] font-medium">Annualized Volatility</span>
                    <div className="flex items-center gap-12">
                      <span className="text-[13px] text-[#1e1e1e] font-bold">20.73%</span>
                      <span className="text-[13px] text-[#1e1e1e] font-bold">17.01%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Period Tabs */}
              <div className="flex items-center gap-3 px-1">
                {['3M', '6M', '1Y', '3Y', 'More'].map((period, idx) => (
                  <button
                    key={period}
                    className={`px-4 py-2 text-[11px] font-bold rounded-full transition-all ${
                      idx === 3 ? 'bg-blue-500 text-white' : 'text-[#767676] active:bg-gray-50'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </>
          );

        case 'probability':
          return (
            <>
              {/* Profit Probability */}
              <div className="bg-white rounded-[3px] p-5 border border-[#ebeef0] shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-3.5 bg-[#da0011]"></div>
                  <h3 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tighter">Profit Probability</h3>
                </div>

                <div className="mb-5">
                  <p className="text-[11px] text-[#1e1e1e] leading-relaxed">
                    Historical analysis: Buy at any time, hold for <span className="text-[#ff4444] font-bold">3 years</span>, profit probability <span className="text-[#ff4444] font-bold text-[15px]">65%</span>
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#1e1e1e] font-medium w-16">Period</span>
                    <span className="text-[12px] text-[#1e1e1e] font-medium w-20 text-center">Avg Return</span>
                    <span className="text-[12px] text-[#767676] font-medium w-20 text-right">Probability</span>
                  </div>

                  {[
                    { period: '6 Months', return: '+2.18%', probability: 50 },
                    { period: '1 Year', return: '+3.72%', probability: 48 },
                    { period: '2 Years', return: '+0.39%', probability: 49 },
                    { period: '3 Years', return: '+7.87%', probability: 65 },
                  ].map((item) => (
                    <div key={item.period} className="flex items-center justify-between">
                      <span className="text-[12px] text-[#1e1e1e] font-bold w-20">{item.period}</span>
                      <span className="text-[13px] text-[#ff4444] font-bold w-20 text-center">{item.return}</span>
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex-1 bg-[#f4f5f6] rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full relative"
                            style={{ width: `${item.probability}%` }}
                          >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-blue-500 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                          </div>
                        </div>
                        <span className="text-[13px] text-[#1e1e1e] font-bold w-12 text-right">{item.probability}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[9px] text-[#999] mt-5 italic leading-relaxed">
                  Profit probability is based on historical data and does not represent future returns.
                </p>
              </div>
            </>
          );

        case 'holdings':
          return (
            <>
              {/* Holdings List */}
              <div className="bg-white rounded-[3px] border border-[#ebeef0] shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                  <div className="w-1 h-3.5 bg-[#da0011]"></div>
                  <h3 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tighter">Holdings Analysis</h3>
                </div>

                <div className="flex items-center justify-between px-5 py-2 bg-[#fafafa] border-b border-gray-100">
                  <span className="text-[9px] text-[#767676] font-bold uppercase tracking-widest">Fund Name</span>
                  <div className="flex items-center gap-8">
                    <span className="text-[9px] text-[#767676] font-bold uppercase tracking-widest">Allocation</span>
                    <span className="text-[9px] text-[#767676] font-bold uppercase tracking-widest w-20 text-right">3Y Return</span>
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  {selectedFundIds.map((id) => {
                    const fund = funds.find(f => f.id === id);
                    if (!fund) return null;
                    const fundReturn = fund.type.includes('Growth') ? '+27.81%' : fund.type.includes('Income') ? '-3.21%' : '+38.02%';
                    const isNegative = fundReturn.startsWith('-');
                    
                    return (
                      <div key={id} className="px-5 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-[12px] font-bold text-[#1e1e1e] mb-1">{fund.name}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-[#767676] font-medium">{fund.code}</span>
                              <span className="text-[10px] text-[#767676] opacity-30">|</span>
                              <span className="text-[10px] text-[#767676] font-medium">{fund.type}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <span className="text-[13px] text-[#1e1e1e] font-bold">{allocations[id].toFixed(2)}%</span>
                            <span className={`text-[13px] font-bold w-20 text-right ${isNegative ? 'text-[#22c55e]' : 'text-[#ff4444]'}`}>
                              {fundReturn}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          );

        default:
          return null;
      }
    };

    return (
      <div className="flex flex-col h-full bg-[#f4f5f6] overflow-hidden animate-fade-in">
        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-100 overflow-x-auto no-scrollbar">
          <div className="flex px-2 min-w-max">
            {[
              { id: 'return', label: 'Return Performance' },
              { id: 'drawdown', label: 'Drawdown' },
              { id: 'probability', label: 'Profit Probability' },
              { id: 'holdings', label: 'Holdings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="relative px-5 py-3 text-[11px] font-bold uppercase tracking-tighter whitespace-nowrap transition-colors"
                style={{ color: activeTab === tab.id ? '#1e1e1e' : '#767676' }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#da0011] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-12">
          {renderTabContent()}

          {/* Risk Disclosure */}
          <div className="p-4 bg-gray-50 border-l-[3px] border-[#da0011]/40 rounded-r-[3px]">
            <div className="flex items-center gap-2 mb-2">
               <span className="text-xs">⚖️</span>
               <h4 className="text-[10px] font-bold text-[#1e1e1e] uppercase tracking-widest">Risk Sensitivity Advisory</h4>
            </div>
            <p className="text-[10px] text-[#767676] leading-relaxed italic font-medium">
              This simulation is for illustrative purposes only. Projected returns are based on 5-year historical market cycles and do not guarantee future performance. High exposure to Equity funds (over 60%) increases portfolio volatility.
            </p>
          </div>

          <button onClick={() => setStep('configure')} className="w-full py-4 bg-[#1e1e1e] text-white text-[12px] font-bold uppercase tracking-widest rounded-[2px] active:bg-black transition-all hover:shadow-lg mt-2">
            Modify Configuration
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f5f6] font-sans">
      {/* Dynamic Header */}
      <div className="bg-white pt-12 pb-4 px-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-50">
        <button onClick={step === 'select' ? onBack : () => setStep(step === 'result' ? 'configure' : 'select')} className="p-1 active:opacity-60 transition-opacity">
          <svg className="w-6 h-6 text-[#1e1e1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 className="text-[15px] font-bold text-[#1e1e1e] uppercase tracking-tighter">
          {step === 'select' ? 'Select Funds' : 'Portfolio Simulation'}
        </h1>
        <div className="w-6 h-6"></div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {step === 'select' && renderSelectStep()}
        {step === 'configure' && renderConfigureStep()}
        {step === 'result' && renderResultStep()}
      </div>
    </div>
  );
};

export default PortfolioSimulation;
