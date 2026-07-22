"use client";

import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { analyticsApi } from "@/lib/api";
import { SpendingChart } from "@/components/Charts/SpendingChart";
import { TrendChart } from "@/components/Charts/TrendChart";
import { DollarSign, BarChart3, PieChart, TrendingUp } from "lucide-react";
import type { AnalyticsData } from "@/types";

function AnalyticsContent() {
  const [trendData, setTrendData] = useState<AnalyticsData["spending_trend"]>([]);
  const [categoryData, setCategoryData] = useState<AnalyticsData["category_breakdown"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [trendRes, categoryRes] = await Promise.all([
          analyticsApi.getSpendingTrends(),
          analyticsApi.getCategoryBreakdown(),
        ]);

        if (!cancelled) {
          setTrendData(trendRes);
          setCategoryData(categoryRes);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load analytics data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loading size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
        {error}
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
