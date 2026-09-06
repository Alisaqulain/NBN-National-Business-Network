"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  Bell,
  Calendar,
  CheckCircle2,
  Circle,
  Handshake,
  IndianRupee,
  Trophy,
  Users,
} from "lucide-react";
import { FadeIn, GlassCard, AnimatedCounter } from "@/components/shared/animations";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency } from "@/lib/utils";

const REFERRAL_DATA = [
  { month: "Jan", sent: 4, received: 3 },
  { month: "Feb", sent: 6, received: 5 },
  { month: "Mar", sent: 8, received: 7 },
  { month: "Apr", sent: 5, received: 6 },
  { month: "May", sent: 10, received: 8 },
  { month: "Jun", sent: 12, received: 11 },
];

const REVENUE_DATA = [
  { month: "Jan", value: 120000 },
  { month: "Feb", value: 180000 },
  { month: "Mar", value: 240000 },
  { month: "Apr", value: 210000 },
  { month: "May", value: 320000 },
  { month: "Jun", value: 450000 },
];

const UPCOMING_EVENTS = [
  { id: "1", title: "Mumbai Chapter Weekly Meeting", date: "Jul 30, 2026", time: "7:00 AM", location: "Andheri West" },
  { id: "2", title: "Business Growth Workshop", date: "Aug 5, 2026", time: "10:00 AM", location: "Virtual" },
  { id: "3", title: "National Networking Expo", date: "Aug 15, 2026", time: "9:00 AM", location: "BKC, Mumbai" },
];

const TASKS = [
  { id: "1", title: "Follow up with Rajesh referral", done: false, priority: "high" },
  { id: "2", title: "Update business profile", done: true, priority: "medium" },
  { id: "3", title: "RSVP for chapter meeting", done: false, priority: "high" },
  { id: "4", title: "Send thank you note to Priya", done: false, priority: "low" },
];

const NOTIFICATIONS = [
  { id: "1", title: "New referral received", message: "Anita Sharma sent you a referral", time: "2h ago", type: "referral" },
  { id: "2", title: "Event reminder", message: "Weekly meeting tomorrow at 7 AM", time: "5h ago", type: "event" },
  { id: "3", title: "Profile viewed", message: "Your profile was viewed 12 times this week", time: "1d ago", type: "info" },
];

const LEADERBOARD = [
  { rank: 1, name: "Priya Mehta", business: "Tech Solutions", referrals: 24, avatar: "" },
  { rank: 2, name: "Rajesh Kumar", business: "BuildCorp", referrals: 21, avatar: "" },
  { rank: 3, name: "Anita Sharma", business: "Design Studio", referrals: 19, avatar: "" },
  { rank: 4, name: "You", business: "Your Business", referrals: 17, avatar: "", isYou: true },
  { rank: 5, name: "Vikram Singh", business: "FinServe", referrals: 15, avatar: "" },
];

const STAT_CARDS = [
  { label: "Referrals Sent", value: 47, change: "+12%", icon: Handshake, color: "from-blue-500 to-blue-600" },
  { label: "Referrals Received", value: 38, change: "+8%", icon: Users, color: "from-emerald-500 to-emerald-600" },
  { label: "Business Generated", value: 1250000, change: "+23%", icon: IndianRupee, color: "from-amber-500 to-amber-600", isCurrency: true },
  { label: "Network Score", value: 892, change: "+5%", icon: Trophy, color: "from-purple-500 to-purple-600" },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.firstName ?? "Member";

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-EBN-navy lg:text-3xl">
              Good morning, {firstName}! 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here&apos;s what&apos;s happening in your network today
            </p>
          </div>
          <Button>
            <Handshake className="h-4 w-4" />
            Send Referral
          </Button>
        </div>
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <GlassCard hover={false} className="relative overflow-hidden p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 font-heading text-2xl font-bold text-EBN-navy">
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
                  <div className={`rounded-xl bg-gradient-to-br ${stat.color} p-2.5 text-white shadow-lg`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.2}>
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Referral Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={REFERRAL_DATA}>
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
                  <Bar dataKey="sent" fill="#143055" radius={[6, 6, 0, 0]} name="Sent" />
                  <Bar dataKey="received" fill="#16999A" radius={[6, 6, 0, 0]} name="Received" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Business Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16999A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#16999A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,48,85,0.08)" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `₹${v / 1000}K`} />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value ?? 0)), "Revenue"]}
                    contentStyle={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#16999A" strokeWidth={2} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <FadeIn delay={0.2} className="lg:col-span-1">
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-EBN-teal" />
                Upcoming Events
              </CardTitle>
              <Button variant="ghost" size="sm">View all</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.id} className="rounded-xl border border-white/30 bg-white/40 p-4 backdrop-blur-sm">
                  <p className="font-medium text-EBN-navy">{event.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3} className="lg:col-span-1">
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-EBN-teal" />
                Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {TASKS.map((task) => (
                <label key={task.id} className="flex cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-white/40">
                  {task.done ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  ) : (
                    <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm ${task.done ? "text-muted-foreground line-through" : "text-EBN-navy"}`}>
                      {task.title}
                    </p>
                    <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "warning" : "secondary"} className="mt-1">
                      {task.priority}
                    </Badge>
                  </div>
                </label>
              ))}
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.4} className="lg:col-span-1">
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-EBN-teal" />
                Notifications
              </CardTitle>
              <Badge variant="secondary">{NOTIFICATIONS.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {NOTIFICATIONS.map((notif) => (
                <div key={notif.id} className="rounded-xl border border-white/30 bg-white/40 p-3 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-EBN-navy">{notif.title}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">{notif.time}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{notif.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay={0.3}>
        <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Chapter Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {LEADERBOARD.map((member) => (
                <div
                  key={member.rank}
                  className={`flex items-center gap-4 rounded-xl p-3 ${
                    member.isYou ? "border border-EBN-teal/30 bg-EBN-teal/5" : "hover:bg-white/40"
                  }`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    member.rank <= 3 ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white" : "bg-EBN-navy/10 text-EBN-navy"
                  }`}>
                    {member.rank}
                  </span>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-EBN-navy">
                      {member.name}
                      {member.isYou && <Badge variant="secondary" className="ml-2">You</Badge>}
                    </p>
                    <p className="text-xs text-muted-foreground">{member.business}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-EBN-teal">{member.referrals}</p>
                    <p className="text-xs text-muted-foreground">referrals</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
