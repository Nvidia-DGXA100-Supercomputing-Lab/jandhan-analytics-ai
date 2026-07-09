"use client";

import { StatCardProps } from "@/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/utils/helpers";

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendColors = {
  up: "text-green-600",
  down: "text-red-600",
  neutral: "text-slate-400",
};

export default function StatCard({
  title,
  value,
  change,
  icon,
  trend = "neutral",
}: StatCardProps) {
  const TrendIcon = trendIcons[trend];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 ${trendColors[trend]}`}>
              <TrendIcon size={16} />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
