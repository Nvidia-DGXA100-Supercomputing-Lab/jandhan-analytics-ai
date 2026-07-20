"use client";

import React from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { useApi } from "@/hooks/useApi";
import { forecastingApi } from "@/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Target, GitBranch, Activity } from "lucide-react";
import type { ForecastingData } from "@/types";

function ForecastingContent() {
  const { data, status, error, execute } = useApi<ForecastingData>(() => forecastingApi.getForecastingData());

  React.useEffect(() => {
    execute();
  }, [execute]);

  const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;

  const predictedTotal = data?.predictions?.reduce((sum, p) => sum + p.predicted, 0) ?? 0;
  const avgPredicted = data?.predictions && data.predictions.length > 0 ? predictedTotal / data.predictions.length : 0;

  const kpis = [
    { label: "Predicted Total", value: formatCurrency(predictedTotal), icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Avg Monthly", value: formatCurrency(Math.round(avgPredicted)), icon: Target, color: "text-green-600", bg: "bg-green-50" },
    { label: "Model Accuracy", value: data ? `${Math.round(data.accuracy * 100)}%` : "—", icon: Activity, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Model Version", value: data?.model_version ?? "—", icon: GitBranch, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-12">
        <Loading size="lg" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
        {error || "Failed to load forecasting data"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Forecasting</h2>
        <p className="mt-1 text-sm text-gray-500">AI-powered spending predictions and trends</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="!p-0">
            <div className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{kpi.label}</p>
                <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Spending Forecast" description="Predicted spending with confidence bounds">
        {data?.predictions && data.predictions.length > 0 ? (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.predictions} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{ borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
                />
                <Line type="monotone" dataKey="upper_bound" stroke="#93c5fd" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Upper Bound" />
                <Line type="monotone" dataKey="predicted" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Predicted" />
                <Line type="monotone" dataKey="lower_bound" stroke="#93c5fd" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Lower Bound" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No forecast data available</p>
        )}
      </Card>
    </div>
  );
}

export default function ForecastingPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Forecasting">
        <ForecastingContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
