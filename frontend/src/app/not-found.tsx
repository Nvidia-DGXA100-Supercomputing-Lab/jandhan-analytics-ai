import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-lg text-gray-600 dark:text-slate-400">Page not found</p>
      <p className="text-sm text-gray-500 dark:text-slate-400">The page you are looking for does not exist or has been moved.</p>
      <Link
        href="/dashboard"
        className="mt-4 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
