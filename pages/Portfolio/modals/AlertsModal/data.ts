import { PriceAlert, AssetType } from '../../components/AlertEditor';

// Mock data for price alerts - max 6 total
export const mockPriceAlerts: PriceAlert[] = [
  // Stock: TRIGGERED - NVDA Price dropped below target
  {
    id: 'pa1',
    assetName: 'NVIDIA CORP',
    assetCode: 'NVDA.US',
    assetType: 'stock',
    currentValue: 171.88,
    currentChange: 0.0,
    currentPercent: 0.0,
    type: 'priceFall',
    targetValue: 172.0,
    isEnabled: true,
    frequency: 'once',
    triggered: true,
    triggeredAt: 'Today 10:23'
  },
  // Bond: TRIGGERED - Yield reached target
  {
    id: 'pa2',
    assetName: 'US Treasury 10Y',
    assetCode: 'US912828XXX',
    assetType: 'bond',
    currentValue: 4.52,
    currentChange: 0.27,
    currentPercent: 6.35,
    type: 'yieldThreshold',
    targetValue: 4.5,
    isEnabled: true,
    frequency: 'daily',
    triggered: true,
    triggeredAt: 'Today 14:15'
  },
  // Structured Product: TRIGGERED - Barrier level hit
  {
    id: 'pa3',
    assetName: 'Tech Index Autocallable',
    assetCode: 'SP-TECH-001',
    assetType: 'structuredProduct',
    currentValue: 76.0,
    currentChange: -28.0,
    currentPercent: -26.9,
    type: 'barrierLevel',
    targetValue: 78.0,
    isEnabled: true,
    frequency: 'once',
    additionalInfo: 'NASDAQ-100 Linked',
    triggered: true,
    triggeredAt: 'Mar 5 09:45'
  },
  // Stock: Active but not triggered
  {
    id: 'pa4',
    assetName: 'HSBC HOLDINGS',
    assetCode: '00005.HK',
    assetType: 'stock',
    currentValue: 139.0,
    currentChange: 4.2,
    currentPercent: 3.12,
    type: 'priceRise',
    targetValue: 150.0,
    isEnabled: true,
    frequency: 'daily'
  },
  // Fund: Paused
  {
    id: 'pa5',
    assetName: 'BGF World Energy',
    assetCode: 'LU0123456789',
    assetType: 'unitTrust',
    currentValue: 28.45,
    currentChange: -0.32,
    currentPercent: -1.11,
    type: 'dailyChange',
    targetValue: 2.0,
    isEnabled: false,
    frequency: 'once',
    additionalInfo: 'A2 USD Acc'
  },
  // Bond: Active but not triggered
  {
    id: 'pa6',
    assetName: 'HSBC 5.5% Perpetual',
    assetCode: 'XS1234567890',
    assetType: 'bond',
    currentValue: 5.12,
    currentChange: 0.05,
    currentPercent: 0.98,
    type: 'couponDays',
    targetValue: 3,
    isEnabled: true,
    frequency: 'once',
    additionalInfo: 'Next Coupon: Mar 10'
  }
];

// Default alert templates for new alerts
export const getDefaultAlert = (assetType: AssetType = 'stock'): PriceAlert => {
  const templates: Record<AssetType, Partial<PriceAlert>> = {
    stock: {
      assetName: 'NVIDIA CORP',
      assetCode: 'NVDA.US',
      currentValue: 171.88,
      currentChange: 0.0,
      currentPercent: 0.0,
      type: 'priceFall',
      frequency: 'once'
    },
    unitTrust: {
      assetName: 'BGF World Energy',
      assetCode: 'LU0123456789',
      currentValue: 28.45,
      currentChange: -0.32,
      currentPercent: -1.11,
      type: 'navThreshold',
      frequency: 'daily',
      additionalInfo: 'A2 USD Acc'
    },
    bond: {
      assetName: 'HSBC 5.5% Perpetual',
      assetCode: 'XS1234567890',
      currentValue: 5.12,
      currentChange: 0.05,
      currentPercent: 0.98,
      type: 'yieldThreshold',
      frequency: 'daily',
      additionalInfo: 'Next Coupon: Mar 10, 2026'
    },
    structuredProduct: {
      assetName: 'Tech Index Autocallable',
      assetCode: 'SP-TECH-001',
      currentValue: 104.0,
      currentChange: 0.0,
      currentPercent: 0.0,
      type: 'barrierLevel',
      frequency: 'daily',
      additionalInfo: 'Linked to NASDAQ-100'
    }
  };

  return {
    id: `pa${Date.now()}`,
    assetType,
    targetValue: null,
    isEnabled: true,
    ...templates[assetType]
  } as PriceAlert;
};
