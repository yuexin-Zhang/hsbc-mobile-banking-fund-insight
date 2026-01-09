
import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, onClick }) => (
  <div 
    className="flex flex-col items-center justify-start text-center p-1 group active:bg-gray-50 transition-colors cursor-pointer"
    onClick={onClick}
  >
    <div className="w-11 h-11 flex items-center justify-center mb-1">
      {icon}
    </div>
    <span className="text-[10px] leading-tight text-gray-700 font-medium px-0.5 line-clamp-2">
      {label}
    </span>
  </div>
);

interface NavGridProps {
  onInsightClick?: () => void;
}

const NavGrid: React.FC<NavGridProps> = ({ onInsightClick }) => {
  const items = [
    {
      label: "QDII Overseas Funds",
      icon: (
        <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M15 5h5M15 7h3" />
          <rect x="14" y="3" width="7" height="6" strokeWidth="1.2" className="fill-white" />
        </svg>
      )
    },
    {
      label: "Structured Products",
      icon: (
        <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      label: "QDII Overseas Bonds",
      icon: (
        <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="6" width="18" height="12" rx="1" strokeWidth="1.2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M7 10h10M7 14h6" />
        </svg>
      )
    },
    {
      label: "Fund Products",
      icon: (
        <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 00-2 2z" />
        </svg>
      )
    },
    {
      label: "Fund Insight",
      onClick: onInsightClick,
      icon: (
        <svg className="w-7 h-7 text-[#DB0011]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M10 10l-2 2 2 2" />
          <circle cx="12" cy="12" r="9" strokeWidth="1.2" strokeOpacity="0.2" />
        </svg>
      )
    },
    {
      label: "Wealth Management",
      icon: (
        <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth="1.2" />
          <text x="12" y="15" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="bold">¥</text>
        </svg>
      )
    },
    {
      label: "Private Funds",
      icon: (
        <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 17l6-6 4 4 8-8" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M15 15a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      )
    },
    {
      label: "All",
      icon: (
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-2.5 h-2.5 border-2 border-gray-600 rounded-[1px]"></div>
          <div className="w-2.5 h-2.5 border-2 border-gray-600 rounded-[1px]"></div>
          <div className="w-2.5 h-2.5 border-2 border-gray-600 rounded-[1px]"></div>
          <div className="w-2.5 h-2.5 border-2 border-gray-600 rounded-[1px]"></div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white grid grid-cols-4 gap-y-4 gap-x-0.5 py-4 border-b border-gray-100 px-1">
      {items.map((item, idx) => (
        <NavItem key={idx} icon={item.icon} label={item.label} onClick={item.onClick} />
      ))}
    </div>
  );
};

export default NavGrid;
