import React from 'react';

export const AIInsightsHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-[15px] font-bold whitespace-nowrap inline-flex items-stretch">
        <span className="relative inline-flex items-center overflow-hidden">
          <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]">
            <span className="absolute inset-0 bg-gradient-to-b from-purple-500 to-pink-500 animate-pulse opacity-50"></span>
          </span>
          <span className="absolute left-0 top-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
          <span className="absolute left-0 bottom-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
          <span className="relative flex items-center px-1 py-0.5">
            <svg className="w-3 h-3 animate-pulse" viewBox="0 0 24 24" fill="none" style={{animationDuration: '2s'}}>
              <defs>
                <linearGradient id="lightning-gradient-deepdive" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: 'rgb(168, 85, 247)'}} />
                  <stop offset="100%" style={{stopColor: 'rgb(236, 72, 153)'}} />
                </linearGradient>
                <filter id="glow-deepdive">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path fill="url(#lightning-gradient-deepdive)" d="M13 10V3L4 14h7v7l9-11h-7z" filter="url(#glow-deepdive)" />
            </svg>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">AI</span>
          </span>
        </span>
        
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 flex items-center rounded-r-full relative overflow-hidden shadow-[0_0_12px_rgba(168,85,247,0.4)]">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] w-[200%]"></span>
          <span className="relative">Portfolio Intelligence</span>
        </span>
      </h3>
    </div>
  );
};

export default AIInsightsHeader;
