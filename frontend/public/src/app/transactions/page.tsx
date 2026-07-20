"use client";

import React, { useState, useMemo } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { useApi } from "@/hooks/useApi";
import { transactionsApi } from "@/lib/api";
import { DataTable } from "@/components/tables/DataTable";
import { Search } from "lucide-react";
import type { Transaction } from "@/types";

function TransactionsContent() {
  const { data, status, error, execute } = useApi<{ results: Transaction[]; count: number }>(() => transactionsApi.getTransactions());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  React.useEffect(() => {
    execute();
  }, [execute]);

  const filtered = useMemo(() => {
    const results = data?.results ?? [];
    return results.filter((t) => {
      const matchesSearch = !search || t.recipient_name.toLowerCase().includes(search.toLowerCase()) || t.scheme_id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data?.results, search, statusFilter]);

  const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const columns = [
    { key: "recipient_name", header: "Recipient", sortable: true },
    { key: "scheme_id", header: "Scheme", sortable: true },
    { key: "amount", header: "Amount", sortable: true, render: (item: Transaction) => formatCurrency(item.amount) },
    { key: "status", header: "Status", sortable: true, render: (item: Transaction) => (
      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        item.status === "completed" ? "bg-green-100 text-green-700" :
        item.status === "pending" ? "bg-yellow-100 text-yellow-700" :
        "bg-red-100 text-red-700"
      }`}>
        {item.status}
      </span>
    )},
    { key: "date", header: "Date", sortable: true, render: (item: Transaction) => formatDate(item.date) },
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
        {error || "Failed to load transactions"}
      </div>
    );
  }

  const statuses = Array.from(new Set((data?.results ?? []).map((t) => t.status)));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
        <p className="mt-1 text-sm text-gray-500">All scheme transactions</p>
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(item) => item.id}
          emptyMessage="No transactions found"
        />
      </Card>
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Transactions">
        <TransactionsContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
