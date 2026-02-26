import React from 'react';

interface PriceChartProps {
  activeTimeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const timeRanges = ['1D', '1W', '1M', '3M', '6M'];

export const PriceChart: React.FC<PriceChartProps> = ({ activeTimeRange, onTimeRangeChange }) => {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-4 mb-4">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => onTimeRangeChange(range)}
            className={`text-[14px] font-medium pb-1 cursor-pointer ${
              activeTimeRange === range
                ? 'text-gray-900 border-b-2 border-[#da0011]'
                : 'text-gray-500'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="relative h-64 bg-white">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <text x="2" y="8" fontSize="3" fill="#666" fontFamily="sans-serif">176.778</text>
          <text x="2" y="30" fontSize="3" fill="#666" fontFamily="sans-serif">175.448</text>
          <text x="2" y="52" fontSize="3" fill="#666" fontFamily="sans-serif">174.119</text>
          <text x="2" y="74" fontSize="3" fill="#666" fontFamily="sans-serif">172.789</text>
          <text x="2" y="96" fontSize="3" fill="#666" fontFamily="sans-serif">171.460</text>

          <line x1="12" y1="10" x2="98" y2="10" stroke="#f0f0f0" strokeWidth="0.2"/>
          <line x1="12" y1="32" x2="98" y2="32" stroke="#f0f0f0" strokeWidth="0.2"/>
          <line x1="12" y1="54" x2="98" y2="54" stroke="#f0f0f0" strokeWidth="0.2"/>
          <line x1="12" y1="76" x2="98" y2="76" stroke="#f0f0f0" strokeWidth="0.2"/>

          <polyline
            points="12,30 15,8 18,45 21,42 24,38 27,40 30,15 33,18 36,22 39,20 42,28 45,32 48,35 51,30 54,25 57,28 60,38 63,42 66,48 69,52 72,45 75,40 78,50 81,58 84,62 87,68 90,75 93,82 96,88"
            fill="none"
            stroke="#da0011"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />

          <text x="12" y="99" fontSize="3" fill="#666" fontFamily="sans-serif">09:30</text>
          <text x="48" y="99" fontSize="3" fill="#666" fontFamily="sans-serif">12:45</text>
          <text x="85" y="99" fontSize="3" fill="#666" fontFamily="sans-serif">16:00</text>
        </svg>
      </div>
    </div>
  );
};

export default PriceChart;
