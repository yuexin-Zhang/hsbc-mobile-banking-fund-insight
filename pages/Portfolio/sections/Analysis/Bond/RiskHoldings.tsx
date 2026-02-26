import React from 'react';
import { BondHolding } from '../../../data';

interface RiskHoldingsProps {
  holdings: BondHolding[];
}

export const RiskHoldings: React.FC<RiskHoldingsProps> = ({ holdings }) => {
  return (
    <div className="bg-white overflow-hidden space-y-3">
      {holdings.map((bond, index) => (
        <div 
          key={index} 
          className={`hover:bg-gray-50 active:bg-gray-100 transition-colors p-3 border border-gray-200 ${bond.hasRisk ? 'border-l-2 border-l-orange-400' : ''}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="text-[11px] font-bold text-gray-900 mb-0.5 flex items-center gap-1">
                <span>{bond.name}</span>
                {bond.hasRisk && <span className="inline-flex items-center px-1.5 py-0.5 text-[8px] font-bold bg-orange-100 text-orange-700">⚠ Risk</span>}
              </div>
              <div className="text-[9px] text-gray-600">ISIN: {bond.isin} • {bond.rating}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-gray-900">HKD {bond.value}</div>
              <div className="text-[9px] text-gray-600">{bond.allocation}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="text-[8px] text-gray-500">Coupon</div>
              <div className="text-[10px] font-semibold text-[#da0011]">{bond.coupon}</div>
            </div>
            <div>
              <div className="text-[8px] text-gray-500">Maturity</div>
              <div className="text-[10px] font-semibold text-gray-700">{bond.maturity}</div>
            </div>
            <div>
              <div className="text-[8px] text-gray-500">YTM</div>
              <div className="text-[10px] font-semibold text-red-600">{bond.ytm}</div>
            </div>
          </div>
          {bond.warning && (
            <div className="mt-2 bg-orange-50 border border-orange-200 px-2 py-1">
              <p className="text-[9px] text-orange-800">⚠ {bond.warning}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RiskHoldings;
