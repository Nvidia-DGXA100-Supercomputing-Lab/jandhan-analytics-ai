import { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

interface UploadLayoutProps {
  children: ReactNode;
}

export default function UploadLayout({ children }: UploadLayoutProps) {
  return <DashboardLayout title="Upload Data">{children}</DashboardLayout>;
}
