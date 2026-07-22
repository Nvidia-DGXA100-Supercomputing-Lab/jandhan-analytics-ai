"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  List,
  FolderOpen,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/analytics", label: "Analytics", icon: "BarChart3" },
  { href: "/transactions", label: "Transactions", icon: "List" },
  { href: "/schemes", label: "Schemes", icon: "FolderOpen" },
  { href: "/forecasting", label: "Forecasting", icon: "TrendingUp" },
  { href: "/chatbot", label: "AI Assistant", icon: "MessageSquare" },
  { href: "/reports", label: "Reports", icon: "FileText" },
  { href: "/anomaly", label: "Anomaly Detection", icon: "AlertTriangle" },
];

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  MessageSquare,
  FileText,
  LogOut,
  User,
  List,
  FolderOpen,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const renderIcon = (name: string, props: Record<string, unknown> = {}) => {
    const IconComponent = iconMap[name];
    if (!IconComponent) return null;
    return <IconComponent {...props} />;
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" style={{ display: mobileOpen ? "block" : "none" }} onClick={() => setMobileOpen(false)} />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200 bg-white transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                {renderIcon("LayoutDashboard", { className: "h-5 w-5" })}
              </div>
              <span className="text-lg font-bold text-gray-900">JanDhan</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 lg:flex"
          >
            {collapsed ? renderIcon("ChevronRight", { className: "h-4 w-4" }) : renderIcon("ChevronLeft", { className: "h-4 w-4" })}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-primary-50 text-primary-700" : "text-gray-700 hover:bg-gray-50",
                  collapsed && "justify-center"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {renderIcon(item.icon, { className: "h-5 w-5 flex-shrink-0" })}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-2">
          <div className={cn("flex items-center gap-3 rounded-md px-3 py-2", collapsed && "justify-center")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
              {renderIcon("User", { className: "h-4 w-4" })}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="truncate text-xs text-gray-500">{user?.role}</p>
              </div>
            )}
          </div>
          <button
            onClick={logout}
            className={cn(
              "mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50",
              collapsed && "justify-center"
            )}
          >
            {renderIcon("LogOut", { className: "h-5 w-5 flex-shrink-0" })}
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg lg:hidden"
      >
        {mobileOpen ? renderIcon("ChevronLeft", { className: "h-5 w-5" }) : renderIcon("LayoutDashboard", { className: "h-5 w-5" })}
      </button>
    </>
  );
}
