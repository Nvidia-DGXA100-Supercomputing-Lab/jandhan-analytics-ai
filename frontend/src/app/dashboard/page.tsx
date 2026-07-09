import StatCard from "@/components/Cards/StatCard";
import AreaChartComponent from "@/components/Charts/AreaChartComponent";
import BarChartComponent from "@/components/Charts/BarChartComponent";
import { DollarSign, Users, FileText, TrendingUp } from "lucide-react";

const spendingData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

const departmentData = [
  { name: "Health", value: 12000 },
  { name: "Education", value: 8500 },
  { name: "Infrastructure", value: 15000 },
  { name: "Agriculture", value: 6000 },
  { name: "Defense", value: 18000 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Spending"
          value="₹2.45 Cr"
          change="12% from last month"
          trend="up"
          icon={<DollarSign size={24} />}
        />
        <StatCard
          title="Active Schemes"
          value="1,284"
          change="8% increase"
          trend="up"
          icon={<FileText size={24} />}
        />
        <StatCard
          title="Beneficiaries"
          value="4.2M"
          change="15% increase"
          trend="up"
          icon={<Users size={24} />}
        />
        <StatCard
          title="Transparency Score"
          value="87%"
          change="3% improvement"
          trend="up"
          icon={<TrendingUp size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Spending Overview
          </h3>
          <AreaChartComponent data={spendingData} />
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Department Allocation
          </h3>
          <BarChartComponent data={departmentData} color="#22c55e" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Scheme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900">PM-KISAN</td>
                <td className="px-6 py-4 text-sm text-slate-600">Agriculture</td>
                <td className="px-6 py-4 text-sm text-slate-900">₹2,50,000</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">2026-07-08</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900">PM Awas Yojana</td>
                <td className="px-6 py-4 text-sm text-slate-600">Housing</td>
                <td className="px-6 py-4 text-sm text-slate-900">₹5,00,000</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                    Processing
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">2026-07-07</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900">Ayushman Bharat</td>
                <td className="px-6 py-4 text-sm text-slate-600">Health</td>
                <td className="px-6 py-4 text-sm text-slate-900">₹1,20,000</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">2026-07-06</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
