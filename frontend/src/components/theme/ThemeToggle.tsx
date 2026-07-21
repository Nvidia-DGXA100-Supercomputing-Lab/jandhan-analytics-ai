"use client";

export default function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
      title="Toggle theme"
    >
      <span className="dark:hidden">🌙</span>
      <span className="hidden dark:inline">☀️</span>
    </button>
  );
}
