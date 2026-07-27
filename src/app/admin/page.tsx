"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  Calendar,
  FileText,
  IndianRupee,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { FadeIn, GlassCard, AnimatedCounter } from "@/components/shared/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const GROWTH_DATA = [
  { month: "Jan", members: 18200, revenue: 4500000 },
  { month: "Feb", members: 18500, revenue: 4800000 },
  { month: "Mar", members: 18900, revenue: 5100000 },
  { month: "Apr", members: 19200, revenue: 5300000 },
  { month: "May", members: 19600, revenue: 5600000 },
  { month: "Jun", members: 20100, revenue: 5900000 },
];

const QUICK_STATS = [
  { label: "Total Members", value: 20100, change: "+2.5%", icon: Users, href: "/admin/users" },
  { label: "Active Events", value: 48, change: "+12", icon: Calendar, href: "/admin/events" },
  { label: "Published Blogs", value: 156, change: "+8", icon: FileText, href: "/admin/blogs" },
  { label: "Monthly Revenue", value: 5900000, change: "+5.4%", icon: IndianRupee, href: "#", isCurrency: true },
];

const RECENT_ACTIVITY = [
  { action: "New member registered", user: "Amit Patel", time: "5 min ago", type: "user" },
  { action: "Event created", user: "Admin", time: "1 hour ago", type: "event" },
  { action: "Blog published", user: "Content Team", time: "3 hours ago", type: "blog" },
  { action: "Membership upgraded", user: "Sneha Reddy", time: "5 hours ago", type: "user" },
  { action: "Chapter meeting scheduled", user: "Mumbai Chapter", time: "1 day ago", type: "event" },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-nbn-navy lg:text-3xl">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Platform overview and analytics</p>
          </div>
          <Badge variant="secondary" className="w-fit">
            <TrendingUp className="mr-1 h-3 w-3" />
            Live Data
          </Badge>
        </div>
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {QUICK_STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <Link href={stat.href}>
                <GlassCard hover className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 font-heading text-2xl font-bold text-nbn-navy">
                        {stat.isCurrency ? (
                          formatCurrency(stat.value)
                        ) : (
                          <AnimatedCounter value={stat.value} />
                        )}
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <ArrowUpRight className="h-3 w-3" />
                        {stat.change}
                      </span>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-nbn-navy to-nbn-teal p-2.5 text-white shadow-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <FadeIn delay={0.2} className="lg:col-span-2">
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={GROWTH_DATA}>
                  <defs>
                    <linearGradient id="memberGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#143055" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#143055" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,48,85,0.08)" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="members" stroke="#143055" strokeWidth={2} fill="url(#memberGrad)" name="Members" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="rounded-xl border border-white/30 bg-white/40 p-3 backdrop-blur-sm">
                  <p className="text-sm font-medium text-nbn-navy">{item.action}</p>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.user}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay={0.4}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Manage Users</p>
                <p className="font-heading text-lg font-bold text-nbn-navy">20,100 members</p>
              </div>
              <Button asChild variant="secondary" size="sm">
                <Link href="/admin/users">View</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Manage Events</p>
                <p className="font-heading text-lg font-bold text-nbn-navy">48 active</p>
              </div>
              <Button asChild variant="secondary" size="sm">
                <Link href="/admin/events">View</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Manage Blogs</p>
                <p className="font-heading text-lg font-bold text-nbn-navy">156 published</p>
              </div>
              <Button asChild variant="secondary" size="sm">
                <Link href="/admin/blogs">View</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
}
