"use client";

import React, { useState, useEffect } from "react";
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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {title && <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e5e7eb"} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: isDark ? "#cbd5e1" : "#6b7280" }} />
            <YAxis tick={{ fontSize: 12, fill: isDark ? "#cbd5e1" : "#6b7280" }} />
            <Tooltip
              contentStyle={{ borderRadius: "0.5rem", border: `1px solid ${isDark ? "#475569" : "#e5e7eb"}`, backgroundColor: isDark ? "#1e293b" : "#fff", color: isDark ? "#fff" : "#000" }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
            />
            <Line type="monotone" dataKey="amount" stroke={color} strokeWidth={2} dot={{ r: 4, fill: isDark ? "#1e293b" : "#fff" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
