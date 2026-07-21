import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function Card({ children, className, title, description, actions }: CardProps) {
  return (
    <div className={cn("rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors duration-300", className)}>
      {(title || description || actions) && (
        <div className="flex items-start justify-between border-b border-gray-200 dark:border-slate-800 px-6 py-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
            {description && <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{description}</p>}
          </div>
          {actions && <div className="ml-4 flex-shrink-0">{actions}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
