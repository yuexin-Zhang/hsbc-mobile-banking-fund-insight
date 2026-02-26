export interface BondHolding {
  name: string;
  isin: string;
  rating: string;
  value: string;
  allocation: string;
  coupon: string;
  maturity: string;
  ytm: string;
  warning?: string;
  hasRisk: boolean;
}

export interface Cashflow {
  date: string;
  bond: string;
  description: string;
  amount: string;
  frequency?: string;
  note?: string;
  isMaturity?: boolean;
}

export const couponPayments: Cashflow[] = [
  { date: 'Mar 10, 2026', bond: 'HSBC 5.5% Perp', description: 'Coupon Payment', amount: '+HKD 33,000', frequency: 'Semi-annual' },
  { date: 'May 15, 2026', bond: 'US Treasury 10Y', description: 'Coupon Payment', amount: '+HKD 33,750', frequency: 'Semi-annual' },
];

export const maturities: Cashflow[] = [
  { date: 'Sep 20, 2026', bond: 'Corporate Bond ABC', description: 'Principal + Final Coupon', amount: '+HKD 526,500', note: 'Reinvest decision needed', isMaturity: true },
];

export const allBondHoldings: BondHolding[] = [
  { name: 'Evergrande 8.25%', isin: 'XS2349090000', rating: 'CCC', value: '653,280.50', allocation: '8%', coupon: '8.25%', maturity: 'Mar 2027', ytm: '12.5%', warning: 'Credit rating downgraded. Consider reallocation to safer IG bonds.', hasRisk: true },
  { name: 'Country Garden 7.5%', isin: 'XS2456789012', rating: 'CC', value: '487,105.00', allocation: '6%', coupon: '7.50%', maturity: 'Aug 2026', ytm: '15.8%', warning: 'Payment default risk. Immediate action recommended.', hasRisk: true },
];
