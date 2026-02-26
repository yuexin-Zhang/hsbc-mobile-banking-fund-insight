import React, { useState, useEffect } from 'react';
import { useMobileDetect } from '../../../../../../hooks/useMobileDetect';
import { StatusBar } from '../../../../components';
import { PriceHeader } from './PriceHeader';
import { PriceChart } from './PriceChart';
import { TradingStats } from './TradingStats';
import { DownloadBanner } from './DownloadBanner';

interface StockDetailPageProps {
  onBack: () => void;
}

const StockDetailPage: React.FC<StockDetailPageProps> = ({ onBack }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [activeTab, setActiveTab] = useState<'Overview' | 'Advance ratio'>('Overview');
  const [activeTimeRange, setActiveTimeRange] = useState('1D');
  const isMobile = useMobileDetect();

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

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      <StatusBar currentTime={currentTime} isMobile={isMobile} />

      <div className={`bg-white py-3 px-4 border-b border-gray-200 sticky z-50 ${isMobile ? 'top-0' : 'top-[30px]'}`}>
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="w-8 h-8 -ml-2 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors flex-shrink-0 z-10 cursor-pointer"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <h1 className="text-[17px] font-semibold text-gray-900">NVDA (US)</h1>
              <p className="text-[13px] text-gray-600">NVIDIA CORP</p>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors flex-shrink-0 cursor-pointer">
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <PriceHeader
          price="171.880"
          currency="USD"
          change="0.000 (0.00%)"
          maxAdvanceRatio="70%"
          bid="N/A"
          ask="N/A"
        />

        <div className="h-[10px] bg-gray-200"></div>

        <div className="bg-white mt-3 border-b border-gray-200">
          <div className="flex">
            {(['Overview', 'Advance ratio'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-[15px] font-medium relative transition-colors cursor-pointer ${
                  activeTab === tab ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#da0011]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Overview' && (
          <PriceChart
            activeTimeRange={activeTimeRange}
            onTimeRangeChange={setActiveTimeRange}
          />
        )}

        {activeTab === 'Advance ratio' && (
          <div>
            <TradingStats />
            <DownloadBanner />
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
        <button className="flex-1 bg-[#da0011] text-white text-[15px] font-semibold py-3 rounded active:opacity-80 transition-opacity cursor-pointer">
          Buy
        </button>
        <button className="flex-1 bg-white text-gray-400 text-[15px] font-semibold py-3 rounded border border-gray-300 active:opacity-80 transition-opacity cursor-pointer">
          Sell
        </button>
      </div>
    </div>
  );
};

export default StockDetailPage;
