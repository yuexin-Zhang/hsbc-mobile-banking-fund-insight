// Portfolio data constants

export const risers = [
  { name: 'HSBC HOLDING...', code: '00005', exchange: 'HK', price: '139.000 HKD', change: '+4.200', percent: '+3.12%', trend: 'up' },
  { name: 'UBTECH ROBOT...', code: '09880', exchange: 'HK', price: '128.000 HKD', change: '+2.300', percent: '+1.83%', trend: 'up' },
  { name: 'HS HIGH DIV', code: '03466', exchange: 'HK', price: '21.300 HKD', change: '+0.240', percent: '+1.14%', trend: 'up' },
];

export const fallers = [
  { name: 'HSBC HOLDING...', code: '00005', exchange: 'HK', price: '139.000 HKD', change: '-2.100', percent: '-1.49%', trend: 'down' },
  { name: 'MTR CORP LTD', code: '00066', exchange: 'HK', price: '36.120 HKD', change: '-0.540', percent: '-1.47%', trend: 'down' },
  { name: 'HS HIGH DIV', code: '03466', exchange: 'HK', price: '21.300 HKD', change: '-0.180', percent: '-0.84%', trend: 'down' },
];

export const couponPayments = [
  { date: 'Mar 10, 2026', bond: 'HSBC 5.5% Perp', description: 'Coupon Payment', amount: '+HKD 33,000', frequency: 'Semi-annual' },
  { date: 'May 15, 2026', bond: 'US Treasury 10Y', description: 'Coupon Payment', amount: '+HKD 33,750', frequency: 'Semi-annual' },
];

export const maturities = [
  { date: 'Sep 20, 2026', bond: 'Corporate Bond ABC', description: 'Principal + Final Coupon', amount: '+HKD 526,500', note: 'Reinvest decision needed', isMaturity: true },
];

export const allBondHoldings = [
  { name: 'Evergrande 8.25%', isin: 'XS2349090000', rating: 'CCC', value: '653,280.50', allocation: '8%', coupon: '8.25%', maturity: 'Mar 2027', ytm: '12.5%', warning: 'Credit rating downgraded. Consider reallocation to safer IG bonds.', hasRisk: true },
  { name: 'Country Garden 7.5%', isin: 'XS2456789012', rating: 'CC', value: '487,105.00', allocation: '6%', coupon: '7.50%', maturity: 'Aug 2026', ytm: '15.8%', warning: 'Payment default risk. Immediate action recommended.', hasRisk: true },
];

export const chartData = [
  { date: '2025-01', all: 0, fund: 0, saa: 0 },
  { date: '2025-01', all: 1.2, fund: 0.8, saa: 0.5 },
  { date: '2025-01', all: 2.8, fund: 2.1, saa: 1.2 },
  { date: '2025-01', all: 4.5, fund: 4.2, saa: 2.8 },
  { date: '2025-02', all: 6.2, fund: 6.8, saa: 4.5 },
  { date: '2025-02', all: 8.9, fund: 9.5, saa: 6.2 },
  { date: '2025-02', all: 10.5, fund: 11.8, saa: 7.8 },
  { date: '2025-03', all: 12.8, fund: 14.2, saa: 9.5 },
  { date: '2025-03', all: 11.5, fund: 12.8, saa: 8.9 },
  { date: '2025-03', all: 13.2, fund: 15.5, saa: 10.2 },
  { date: '2025-04', all: 10.8, fund: 12.2, saa: 9.1 },
  { date: '2025-04', all: 9.2, fund: 10.5, saa: 7.8 },
  { date: '2025-04', all: 8.5, fund: 9.2, saa: 6.9 },
  { date: '2025-05', all: 7.8, fund: 8.1, saa: 6.2 },
  { date: '2025-05', all: 6.5, fund: 6.8, saa: 5.5 },
  { date: '2025-05', all: 5.8, fund: 5.2, saa: 4.8 },
  { date: '2025-06', all: 7.2, fund: 7.5, saa: 6.1 },
  { date: '2025-06', all: 9.5, fund: 10.2, saa: 8.2 },
  { date: '2025-07', all: 11.8, fund: 12.8, saa: 9.8 },
  { date: '2025-07', all: 14.2, fund: 15.5, saa: 11.5 },
  { date: '2025-08', all: 16.8, fund: 18.2, saa: 13.8 },
  { date: '2025-08', all: 19.5, fund: 21.5, saa: 16.2 },
  { date: '2025-09', all: 22.8, fund: 25.2, saa: 18.9 },
  { date: '2025-09', all: 26.5, fund: 28.59, saa: 21.8 },
  { date: '2025-10', all: 24.2, fund: 26.8, saa: 20.5 },
  { date: '2025-10', all: 21.8, fund: 23.8, saa: 19.2 },
  { date: '2025-10', all: 19.5, fund: 21.2, saa: 17.8 },
  { date: '2025-11', all: 17.2, fund: 18.5, saa: 16.5 },
  { date: '2025-11', all: 16.8, fund: 17.8, saa: 15.9 },
  { date: '2025-11', all: 18.5, fund: 20.2, saa: 17.2 },
  { date: '2025-12', all: 20.8, fund: 22.8, saa: 19.1 },
  { date: '2025-12', all: 23.5, fund: 25.5, saa: 21.2 },
  { date: '2025-12', all: 26.2, fund: 28.2, saa: 23.5 },
  { date: '2026-01', all: 28.8, fund: 30.5, saa: 25.2 },
  { date: '2026-01', all: 30.5, fund: 32.8, saa: 26.8 },
  { date: '2026-01', all: 29.2, fund: 31.5, saa: 25.83 },
];

export const chartColors = {
  red: '#da0011',
  lightRed: '#fff5f5',
  grey: '#999',
  dark: '#1e1e1e',
  greyBg: '#f5f5f5',
  border: '#ebeef0',
  muted: '#767676',
  axis: '#dcddde'
};
