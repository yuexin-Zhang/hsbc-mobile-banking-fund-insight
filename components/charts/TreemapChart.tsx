import React from 'react';
import { Chart } from 'react-chartjs-2';

interface TreemapData {
  label: string;
  pct: number;
  val: string;
  color: string;
  dailyChange?: number;
  currency?: string;
}

interface TreemapChartProps {
  data: TreemapData[];
  onItemClick?: (label: string) => void;
  selectedLabel?: string | null;
}

const TreemapChart: React.FC<TreemapChartProps> = ({ data, onItemClick, selectedLabel }) => {
  const chartData = {
    datasets: [
      {
        tree: data,
        key: 'pct',
        spacing: 1,
        borderWidth: 1,
        borderColor: (ctx: any) => {
          const item = ctx.raw?._data || ctx.raw;
          const daily = typeof item?.dailyChange === 'number' ? item.dailyChange : null;
          const isSelected = selectedLabel && item?.label === selectedLabel;

          if (daily !== null) {
            if (!isSelected) return '#e5e7eb';
            if (daily > 0) return '#da0011';
            if (daily < 0) return '#16a34a';
            return '#9ca3af';
          }

          return isSelected ? '#da0011' : '#e5e7eb';
        },
        borderRadius: 4,
        backgroundColor: (ctx: any) => {
          const item = ctx.raw?._data || ctx.raw;
          const daily = typeof item?.dailyChange === 'number' ? item.dailyChange : null;
          const isSelected = selectedLabel && item?.label === selectedLabel;

          if (daily !== null) {
            if (daily > 0) return '#fee2e2';
            if (daily < 0) return '#dcfce7';
            return '#f3f4f6';
          }

          if (isSelected) {
            return '#fee2e2';
          }
          return '#f3f4f6';
        },
        labels: {
          display: true,
          formatter: (ctx: any) => {
            const item = ctx.raw?._data || ctx.raw;
            const daily = typeof item?.dailyChange === 'number' ? item.dailyChange : null;
            const base = [`${item?.label || ''}`, `${item?.pct ? item.pct + '%' : ''}`];

            if (daily === null) return base;

            const abs = Math.abs(daily).toFixed(2);
            const sign = daily > 0 ? '+' : daily < 0 ? '-' : '';
            const dailyLine = `Daily change ${sign}${abs}%`;
            return [...base, dailyLine];
          },
          halign: 'right',
          valign: 'bottom',
          color: (ctx: any) => {
            const item = ctx.raw?._data || ctx.raw;
            const daily = typeof item?.dailyChange === 'number' ? item.dailyChange : null;
            if (daily === null) return '#1e1e1e';
            if (daily > 0) return '#b91c1c';
            if (daily < 0) return '#15803d';
            return '#111827';
          },
          font: {
            size: 11,
            weight: 'bold' as const
          }
        }
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    onClick: (_e: any, elements: any) => {
      if (elements && elements.length > 0) {
        const element = elements[0];
        const datasetIndex = element.datasetIndex;
        const index = element.index;
        const item = chartData.datasets[datasetIndex].tree[index];
        if (item) onItemClick?.(item.label);
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (item: any) => {
            const dataItem = item.raw?._data || item.raw;
            return `${dataItem.label}: ${dataItem.pct}%`;
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-40 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-1 shadow-inner cursor-pointer">
      <Chart type="treemap" data={chartData as any} options={options as any} redraw={false} />
    </div>
  );
};

export default TreemapChart;
