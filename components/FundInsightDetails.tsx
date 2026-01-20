
import React, { useState, useMemo } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import { Chart } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, TreemapController, TreemapElement);

interface FundInsightDetailsProps {
  onBack: () => void;
}

const GoalDetailItem: React.FC<{ 
  title: string; 
  targetYear: number; 
  targetValue: string; 
  todayValue: string; 
  progress: number; 
  icon: React.ReactNode;
  info: string;
}> = ({ title, targetYear, targetValue, todayValue, progress, icon, info }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (progress / 100) * circumference;

  return (
    <div className="flex items-center gap-6 py-6 border-b border-gray-100 last:border-0 relative">
      {/* Large Gauge */}
      <div className="relative w-24 h-24 shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#e6e6e6" strokeWidth="8" />
          <circle 
            cx="50" cy="50" r={radius} fill="transparent" 
            stroke={progress > 0 ? "#da0011" : "#444444"} 
            strokeWidth="8" 
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-gray-500 scale-125 mb-1">{icon}</div>
          <span className="text-[10px] font-bold text-[#767676]">{progress}%</span>
        </div>
      </div>

      {/* Goal Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 relative">
          <h4 className="text-[14px] font-bold text-[#333333] tracking-tight">{title}</h4>
          <div className="relative inline-block">
            <button 
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-1 text-[#da0011]/40 hover:text-[#da0011] transition-colors flex items-center justify-center focus:outline-none"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
            {showTooltip && (
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-[100] bg-[#1e1e1e] text-white text-[10px] p-3 rounded-[2px] shadow-2xl w-56 animate-fade-in border border-white/10 pointer-events-none leading-relaxed"
              >
                <div className="relative">
                  {info}
                  <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#1e1e1e]"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-1">
          {/* Stacked layout for label and value to ensure visibility */}
          <div className="text-[11px] text-[#767676]">
            <div className="mb-0.5">Target Value (Year {targetYear}) :</div>
            <div className="font-bold text-[#1e1e1e]">CNY {targetValue}</div>
          </div>
          <div className="text-[11px] text-[#767676]">
            <div className="mb-0.5">Today's Value :</div>
            <div className="font-bold text-[#1e1e1e]">CNY {todayValue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PieChart = ({ data }: { data: any[] }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90 shrink-0">
      {data.map((item, idx) => {
        const strokeDash = (item.pct / 100) * circumference;
        const currentOffset = (offset / 100) * circumference;
        offset += item.pct;
        return (
          <circle
            key={idx}
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={item.color}
            strokeWidth="20"
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeDashoffset={-currentOffset}
          />
        );
      })}
    </svg>
  );
};

const TreemapChart = ({ data, onItemClick }: { data: any[], onItemClick?: (label: string) => void }) => {
  const chartData = {
    datasets: [
      {
        tree: data,
        key: 'pct',
        // Flat treemap for direct data access
        spacing: 1,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 4,
        backgroundColor: (ctx: any) => {
          // Robust item access
          const item = ctx.raw?._data || ctx.raw;
          return item?.color || '#da0011';
        },
        labels: {
          display: true,
          formatter: (ctx: any) => {
            const item = ctx.raw?._data || ctx.raw;
            return [`${item?.label || ''}`, `${item?.pct ? item.pct + '%' : ''}`];
          },
          halign: 'right',
          valign: 'bottom',
          color: (ctx: any) => {
            const item = ctx.raw?._data || ctx.raw;
            const color = item?.color || '';
            const darkTextColors = ['#ebeef0', '#fee2e2', '#fca5a5', '#9ca3af', '#cbd5e1', '#e2e8f0', '#f1f5f9', '#38bdf8', '#34d399', '#fbbf24'];
            if (darkTextColors.includes(color)) return '#1e1e1e';
            return '#ffffff';
          },
          font: {
            size: 11,
            weight: 'bold' as const
          }
        }
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    onClick: (_e: any, elements: any) => {
      if (elements && elements.length > 0) {
        const element = elements[0];
        const datasetIndex = element.datasetIndex;
        const index = element.index;
        const item = chartData.datasets[datasetIndex].tree[index];
        if (item) onItemClick?.(item.label);
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (item: any) => {
            const dataItem = item.raw?._data || item.raw;
            return `${dataItem.label}: ${dataItem.pct}%`;
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-40 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-1 shadow-inner cursor-pointer">
      <Chart type="treemap" data={chartData as any} options={options as any} redraw={false} />
    </div>
  );
};

const AllocationSection = ({ title, data, showVal = true, useTreemap = false, insight, onItemClick, selectedItem, hideTitle = false }: { title: string, data: any[], showVal?: boolean, useTreemap?: boolean, insight?: string, onItemClick?: (label: string) => void, selectedItem?: string | null, hideTitle?: boolean }) => (
  <div className="space-y-4">
    {!hideTitle && (
      <div className="flex items-center gap-2 pb-2 border-b border-[#f4f5f6]">
        <div className="w-1 h-3.5 bg-[#da0011]"></div>
        <h3 className="text-[12px] font-bold text-[#333] uppercase tracking-tight">{title}</h3>
      </div>
    )}
    {insight && (
      <div className="p-3 bg-gray-50/50 border-l-2 border-[#da0011] rounded-r">
        <p className="text-[10px] text-[#767676] leading-snug">{insight}</p>
      </div>
    )}
    <div className={`flex ${useTreemap ? 'flex-col' : 'gap-4'} items-start`}>
      {useTreemap ? <TreemapChart data={data} onItemClick={onItemClick} /> : <PieChart data={data} />}
      <div className={`flex-1 space-y-2.5 ${useTreemap ? 'w-full mt-4' : ''}`}>
        {data.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex gap-2 p-2 rounded-md transition-all cursor-pointer border ${selectedItem === item.label ? 'shadow-sm' : 'border-transparent hover:bg-gray-50'}`}
              style={selectedItem === item.label ? { 
                backgroundColor: `${item.color}10`, // 10 is hex for ~6% opacity
                borderColor: `${item.color}40`  // 40 is hex for ~25% opacity
              } : {}}
              onClick={() => onItemClick?.(item.label)}
            >
              <div className="w-1.5 h-3 shrink-0 mt-0.5" style={{ backgroundColor: item.color }}></div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-[#1e1e1e] leading-tight flex justify-between">
                  <span>{item.label}</span>
                  <span style={{ color: item.color }}>{item.pct}%</span>
                </div>
                {showVal && item.val && (
                  <div className="text-[9px] text-[#767676] font-medium mt-0.5">{item.currency || 'CNY'} {item.val}</div>
                )}
              </div>
            </div>
        ))}
      </div>
    </div>
  </div>
);

const FundInsightDetails: React.FC<FundInsightDetailsProps> = ({ onBack }) => {
  const detailTabs = ['Style', 'Classes', 'Concentration'];

  const totalAssetValue = 9395746.24;
  const totalFundsInTransit = 0.00;

  const styleHoldings = [
    { name: 'BGF WLD MIN', id: 'IPFD3004', returnRate: '21.76%', holdingDays: '458 Days', threeMonthChange: '+8.45%', isPositive: true, style: 'Value' },
    { name: 'BGF ENERGY', id: 'IPFD3145', returnRate: '-0.86%', holdingDays: '124 Days', threeMonthChange: '-2.15%', isPositive: false, style: 'Growth' },
    { name: 'BGF GOLD', id: 'IPFD3131', returnRate: '18.53%', holdingDays: '562 Days', threeMonthChange: '+12.30%', isPositive: true, style: 'Balanced' },
    { name: 'BLK Sys GE High Inc', id: 'IPFD3116', returnRate: '42.56%', holdingDays: '890 Days', threeMonthChange: '+5.12%', isPositive: true, style: 'Value' },
    { name: 'BLK Sys GE High Inc', id: 'IPFD2116', returnRate: '11.10%', holdingDays: '215 Days', threeMonthChange: '+3.88%', isPositive: true, style: 'Balanced' },
    { name: 'BIK World Tech', id: 'IPFD2254', returnRate: '0.20%', holdingDays: '15 Days', threeMonthChange: '-0.45%', isPositive: true, style: 'Growth' },
    { name: 'JPM GEHI USD', id: 'IPFD3540', returnRate: '4.41%', holdingDays: '180 Days', threeMonthChange: '+1.20%', isPositive: true, style: 'Growth' },
  ];

  const styleTrustHoldings = [
    { name: 'CR Trust FirstEagle No.1', id: 'T1C477', returnRate: '20.91%', holdingDays: '630 Days', threeMonthChange: '+7.15%', isPositive: true, style: 'Balanced' },
    { name: 'CR Trust FirstEagle No.8', id: 'T1E648', returnRate: '-1.49%', holdingDays: '92 Days', threeMonthChange: '+0.55%', isPositive: false, style: 'Balanced' },
  ];

  const assetClassesData = [
    { label: 'Domestic Equity', pct: 42.14, val: '3,959,446.47', color: '#0ea5e9', currency: '¥' }, 
    { label: 'Commodities & Others', pct: 35.42, val: '3,328,154.55', color: '#da0011', currency: '¥' }, 
    { label: 'Overseas Market', pct: 15.15, val: '200,486.70', color: '#10b981', currency: '$' }, 
    { label: 'Domestic Fixed Income', pct: 7.29, val: '684,689.66', color: '#64748b', currency: '¥' }, 
  ];

  const concentrationSectorData = [
    { label: 'Cycle', pct: 58.33, val: '5,480,538.78', color: '#da0011', currency: '¥' },
    { label: 'Manufacturing', pct: 10.64, val: '999,707.40', color: '#0ea5e9', currency: '¥' },
    { label: 'Utilities', pct: 10.21, val: '959,305.69', color: '#10b981', currency: '¥' },
    { label: 'Others', pct: 20.82, val: '1,956,165.06', color: '#64748b', currency: '¥' },
  ];

  const concentrationIndustryData = [
    { label: 'Financials', pct: 31.92, val: '2,999,122.20', color: '#da0011', currency: '¥' },
    { label: 'Materials', pct: 21.91, val: '2,058,637.31', color: '#0ea5e9', currency: '¥' },
    { label: 'Technology', pct: 10.64, val: '999,707.40', color: '#f59e0b', currency: '¥' },
    { label: 'Healthcare', pct: 10.21, val: '959,305.69', color: '#10b981', currency: '¥' },
    { label: 'Energy', pct: 7.57, val: '711,257.99', color: '#8b5cf6', currency: '¥' },
    { label: 'Consumer', pct: 7.57, val: '711,257.99', color: '#ec4899', currency: '¥' },
    { label: 'Others', pct: 10.18, val: '956,457.66', color: '#94a3b8', currency: '¥' },
  ];

  const concentrationTopHoldingsData = [
    { label: 'Tencent', pct: 4.82, val: '452,875.00', color: '#da0011', currency: '¥' },
    { label: 'Alibaba', pct: 3.94, val: '370,192.00', color: '#0ea5e9', currency: '¥' },
    { label: 'TSMC', pct: 3.67, val: '344,824.00', color: '#f59e0b', currency: '¥' },
    { label: 'Meituan', pct: 2.88, val: '270,597.00', color: '#10b981', currency: '¥' },
    { label: 'Ping An', pct: 2.54, val: '238,652.00', color: '#8b5cf6', currency: '¥' },
    { label: 'BYD', pct: 2.31, val: '217,042.00', color: '#ec4899', currency: '¥' },
    { label: 'Others', pct: 79.84, val: '7,501,564.24', color: '#94a3b8', currency: '¥' },
  ];

  const holdingsData = [
    { name: 'BGF WLD MIN', code: 'IPFD3004', returnRate: '21.76%', holdingDays: '458 Days', threeMonthChange: '+8.45%', assetClass: 'Overseas Market', mktValue: 939574.62, weight: '9.77%', sectorWeight: { 'Cycle': '7.57%', 'Others': '2.43%' }, industryWeight: { 'Consumer': '7.57%', 'Financials': '0.50%', 'Others': '1.93%' }, topStocks: [{ name: 'Alibaba', contribution: '2.00%' }, { name: 'Meituan', contribution: '1.88%' }] },
    { name: 'BGF ENERGY', code: 'IPFD3145', returnRate: '-0.86%', holdingDays: '124 Days', threeMonthChange: '-2.15%', assetClass: 'Overseas Market', mktValue: 939574.62, weight: '10.02%', sectorWeight: { 'Cycle': '7.57%', 'Others': '2.43%' }, industryWeight: { 'Energy': '7.57%', 'Financials': '0.35%', 'Others': '2.08%' }, topStocks: [{ name: 'BYD', contribution: '1.31%' }] },
    { name: 'BGF GOLD', code: 'IPFD3131', returnRate: '18.53%', holdingDays: '562 Days', threeMonthChange: '+12.30%', assetClass: 'Commodities & Others', mktValue: 1348936.56, weight: '23.17%', sectorWeight: { 'Cycle': '21.91%', 'Others': '3.09%' }, industryWeight: { 'Materials': '21.91%', 'Others': '3.09%' }, topStocks: [{ name: 'TSMC', contribution: '1.67%' }] },
    { name: 'BLK Sys GE High Inc', code: 'IPFD3116', returnRate: '42.56%', holdingDays: '890 Days', threeMonthChange: '+5.12%', assetClass: 'Domestic Equity', mktValue: 1137489.55, weight: '12.56%', sectorWeight: { 'Cycle': '10.64%', 'Others': '1.36%' }, industryWeight: { 'Financials': '10.64%', 'Others': '1.36%' }, topStocks: [{ name: 'Ping An', contribution: '2.54%' }, { name: 'Tencent', contribution: '1.50%' }] },
    { name: 'BLK Sys GE High Inc', code: 'IPFD2116', returnRate: '11.10%', holdingDays: '215 Days', threeMonthChange: '+3.88%', assetClass: 'Domestic Equity', mktValue: 1126489.55, weight: '11.33%', sectorWeight: { 'Cycle': '10.64%', 'Others': '1.36%' }, industryWeight: { 'Financials': '10.64%', 'Others': '1.36%' }, topStocks: [{ name: 'Tencent', contribution: '1.50%' }] },
    { name: 'BIK World Tech', code: 'IPFD2254', returnRate: '0.20%', holdingDays: '15 Days', threeMonthChange: '-0.45%', assetClass: 'Domestic Equity', mktValue: 1033532.09, weight: '12.56%', sectorWeight: { 'Manufacturing': '10.64%', 'Others': '0.36%' }, industryWeight: { 'Technology': '10.64%', 'Others': '0.36%' }, topStocks: [{ name: 'TSMC', contribution: '2.00%' }, { name: 'Alibaba', contribution: '1.94%' }] },
    { name: 'JPM GEHI USD', code: 'IPFD3540', returnRate: '4.41%', holdingDays: '180 Days', threeMonthChange: '+1.20%', assetClass: 'Domestic Equity', mktValue: 859305.69, weight: '10.21%', sectorWeight: { 'Utilities': '10.21%' }, industryWeight: { 'Healthcare': '10.21%' }, topStocks: [{ name: 'BYD', contribution: '1.00%' }] },
    { name: 'CR Trust FirstEagle No.1', code: 'T1C477', returnRate: '20.91%', holdingDays: '630 Days', threeMonthChange: '+7.15%', assetClass: 'Commodities & Others', mktValue: 459451.99, weight: '4.89%', sectorWeight: { 'Others': '4.89%' }, industryWeight: { 'Financials': '4.89%' }, topStocks: [{ name: 'Tencent', contribution: '1.82%' }, { name: 'Meituan', contribution: '1.00%' }] },
    { name: 'CR Trust FirstEagle No.8', code: 'T1E648', returnRate: '-1.49%', holdingDays: '92 Days', threeMonthChange: '+0.55%', assetClass: 'Domestic Fixed Income', mktValue: 460391.57, weight: '10.90%', sectorWeight: { 'Others': '4.90%' }, industryWeight: { 'Others': '4.90%' }, topStocks: [] },
  ];

  const [activeDetailTab, setActiveDetailTab] = useState('Style');
  const [showGoalTracking, setShowGoalTracking] = useState(false);
  const [selectedAssetClass, setSelectedAssetClass] = useState<string | null>(null);
  const [holdingStyle, setHoldingStyle] = useState('Balanced');
  const [concentrationTab, setConcentrationTab] = useState('Sector');
  const [selectedConcentrationItem, setSelectedConcentrationItem] = useState<string | null>(null);

  const geographiesData = [
    { label: 'China', pct: 71.63, val: '6,730,173.03', color: '#da0011', currency: '¥' }, 
    { label: 'Remaining types', pct: 13.99, val: '1,314,464.90', color: '#ebeef0', currency: '¥' }, 
    { label: 'United States', pct: 8.26, val: '109,308.26', color: '#0ea5e9', currency: '$' }, 
    { label: 'Hong Kong, China', pct: 2.99, val: '308,717.37', color: '#f43f5e', currency: 'HK$' }, 
    { label: 'Germany', pct: 1.60, val: '19,780.52', color: '#8b5cf6', currency: '€' }, 
    { label: 'Taiwan, China', pct: 1.53, val: '668,627.53', color: '#f59e0b', currency: 'NT$' }, 
  ];

  const topStockHoldings = [
    { name: 'Tencent Holdings Ltd', ticker: '0700.HK', sector: 'Communication Services', weight: '4.82%', value: '452,875.00', dailyChange: '+1.35%', marketCap: 'Large Cap', region: 'Hong Kong' },
    { name: 'Alibaba Group Holding Ltd', ticker: 'BABA.US', sector: 'Consumer Cyclical', weight: '3.94%', value: '370,192.00', dailyChange: '+2.12%', marketCap: 'Large Cap', region: 'United States' },
    { name: 'TSMC', ticker: '2330.TW', sector: 'Technology', weight: '3.67%', value: '344,824.00', dailyChange: '-0.45%', marketCap: 'Large Cap', region: 'Taiwan' },
    { name: 'Meituan', ticker: '3690.HK', sector: 'Consumer Cyclical', weight: '2.88%', value: '270,597.00', dailyChange: '+3.21%', marketCap: 'Large Cap', region: 'Hong Kong' },
    { name: 'Ping An Insurance', ticker: '2318.HK', sector: 'Financial Services', weight: '2.54%', value: '238,652.00', dailyChange: '+0.67%', marketCap: 'Large Cap', region: 'Hong Kong' },
    { name: 'BYD Company Ltd', ticker: '1211.HK', sector: 'Consumer Cyclical', weight: '2.31%', value: '217,042.00', dailyChange: '+4.56%', marketCap: 'Large Cap', region: 'Hong Kong' },
  ];

  const GoalIcons = {
    Wealth: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1" />
      </svg>
    ),
    Education: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5z" strokeWidth="2" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeWidth="2" />
      </svg>
    ),
    Retirement: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Family: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    Legacy: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  };

  const renderGoalTab = () => {
    const pots = [
      { label: 'Flexible Access', val: '80,773,627.08', pct: 52, color: '#f97316' },
      { label: 'Future Security', val: '27,337,130.41', pct: 18, color: '#fbbf24' },
      { label: 'Wealth Appreciation', val: '46,724,712.56', pct: 30, color: '#2563eb' }
    ];

    return (
      <div className="animate-fade-in space-y-6 pt-2">
        <div className="bg-white p-2 rounded-[3px] space-y-5">
           <div className="text-2xl font-bold text-[#1e1e1e] tracking-tight">
             {totalAssetValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
           </div>
           <div className="flex h-3 w-full rounded-full overflow-hidden bg-gray-100">
             {pots.map((pot, i) => (
               <div key={i} className="h-full border-r border-white/20 last:border-0" style={{ width: `${pot.pct}%`, backgroundColor: pot.color }} />
             ))}
           </div>
           <div className="grid grid-cols-3 gap-2">
             {pots.map((pot, i) => (
               <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pot.color }} />
                    <span className="text-[9px] font-bold text-[#767676] uppercase tracking-tighter truncate">{pot.label}</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#1e1e1e] leading-none mb-0.5">
                    {pot.val.split('.')[0]}<span className="text-[9px] opacity-60">.{pot.val.split('.')[1]}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 font-medium">{pot.pct}%</span>
               </div>
             ))}
           </div>
        </div>

         <div className="flex items-center gap-3 mb-4 px-1">
          <div className="w-1.5 h-8 bg-[#da0011] mr-1 shadow-sm"></div>
          <div className="relative z-10">
            <h3 className="text-[14px] font-bold text-[#333333] uppercase tracking-tight">Financial Goal Tracking Results</h3>
          </div>
        </div>

        <div className="space-y-4">
          <GoalDetailItem 
            title="Growing my/our wealth" 
            targetYear={2031} 
            targetValue="1,107,740.69" 
            todayValue="753,263.67" 
            progress={68} 
            icon={GoalIcons.Wealth}
            info="Wealth Appreciation: We offer a wide range of investment options to match your goals and experience, helping you achieve wealth appreciation."
          />
          <GoalDetailItem 
            title="Children's future" 
            targetYear={2029} 
            targetValue="100,565.56" 
            todayValue="25,141.39" 
            progress={25} 
            icon={GoalIcons.Education}
            info="Children's Education: Whether your child is starting school or preparing to study abroad, early planning ensures a bright future for them."
          />
          <GoalDetailItem 
            title="Planning for retirement" 
            targetYear={2047} 
            targetValue="3,247,768.61" 
            todayValue="1,461,495.87" 
            progress={45} 
            icon={GoalIcons.Retirement}
            info="Retirement Planning: A great retirement depends on multi-layered protection. Consider asset protection to ensure secure retirement income."
          />
          <GoalDetailItem 
            title="Protecting my family" 
            targetYear={2046} 
            targetValue="2,531,707.69" 
            todayValue="303,804.92" 
            progress={12} 
            icon={GoalIcons.Family}
            info="Family Protection: Comprehensive wealth planning not only provides protection for your loved ones but also gives you more confidence in the future."
          />
          <GoalDetailItem 
            title="Leaving my legacy" 
            targetYear={2069} 
            targetValue="96,938,954.49" 
            todayValue="7,755,116.36" 
            progress={8} 
            icon={GoalIcons.Legacy}
            info="Legacy Planning: The fruit of years of hard work should be shared with loved ones through wise legacy planning and distribution."
          />
        </div>

        <div className="mt-10 p-5 bg-gray-50/50 rounded-[4px] border border-gray-100/50 space-y-4">
          <div className="flex gap-2.5 items-start">
            <div className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center text-white text-[10px] shrink-0 font-bold">!</div>
            <p className="text-[10px] text-[#767676] leading-snug">
              Today's value only displays the amount that has been linked to the financial goal.
            </p>
          </div>
          <div className="pl-6.5">
            <p className="text-[10px] text-[#767676] leading-relaxed">
              HSBC invites you to make financial planning and get exclusive solutions according to your goals. Welcome to contact your RM or call our 24 hour customer service hotline 95366 for details.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f5f6] overflow-y-auto no-scrollbar font-sans">
      {/* Header */}
      <div className="bg-[#da0011] pt-12 pb-4 px-4 sticky top-0 z-50">
        <div className="flex items-center justify-between text-white">
          <button onClick={onBack} className="p-1 active:opacity-60 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h1 className="text-sm font-bold tracking-widest uppercase">Analysis of Holdings</h1>
          <div className="w-6 h-6"></div>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* Show Goal Tracking View if activated */}
        {showGoalTracking ? (
          <div className="space-y-4">
            {/* Back to Holdings Button */}
            <button
              onClick={() => setShowGoalTracking(false)}
              className="flex items-center gap-2 text-[#da0011] font-bold text-[12px] uppercase tracking-tight active:opacity-60 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Holdings
            </button>
            
            {/* Goal Tracking Content */}
            <div className="bg-white rounded-[3px] border border-[#ebeef0] shadow-sm p-5">
              {renderGoalTab()}
            </div>
          </div>
        ) : (
          <>
        
        {/* Goal Tracking Entry Point */}
        <button
          onClick={() => setShowGoalTracking(true)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#da0011]/5 to-[#da0011]/10 border border-[#da0011]/20 rounded-[3px] active:bg-[#da0011]/20 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#da0011] rounded-full flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[13px] font-bold text-[#1e1e1e] uppercase tracking-tight">Goal Tracking</div>
              <div className="text-[10px] text-[#767676] font-medium">Track your financial goals & progress</div>
            </div>
          </div>
          <svg className="w-5 h-5 text-[#da0011] group-active:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        {/* Tab Selection */}
        <div className="bg-white rounded-[3px] border border-[#ebeef0] overflow-hidden shadow-sm">
          <div className="flex border-b border-[#f4f5f6] overflow-x-auto no-scrollbar">
            {detailTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveDetailTab(tab);
                  // Default selection logic
                  if (tab === 'Classes') {
                    const maxItem = [...assetClassesData].sort((a, b) => b.pct - a.pct)[0];
                    if (maxItem) setSelectedAssetClass(maxItem.label);
                  } else if (tab === 'Concentration') {
                    let data = [];
                    if (concentrationTab === 'Sector') data = concentrationSectorData;
                    else if (concentrationTab === 'Industry') data = concentrationIndustryData;
                    else if (concentrationTab === 'Top Holdings') data = concentrationTopHoldingsData;
                    const maxItem = [...data].sort((a, b) => b.pct - a.pct)[0];
                    if (maxItem) setSelectedConcentrationItem(maxItem.label);
                  }
                }}
                className={`flex-1 py-4 text-[12px] font-bold relative whitespace-nowrap transition-colors ${activeDetailTab === tab ? 'text-[#da0011]' : 'text-[#767676]'}`}
              >
                {tab}
                {activeDetailTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#da0011]" />}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeDetailTab === 'Style' && (
              <div className="animate-fade-in space-y-5">
                {/* Simplified Insight Box */}
                <div className="flex items-center gap-2 p-3 bg-blue-50/50 border border-blue-100 rounded-[3px]">
                  <div className="p-0.5 bg-blue-500 rounded-full flex-shrink-0">
                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-[10px] text-blue-800 font-medium">
                    Maintain <span className="font-bold">70% Balanced</span> core while increasing Growth for long-term upside.
                  </p>
                </div>

                {/* Style Toggle Buttons */}
                <div className="flex gap-2.5 bg-[#f4f5f6] p-1 rounded-full w-fit">
                  {[
                    { id: 'Value', label: 'Value', pct: '15%' },
                    { id: 'Balanced', label: 'Balanced', pct: '70%' },
                    { id: 'Growth', label: 'Growth', pct: '15%' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setHoldingStyle(tab.id)}
                      className={`px-5 py-2 rounded-full flex flex-col items-center transition-all ${
                        holdingStyle === tab.id 
                        ? 'bg-white text-[#da0011] shadow-sm' 
                        : 'text-[#767676] hover:text-[#da0011]/60'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase leading-tight">{tab.label}</span>
                      <span className="text-[9px] font-bold opacity-80">{tab.pct}</span>
                    </button>
                  ))}
                </div>

                {/* Fund List Header */}
                <div className="flex text-[9px] font-bold text-[#767676] uppercase tracking-tighter pb-2 border-b border-gray-100 mt-4">
                  <div className="w-[45%]">Holding</div>
                  <div className="w-[30%] text-center">Holding Return Rate</div>
                  <div className="w-[25%] text-right pr-1">3M Change</div>
                </div>

                {/* Main Style Holdings */}
                <div className="space-y-4">
                  {styleHoldings
                    .filter(h => h.style === holdingStyle)
                    .sort((a, b) => parseFloat(b.returnRate) - parseFloat(a.returnRate)) // Sorting style holdings as well
                    .map((item, idx) => {
                    const isRatePositive = !item.returnRate.startsWith('-');
                    const is3MPositive = !item.threeMonthChange.startsWith('-');
                    return (
                    <div key={idx} className="flex items-center py-1 border-b border-gray-50 last:border-0 pb-3">
                      <div className="w-[45%] text-[11px] font-bold text-[#1e1e1e] leading-tight pr-2">
                        {item.name}
                        <div className="text-[9px] text-[#767676] font-medium mt-0.5">{item.id}</div>
                      </div>
                      <div className="w-[30%] text-center">
                        <div className={`text-[11px] font-bold ${isRatePositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
                          {item.returnRate}
                        </div>
                        <div className="text-[9px] text-[#767676] font-medium mt-0.5">{item.holdingDays}</div>
                      </div>
                      <div className="w-[25%] text-right pr-1">
                        <div className={`text-[11px] font-bold ${is3MPositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
                          {item.threeMonthChange}
                        </div>
                      </div>
                    </div>
                  );})}
                </div>

                {/* Trust Section if applicable */}
                {styleTrustHoldings.filter(h => h.style === holdingStyle).length > 0 && (
                  <div className="mt-4 space-y-4">
                    {styleTrustHoldings
                      .filter(h => h.style === holdingStyle)
                      .map((item, idx) => {
                      const isRatePositive = !item.returnRate.startsWith('-');
                      const is3MPositive = !item.threeMonthChange.startsWith('-');
                      return (
                      <div key={`trust-${idx}`} className="flex items-center py-1 border-b border-gray-50 last:border-0 pb-3">
                        <div className="w-[45%] text-[11px] font-bold text-[#1e1e1e] leading-tight pr-2">
                          {item.name}
                          <div className="text-[9px] text-[#767676] font-medium mt-0.5">{item.id}</div>
                        </div>
                        <div className="w-[30%] text-center">
                          <div className={`text-[11px] font-bold ${isRatePositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
                            {item.returnRate}
                          </div>
                          <div className="text-[9px] text-[#767676] font-medium mt-0.5">{item.holdingDays}</div>
                        </div>
                        <div className="w-[25%] text-right pr-1">
                          <div className={`text-[11px] font-bold ${is3MPositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
                            {item.threeMonthChange}
                          </div>
                        </div>
                      </div>
                    );})}
                  </div>
                )}
                
                <div className="pt-6 border-t border-[#f4f5f6] space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-[#1e1e1e]">
                    <span className="font-bold">Total asset value:</span>
                    <span className="font-bold">CNY {totalAssetValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#1e1e1e]">
                    <span className="font-bold">Total funds in transit:</span>
                    <span className="font-bold">CNY {totalFundsInTransit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="pt-4 text-right">
                    <p className="text-[8px] text-[#767676] italic">Exchange rate: As of 30 December 2025 12:45</p>
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === 'Classes' && (
              <div className="animate-fade-in space-y-12">
                <AllocationSection 
                  title="Asset Classes" 
                  data={assetClassesData} 
                  showVal={true} 
                  useTreemap={true} 
                  insight="Your portfolio is mainly in Domestic Equity (42.14%). Consider increasing exposure to Overseas Markets for better global diversification."
                  onItemClick={(label) => setSelectedAssetClass(label === selectedAssetClass ? null : label)}
                  selectedItem={selectedAssetClass}
                  hideTitle={true}
                />

                {selectedAssetClass && (
                  <div className="border-t border-[#f4f5f6] pt-4 animate-fade-in" style={{ marginTop: '0.5rem' }}>
                    <div className="flex flex-start gap-2 mb-4 px-1">
                      <div 
                        className="w-1 h-4 mt-0.5" 
                        style={{ backgroundColor: assetClassesData.find(a => a.label === selectedAssetClass)?.color || '#da0011' }}
                      ></div>
                      <h4 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tight">{selectedAssetClass} Holdings</h4>
                    </div>
                    
                    <div className="flex text-[9px] font-bold text-[#767676] mb-4 uppercase tracking-tighter px-1 border-b border-gray-100 pb-2">
                      <div className="w-[45%]">Holding</div>
                      <div className="w-[30%] text-center">Holding Return Rate</div>
                      <div className="w-[25%] text-right pr-1">3M Change</div>
                    </div>
                    
                    <div className="space-y-4">
                      {holdingsData
                        .filter(f => f.assetClass === selectedAssetClass)
                        .sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight))
                        .map((fund, idx) => {
                          const isRatePositive = !fund.returnRate.startsWith('-');
                          const is3MPositive = !fund.threeMonthChange.startsWith('-');
                          return (
                            <div key={idx} className="flex items-center text-[11px] px-1 group active:bg-gray-50 transition-colors py-1 border-b border-gray-50 last:border-0 pb-3">
                              <div className="w-[45%] flex flex-col">
                                <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
                                <span className="text-[9px] text-[#767676] mt-0.5 font-medium">{fund.code}</span>
                              </div>
                              <div className="w-[30%] text-center">
                                <div className={`text-[11px] font-bold ${isRatePositive ? 'text-[#da0011]' : 'text-[#008c4a]'}`}>
                                  {fund.returnRate}
                                </div>
                                <div className="text-[9px] text-[#767676] font-medium mt-0.5">{fund.holdingDays}</div>
                              </div>
                              <div className="w-[25%] text-right pr-1 font-bold">
                                <span className={is3MPositive ? 'text-[#da0011]' : 'text-[#008c4a]'}>
                                  {fund.threeMonthChange}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Geographies analysis shows regional distribution of assets */}
                {/* 
                <AllocationSection 
                  title="Geographies" 
                  data={geographiesData} 
                  showVal={true} 
                  useTreemap={true} 
                  insight="Your portfolio is 71.63% concentrated in China. Expand exposure to Developed Markets like the US and Germany to reduce regional risk."
                />
                */}

              </div>
            )}

            {activeDetailTab === 'Concentration' && (
              <div className="animate-fade-in space-y-6">
                {/* Concentration Toggle Buttons */}
                <div className="flex gap-2 p-1 bg-[#f4f5f6] rounded-[4px]">
                  {[
                    { id: 'Sector', label: 'Sector' },
                    { id: 'Industry', label: 'Industry' },
                    { id: 'Top Holdings', label: 'Top Holdings' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setConcentrationTab(tab.id);
                        // Default to the highest percentage item in the new tab
                        let data = [];
                        if (tab.id === 'Sector') data = concentrationSectorData;
                        else if (tab.id === 'Industry') data = concentrationIndustryData;
                        else if (tab.id === 'Top Holdings') data = concentrationTopHoldingsData;
                        const maxItem = [...data].sort((a, b) => b.pct - a.pct)[0];
                        if (maxItem) setSelectedConcentrationItem(maxItem.label);
                      }}
                      className={`flex-1 py-2 text-[11px] font-bold rounded-[3px] transition-all ${
                        concentrationTab === tab.id 
                        ? 'bg-white text-[#da0011] shadow-sm' 
                        : 'text-[#767676]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {concentrationTab === 'Sector' && (
                  <div className="space-y-6 animate-fade-in">
                    <AllocationSection 
                      title="Sector Concentration" 
                      data={[...concentrationSectorData].sort((a, b) => b.pct - a.pct)} 
                      showVal={true} 
                      useTreemap={true} 
                      insight="Your portfolio is heavily biased towards Cyclical sectors (58.33%), which may increase volatility during economic shifts."
                      onItemClick={(label) => setSelectedConcentrationItem(label === selectedConcentrationItem ? null : label)}
                      selectedItem={selectedConcentrationItem}
                      hideTitle={true}
                    />

                    {selectedConcentrationItem && (
                      <div className="border-t border-[#f4f5f6] pt-4 animate-fade-in">
                        <div className="flex flex-start gap-2 mb-4 px-1">
                          <div 
                            className="w-1 h-4 mt-0.5" 
                            style={{ backgroundColor: concentrationSectorData.find(s => s.label === selectedConcentrationItem)?.color || '#da0011' }}
                          ></div>
                          <div className="flex flex-col">
                            <h4 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tight">
                              {selectedConcentrationItem} is heavily held by the following funds:
                            </h4>
                            <p className="text-[9px] text-[#999] font-medium mt-0.5 leading-tight italic">
                              High concentration indicates this fund allocates a significant portion of its equity to this sector.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex text-[9px] font-bold text-[#767676] mb-4 uppercase tracking-tighter px-1 border-b border-gray-100 pb-2">
                          <div className="w-[40%]">Holdings</div>
                          <div className="w-[35%] text-center">Weight / Amount</div>
                          <div className="w-[25%] text-right pr-1">Concentration</div>
                        </div>
                        
                        <div className="space-y-4">
                          {holdingsData
                            .filter(f => (f.sectorWeight as any)[selectedConcentrationItem!])
                            .sort((a, b) => parseFloat((b.sectorWeight as any)[selectedConcentrationItem!]) - parseFloat((a.sectorWeight as any)[selectedConcentrationItem!]))
                            .map((fund, idx) => (
                              <div key={idx} className="flex items-center text-[11px] px-1 py-1 border-b border-gray-50 last:border-0 pb-3">
                                <div className="w-[40%] flex flex-col">
                                  <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
                                  <span className="text-[9px] text-[#767676] mt-0.5 font-medium">{fund.code}</span>
                                </div>
                                <div className="w-[35%] text-center">
                                  <div className="font-bold text-[#1e1e1e]">{((fund.mktValue / totalAssetValue) * 100).toFixed(2)}%</div>
                                  <div className="text-[9px] text-[#767676] font-medium mt-0.5">¥{fund.mktValue.toLocaleString()}</div>
                                </div>
                                <div className="w-[25%] text-right pr-1 font-bold" style={{ color: concentrationSectorData.find(s => s.label === selectedConcentrationItem)?.color || '#da0011' }}>
                                  {(fund.sectorWeight as any)[selectedConcentrationItem!]}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {concentrationTab === 'Industry' && (
                  <div className="space-y-6 animate-fade-in">
                    <AllocationSection 
                      title="Industry Concentration" 
                      data={[...concentrationIndustryData].sort((a, b) => b.pct - a.pct)} 
                      showVal={true} 
                      useTreemap={true} 
                      insight="Financials and Materials dominate your industry exposure. Consider diversifying into defensive sectors like Utilities."
                      onItemClick={(label) => setSelectedConcentrationItem(label === selectedConcentrationItem ? null : label)}
                      selectedItem={selectedConcentrationItem}
                      hideTitle={true}
                    />

                    {selectedConcentrationItem && (
                      <div className="border-t border-[#f4f5f6] pt-4 animate-fade-in">
                        <div className="flex flex-start gap-2 mb-4 px-1">
                          <div 
                            className="w-1 h-4 mt-0.5" 
                            style={{ backgroundColor: concentrationIndustryData.find(i => i.label === selectedConcentrationItem)?.color || '#da0011' }}
                          ></div>
                          <div className="flex flex-col">
                            <h4 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tight">
                              {selectedConcentrationItem} is heavily held by the following funds:
                            </h4>
                            <p className="text-[9px] text-[#999] font-medium mt-0.5 leading-tight italic">
                              High concentration indicates this fund allocates a significant portion of its equity to this industry.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex text-[9px] font-bold text-[#767676] mb-4 uppercase tracking-tighter px-1 border-b border-gray-100 pb-2">
                          <div className="w-[40%]">Holdings</div>
                          <div className="w-[35%] text-center">Weight / Amount</div>
                          <div className="w-[25%] text-right pr-1">Concentration</div>
                        </div>
                        
                        <div className="space-y-4">
                          {holdingsData
                            .filter(f => (f.industryWeight as any)[selectedConcentrationItem!])
                            .sort((a, b) => parseFloat((b.industryWeight as any)[selectedConcentrationItem!]) - parseFloat((a.industryWeight as any)[selectedConcentrationItem!]))
                            .map((fund, idx) => (
                              <div key={idx} className="flex items-center text-[11px] px-1 py-1 border-b border-gray-50 last:border-0 pb-3">
                                <div className="w-[40%] flex flex-col">
                                  <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
                                  <span className="text-[9px] text-[#767676] mt-0.5 font-medium">{fund.code}</span>
                                </div>
                                <div className="w-[35%] text-center">
                                  <div className="font-bold text-[#1e1e1e]">{((fund.mktValue / totalAssetValue) * 100).toFixed(2)}%</div>
                                  <div className="text-[9px] text-[#767676] font-medium mt-0.5">¥{fund.mktValue.toLocaleString()}</div>
                                </div>
                                <div className="w-[25%] text-right pr-1 font-bold" style={{ color: concentrationIndustryData.find(i => i.label === selectedConcentrationItem)?.color || '#da0011' }}>
                                  {(fund.industryWeight as any)[selectedConcentrationItem!]}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {concentrationTab === 'Top Holdings' && (
                  <div className="space-y-6 animate-fade-in">
                    <AllocationSection 
                      title="Top Holdings Concentration" 
                      data={[...concentrationTopHoldingsData].sort((a, b) => b.pct - a.pct)} 
                      showVal={true} 
                      useTreemap={true} 
                      insight="Your top 6 stocks represent 20.16% of total assets. Monitor these closely for idiosyncratic risk."
                      onItemClick={(label) => setSelectedConcentrationItem(label === selectedConcentrationItem ? null : label)}
                      selectedItem={selectedConcentrationItem}
                      hideTitle={true}
                    />

                    {selectedConcentrationItem && (
                      <div className="border-t border-[#f4f5f6] pt-4 animate-fade-in">
                        <div className="flex flex-start gap-2 mb-4 px-1">
                          <div 
                            className="w-1 h-4 mt-0.5" 
                            style={{ backgroundColor: concentrationTopHoldingsData.find(t => t.label === selectedConcentrationItem)?.color || '#da0011' }}
                          ></div>
                          <div className="flex flex-col">
                            <h4 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tight">
                              {selectedConcentrationItem === 'Others' ? 'Other Assets Breakdown' : `Funds holding ${selectedConcentrationItem}:`}
                            </h4>
                            <p className="text-[9px] text-[#999] font-medium mt-0.5 leading-tight italic">
                              {selectedConcentrationItem === 'Others' 
                                ? "These funds contain secondary positions and cash not listed in the top holdings."
                                : `High concentration indicates ${selectedConcentrationItem} is a core position for these funds.`}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex text-[9px] font-bold text-[#767676] mb-4 uppercase tracking-tighter px-1 border-b border-gray-100 pb-2">
                          <div className="w-[40%]">Holdings</div>
                          <div className="w-[35%] text-center">Weight / Amount</div>
                          <div className="w-[25%] text-right pr-1">Concentration</div>
                        </div>
                        
                        <div className="space-y-4">
                          {holdingsData
                            .filter(f => {
                              if (selectedConcentrationItem === 'Others') {
                                // If "Others" is selected, show funds where top stocks don't account for 100% of the weight
                                const totalWeight = (f.mktValue / totalAssetValue) * 100;
                                const topStocksWeight = (f.topStocks as any[]).reduce((sum, s) => sum + parseFloat(s.contribution), 0);
                                return totalWeight > topStocksWeight;
                              }
                              return f.topStocks.some(s => s.name === selectedConcentrationItem);
                            })
                            .sort((a, b) => {
                              const getContrib = (fund: any) => {
                                if (selectedConcentrationItem === 'Others') {
                                  const totalWeight = (fund.mktValue / totalAssetValue) * 100;
                                  const topStocksWeight = (fund.topStocks as any[]).reduce((sum, s) => sum + parseFloat(s.contribution), 0);
                                  return totalWeight - topStocksWeight;
                                }
                                return parseFloat(fund.topStocks.find((s: any) => s.name === selectedConcentrationItem)?.contribution || '0');
                              };
                              return getContrib(b) - getContrib(a);
                            })
                            .map((fund, idx) => {
                              let concentrationValue = '';
                              const themeColor = concentrationTopHoldingsData.find(t => t.label === selectedConcentrationItem)?.color || '#da0011';
                              
                              if (selectedConcentrationItem === 'Others') {
                                const totalWeight = (fund.mktValue / totalAssetValue) * 100;
                                const topStocksWeight = (fund.topStocks as any[]).reduce((sum, s) => sum + parseFloat(s.contribution), 0);
                                concentrationValue = (totalWeight - topStocksWeight).toFixed(2) + '%';
                              } else {
                                concentrationValue = fund.topStocks.find(s => s.name === selectedConcentrationItem)?.contribution || '0%';
                              }

                              return (
                                <div key={idx} className="flex items-center text-[11px] px-1 py-1 border-b border-gray-50 last:border-0 pb-3">
                                  <div className="w-[40%] flex flex-col">
                                    <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
                                    <span className="text-[9px] text-[#767676] mt-0.5 font-medium">{fund.code}</span>
                                  </div>
                                  <div className="w-[35%] text-center">
                                    <div className="font-bold text-[#1e1e1e]">{((fund.mktValue / totalAssetValue) * 100).toFixed(2)}%</div>
                                    <div className="text-[9px] text-[#767676] font-medium mt-0.5">¥{fund.mktValue.toLocaleString()}</div>
                                  </div>
                                  <div className="w-[25%] text-right pr-1 font-bold" style={{ color: themeColor }}>
                                    {concentrationValue}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FundInsightDetails;
