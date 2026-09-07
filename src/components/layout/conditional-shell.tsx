"use client";

import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/constants";
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
      <main className="flex-1 bg-transparent">{children}</main>
      <Footer />
    </>
  );
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-EBN-light/40 to-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-EBN-navy/10 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-EBN-teal/15 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-EBN-teal/5 blur-3xl" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="flex items-center">
            <Image
              src={BRAND.logo}
              alt={`${BRAND.shortName} – ${BRAND.name}`}
              width={160}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </header>
        <div className="flex flex-1 items-center justify-center px-4 pb-12">{children}</div>
      </div>
    </div>
  );
}
