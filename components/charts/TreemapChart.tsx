import React from 'react';
import { Chart } from 'react-chartjs-2';

interface TreemapData {
  label: string;
  pct: number;
  val: string;
  color: string;
  currency?: string;
}

interface TreemapChartProps {
  data: TreemapData[];
  onItemClick?: (label: string) => void;
}

const TreemapChart: React.FC<TreemapChartProps> = ({ data, onItemClick }) => {
  const chartData = {
    datasets: [
      {
        tree: data,
        key: 'pct',
        spacing: 1,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 4,
        backgroundColor: (ctx: any) => {
          const item = ctx.raw?._data || ctx.raw;
          return item?.color || '#da0011';
        },
        labels: {
          display: true,
          formatter: (ctx: any) => {
            const item = ctx.raw?._data || ctx.raw;
            return [`${item?.label || ''}`, `${item?.pct ? item.pct + '%' : ''}`];
          },
          halign: 'right',
          valign: 'bottom',
          color: (ctx: any) => {
            const item = ctx.raw?._data || ctx.raw;
            const color = item?.color || '';
            const darkTextColors = ['#ebeef0', '#fee2e2', '#fca5a5', '#9ca3af', '#cbd5e1', '#e2e8f0', '#f1f5f9', '#38bdf8', '#34d399', '#fbbf24'];
            if (darkTextColors.includes(color)) return '#1e1e1e';
            return '#ffffff';
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
