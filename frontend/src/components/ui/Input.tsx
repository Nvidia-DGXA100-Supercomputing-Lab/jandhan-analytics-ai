import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ className, label, error, helperText, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-300",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-sm text-gray-500 dark:text-slate-400">{helperText}</p>}
    </div>
  );
}
