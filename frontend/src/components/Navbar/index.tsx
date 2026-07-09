"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";
    return segments[0]
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-slate-100 relative"
          >
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="font-medium text-slate-900">Notifications</p>
              </div>
              <div className="px-4 py-3 hover:bg-slate-50">
                <p className="text-sm text-slate-600">New report generated</p>
                <p className="text-xs text-slate-400 mt-1">2 minutes ago</p>
              </div>
              <div className="px-4 py-3 hover:bg-slate-50">
                <p className="text-sm text-slate-600">Anomaly detected in Q3 data</p>
                <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User size={18} className="text-primary-600" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
