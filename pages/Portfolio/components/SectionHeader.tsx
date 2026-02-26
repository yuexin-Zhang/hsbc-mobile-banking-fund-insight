import React from 'react';

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => {
  if (icon) {
    return (
      <div className="flex items-center px-1">
        <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-[15px] font-bold text-gray-900">{title}</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-1 h-5 bg-[#da0011]"></div>
      <h2 className="text-[16px] font-bold text-gray-900">{title}</h2>
    </div>
  );
};

export default SectionHeader;
