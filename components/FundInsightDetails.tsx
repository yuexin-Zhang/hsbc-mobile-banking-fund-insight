
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

const TreemapChart = ({ data }: { data: any[] }) => {
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
    <div className="w-full h-40 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-1 shadow-inner">
      <Chart type="treemap" data={chartData as any} options={options as any} redraw={false} />
    </div>
  );
};

const AllocationSection = ({ title, data, showVal = true, useTreemap = false, insight }: { title: string, data: any[], showVal?: boolean, useTreemap?: boolean, insight?: string }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 pb-2 border-b border-[#f4f5f6]">
      <div className="w-1 h-3.5 bg-[#da0011]"></div>
      <h3 className="text-[12px] font-bold text-[#333] uppercase tracking-tight">{title}</h3>
    </div>
    {insight && (
      <div className="p-3 bg-gray-50/50 border-l-2 border-[#da0011] rounded-r">
        <p className="text-[10px] text-[#767676] leading-snug">{insight}</p>
      </div>
    )}
    <div className={`flex ${useTreemap ? 'flex-col' : 'gap-4'} items-start`}>
      {useTreemap ? <TreemapChart data={data} /> : <PieChart data={data} />}
      <div className={`flex-1 space-y-2.5 ${useTreemap ? 'w-full mt-4' : ''}`}>
        {data.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <div className="w-1.5 h-3 shrink-0 mt-0.5" style={{ backgroundColor: item.color }}></div>
            <div className="flex-1">
              <div className="text-[10px] font-bold text-[#1e1e1e] leading-tight">
                {item.pct}% <span className="font-normal text-gray-500 ml-1">{item.label}</span>
              </div>
              {showVal && item.val && (
                <div className="text-[9px] text-[#767676] font-medium">CNY {item.val}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FundInsightDetails: React.FC<FundInsightDetailsProps> = ({ onBack }) => {
  const detailTabs = ['Allocation', 'Asset Classes', 'Sectors', 'Top Holdings'];
  const [activeDetailTab, setActiveDetailTab] = useState('Allocation');
  const [showGoalTracking, setShowGoalTracking] = useState(false);

  const totalAssetValue = 124835470.05;
  const totalFundsInTransit = 72251756.00;

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

  const productAllocation = [
    { label: 'Cash/Deposits', pct: 52.17, val: '80,773,627.08', color: '#64748b' }, // Medium Slate
    { label: 'Funds&Related', pct: 30.35, val: '46,995,624.56', color: '#da0011' }, // HSBC Red
    { label: 'QDII Structured Note', pct: 6.56, val: '10,154,696.62', color: '#38bdf8' }, // Light Sky
    { label: 'QDII Bond', pct: 5.84, val: '9,044,989.92', color: '#fb7185' }, // Light Rose
    { label: 'Structured Deposits', pct: 5.01, val: '7,760,775.21', color: '#a78bfa' }, // Light Violet
    { label: 'AMP&Trust', pct: 0.05, val: '78,200.00', color: '#34d399' }, // Light Emerald
    { label: 'WMP', pct: 0.01, val: '15,000.00', color: '#fbbf24' }, // Light Amber
    { label: 'Insurance', pct: 0.01, val: '12,556.66', color: '#818cf8' }, // Light Indigo
  ];

  const currencyAllocation = [
    { label: 'CNY', pct: 65.91, val: '102,054,149.96', color: '#da0011' }, // HSBC Red
    { label: 'USD', pct: 28.27, val: '43,764,015.03', color: '#38bdf8' }, // Light Sky
    { label: 'HKD', pct: 3.17, val: '4,907,550.23', color: '#fb7185' }, // Light Rose
    { label: 'EUR', pct: 2.56, val: '3,968,627.11', color: '#a78bfa' }, // Light Violet
    { label: 'AUD', pct: 0.09, val: '141,127.71', color: '#34d399' }, // Light Emerald
  ];

  const assetClassesData = [
    { label: 'Liquidity', pct: 53.71, val: '83,162,130.96', color: '#64748b' }, // Slate
    { label: 'China Equity', pct: 25.71, val: '39,808,189.35', color: '#da0011' }, // HSBC Red
    { label: 'Global Investment Grade Bond', pct: 8.53, val: '13,207,465.59', color: '#0ea5e9' }, // Sky Blue
    { label: 'China Fixed Income', pct: 6.04, val: '9,352,062.39', color: '#10b981' }, // Emerald
    { label: 'Remaining types', pct: 4.42, val: '6,843,737.79', color: '#ebeef0' }, // Light Grey
    { label: 'Developed Market Equity', pct: 1.59, val: '2,461,883.97', color: '#8b5cf6' }, // Violet
  ];

  const geographiesData = [
    { label: 'China', pct: 71.63, val: '110,908,647.20', color: '#da0011' }, // HSBC Red
    { label: 'Remaining types', pct: 13.99, val: '21,661,482.26', color: '#ebeef0' }, // Light Grey
    { label: 'United States', pct: 8.26, val: '12,789,409.83', color: '#0ea5e9' }, // Sky Blue
    { label: 'Hong Kong, China', pct: 2.99, val: '4,629,580.55', color: '#f43f5e' }, // Rose
    { label: 'Germany', pct: 1.60, val: '2,477,367.52', color: '#8b5cf6' }, // Violet
    { label: 'Taiwan, China', pct: 1.53, val: '2,368,982.69', color: '#f59e0b' }, // Amber
  ];

  const sectorsData = [
    { label: 'Consumer Cyclical', pct: 8.71, color: '#f43f5e' }, // Rose
    { label: 'Financial Services', pct: 4.35, color: '#0ea5e9' }, // Sky Blue
    { label: 'Healthcare', pct: 3.12, color: '#10b981' }, // Emerald
    { label: 'Communication Services', pct: 2.61, color: '#8b5cf6' }, // Violet
    { label: 'Technology', pct: 2.33, color: '#f59e0b' }, // Amber
    { label: 'Remaining types', pct: 78.87, color: '#ebeef0' }, // Light Grey
  ];

  const holdingsData = [
    { name: 'HSBC Global Consumer Equity Fund', code: '003412', sector: 'Consumer Cyclical', dailyChange: '+2.88%', weight: '8.71%', periodChange: '1.56%', periodTrend: 'up' },
    { name: 'BlackRock World Financials', code: '005671', sector: 'Financial Services', dailyChange: '+0.25%', weight: '4.35%', periodChange: '0.41%', periodTrend: 'up' },
    { name: 'JPM Global Healthcare Fund', code: '012945', sector: 'Healthcare', dailyChange: '-1.09%', weight: '3.12%', periodChange: '3.93%', periodTrend: 'up' },
    { name: 'Fidelity Global Communications', code: '067820', sector: 'Communication Services', dailyChange: '-0.81%', weight: '2.61%', periodChange: '0.03%', periodTrend: 'up' },
    { name: 'Allianz Global High Tech', code: '098165', sector: 'Technology', dailyChange: '-0.16%', weight: '2.33%', periodChange: '0.92%', periodTrend: 'down' },
    { name: 'HSBC Multi-Asset Income Fund', code: '011223', sector: 'Remaining types', dailyChange: '+0.52%', weight: '35.42%', periodChange: '2.33%', periodTrend: 'down' },
    { name: 'Schroders ISF Global Bond', code: '009112', sector: 'Fixed Income', dailyChange: '+2.31%', weight: '15.15%', periodChange: '2.92%', periodTrend: 'down' },
    { name: 'PIMCO Income Fund', code: '004456', sector: 'Fixed Income', dailyChange: '+1.16%', weight: '10.54%', periodChange: '3.44%', periodTrend: 'down' },
    { name: 'HSBC China Growth Fund', code: '008776', sector: 'Equity', dailyChange: '+0.91%', weight: '12.14%', periodChange: 'New', periodTrend: 'none' },
    { name: 'Invesco Asian Equity', code: '002134', sector: 'Equity', dailyChange: '+1.45%', weight: '5.63%', periodChange: '0.88%', periodTrend: 'up' },
  ];

  const topStockHoldings = [
    { name: 'Tencent Holdings Ltd', ticker: '0700.HK', sector: 'Communication Services', weight: '4.82%', value: '7,463,027.66', dailyChange: '+1.35%', marketCap: 'Large Cap', region: 'Hong Kong' },
    { name: 'Alibaba Group Holding Ltd', ticker: 'BABA.US', sector: 'Consumer Cyclical', weight: '3.94%', value: '6,100,476.33', dailyChange: '+2.12%', marketCap: 'Large Cap', region: 'United States' },
    { name: 'TSMC', ticker: '2330.TW', sector: 'Technology', weight: '3.67%', value: '5,682,381.99', dailyChange: '-0.45%', marketCap: 'Large Cap', region: 'Taiwan' },
    { name: 'Meituan', ticker: '3690.HK', sector: 'Consumer Cyclical', weight: '2.88%', value: '4,459,260.86', dailyChange: '+3.21%', marketCap: 'Large Cap', region: 'Hong Kong' },
    { name: 'Ping An Insurance', ticker: '2318.HK', sector: 'Financial Services', weight: '2.54%', value: '3,932,821.12', dailyChange: '+0.67%', marketCap: 'Large Cap', region: 'Hong Kong' },
    { name: 'BYD Company Ltd', ticker: '1211.HK', sector: 'Consumer Cyclical', weight: '2.31%', value: '3,576,707.27', dailyChange: '+4.56%', marketCap: 'Large Cap', region: 'Hong Kong' },
    { name: 'China Construction Bank', ticker: '0939.HK', sector: 'Financial Services', weight: '2.19%', value: '3,390,884.55', dailyChange: '-0.12%', marketCap: 'Large Cap', region: 'Hong Kong' },
    { name: 'Kweichow Moutai', ticker: '600519.SS', sector: 'Consumer Defensive', weight: '1.98%', value: '3,065,733.21', dailyChange: '+0.89%', marketCap: 'Large Cap', region: 'China' },
    { name: 'CATL', ticker: '300750.SZ', sector: 'Technology', weight: '1.76%', value: '2,725,103.44', dailyChange: '+1.23%', marketCap: 'Large Cap', region: 'China' },
    { name: 'JD.com Inc', ticker: 'JD.US', sector: 'Consumer Cyclical', weight: '1.55%', value: '2,399,949.33', dailyChange: '-0.78%', marketCap: 'Large Cap', region: 'United States' },
  ];

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
                onClick={() => setActiveDetailTab(tab)}
                className={`flex-1 py-4 text-[12px] font-bold relative whitespace-nowrap transition-colors ${activeDetailTab === tab ? 'text-[#da0011]' : 'text-[#767676]'}`}
              >
                {tab}
                {activeDetailTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#da0011]" />}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeDetailTab === 'Allocation' && (
              <div className="animate-fade-in space-y-10">
                <AllocationSection 
                  title="Product Allocation" 
                  data={productAllocation} 
                  useTreemap={true} 
                  insight="Your portfolio is heavily weighted in Cash/Deposits (52.17%), providing high liquidity. Consider diversifying into structured products to enhance long-term yield."
                />

                <AllocationSection 
                  title="Currency Allocation" 
                  data={currencyAllocation} 
                  useTreemap={true} 
                  insight="Dominant exposure in CNY (65.91%) ensures local stability. We recommend increasing USD/HKD holdings to hedge against domestic currency fluctuations."
                />
                
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

            {activeDetailTab === 'Asset Classes' && (
              <div className="animate-fade-in space-y-12">
                <AllocationSection 
                  title="Asset Classes" 
                  data={assetClassesData} 
                  showVal={true} 
                  useTreemap={true} 
                  insight="Liquidity (53.71%) is your primary asset class. Consider reallocating a portion to Global Fixed Income for better risk-adjusted returns."
                />

                <AllocationSection 
                  title="Geographies" 
                  data={geographiesData} 
                  showVal={true} 
                  useTreemap={true} 
                  insight="Your portfolio is 71.63% concentrated in China. Expand exposure to Developed Markets like the US and Germany to reduce regional risk."
                />

                {/* Footnote matching image */}
                <div className="flex gap-2 p-3 bg-gray-50 rounded-[2px] border border-gray-100 mt-6">
                   <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center text-white text-[10px] shrink-0 font-bold">!</div>
                   <p className="text-[8.5px] text-[#767676] leading-relaxed italic">
                     The data of the global asset allocation section are provided by Morningstar Information (ShenZhen) Co. Ltd. Please be aware that the proportion in the above figure is rounded up to two decimal places.
                   </p>
                </div>
              </div>
            )}

            {activeDetailTab === 'Sectors' && (
              <div className="animate-fade-in space-y-8">
                <AllocationSection 
                  title="Equity Sector Allocation" 
                  data={sectorsData} 
                  showVal={false} 
                  useTreemap={true} 
                  insight='High concentration in "Remaining types" (78.87%). Diversify into Technology and Healthcare sectors to capture growth in emerging industries.'
                />

                {/* Fund List Header */}
                <div className="mt-8 border-t border-[#f4f5f6] pt-6">
                  <div className="flex text-[10px] font-bold text-[#767676] mb-4 uppercase tracking-tighter px-1">
                    <div className="w-[45%]">Fund</div>
                    <div className="w-[15%] text-center">1D Var</div>
                    <div className="w-[15%] text-center">Weight</div>
                    <div className="w-[25%] text-right pr-1">Change vs L/P</div>
                  </div>
                  
                  {/* Fund List Items */}
                  <div className="space-y-6">
                    {holdingsData.map((fund, idx) => (
                      <div key={idx} className="flex items-center text-[11px] px-1 group active:bg-gray-50 transition-colors">
                        <div className="w-[45%] flex flex-col">
                          <span className="font-bold text-[#1e1e1e] line-clamp-1">{fund.name}</span>
                          <span className="text-[9px] text-[#767676] mt-0.5">{fund.code} | {fund.sector}</span>
                        </div>
                        <div className={`w-[15%] text-center font-bold ${fund.dailyChange.startsWith('+') ? 'text-[#da0011]' : fund.dailyChange.startsWith('-') ? 'text-[#008c4a]' : 'text-[#1e1e1e]'}`}>
                          {fund.dailyChange}
                        </div>
                        <div className="w-[15%] text-center font-bold text-[#1e1e1e]">
                          {fund.weight}
                        </div>
                        <div className="w-[25%] text-right flex items-center justify-end pr-1 font-bold text-[#1e1e1e]">
                          {fund.periodChange}
                          {fund.periodTrend === 'up' && (
                            <span className="text-[#da0011] ml-1 text-[8px]">▲</span>
                          )}
                          {fund.periodTrend === 'down' && (
                            <span className="text-[#008c4a] ml-1 text-[8px]">▼</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === 'Top Holdings' && (
              <div className="animate-fade-in space-y-6">
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-[#fcfcfc] to-white border border-[#ebeef0] rounded-[3px] p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-3.5 bg-[#da0011]"></div>
                    <h3 className="text-[11px] font-bold text-[#333] uppercase tracking-tight">Top Stock Holdings Overview</h3>
                  </div>
                  <p className="text-[10px] text-[#767676] leading-relaxed">
                    These are the individual equity positions with the highest concentration across your entire portfolio. Top holdings represent {topStockHoldings.reduce((sum, h) => sum + parseFloat(h.weight), 0).toFixed(2)}% of your total assets.
                  </p>
                </div>

                {/* Holdings List Header */}
                <div className="space-y-1">
                  <div className="flex text-[9px] font-bold text-[#767676] uppercase tracking-tighter px-2 pb-2 border-b border-[#f4f5f6]">
                    <div className="w-[40%]">Stock / Ticker</div>
                    <div className="w-[15%] text-center">Weight</div>
                    <div className="w-[20%] text-right">Value (CNY)</div>
                    <div className="w-[15%] text-right">1D Change</div>
                    <div className="w-[10%] text-right pr-1">Region</div>
                  </div>
                  
                  {/* Holdings Items */}
                  <div className="space-y-0">
                    {topStockHoldings.map((stock, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center text-[10px] px-2 py-4 border-b border-[#f4f5f6] last:border-0 hover:bg-gray-50/50 transition-colors group"
                      >
                        <div className="w-[40%] flex flex-col">
                          <span className="font-bold text-[#1e1e1e] leading-tight line-clamp-1">{stock.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[8px] text-[#767676] font-medium">{stock.ticker}</span>
                            <span className="text-[7px] text-[#999] bg-gray-100 px-1.5 py-0.5 rounded">{stock.sector}</span>
                          </div>
                        </div>
                        <div className="w-[15%] text-center">
                          <span className="font-bold text-[#1e1e1e] text-[11px]">{stock.weight}</span>
                        </div>
                        <div className="w-[20%] text-right">
                          <span className="font-bold text-[#1e1e1e]">{parseFloat(stock.value.replace(/,/g, '')).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="w-[15%] text-right">
                          <span className={`font-bold text-[10px] ${
                            stock.dailyChange.startsWith('+') ? 'text-[#da0011]' : 
                            stock.dailyChange.startsWith('-') ? 'text-[#008c4a]' : 
                            'text-[#1e1e1e]'
                          }`}>
                            {stock.dailyChange}
                          </span>
                        </div>
                        <div className="w-[10%] text-right pr-1">
                          <span className="text-[8px] text-[#767676] font-medium">{stock.region}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Geographic Distribution */}
                <div className="pt-6 border-t border-[#f4f5f6]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-3.5 bg-[#da0011]"></div>
                    <h4 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-tight">Regional Concentration</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { region: 'Hong Kong', count: 5, pct: '52.4%' },
                      { region: 'China', count: 3, pct: '31.2%' },
                      { region: 'Others', count: 2, pct: '16.4%' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white border border-[#ebeef0] rounded-[3px] p-3 text-center">
                        <div className="text-[9px] text-[#767676] mb-1 uppercase tracking-tight">{item.region}</div>
                        <div className="text-[13px] font-bold text-[#1e1e1e]">{item.pct}</div>
                        <div className="text-[8px] text-[#999] mt-0.5">{item.count} stocks</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk & Recommendation */}
                <div className="bg-[#fcfcfc] border border-[#ebeef0] rounded-[3px] p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-3.5 bg-[#da0011]"></div>
                    <h4 className="text-[11px] font-bold text-[#1e1e1e] uppercase tracking-widest">Holdings Analysis</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold text-[#1e1e1e] uppercase tracking-tight">Concentration Risk</span>
                      </div>
                      <p className="text-[11px] text-[#767676] leading-relaxed">
                        Your top 10 stock positions account for <span className="text-[#1e1e1e] font-bold">27.64%</span> of total assets, with significant exposure to <span className="text-[#1e1e1e] font-bold">Consumer Cyclical</span> and <span className="text-[#1e1e1e] font-bold">Technology</span> sectors in Greater China markets.
                      </p>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold text-[#1e1e1e] uppercase tracking-tight">Portfolio Insight</span>
                      </div>
                      <ul className="text-[10px] text-[#333] space-y-1.5 leading-tight">
                        <li className="flex gap-2">
                          <span className="text-[#767676]">•</span>
                          <span>Consider rebalancing if any single stock exceeds <span className="font-bold">5% threshold</span> to manage idiosyncratic risk.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#767676]">•</span>
                          <span>Enhance diversification by adding exposure to <span className="font-bold">US/European large-caps</span> and <span className="font-bold">Healthcare sector</span>.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="flex gap-2 p-3 bg-gray-50 rounded-[2px] border border-gray-100">
                  <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center text-white text-[10px] shrink-0 font-bold">!</div>
                  <p className="text-[8.5px] text-[#767676] leading-relaxed italic">
                    Stock holdings data is aggregated from underlying fund positions and may include indirect exposure. Values are calculated based on latest available NAV and exchange rates as of 30 December 2025.
                  </p>
                </div>
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
