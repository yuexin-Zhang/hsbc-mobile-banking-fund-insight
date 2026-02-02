import React from 'react';
import PieChart from '../charts/PieChart';
import TreemapChart from '../charts/TreemapChart';

interface AllocationData {
  label: string;
  pct: number;
  val: string;
  color: string;
  currency?: string;
}

interface AllocationSectionProps {
  title: string;
  data: AllocationData[];
  showVal?: boolean;
  useTreemap?: boolean;
  insight?: string;
  onItemClick?: (label: string) => void;
  selectedItem?: string | null;
  hideTitle?: boolean;
}

const AllocationSection: React.FC<AllocationSectionProps> = ({ 
  title, 
  data, 
  showVal = true, 
  useTreemap = false, 
  insight, 
  onItemClick, 
  selectedItem, 
  hideTitle = false 
}) => (
  <div className="space-y-4">
    {!hideTitle && (
      <div className="flex items-center gap-2 pb-2 border-b border-[#f4f5f6]">
        <div className="w-1 h-3.5 bg-[#da0011]"></div>
        <h3 className="text-[12px] font-bold text-[#333] uppercase tracking-tight">{title}</h3>
      </div>
    )}
    {insight && (
      <div className="p-3 bg-gray-50/50 border-l-2 border-[#da0011] rounded-r">
        <p className="text-[10px] text-[#767676] leading-snug">{insight}</p>
      </div>
    )}
    <div className={`flex ${useTreemap ? 'flex-col' : 'gap-4'} items-start`}>
      {useTreemap ? <TreemapChart data={data} onItemClick={onItemClick} /> : <PieChart data={data} />}
      <div className={`flex-1 space-y-2.5 ${useTreemap ? 'w-full mt-4' : ''}`}>
        {data.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex gap-2 p-2 rounded-md transition-all cursor-pointer border ${selectedItem === item.label ? 'shadow-sm' : 'border-transparent hover:bg-gray-50'}`}
              style={selectedItem === item.label ? { 
                backgroundColor: `${item.color}10`,
                borderColor: `${item.color}40`
              } : {}}
              onClick={() => onItemClick?.(item.label)}
            >
              <div className="w-1.5 h-3 shrink-0 mt-0.5" style={{ backgroundColor: item.color }}></div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-[#1e1e1e] leading-tight flex justify-between">
                  <span>{item.label}</span>
                  <span style={{ color: item.color }}>{item.pct}%</span>
                </div>
                {showVal && item.val && (
                  <div className="text-[9px] text-[#767676] font-medium mt-0.5">{item.currency || 'CNY'} {item.val}</div>
                )}
              </div>
            </div>
        ))}
      </div>
    </div>
  </div>
);

export default AllocationSection;
