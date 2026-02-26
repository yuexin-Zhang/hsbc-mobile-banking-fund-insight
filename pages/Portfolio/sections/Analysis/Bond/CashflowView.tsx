import React from 'react';
import { Cashflow } from '../../../data';

interface CashflowViewProps {
  coupons: Cashflow[];
  maturities: Cashflow[];
}

export const CashflowView: React.FC<CashflowViewProps> = ({ coupons, maturities }) => {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      {coupons.map((cashflow, index) => (
        <div key={`coupon-${index}`} className="p-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-[10px] font-semibold text-gray-900 mb-1">{cashflow.date}</div>
              <div className="text-[9px] text-gray-600 mb-0.5">{cashflow.bond}</div>
              <div className="text-[8px] text-gray-500">{cashflow.frequency}</div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-bold text-[#db0011] mb-1">{cashflow.amount}</div>
              <div className="text-[8px] text-gray-500">{cashflow.description}</div>
            </div>
          </div>
        </div>
      ))}
      {maturities.map((cashflow, index) => (
        <div key={`maturity-${index}`} className="p-3 bg-blue-50">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="text-[10px] font-semibold text-gray-900 mb-1 flex items-center gap-1">
                <span>{cashflow.date}</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold bg-blue-100 text-blue-700">Maturity</span>
              </div>
              <div className="text-[9px] text-gray-600 mb-0.5">{cashflow.bond}</div>
              <div className="text-[8px] text-gray-500">{cashflow.description}</div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-bold text-blue-600 mb-1">{cashflow.amount}</div>
            </div>
          </div>
          <div className="mt-2 bg-white border border-blue-200 px-2 py-1">
            <p className="text-[8px] text-blue-800">💡 {cashflow.note}</p>
          </div>
        </div>
      ))}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-[9px] font-bold text-gray-900">Total Expected (12M)</div>
          <div className="text-[12px] font-bold text-[#db0011]">HKD 603,050</div>
        </div>
      </div>
    </div>
  );
};

export default CashflowView;
