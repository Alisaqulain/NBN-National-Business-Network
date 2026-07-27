"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const MINIMAL_ROUTES = ["/login", "/signup", "/forgot-password", "/verify-otp", "/dashboard", "/admin"];

function isMinimalRoute(pathname: string) {
  return MINIMAL_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const minimal = isMinimalRoute(pathname);

  if (minimal) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-nbn-light via-white to-nbn-teal/5">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-nbn-navy/10 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-nbn-teal/15 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-nbn-teal/5 blur-3xl" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nbn-navy to-nbn-teal text-sm font-bold text-white shadow-lg">
              NBN
            </div>
            <span className="font-heading text-lg font-bold text-nbn-navy">National Business Network</span>
          </Link>
        </header>
        <div className="flex flex-1 items-center justify-center px-4 pb-12">{children}</div>
      </div>
    </div>
  );
}
