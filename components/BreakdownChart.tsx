import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Currency } from '../types';

/**
 * Props for the BreakdownChart component.
 */
interface BreakdownChartProps {
  /** An array of data points for the chart. Each object must have a name, value, and fill color. */
  data: { name: string; value: number; fill: string }[];
  /** The currently selected currency, used for formatting the tooltip values. */
  currency: Currency;
}

/**
 * A custom tooltip component for the pie chart.
 * It formats the displayed value as a currency string.
 *
 * @param {any} props - Props passed by the Recharts Tooltip component.
 * @returns {React.ReactElement | null} The rendered tooltip or null if not active.
 */
const CustomTooltip = ({ active, payload, currency }: any) => {
    if (active && payload && payload.length) {
      const { name } = payload[0];
      const formattedValue = new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: currency,
      }).format(payload[0].payload.value);
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-lg">
          <p className="font-semibold">{`${name} : ${formattedValue}`}</p>
        </div>
      );
    }
    return null;
};

/**
 * A component that renders a responsive pie chart to visualize the cost distribution.
 * It uses the Recharts library for charting.
 *
 * @param {BreakdownChartProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered pie chart.
 */
const BreakdownChart: React.FC<BreakdownChartProps> = ({ data, currency }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip currency={currency} />} />
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BreakdownChart;
