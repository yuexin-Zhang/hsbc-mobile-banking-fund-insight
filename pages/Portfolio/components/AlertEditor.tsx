import React, { useState } from 'react';
import { useMobileDetect } from '../../../hooks/useMobileDetect';

export type AssetType = 'stock' | 'unitTrust' | 'bond' | 'structuredProduct';
export type AlertType = 
  | 'priceRise' 
  | 'priceFall' 
  | 'dailyChange' 
  | 'yieldThreshold' 
  | 'barrierLevel' 
  | 'maturityDays'
  | 'navThreshold'
  | 'couponDays'
  | 'observationDays';
export type AlertFrequency = 'once' | 'daily';

export interface PriceAlert {
  id: string;
  assetName: string;
  assetCode: string;
  assetType: AssetType;
  currentValue: number;
  currentChange?: number;
  currentPercent?: number;
  type: AlertType;
  targetValue: number | null;
  isEnabled: boolean;
  frequency: AlertFrequency;
  additionalInfo?: string;
  triggered?: boolean;
  triggeredAt?: string;
}

interface AlertEditorProps {
  isOpen: boolean;
  onClose: () => void;
  alert: PriceAlert | null;
  onSave: (alert: PriceAlert) => void;
  onDelete?: (alertId: string) => void;
}

const assetTypeLabels: Record<AssetType, string> = {
  stock: 'Stock',
  unitTrust: 'Fund',
  bond: 'Bond',
  structuredProduct: 'Structured'
};

// Alert types tailored for each asset class
const getAlertTypesForAsset = (assetType: AssetType): { type: AlertType; label: string; placeholder: string; unit: string }[] => {
  switch (assetType) {
    case 'stock':
      return [
        { type: 'priceRise', label: 'Price Rises To', placeholder: 'Target price', unit: '' },
        { type: 'priceFall', label: 'Price Falls To', placeholder: 'Target price', unit: '' },
        { type: 'dailyChange', label: 'Daily Change %', placeholder: 'Percentage', unit: '%' }
      ];
    case 'unitTrust':
      // Funds have daily NAV, not real-time price
      return [
        { type: 'navThreshold', label: 'NAV Reaches', placeholder: 'Target NAV', unit: '' },
        { type: 'dailyChange', label: 'Daily Change %', placeholder: 'Percentage', unit: '%' }
      ];
    case 'bond':
      // Bonds: yield is key, plus maturity/coupon dates
      return [
        { type: 'yieldThreshold', label: 'Yield Reaches', placeholder: 'Target yield', unit: '%' },
        { type: 'priceRise', label: 'Price Rises To', placeholder: 'Target price', unit: '' },
        { type: 'priceFall', label: 'Price Falls To', placeholder: 'Target price', unit: '' },
        { type: 'maturityDays', label: 'Before Maturity', placeholder: 'Days', unit: 'days' },
        { type: 'couponDays', label: 'Before Coupon', placeholder: 'Days', unit: 'days' }
      ];
    case 'structuredProduct':
      // Structured products: barrier level, observation dates
      return [
        { type: 'barrierLevel', label: 'Barrier Level %', placeholder: 'Percentage', unit: '%' },
        { type: 'observationDays', label: 'Before Observation', placeholder: 'Days', unit: 'days' },
        { type: 'maturityDays', label: 'Before Maturity', placeholder: 'Days', unit: 'days' }
      ];
    default:
      return [{ type: 'priceRise', label: 'Price Rises To', placeholder: 'Target price', unit: '' }];
  }
};

const getFrequencyOptions = (alertType: AlertType): { value: AlertFrequency; label: string; desc: string }[] => {
  // Time-based alerts (days before) are typically "once only"
  if (['maturityDays', 'couponDays', 'observationDays'].includes(alertType)) {
    return [
      { value: 'once', label: 'Notify Once', desc: 'Alert on that day only' }
    ];
  }
  // Price/value based alerts can be recurring
  return [
    { value: 'once', label: 'Notify Once Only', desc: 'Alert turns off after triggered' },
    { value: 'daily', label: 'Once Per Day', desc: 'Alert when condition met each trading day' }
  ];
};

