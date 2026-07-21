"use client";

import React, { useState, useEffect } from "react";
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
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e5e7eb"} />
            <XAxis dataKey="category" tick={{ fontSize: 12, fill: isDark ? "#cbd5e1" : "#6b7280" }} />
            <YAxis tick={{ fontSize: 12, fill: isDark ? "#cbd5e1" : "#6b7280" }} />
            <Tooltip
              contentStyle={{ borderRadius: "0.5rem", border: `1px solid ${isDark ? "#475569" : "#e5e7eb"}`, backgroundColor: isDark ? "#1e293b" : "#fff", color: isDark ? "#fff" : "#000" }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
            />
            <Bar dataKey="amount" fill={isDark ? "#60a5fa" : "#2563eb"} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
