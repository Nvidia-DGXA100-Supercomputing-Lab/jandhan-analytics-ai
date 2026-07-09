import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JanDhan Analytics AI",
  description:
    "AI-Powered Public Spending Transparency Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}