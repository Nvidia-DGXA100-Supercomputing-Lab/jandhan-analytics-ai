import DashboardLayout from "@/app/dashboard/layout";

export default function AnomalyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
