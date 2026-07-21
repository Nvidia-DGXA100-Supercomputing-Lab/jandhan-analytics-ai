"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendChartProps {
  data: Array<{ month: string; amount: number }>;
  title?: string;
  color?: string;
}

export function TrendChart({ data, title, color = "#2563eb" }: TrendChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>}
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{ borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
            />
            <Line type="monotone" dataKey="amount" stroke={color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
