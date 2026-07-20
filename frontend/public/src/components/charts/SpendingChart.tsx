"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SpendingChartProps {
  data: Array<{ category: string; amount: number }>;
  title?: string;
}

export function SpendingChart({ data, title }: SpendingChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>}
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{ borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
            />
            <Bar dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
