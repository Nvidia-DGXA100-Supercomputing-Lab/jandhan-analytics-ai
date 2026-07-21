"use client";

import React from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { useApi } from "@/hooks/useApi";
import { analyticsApi } from "@/lib/api";
import { SpendingChart } from "@/components/charts/SpendingChart";
import { TrendChart } from "@/components/charts/TrendChart";
import { DollarSign, BarChart3, PieChart, TrendingUp } from "lucide-react";
import type { AnalyticsData } from "@/types";

function AnalyticsContent() {
  const { data: trendData, status: trendStatus, execute: executeTrend } = useApi<AnalyticsData["spending_trend"]>(() => analyticsApi.getSpendingTrends());
  const { data: categoryData, status: categoryStatus, execute: executeCategory } = useApi<AnalyticsData["category_breakdown"]>(() => analyticsApi.getCategoryBreakdown());

  React.useEffect(() => {
    executeTrend();
    executeCategory();
  }, [executeTrend, executeCategory]);

  const isLoading = trendStatus === "loading" || categoryStatus === "loading";
  const hasError = trendStatus === "error" || categoryStatus === "error";

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const totalSpending = categoryData?.reduce((sum, item) => sum + item.amount, 0) ?? 0;
  const avgMonthly = trendData?.reduce((sum, item) => sum + item.amount, 0) ?? 0;

  const kpis = [
    { label: "Total Spending", value: formatCurrency(totalSpending), icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Categories", value: categoryData?.length ?? 0, icon: BarChart3, color: "text-green-600", bg: "bg-green-50" },
    { label: "Data Points", value: trendData?.length ?? 0, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Avg Monthly", value: trendData && trendData.length > 0 ? formatCurrency(Math.round(avgMonthly / trendData.length)) : "₹0", icon: PieChart, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loading size="lg" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
        {(trendStatus === "error" && trendData === null) || (categoryStatus === "error" && categoryData === null)
          ? "Failed to load analytics data"
          : ""}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Department-wise spending and trends</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="!p-0">
            <div className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">{kpi.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Department-wise Spending" description="Spending by category">
          {categoryData && categoryData.length > 0 ? (
            <SpendingChart data={categoryData} />
          ) : (
            <p className="text-sm text-gray-500 dark:text-slate-400">No category data available</p>
          )}
        </Card>

        <Card title="Spending Trend" description="Monthly spending trend">
          {trendData && trendData.length > 0 ? (
            <TrendChart data={trendData} />
          ) : (
            <p className="text-sm text-gray-500 dark:text-slate-400">No trend data available</p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Analytics">
        <AnalyticsContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
