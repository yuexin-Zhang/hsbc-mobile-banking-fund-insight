import React from 'react';

interface StatusBarProps {
  currentTime: string;
  isMobile: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ currentTime, isMobile }) => {
  if (isMobile) return null;

  return (
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
  );
};

export default StatusBar;
