import React from 'react';

interface PieChartProps {
  data: Array<{ pct: number; color: string; label: string }>;
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90 shrink-0">
      {data.map((item, idx) => {
        const strokeDash = (item.pct / 100) * circumference;
        const currentOffset = (offset / 100) * circumference;
        offset += item.pct;
        return (
          <circle
            key={idx}
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={item.color}
            strokeWidth="20"
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeDashoffset={-currentOffset}
          />
        );
      })}
    </svg>
  );
};

export default PieChart;
