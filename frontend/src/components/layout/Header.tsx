"use client";

import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden text-sm text-gray-500 md:block">AI-Powered Transparency Platform</div>
      </div>
    </header>
  );
}
