"use client";

import React from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { useApi } from "@/hooks/useApi";
import { anomalyApi } from "@/lib/api";
import { AlertTriangle, ShieldAlert, ShieldCheck, ShieldX, Activity } from "lucide-react";
import type { Anomaly } from "@/types";

function AnomalyContent() {
  const { data, status, error, execute } = useApi<Anomaly[]>(() => anomalyApi.getAnomalyDetection());

  React.useEffect(() => {
    execute();
  }, [execute]);

  const totalAnomalies = data?.length ?? 0;
  const highSeverityCount = data?.filter((a) => a.severity === "high" || a.severity === "critical").length ?? 0;
  const mediumSeverityCount = data?.filter((a) => a.severity === "medium").length ?? 0;
  const lowSeverityCount = data?.filter((a) => a.severity === "low").length ?? 0;

  const getSeverityConfig = (severity: Anomaly["severity"]) => {
    switch (severity) {
      case "critical":
      case "high":
        return { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: ShieldX };
      case "medium":
        return { color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", icon: AlertTriangle };
      case "low":
        return { color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: ShieldCheck };
      default:
        return { color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200", icon: ShieldAlert };
    }
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const kpis = [
    { label: "Total Anomalies", value: totalAnomalies, icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "High / Critical", value: highSeverityCount, icon: ShieldX, color: "text-red-600", bg: "bg-red-50" },
    { label: "Medium", value: mediumSeverityCount, icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Low", value: lowSeverityCount, icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
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
        {error || "Failed to load anomaly data"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Anomaly Detection</h2>
        <p className="mt-1 text-sm text-gray-500">Detected irregularities in transactions and spending</p>
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

      <Card title="Detected Anomalies" description="Latest flagged transactions requiring attention">
        {data && data.length > 0 ? (
          <div className="space-y-3">
            {data.map((anomaly) => {
              const config = getSeverityConfig(anomaly.severity);
              const Icon = config.icon;
              return (
                <div
                  key={anomaly.id}
                  className={`flex items-start gap-4 rounded-lg border ${config.border} ${config.bg} p-4`}
                >
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${config.bg} ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 capitalize">{anomaly.type.replace(/_/g, " ")}</p>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        anomaly.severity === "critical" || anomaly.severity === "high" ? "bg-red-100 text-red-700" :
                        anomaly.severity === "medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {anomaly.severity}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{anomaly.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span>Transaction: {anomaly.transaction_id}</span>
                      <span>Confidence: {Math.round(anomaly.confidence * 100)}%</span>
                      <span>Detected: {formatDate(anomaly.detected_at)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <ShieldCheck className="mx-auto mb-2 h-8 w-8 text-green-400" />
            <p>No anomalies detected</p>
            <p className="mt-1 text-sm">All transactions appear normal</p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function AnomalyPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Anomaly Detection">
        <AnomalyContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
