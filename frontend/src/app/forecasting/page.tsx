"use client";

import { useState } from "react";
import LineChartComponent from "@/components/Charts/AreaChartComponent";
import { TrendingUp, Calendar, Target } from "lucide-react";

const forecastData = [
  { name: "Jul", value: 5800 },
  { name: "Aug", value: 6200 },
  { name: "Sep", value: 5900 },
  { name: "Oct", value: 6500 },
  { name: "Nov", value: 7000 },
  { name: "Dec", value: 6800 },
];

export default function ForecastingPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Predicted Growth</p>
              <p className="text-2xl font-bold text-slate-900">+8.5%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <Target size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Forecast Accuracy</p>
              <p className="text-2xl font-bold text-slate-900">94%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Next Review</p>
              <p className="text-2xl font-bold text-slate-900">Jul 15</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          6-Month Spending Forecast
        </h3>
        <LineChartComponent data={forecastData} color="#3b82f6" height={400} />
      </div>
    </div>
  );
}
