"use client";

import React, { useState, useMemo } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { useApi } from "@/hooks/useApi";
import { schemesApi } from "@/lib/api";
import { DataTable } from "@/components/tables/DataTable";
import { Search } from "lucide-react";
import type { Scheme } from "@/types";

function SchemesContent() {
  const { data, status, error, execute } = useApi<Scheme[]>(() => schemesApi.getSchemes());
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  React.useEffect(() => {
    execute();
  }, [execute]);

  const filtered = useMemo(() => {
    const results = data ?? [];
    return results.filter((s) => {
      const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !categoryFilter || s.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [data, search, categoryFilter]);

  const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const utilization = (scheme: Scheme) => {
    if (scheme.budget === 0) return "0%";
    return `${Math.round((scheme.spent / scheme.budget) * 100)}%`;
  };

  const columns = [
    { key: "name", header: "Scheme Name", sortable: true },
    { key: "category", header: "Category", sortable: true },
    { key: "budget", header: "Budget", sortable: true, render: (item: Scheme) => formatCurrency(item.budget) },
    { key: "spent", header: "Spent", sortable: true, render: (item: Scheme) => formatCurrency(item.spent) },
    { key: "status", header: "Status", sortable: true, render: (item: Scheme) => (
      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        item.status === "active" ? "bg-green-100 text-green-700" :
        item.status === "completed" ? "bg-blue-100 text-blue-700" :
        "bg-gray-100 text-gray-700"
      }`}>
        {item.status}
      </span>
    )},
    { key: "start_date", header: "Start Date", sortable: true, render: (item: Scheme) => formatDate(item.start_date) },
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
        {error || "Failed to load schemes"}
      </div>
    );
  }

  const categories = Array.from(new Set((data ?? []).map((s) => s.category)));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Schemes</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Browse and manage government schemes</p>
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search schemes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-slate-100 transition-colors duration-300"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-slate-100 transition-colors duration-300"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(item) => item.id}
          emptyMessage="No schemes found"
        />
      </Card>
    </div>
  );
}

export default function SchemesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Schemes">
        <SchemesContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
