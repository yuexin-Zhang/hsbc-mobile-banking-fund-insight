
import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, onClick }) => (
  <div 
    className="flex flex-col items-center justify-start text-center py-3 px-2 group active:bg-gray-50 transition-colors cursor-pointer"
    onClick={onClick}
  >
    <div className="w-10 h-10 flex items-center justify-center mb-1.5">
      {icon}
    </div>
    <span className="text-[11px] leading-snug text-gray-800 font-normal px-1" style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans SC", sans-serif'}}>
      {label}
    </span>
  </div>
);

interface NavGridProps {
  onInsightClick?: () => void;
}

const NavGrid: React.FC<NavGridProps> = ({ onInsightClick }) => {
  const items: Array<{label: string; icon: React.ReactNode; onClick?: () => void}> = [
    {
      label: "QDII Fund",
      icon: (
        <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12h18" />
          <path d="M12 4a15.3 15.3 0 0 1 4 8 15.3 15.3 0 0 1-4 8 15.3 15.3 0 0 1-4-8 15.3 15.3 0 0 1 4-8z" strokeWidth="1.5" />
          <rect x="14" y="6" width="5" height="4" strokeWidth="1.5" rx="0.5" className="fill-white" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 8h3" />
        </svg>
      )
    },
    {
      label: "Structured Products and related products",
      icon: (
        <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2L2 7l10 5 10-5-10-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      label: "QDII-Bond(Bank Owned)",
      icon: (
        <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="5" width="16" height="14" rx="1" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9h8M8 13h5" />
          <circle cx="17" cy="17" r="3.5" strokeWidth="1.5" className="fill-white" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 15.5v2l1 1" />
        </svg>
      )
    },
    {
      label: "Funds",
      icon: (
        <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="5" y="4" width="14" height="16" rx="1" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 14l2.5-2.5 2 2 3.5-3.5" />
        </svg>
      )
    },
    {
      label: "Wealth Management Product",
      icon: (
        <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
          <text x="12" y="16" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="bold">¥</text>
        </svg>
      )
    },
    {
      label: "Private Fund",
      icon: (
        <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 17l3-3 3 3 4-4 4 4" />
          <circle cx="8" cy="8" r="2" strokeWidth="1.5" className="fill-white" />
          <circle cx="16" cy="8" r="2" strokeWidth="1.5" className="fill-white" />
        </svg>
      )
    },
    {
      label: "Order status",
      icon: (
        <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
          <rect x="7" y="9" width="10" height="6" rx="1" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 9V7a3 3 0 016 0v2" />
        </svg>
      )
    },
    {
      label: "All",
      icon: (
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-2.5 h-2.5 border-2 border-gray-800 rounded-[1px]"></div>
          <div className="w-2.5 h-2.5 border-2 border-gray-800 rounded-[1px]"></div>
          <div className="w-2.5 h-2.5 border-2 border-gray-800 rounded-[1px]"></div>
          <div className="w-2.5 h-2.5 border-2 border-gray-800 rounded-[1px]"></div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white grid grid-cols-4 gap-y-1 gap-x-0 py-5 px-2">
      {items.map((item, idx) => (
        <NavItem key={idx} icon={item.icon} label={item.label} onClick={item.onClick} />
      ))}
    </div>
  );
};

export default NavGrid;
