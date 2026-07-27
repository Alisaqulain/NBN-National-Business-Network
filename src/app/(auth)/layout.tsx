import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/conditional-shell";

export const metadata: Metadata = {
  title: "Authentication",
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}
