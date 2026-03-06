import React from 'react';
import { Alert } from './types';

interface FocusTabProps {
  alerts: Alert[];
}

const FocusTab: React.FC<FocusTabProps> = ({ alerts }) => (
  <div className="divide-y divide-gray-200">
    {alerts.map((alert, index) => (
      <div 
        key={alert.id} 
        className="px-3 py-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
        onClick={alert.actionHandler}
      >
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#da0011] text-white text-[9px] font-bold flex items-center justify-center mt-0.5">
            {index + 1}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-[12px] font-semibold text-gray-900 whitespace-nowrap">{alert.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert.actionHandler();
                }}
                className="flex-shrink-0 inline-flex items-center gap-0.5 px-2 py-0.5 border border-[#da0011] text-[#da0011] text-[10px] font-semibold cursor-pointer active:bg-red-50 transition-colors"
              >
                {alert.action}
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="text-[11px] text-gray-600 leading-snug">{alert.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default FocusTab;
