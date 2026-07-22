"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApi } from "@/hooks/useApi";
import { reportsApi } from "@/lib/api";
import { Download, Plus, FileText, Calendar } from "lucide-react";
import type { Report } from "@/types";

function ReportsContent() {
  const [showGenerate, setShowGenerate] = useState(false);
  const [reportType, setReportType] = useState("spending");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: reports, status, error, execute: fetchReports } = useApi<Report[]>(() => reportsApi.getReports());
  const { execute: generateReport, status: generateStatus } = useApi<Report>(
    () =>
      reportsApi.generateReport({
        type: reportType,
        format: reportFormat,
        start_date: startDate || new Date().toISOString().split("T")[0],
        end_date: endDate || new Date().toISOString().split("T")[0],
      })
  );

  React.useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleGenerate = async () => {
    await generateReport();
    setShowGenerate(false);
    fetchReports();
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const getFileSize = (url: string) => {
    try {
      const path = url.split("/").pop() || "";
      if (path.includes("pdf")) return "PDF";
      if (path.includes("csv")) return "CSV";
      return "File";
    } catch {
      return "File";
    }
  };

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
        {error || "Failed to load reports"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Generate and download spending reports</p>
        </div>
        <Button onClick={() => setShowGenerate(!showGenerate)}>
          <Plus className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {showGenerate && (
        <Card title="Generate New Report">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="spending">Spending</option>
                <option value="transactions">Transactions</option>
                <option value="schemes">Schemes</option>
                <option value="anomalies">Anomalies</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">Format</label>
              <select
                value={reportFormat}
                onChange={(e) => setReportFormat(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowGenerate(false)}>Cancel</Button>
            <Button onClick={handleGenerate} isLoading={generateStatus === "loading"}>
              Generate
            </Button>
          </div>
        </Card>
      )}

      <Card>
        {reports && reports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-slate-400">Name</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-slate-400">Type</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-slate-400">Date</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-slate-400">Size</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-slate-400">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800">
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{report.name}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300 capitalize">{report.type}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{formatDate(report.date || report.created_at)}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{report.size || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        report.status === "completed" ? "bg-green-100 text-green-700" :
                        report.status === "processing" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {report.status === "completed" && report.url && (
                        <a
                          href={report.url}
                          download
                          className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500 dark:text-slate-400">
            <FileText className="mx-auto mb-2 h-8 w-8 text-gray-400" />
            <p>No reports found</p>
            <p className="mt-1 text-sm">Generate a new report to get started</p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Reports">
        <ReportsContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
