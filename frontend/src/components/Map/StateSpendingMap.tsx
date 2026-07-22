"use client";

import React from "react";
import { Card } from "../ui/Card";

type StateSpendingItem = {
  state: string;
  amount: number;
};

type StateSpendingMapProps = {
  data: StateSpendingItem[];
  title?: string;
  description?: string;
};

export function StateSpendingMap({ data, title = "Geographic Distribution", description = "Spending by state" }: StateSpendingMapProps) {
  if (!data || data.length === 0) {
    return (
      <Card title={title} description={description}>
        <p className="text-sm text-gray-500 dark:text-slate-400">No geographic data available</p>
      </Card>
    );
  }

  const maxAmount = Math.max(...data.map((item) => item.amount));

  return (
    <Card title={title} description={description}>
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900 dark:text-white">{item.state}</span>
                <span className="text-gray-600 dark:text-slate-400">₹{item.amount.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-slate-800">
                <div
                  className="h-2.5 rounded-full bg-primary-500 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
