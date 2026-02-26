export interface Stock {
  name: string;
  code: string;
  exchange: string;
  price: string;
  change: string;
  percent: string;
  trend: 'up' | 'down';
}

export const risers: Stock[] = [
  { name: 'HSBC HOLDING...', code: '00005', exchange: 'HK', price: '139.000 HKD', change: '+4.200', percent: '+3.12%', trend: 'up' },
  { name: 'UBTECH ROBOT...', code: '09880', exchange: 'HK', price: '128.000 HKD', change: '+2.300', percent: '+1.83%', trend: 'up' },
  { name: 'HS HIGH DIV', code: '03466', exchange: 'HK', price: '21.300 HKD', change: '+0.240', percent: '+1.14%', trend: 'up' },
];

export const fallers: Stock[] = [
  { name: 'HSBC HOLDING...', code: '00005', exchange: 'HK', price: '139.000 HKD', change: '-2.100', percent: '-1.49%', trend: 'down' },
  { name: 'MTR CORP LTD', code: '00066', exchange: 'HK', price: '36.120 HKD', change: '-0.540', percent: '-1.47%', trend: 'down' },
  { name: 'HS HIGH DIV', code: '03466', exchange: 'HK', price: '21.300 HKD', change: '-0.180', percent: '-0.84%', trend: 'down' },
];
