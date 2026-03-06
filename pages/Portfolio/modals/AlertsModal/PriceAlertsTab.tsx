import React from 'react';
import { PriceAlert } from '../../components/AlertEditor';
import { getAlertTypeLabel, getAssetTypeTag } from './utils';

interface PriceAlertsTabProps {
  triggeredAlerts: PriceAlert[];
  totalAlertCount: number;
  onAlertClick: (alert: PriceAlert) => void;
  onManage: () => void;
}

const PriceAlertsTab: React.FC<PriceAlertsTabProps> = ({
  triggeredAlerts,
  totalAlertCount,
  onAlertClick,
  onManage
}) => (
  <div className="flex flex-col h-full">
    {/* Only Show Triggered Alerts - Minimal styling */}
    <div className="flex-1 divide-y divide-gray-100">
      {triggeredAlerts.length === 0 ? (
        <div className="px-3 py-8 text-center">
          <p className="text-[13px] text-gray-500">No triggered alerts</p>
          <p className="text-[11px] text-gray-400 mt-1">Alerts will appear here when conditions are met</p>
        </div>
      ) : (
        triggeredAlerts.map((alert) => {
          const assetTag = getAssetTypeTag(alert.assetType);
          return (
            <div 
              key={alert.id} 
              className="px-3 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => onAlertClick(alert)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={assetTag.className}>{assetTag.label}</span>
                  <h3 className="text-[13px] font-medium text-gray-900">{alert.assetName}</h3>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 bg-[#da0011] text-white">TRIGGERED</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-[12px] text-[#da0011] font-medium">
                    {getAlertTypeLabel(alert.type)} {alert.targetValue?.toFixed(2)}{alert.type === 'yieldThreshold' || alert.type === 'barrierLevel' || alert.type === 'dailyChange' ? '%' : ''}
                    <span className="text-gray-400 font-normal ml-2">{alert.triggeredAt}</span>
                  </p>
                </div>
                <p className="text-[13px] font-semibold text-gray-900">
                  {alert.assetType === 'bond' ? `${alert.currentValue.toFixed(2)}%` : alert.currentValue.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
    
    {/* Manage Button */}
    <div className="px-3 py-3 border-t border-gray-200 bg-gray-50">
      <button
        onClick={onManage}
        className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 text-[13px] font-medium cursor-pointer hover:bg-gray-50 active:bg-gray-100"
      >
        Manage All Alerts ({totalAlertCount})
      </button>
    </div>
  </div>
);

export default PriceAlertsTab;
