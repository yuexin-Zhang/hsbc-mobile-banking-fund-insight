import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationTabsProps {
  activeTab?: 'home' | 'wealth';
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab = 'wealth' }) => {
  const navigate = useNavigate();

  return (
    <div className="border-b border-gray-200">
      <div className="flex items-center justify-around py-1 px-2">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center justify-center p-2"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button className="text-[15px] text-gray-600 px-4 py-2">Pay</button>
        <button className="text-[15px] text-gray-600 px-4 py-2">Cards</button>
        <button 
          className={`text-[15px] px-4 py-2 ${
            activeTab === 'wealth' 
              ? 'text-gray-900 font-semibold border-b-4 border-[#da0011]' 
              : 'text-gray-600'
          }`}
        >
          Wealth
        </button>
        <button className="text-[15px] text-gray-600 px-4 py-2">Ins...</button>
        <button className="flex items-center justify-center p-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NavigationTabs;
