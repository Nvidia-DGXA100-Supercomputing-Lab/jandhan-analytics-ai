"use client";

import React, { useState, useCallback } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Loading } from "@/components/ui/Loading";
import { Button } from "@/components/ui/Button";
import { useApi } from "@/hooks/useApi";
import { uploadApi } from "@/lib/api";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";

type UploadType = "transactions" | "schemes";

function UploadContent() {
  const [uploadType, setUploadType] = useState<UploadType>("transactions");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const { execute: uploadFile, status, error, data } = useApi<{ imported: number; errors: string[]; message: string }>(
    () =>
      file
        ? uploadType === "transactions"
          ? uploadApi.uploadTransactions(file)
          : uploadApi.uploadSchemes(file)
        : Promise.resolve({ imported: 0, errors: [], message: "" })
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    await uploadFile();
  };

  const reset = () => {
    setFile(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Data</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Import CSV datasets for transactions and schemes</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Data Type</label>
              <div className="flex gap-2">
                <Button
                  variant={uploadType === "transactions" ? "primary" : "outline"}
                  onClick={() => { setUploadType("transactions"); reset(); }}
                  className="flex-1"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Transactions
                </Button>
                <Button
                  variant={uploadType === "schemes" ? "primary" : "outline"}
                  onClick={() => { setUploadType("schemes"); reset(); }}
                  className="flex-1"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Schemes
                </Button>
              </div>
            </div>

            <div
              className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-300 dark:border-slate-700 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="absolute inset-0 cursor-pointer opacity-0"
                id="file-upload"
              />
              <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {file ? file.name : "Drop your CSV file here, or click to browse"}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                Supports {uploadType} CSV files
              </p>
            </div>

            {file && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Selected: <span className="font-medium">{file.name}</span>
                </p>
                <Button variant="ghost" size="sm" onClick={reset}>
                  Clear
                </Button>
              </div>
            )}

            <div className="mt-6">
              <Button
                onClick={handleUpload}
                disabled={!file || status === "loading"}
                className="w-full"
                isLoading={status === "loading"}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload {uploadType === "transactions" ? "Transactions" : "Schemes"}
              </Button>
            </div>

            {error && (
              <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            {data && (
              <div className="mt-4 rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">{data.message}</span>
                </div>
                {data.errors.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {data.errors.map((err, i) => (
                      <div key={i} className="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <XCircle className="h-4 w-4" />
                        {err}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">CSV Format Guide</h3>
            <div className="space-y-4 text-sm text-gray-600 dark:text-slate-400">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Transactions CSV</p>
                <p className="mt-1">Required columns: <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">scheme</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">department</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">amount</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">status</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">date</code></p>
                <p className="mt-1">Optional columns: <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">recipient_name</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">recipient_account</code></p>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Schemes CSV</p>
                <p className="mt-1">Required columns: <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">name</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">department</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">budget</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">beneficiaries</code></p>
                <p className="mt-1">Optional columns: <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">description</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">status</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">category</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">start_date</code>, <code className="rounded bg-gray-100 dark:bg-slate-800 px-1 py-0.5">end_date</code></p>
              </div>
              <div className="rounded-md bg-blue-50 p-3 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                <p>Sample files are available in the <code className="rounded bg-blue-100 dark:bg-blue-800 px-1 py-0.5">datasets/raw/</code> directory.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Upload Data">
        <UploadContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
