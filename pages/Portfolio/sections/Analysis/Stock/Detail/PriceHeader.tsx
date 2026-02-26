import React from 'react';

interface PriceHeaderProps {
  price: string;
  currency: string;
  change: string;
  maxAdvanceRatio: string;
  bid: string;
  ask: string;
}

export const PriceHeader: React.FC<PriceHeaderProps> = ({
  price,
  currency,
  change,
  maxAdvanceRatio,
  bid,
  ask,
}) => {
  return (
    <div className="px-4 pt-4 pb-3 mb-3">
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-[32px] font-normal text-gray-900">{price}</span>
        <span className="text-[20px] text-gray-600">{currency}</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[15px] text-gray-600">{change}</span>
      </div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[15px] text-gray-600">N/A</span>
        <button className="w-8 h-8 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors cursor-pointer">
          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div className="text-[15px] text-gray-900 mb-4">
        Maximum advance ratio: {maxAdvanceRatio}
      </div>
      <div className="flex items-center gap-8">
        <div className="flex-1">
          <span className="text-[15px] text-gray-900">Bid: </span>
          <span className="text-[15px] font-medium text-gray-900">{bid}</span>
        </div>
        <div className="flex-1 text-right">
          <span className="text-[15px] text-gray-900">Ask: </span>
          <span className="text-[15px] font-medium text-gray-900">{ask}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceHeader;
