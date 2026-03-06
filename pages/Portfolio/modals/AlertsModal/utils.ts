import { AlertType, AssetType } from '../../components/AlertEditor';

export const getAlertTypeLabel = (type: AlertType): string => {
  switch (type) {
    case 'priceRise': return 'Price↑';
    case 'priceFall': return 'Price↓';
    case 'dailyChange': return 'Change%';
    case 'yieldThreshold': return 'Yield';
    case 'navThreshold': return 'NAV';
    case 'barrierLevel': return 'Barrier';
    case 'maturityDays': return 'Maturity';
    case 'couponDays': return 'Coupon';
    case 'observationDays': return 'Observation';
    default: return 'Alert';
  }
};

export const getAssetTypeTag = (type: AssetType): { label: string; className: string } => {
  switch (type) {
    case 'stock': return { label: 'STK', className: 'text-[10px] text-gray-400 font-normal' };
    case 'unitTrust': return { label: 'FUND', className: 'text-[10px] text-gray-400 font-normal' };
    case 'bond': return { label: 'BOND', className: 'text-[10px] text-gray-400 font-normal' };
    case 'structuredProduct': return { label: 'SP', className: 'text-[10px] text-gray-400 font-normal' };
    default: return { label: 'ASSET', className: 'text-[10px] text-gray-400 font-normal' };
  }
};
