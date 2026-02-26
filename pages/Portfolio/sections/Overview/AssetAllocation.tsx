import React from 'react';

interface AssetAllocationItem {
  name: string;
  original: string;
  current: string;
  gain: string;
  gainPercent: string;
  originalPercent: number;
  currentPercent: number;
  isLoss?: boolean;
}

const allocations: AssetAllocationItem[] = [
  { name: 'Stocks', original: '3,551,893', current: '3,742,736', gain: '+190,843', gainPercent: '+2.7%', originalPercent: 35.6, currentPercent: 38.3 },
  { name: 'Unit Trusts', original: '2,774,792', current: '3,030,276', gain: '+255,484', gainPercent: '+3.5%', originalPercent: 27.8, currentPercent: 31.3 },
  { name: 'Bonds', original: '2,638,282', current: '2,530,546', gain: '-107,736', gainPercent: '-1.6%', originalPercent: 25.2, currentPercent: 23.6, isLoss: true },
  { name: 'Structured Products', original: '1,306,443', current: '1,328,989', gain: '+22,546', gainPercent: '+0.7%', originalPercent: 11.4, currentPercent: 12.1 },
];

export const AssetAllocation: React.FC = () => {
  return (
    <div className="bg-white p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5 bg-[#da0011]"></div>
        <h3 className="text-[14px] font-bold text-gray-900">Asset Allocation Overview (HKD)</h3>
      </div>
      
      <div className="space-y-2.5 mb-4">
        {allocations.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <span className="text-[11px] font-bold text-gray-900">{item.name}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-500 mb-1.5">
              <span>Original: {item.original}</span>
              <span className="text-gray-900 font-medium">Current: {item.current}</span>
              <span className={`font-semibold ${item.isLoss ? 'text-[#00847f]' : 'text-[#da0011]'}`}>({item.gain})</span>
            </div>
            <div className="relative h-7 bg-gray-100 rounded-full overflow-hidden">
              {!item.isLoss ? (
                <>
                  <div className="absolute left-0 top-0 bottom-0 bg-[#da0011] rounded-full" style={{ width: `${item.currentPercent}%` }}></div>
                  <div className="absolute left-0 top-0 bottom-0 bg-[#d0d0d0] rounded-full" style={{ width: `${item.originalPercent}%` }}></div>
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className="text-[11px] font-bold text-[#da0011] absolute" style={{ left: `${item.currentPercent}%`, paddingLeft: '8px' }}>
                      {item.gainPercent}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute left-0 top-0 bottom-0 rounded-full border-2 border-[#00847f]" style={{ width: `${item.originalPercent}%` }}></div>
                  <div className="absolute left-0 top-0 bottom-0 bg-[#00847f] rounded-full" style={{ width: `${item.originalPercent}%` }}></div>
                  <div className="absolute left-0 top-0 bottom-0 bg-[#d0d0d0] rounded-full" style={{ width: `${item.currentPercent}%` }}></div>
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className="text-[11px] font-bold text-[#00847f] absolute" style={{ left: `${item.originalPercent}%`, paddingLeft: '8px' }}>
                      {item.gainPercent}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-3 border border-gray-200">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5 text-[#da0011]" viewBox="0 0 24 24" fill="none">
              <path fill="currentColor" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[11px] text-gray-700 leading-relaxed">
              Equity-heavy allocation at <span className="font-bold text-gray-900">63.7%</span> (stocks + unit trusts) suggests <span className="font-bold text-gray-900">aggressive-growth profile</span>. Bond holdings underperforming at <span className="font-bold text-[#00847f]">-4.1%</span>. Consider rebalancing to reduce equity concentration.
            </div>
            <div className="mt-2">
              <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#da0011] hover:underline">
                <span>Rebalance Portfolio</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;
