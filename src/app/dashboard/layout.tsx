import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell variant="dashboard">{children}</DashboardShell>;
}
