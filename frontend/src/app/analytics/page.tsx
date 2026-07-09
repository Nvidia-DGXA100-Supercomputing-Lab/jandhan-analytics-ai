"use client";

import { useState } from "react";
import AreaChartComponent from "@/components/Charts/AreaChartComponent";
import BarChartComponent from "@/components/Charts/BarChartComponent";
import StatCard from "@/components/Cards/StatCard";
import { DollarSign, PieChart, AlertTriangle, Activity } from "lucide-react";

const trendData = [
  { name: "Q1", value: 4200 },
  { name: "Q2", value: 5100 },
  { name: "Q3", value: 4800 },
  { name: "Q4", value: 6200 },
];

const categoryData = [
  { name: "Infrastructure", value: 35 },
  { name: "Health", value: 25 },
  { name: "Education", value: 20 },
  { name: "Agriculture", value: 12 },
  { name: "Other", value: 8 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Budget"
          value="₹10.5 Cr"
          change="5% increase"
          trend="up"
          icon={<DollarSign size={24} />}
        />
        <StatCard
          title="Utilization Rate"
          value="78%"
          change="2% decrease"
          trend="down"
          icon={<PieChart size={24} />}
        />
        <StatCard
          title="Anomalies Detected"
          value="3"
          change="Requires attention"
          trend="neutral"
          icon={<AlertTriangle size={24} />}
        />
        <StatCard
          title="Efficiency Score"
          value="92%"
          change="4% improvement"
          trend="up"
          icon={<Activity size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Quarterly Spending Trend
          </h3>
          <AreaChartComponent data={trendData} color="#8b5cf6" />
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Budget Allocation by Category
          </h3>
          <BarChartComponent data={categoryData} color="#f59e0b" />
        </div>
      </div>
    </div>
  );
}
