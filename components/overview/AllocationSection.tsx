import React from 'react';
import PieChart from '../charts/PieChart';
import TreemapChart from '../charts/TreemapChart';

interface AllocationData {
  label: string;
  pct: number;
  val: string;
  color: string;
  dailyChange?: number;
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
  isAIGenerated?: boolean;
  hideList?: boolean;
}

const AllocationSection: React.FC<AllocationSectionProps> = ({ 
  title, 
  data, 
  showVal = true, 
  useTreemap = false, 
  insight, 
  onItemClick, 
  selectedItem, 
  hideTitle = false,
  isAIGenerated = false,
  hideList = false
}) => (
  <div>
    {!hideTitle && (
      <div className="flex items-center gap-2 pb-2 border-b border-[#f4f5f6]">
        <div className="w-1 h-3.5 bg-[#da0011]"></div>
        <h3 className="text-[12px] font-bold text-[#333] uppercase tracking-tight">{title}</h3>
      </div>
    )}
    {insight && isAIGenerated && (
      <div className="p-3 bg-gray-50/50 border-l-2 border-[#da0011] rounded-r relative overflow-hidden">
        {/* AI Tag */}
        <div className="absolute bottom-1.5 right-1.5 z-10">
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[8px] font-bold text-white">AI</span>
          </div>
        </div>
        <p className="text-[10px] text-[#767676] leading-snug relative z-10">{insight}</p>
      </div>
    )}
    <div className={`flex ${useTreemap ? 'flex-col' : 'gap-4'} items-start`}>
      {useTreemap ? <TreemapChart data={data} onItemClick={onItemClick} selectedLabel={selectedItem || null} /> : <PieChart data={data} onItemClick={onItemClick} />}
      {!hideList && (
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
      )}
    </div>
  </div>
);

export default AllocationSection;
