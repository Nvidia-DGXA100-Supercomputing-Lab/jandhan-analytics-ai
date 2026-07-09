"use client";

import { useState } from "react";
import { Download, Filter, Calendar } from "lucide-react";

const reports = [
  { id: 1, name: "Q3 Spending Analysis", type: "PDF", date: "2026-07-01", size: "2.4 MB" },
  { id: 2, name: "Department Budget Report", type: "PDF", date: "2026-06-28", size: "1.8 MB" },
  { id: 3, name: "Beneficiary Summary", type: "XLSX", date: "2026-06-25", size: "3.2 MB" },
  { id: 4, name: "Anomaly Detection Report", type: "PDF", date: "2026-06-20", size: "1.1 MB" },
];

export default function ReportsPage() {
  const [filter, setFilter] = useState("all");

  const filteredReports = filter === "all"
    ? reports
    : reports.filter((r) => r.type.toLowerCase() === filter);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Reports</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF</option>
                <option value="xlsx">Excel</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Report Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {report.name}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    {report.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{report.date}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{report.size}</td>
                <td className="px-6 py-4">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
