import React from 'react';
import { PriceAlert, AssetType } from '../../components/AlertEditor';
import { ManageViewProps, AlertItemProps, NewAlertMenuProps } from './types';
import { getAlertTypeLabel, getAssetTypeTag } from './utils';

const AlertItem: React.FC<AlertItemProps> = ({ alert, onEdit }) => {
  const assetTag = getAssetTypeTag(alert.assetType);
  return (
    <div className="px-3 py-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={assetTag.className}>{assetTag.label}</span>
            <h3 className={`text-[13px] font-medium truncate ${!alert.isEnabled ? 'text-gray-400' : 'text-gray-900'}`}>
              {alert.assetName}
            </h3>
            <span className={`text-[9px] px-1.5 py-0.5 ${alert.isEnabled ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'}`}>
              {alert.isEnabled ? 'Active' : 'Paused'}
            </span>
          </div>
          <p className="text-[11px] text-gray-500">
            {getAlertTypeLabel(alert.type)} {alert.targetValue?.toFixed(2)}{alert.type === 'yieldThreshold' || alert.type === 'barrierLevel' || alert.type === 'dailyChange' ? '%' : ''}
            {alert.triggered && <span className="text-[#da0011] ml-1">· Triggered</span>}
          </p>
        </div>
        <button
          onClick={() => onEdit(alert)}
          className="px-3 py-1 text-[11px] text-[#da0011] border border-[#da0011] cursor-pointer active:bg-red-50"
        >
          Update
        </button>
      </div>
    </div>
  );
};

const NewAlertMenu: React.FC<NewAlertMenuProps> = ({ onSelect, onCancel }) => (
  <div className="space-y-2">
    <p className="text-[11px] text-gray-500">Select asset type:</p>
    <div className="flex gap-2">
      {(['stock', 'unitTrust', 'bond', 'structuredProduct'] as AssetType[]).map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="flex-1 py-2 text-[11px] text-gray-700 border border-gray-300 cursor-pointer active:bg-gray-100"
        >
          {getAssetTypeTag(type).label}
        </button>
      ))}
    </div>
    <button
      onClick={onCancel}
      className="w-full py-2 text-[11px] text-gray-500 cursor-pointer"
    >
      Cancel
    </button>
  </div>
);

const ManageView: React.FC<ManageViewProps> = ({
  isMobile,
  priceAlerts,
  showNewAlertMenu,
  onBack,
  onEdit,
  onAddNew,
  onToggleNewMenu
}) => {
  const sortedAlerts = [...priceAlerts].sort((a, b) => {
    if (a.isEnabled === b.isEnabled) return 0;
    return a.isEnabled ? -1 : 1;
  });

  return (
    <div className="absolute inset-0 z-[55] bg-white flex flex-col">
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 ${isMobile ? '' : 'mt-[30px]'}`}>
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center cursor-pointer active:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[16px] font-semibold text-gray-900">Manage Alerts</h1>
        <div className="w-8" />
      </div>

      {/* Alert List - Active first, then Paused */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
        {sortedAlerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} onEdit={onEdit} />
        ))}
        
        {/* Add New Alert */}
        {priceAlerts.length < 6 && (
          <div className="px-3 py-3">
            {showNewAlertMenu ? (
              <NewAlertMenu onSelect={onAddNew} onCancel={() => onToggleNewMenu(false)} />
            ) : (
              <button
                onClick={() => onToggleNewMenu(true)}
                className="w-full py-3 border border-dashed border-gray-300 text-gray-600 text-[13px] cursor-pointer hover:bg-gray-50"
              >
                + Add New Alert
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageView;
