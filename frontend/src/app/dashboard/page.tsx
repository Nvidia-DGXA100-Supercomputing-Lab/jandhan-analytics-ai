"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { useApi } from "@/hooks/useApi";
import { dashboardApi } from "@/lib/api";
import { TrendChart } from "@/components/charts/TrendChart";
import { DataTable } from "@/components/tables/DataTable";
import { DollarSign, FileText, Users, Clock } from "lucide-react";
import type { DashboardData, Transaction } from "@/types";

function DashboardContent() {
  const { data, status, error, execute } = useApi<DashboardData>(dashboardApi.getDashboardData);

  React.useEffect(() => {
    execute();
  }, [execute]);

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const kpis = [
    { label: "Total Spending", value: formatCurrency(data?.total_spent ?? 0), icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Schemes", value: data?.total_schemes ?? 0, icon: FileText, color: "text-green-600", bg: "bg-green-50" },
    { label: "Transactions", value: data?.total_transactions ?? 0, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Pending Verifications", value: data?.pending_verifications ?? 0, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const transactionColumns = [
    { key: "recipient_name", header: "Recipient" },
    { key: "scheme_id", header: "Scheme" },
    { key: "amount", header: "Amount", render: (item: Transaction) => formatCurrency(item.amount) },
    { key: "status", header: "Status", render: (item: Transaction) => (
      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        item.status === "completed" ? "bg-green-100 text-green-700" :
        item.status === "pending" ? "bg-yellow-100 text-yellow-700" :
        "bg-red-100 text-red-700"
      }`}>
        {item.status}
      </span>
    )},
    { key: "date", header: "Date", render: (item: Transaction) => formatDate(item.date) },
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
        {error || "Failed to load dashboard data"}
      </div>
    );
  }

  const recentTransactions = data?.recent_transactions?.slice(0, 5) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Overview of spending and scheme activity</p>
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
        <Card title="Spending Trend" description="Monthly spending over time">
          {data?.recent_transactions && data.recent_transactions.length > 0 ? (
            <TrendChart
              data={data.recent_transactions.slice(0, 6).map((t) => ({
                month: formatDate(t.date),
                amount: t.amount,
              }))}
            />
          ) : (
            <p className="text-sm text-gray-500 dark:text-slate-400">No trend data available</p>
          )}
        </Card>

        <Card title="Recent Transactions" description="Latest 5 transactions">
          {recentTransactions.length > 0 ? (
            <DataTable
              columns={transactionColumns}
              data={recentTransactions}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <p className="text-sm text-gray-500 dark:text-slate-400">No transactions found</p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Dashboard">
        <DashboardContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