const AlertEditor: React.FC<AlertEditorProps> = ({ isOpen, onClose, alert, onSave, onDelete }) => {
  const isMobile = useMobileDetect();
  const alertTypes = alert ? getAlertTypesForAsset(alert.assetType) : [];
  const [activeTab, setActiveTab] = useState<AlertType>(alert?.type || alertTypes[0]?.type || 'priceRise');
  const [isEnabled, setIsEnabled] = useState(alert?.isEnabled ?? true);
  const [targetValue, setTargetValue] = useState(alert?.targetValue?.toString() || '');
  const [frequency, setFrequency] = useState<AlertFrequency>(alert?.frequency || 'daily');

  // Update frequency options when alert type changes
  const frequencyOptions = getFrequencyOptions(activeTab);
  
  // Reset frequency if current selection is not valid for new type
  React.useEffect(() => {
    const validOptions = getFrequencyOptions(activeTab);
    if (!validOptions.find(o => o.value === frequency)) {
      setFrequency(validOptions[0]?.value || 'once');
    }
  }, [activeTab]);

  if (!isOpen || !alert) return null;

  const handleSave = () => {
    const value = targetValue ? parseFloat(targetValue) : null;
    onSave({
      ...alert,
      type: activeTab,
      targetValue: value,
      isEnabled,
      frequency,
      // Reset triggered status when alert is modified
      triggered: false,
      triggeredAt: undefined
    });
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to remove this alert?')) {
      onDelete(alert.id);
      onClose();
    }
  };

  const currentConfig = alertTypes.find(t => t.type === activeTab) || alertTypes[0];

  const getPageTitle = () => {
    switch (alert.assetType) {
      case 'stock':
        return 'Stock Alert';
      case 'unitTrust':
        return 'Fund Alert';
      case 'bond':
        return 'Bond Alert';
      case 'structuredProduct':
        return 'Product Alert';
      default:
        return 'Price Alert';
    }
  };

  const getValueDisplay = () => {
    if (alert.assetType === 'bond') {
      return `${alert.currentValue.toFixed(2)}%`;
    }
    return alert.currentValue.toFixed(2);
  };

  const getValueLabel = () => {
    switch (alert.assetType) {
      case 'unitTrust':
        return 'Current NAV';
      case 'bond':
        return 'Current Yield';
      case 'structuredProduct':
        return 'Current Level';
      default:
        return 'Current Price';
    }
  };

  return (
    <div className="absolute inset-0 z-[60] bg-white flex flex-col">
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 ${isMobile ? '' : 'mt-[30px]'}`}>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center cursor-pointer active:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[16px] font-semibold text-gray-900">{getPageTitle()}</h1>
        <div className="w-8" />
      </div>

      {/* Asset Info */}
      <div className="px-4 py-3 border-b border-gray-100">
        {alert.triggered && (
          <div className="mb-2 px-2 py-1.5 bg-[#da0011] text-white text-[11px] font-medium rounded">
            ⚠ Alert Triggered at {alert.triggeredAt}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold text-gray-900 truncate">{alert.assetName}</h2>
              <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded flex-shrink-0">
                {assetTypeLabels[alert.assetType]}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">{alert.assetCode}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            <p className="text-[11px] text-gray-500">{getValueLabel()}</p>
            <p className={`text-[15px] font-semibold ${alert.triggered ? 'text-[#da0011]' : 'text-gray-900'}`}>{getValueDisplay()}</p>
            {alert.currentChange !== undefined && alert.currentChange !== 0 && (
              <p className={`text-[11px] ${(alert.currentChange || 0) >= 0 ? 'text-[#da0011]' : 'text-green-600'}`}>
                {(alert.currentChange || 0) >= 0 ? '+' : ''}{alert.currentChange?.toFixed(2)}
              </p>
            )}
          </div>
        </div>
        {alert.additionalInfo && (
          <p className="text-[10px] text-gray-500 mt-1.5">{alert.additionalInfo}</p>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Alert Types */}
        <div className="w-[100px] bg-gray-50 flex-shrink-0 border-r border-gray-100">
          {alertTypes.map((config) => (
            <button
              key={config.type}
              onClick={() => setActiveTab(config.type)}
              className={`w-full px-2 py-3 text-[11px] text-left cursor-pointer transition-colors leading-tight ${
                activeTab === config.type 
                  ? 'bg-white text-gray-900 font-medium border-l-2 border-[#da0011]' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Alert Toggle */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-[14px] text-gray-900">Alert Enabled</span>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`w-11 h-6 rounded-full cursor-pointer transition-colors relative ${
                isEnabled ? 'bg-[#da0011]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  isEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Target Value Input */}
          <div className="py-4 border-b border-gray-100">
            <label className="block text-[13px] text-gray-500 mb-1">{currentConfig.label}</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder={currentConfig.placeholder}
                className="flex-1 min-w-0 text-[22px] font-light text-gray-900 placeholder-gray-300 outline-none"
              />
              {currentConfig.unit && (
                <span className="text-[16px] text-gray-500 flex-shrink-0">{currentConfig.unit}</span>
              )}
            </div>
          </div>

          {/* Frequency Section */}
          <div className="py-3">
            <p className="text-[12px] text-gray-500 mb-2">Alert Frequency</p>
            
            <div className="space-y-1">
              {frequencyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFrequency(option.value)}
                  className="w-full flex items-center justify-between py-2 cursor-pointer"
                >
                  <div className="text-left">
                    <p className="text-[14px] text-gray-900">{option.label}</p>
                    <p className="text-[11px] text-gray-500">{option.desc}</p>
                  </div>
                  {frequency === option.value && (
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3 border-t border-gray-200 flex gap-3">
        {onDelete && (
          <button
            onClick={handleDelete}
            className="flex-1 py-3 bg-white text-gray-700 text-[14px] font-semibold border border-gray-300 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            Remove
          </button>
        )}
        <button
          onClick={handleSave}
          className="flex-1 py-3 bg-[#da0011] text-white text-[14px] font-semibold cursor-pointer hover:bg-[#c0000f] active:bg-[#b5000e] transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AlertEditor;
