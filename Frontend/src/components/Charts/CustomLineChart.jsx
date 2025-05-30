import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const [chartHeight, setChartHeight] = useState(300);
  const [fontSize, setFontSize] = useState(12);

  // Responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setChartHeight(width < 640 ? 220 : 300); // Smaller chart height on mobile
      setFontSize(width < 640 ? 10 : 12); // Smaller font on mobile
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:
            <span className="text-sm font-medium text-gray-900">
              {payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="month"
            stroke="none"
            tick={{ fontSize, fill: "#555" }}
          />

          <YAxis tick={{ fontSize, fill: "#555" }} stroke="none" />

          <Tooltip content={CustomTooltip} />

          <Area
            dataKey="amount"
            type="monotone"
            fill="url(#incomeGradient)"
            stroke="#875cf5"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
