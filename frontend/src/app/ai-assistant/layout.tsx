import DashboardLayout from "@/app/dashboard/layout";

export default function AIAssistantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
