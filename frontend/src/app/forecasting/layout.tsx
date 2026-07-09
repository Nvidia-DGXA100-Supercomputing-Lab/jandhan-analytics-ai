import DashboardLayout from "@/app/dashboard/layout";

export default function ForecastingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
