"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  Settings,
  UserCircle,
  Share2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const DASHBOARD_LINKS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Referrals", href: "/dashboard/referrals", icon: Share2 },
  { label: "Events", href: "/dashboard/events", icon: Calendar },
  { label: "Directory", href: "/dashboard/directory", icon: Users },
  { label: "Profile", href: "/dashboard/profile", icon: UserCircle },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const ADMIN_LINKS = [
  { label: "Overview", href: "/admin", icon: Shield },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
];

interface SidebarProps {
  variant: "dashboard" | "admin";
}

export function DashboardSidebar({ variant }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = variant === "admin" ? ADMIN_LINKS : DASHBOARD_LINKS;
  const title = variant === "admin" ? "Admin Panel" : "Member Dashboard";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "NB";

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className={cn("flex items-center gap-3 border-b border-white/10 p-5", collapsed && "justify-center")}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-nbn-navy to-nbn-teal text-xs font-bold text-white">
          NBN
        </div>
        {!collapsed && (
          <div>
            <p className="font-heading text-sm font-bold text-white">{title}</p>
            <p className="text-xs text-white/50">National Business Network</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" && link.href !== "/admin" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-nbn-navy/80 to-nbn-teal/80 text-white shadow-lg shadow-nbn-teal/20"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className={cn("mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3", collapsed && "justify-center p-2")}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
              </p>
              <p className="truncate text-xs text-white/50">{user?.email ?? "member@nbn.in"}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={handleLogout}
          className={cn(
            "w-full text-white/70 hover:bg-white/10 hover:text-white",
            collapsed && "w-10"
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-nbn-navy/90 p-2 text-white backdrop-blur-md lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-nbn-dark/95 backdrop-blur-xl transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed && "lg:w-20"
        )}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-5 rounded-lg p-1 text-white/70 hover:bg-white/10 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
        {sidebarContent}
      </aside>

      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="fixed bottom-6 z-50 hidden h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-nbn-dark/90 text-white/70 backdrop-blur-md transition-all hover:text-white lg:flex"
        style={{ left: collapsed ? "4.5rem" : "15rem" }}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </>
  );
}

export function DashboardShell({
  children,
  variant = "dashboard",
}: {
  children: React.ReactNode;
  variant?: "dashboard" | "admin";
}) {
  const [collapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-nbn-light via-white to-nbn-teal/5">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-nbn-teal/10 blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-nbn-navy/10 blur-3xl" />
      </div>
      <DashboardSidebar variant={variant} />
      <main className={cn("relative min-h-screen transition-all lg:pl-64", collapsed && "lg:pl-20")}>
        <div className="p-4 pt-16 lg:p-8 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
