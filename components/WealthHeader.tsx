
import React from 'react';

interface WealthHeaderProps {
  onWealthAssetsClick?: () => void;
}

const WealthHeader: React.FC<WealthHeaderProps> = ({ onWealthAssetsClick }) => {
  return (
    <div className="bg-[#DB0011] text-white pt-12 pb-3 px-4 shadow-sm shrink-0">
      {/* Top Search & Icons */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 mr-3">
          <input 
            type="text" 
            placeholder="Search products or news" 
            className="w-full h-7 bg-white/15 rounded-[2px] px-8 text-xs placeholder:text-white/50 focus:outline-none"
          />
          <svg className="absolute left-2.5 top-1.5 w-3.5 h-3.5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <div className="flex items-center space-x-3.5">
          <button className="text-white active:opacity-60 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </button>
          <button className="text-white active:opacity-60 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Assets Title */}
      <button 
        onClick={onWealthAssetsClick}
        className="flex items-center gap-1 mb-1.5 active:opacity-70 transition-opacity"
      >
        <h2 className="text-sm font-medium opacity-90">Your Wealth Assets <span className="text-[10px] opacity-70">(CNY)</span></h2>
        <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
      </button>

      {/* Assets Value */}
      <div className="flex justify-between items-end mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-widest leading-none">******</span>
          <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center text-[9px] opacity-60">?</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] text-white/70 mb-0.5 flex items-center justify-end">
            Total Return <svg className="w-2.5 h-2.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
          </div>
          <div className="text-sm font-semibold tracking-widest leading-none">******</div>
        </div>
      </div>

      {/* Tabs / Features */}
      <div className="grid grid-cols-2 bg-white/10 rounded-[2px] py-2">
        <div className="flex items-center justify-center gap-2 border-r border-white/10">
          <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <span className="text-[11px]">Finfit score<span className="font-bold ml-0.5">0</span></span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span className="text-[11px]">Portfolio Review Report</span>
        </div>
      </div>
    </div>
  );
};

export default WealthHeader;
