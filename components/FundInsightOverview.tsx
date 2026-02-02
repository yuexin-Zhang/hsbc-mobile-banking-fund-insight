
import React, { useState, useEffect, useMemo, useRef } from 'react';
import AIAssistant from './AIAssistant';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import HoldingsOverview from './overview/HoldingsOverview';
import StyleTab from './tabs/StyleTab';
import PerformanceTab from './tabs/PerformanceTab';
import ClassesTab from './tabs/ClassesTab';
import ConcentrationTab from './tabs/ConcentrationTab';
import FloatingAIButton from './FloatingAIButton';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, TreemapController, TreemapElement);

interface FundInsightOverviewProps {
  onBack: () => void;
  onGoToDetails: () => void;
  onGoToSimulation: () => void;
}

const FundInsightOverview: React.FC<FundInsightOverviewProps> = ({ onBack, onGoToDetails, onGoToSimulation }) => {
  const [showToast, setShowToast] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState('Performance');
  const [currentTime, setCurrentTime] = useState('');
  
  // Refs for tab sections
  const performanceRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLDivElement>(null);
  const classesRef = useRef<HTMLDivElement>(null);
  const concentrationRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingFromClick = useRef(false);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

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

  const totalAssetValue = 9395746.24;
  const detailTabs = ['Performance', 'Classes', 'Style', 'Concentration'];

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

  const handleExport = () => {
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Handle scroll to update active tab
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      // Don't update tab during programmatic scroll from click
      if (isScrollingFromClick.current) return;
      
      const scrollTop = scrollContainer.scrollTop;
      const offset = 100; // Offset for sticky header

      const sections = [
        { ref: performanceRef, name: 'Performance' },
        { ref: classesRef, name: 'Classes' },
        { ref: styleRef, name: 'Style' },
        { ref: concentrationRef, name: 'Concentration' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop - offset;
          if (scrollTop >= sectionTop - 50) {
            setActiveDetailTab(section.name);
            break;
          }
        }
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle tab click to scroll to section
  const handleTabClick = (tab: string) => {
    // Immediately set active tab for instant feedback
    setActiveDetailTab(tab);
    
    // Disable auto-detection during programmatic scroll
    isScrollingFromClick.current = true;
    
    let targetRef: React.RefObject<HTMLDivElement> | null = null;
    
    switch (tab) {
      case 'Performance':
        targetRef = performanceRef;
        break;
      case 'Classes':
        targetRef = classesRef;
        break;
      case 'Style':
        targetRef = styleRef;
        break;
      case 'Concentration':
        targetRef = concentrationRef;
        break;
    }

    if (targetRef?.current && scrollContainerRef.current) {
      // Use different offset for Performance (pt-2) vs others (pt-4)
      const headerOffset = tab === 'Performance' ? 110 : 110; // Ensure title visibility for all tabs
      const elementPosition = targetRef.current.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      scrollContainerRef.current.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Re-enable auto-detection after scroll completes
      setTimeout(() => {
        isScrollingFromClick.current = false;
      }, 800); // Adjust timing based on scroll duration
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f5f6] font-sans relative">
      {/* Scrollable content wrapper */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar">
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

      {/* Mobile Status Bar */}
      <div className="bg-white pt-2 pb-1 px-4 sticky top-0 z-50">
        <div className="flex items-center justify-between text-[15px] font-semibold text-gray-900">
          <span>{currentTime || '9:41'}</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M0 6v8h2V6H0zm4 8h12V6H4v8zm14 0h2V6h-2v8z" />
            </svg>
            <span className="text-[11px] ml-0.5">5G</span>
            <svg className="w-6 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 12">
              <rect x="1" y="1" width="18" height="10" rx="2" />
              <rect x="3" y="3" width="14" height="6" fill="currentColor" />
              <path d="M19 4v4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-3 border-b border-gray-200 sticky top-[30px] z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-9 h-9 -ml-2 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors">
              <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-[17px] font-semibold text-gray-900 whitespace-nowrap">Fund Holding Analysis</h1>
          </div>
          
          <button 
            onClick={handleExport}
            className="w-9 h-9 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
            title="Export Report"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2 pb-10">
        <HoldingsOverview
          totalAssetValue={totalAssetValue}
        ></HoldingsOverview>

        {/* Tab Selection for Style, Classes, Concentration */}
        <div className="bg-white rounded-[3px] border border-[#ebeef0] overflow-visible shadow-sm">
          <div className="sticky top-[66px] z-40 bg-white overflow-x-auto no-scrollbar shadow-sm">
            <div className="flex">
              {detailTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`flex-1 py-4 text-[12px] font-bold relative whitespace-nowrap transition-colors ${activeDetailTab === tab ? 'text-[#da0011]' : 'text-[#767676]'}`}
                >
                  {tab}
                  {activeDetailTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#da0011]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="px-2 py-3">
            {/* Performance Section */}
            <div ref={performanceRef} className="scroll-mt-[100px] pt-2">
              <PerformanceTab 
                chartData={chartData}
                colors={colors}
              />
            </div>

            {/* Classes Section */}
            <div ref={classesRef} className="scroll-mt-[100px] mt-8 pt-4 border-t-[6px] border-[#f4f5f6]">
              <ClassesTab 
                assetClassesData={assetClassesData}
                holdingsData={holdingsData}
              />
            </div>

            {/* Style Section */}
            <div ref={styleRef} className="scroll-mt-[100px] mt-8 pt-4 border-t-[6px] border-[#f4f5f6]">
              <StyleTab 
                styleHoldings={styleHoldings}
                styleTrustHoldings={styleTrustHoldings}
                totalAssetValue={totalAssetValue}
              />
            </div>

            {/* Concentration Section */}
            <div ref={concentrationRef} className="scroll-mt-[100px] mt-8 pt-4 border-t-[6px] border-[#f4f5f6]">
              <ConcentrationTab 
                concentrationSectorData={concentrationSectorData}
                concentrationIndustryData={concentrationIndustryData}
                concentrationTopHoldingsData={concentrationTopHoldingsData}
                holdingsData={holdingsData}
                totalAssetValue={totalAssetValue}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      {/* <FloatingAIButton onClick={() => setShowAIAssistant(true)} /> */}
      </div>

      {/* AI Assistant Modal - Outside scrollable area */}
      {showAIAssistant && <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />}
    </div>
  );
};

export default FundInsightOverview;
