
import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => (
  <div className={`flex flex-col items-center justify-center space-y-1 py-1 cursor-pointer flex-1 transition-colors ${active ? 'text-[#DB0011]' : 'text-gray-500'}`}>
    <div className="relative">
      {icon}
      {label === "Me" && <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#DB0011] rounded-full border-2 border-white"></div>}
    </div>
    <span className="text-[10px] font-medium">{label}</span>
  </div>
);

const BottomNav: React.FC = () => {
  return (
    <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 px-2 pb-6 pt-2 flex justify-around items-center z-40">
      <NavItem 
        label="Home" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>} 
      />
      <NavItem 
        label="Global" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>} 
      />
      <NavItem 
        label="Wealth" 
        active 
        icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>} 
      />
      <NavItem 
        label="Benefits" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} 
      />
      <NavItem 
        label="Me" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>} 
      />
    </div>
  );
};

export default BottomNav;
