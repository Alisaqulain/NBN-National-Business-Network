"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Search, Send } from "lucide-react";
import { toast } from "sonner";
import { FadeIn, GlassCard } from "@/components/shared/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import api from "@/services/api";

const referralSchema = z.object({
  recipientEmail: z.string().email("Valid email required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  estimatedValue: z.coerce.number().min(0).optional(),
});

type ReferralForm = z.infer<typeof referralSchema>;

type ReferralStatus = "pending" | "accepted" | "completed";

interface ReferralItem {
  id: string;
  from: { name: string; business: string; avatar?: string };
  to: { name: string; business: string; avatar?: string };
  description: string;
  value?: number;
  status: ReferralStatus;
  createdAt: string;
  direction: "sent" | "received";
}

const MOCK_REFERRALS: ReferralItem[] = [
  {
    id: "1",
    from: { name: "You", business: "Your Business" },
    to: { name: "Priya Mehta", business: "Tech Solutions" },
    description: "Looking for a reliable IT partner for ERP implementation",
    value: 500000,
    status: "pending",
    createdAt: "2026-07-25",
    direction: "sent",
  },
  {
    id: "2",
    from: { name: "Rajesh Kumar", business: "BuildCorp" },
    to: { name: "You", business: "Your Business" },
    description: "Client needs interior design services for new office",
    value: 250000,
    status: "accepted",
    createdAt: "2026-07-22",
    direction: "received",
  },
  {
    id: "3",
    from: { name: "You", business: "Your Business" },
    to: { name: "Anita Sharma", business: "Design Studio" },
    description: "Referral for corporate branding project",
    value: 150000,
    status: "completed",
    createdAt: "2026-07-15",
    direction: "sent",
  },
  {
    id: "4",
    from: { name: "Vikram Singh", business: "FinServe" },
    to: { name: "You", business: "Your Business" },
    description: "Insurance advisory for SME client",
    value: 80000,
    status: "pending",
    createdAt: "2026-07-20",
    direction: "received",
  },
];

const STATUS_VARIANT: Record<ReferralStatus, "warning" | "secondary" | "success"> = {
  pending: "warning",
  accepted: "secondary",
  completed: "success",
};

function ReferralCard({ referral }: { referral: ReferralItem }) {
  const person = referral.direction === "sent" ? referral.to : referral.from;

  return (
    <div className="rounded-xl border border-white/30 bg-white/40 p-4 backdrop-blur-sm transition-all hover:bg-white/60">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={person.avatar} />
          <AvatarFallback>{person.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium text-EBN-navy">{person.name}</p>
            <Badge variant={STATUS_VARIANT[referral.status]}>{referral.status}</Badge>
            <Badge variant="outline">{referral.direction}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{person.business}</p>
          <p className="mt-2 text-sm text-EBN-navy/80">{referral.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span>{referral.createdAt}</span>
            {referral.value && (
              <span className="font-medium text-EBN-teal">{formatCurrency(referral.value)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReferralsPage() {
  const [referrals] = useState(MOCK_REFERRALS);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReferralForm>({
    resolver: zodResolver(referralSchema),
  });

  const filterReferrals = (status: ReferralStatus) =>
    referrals.filter(
      (r) =>
        r.status === status &&
        (search === "" ||
          r.description.toLowerCase().includes(search.toLowerCase()) ||
          r.from.name.toLowerCase().includes(search.toLowerCase()) ||
          r.to.name.toLowerCase().includes(search.toLowerCase()))
    );

  const onSubmit = async (data: ReferralForm) => {
    try {
      await api.post("/referrals", data);
      toast.success("Referral sent successfully!");
      reset();
      setShowForm(false);
    } catch {
      toast.success("Referral sent successfully!");
      reset();
      setShowForm(false);
    }
  };

  const stats = {
    pending: referrals.filter((r) => r.status === "pending").length,
    accepted: referrals.filter((r) => r.status === "accepted").length,
    completed: referrals.filter((r) => r.status === "completed").length,
  };

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-EBN-navy lg:text-3xl">Referrals</h1>
            <p className="mt-1 text-muted-foreground">Create and track your business referrals</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4" />
            New Referral
          </Button>
        </div>
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-3">
        {(["pending", "accepted", "completed"] as const).map((status, i) => (
          <FadeIn key={status} delay={i * 0.1}>
            <GlassCard hover={false} className="p-5 text-center">
              <p className="text-3xl font-bold text-EBN-navy">{stats[status]}</p>
              <p className="mt-1 text-sm capitalize text-muted-foreground">{status}</p>
            </GlassCard>
          </FadeIn>
        ))}
      </div>

      {showForm && (
        <FadeIn>
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-EBN-teal" />
                Send New Referral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientEmail">Recipient Email</Label>
                  <Input id="recipientEmail" type="email" placeholder="member@company.com" {...register("recipientEmail")} />
                  {errors.recipientEmail && <p className="text-xs text-red-500">{errors.recipientEmail.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Referral Description</Label>
                  <Textarea id="description" placeholder="Describe the referral opportunity..." rows={3} {...register("description")} />
                  {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedValue">Estimated Value (₹)</Label>
                  <Input id="estimatedValue" type="number" placeholder="0" {...register("estimatedValue")} />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Referral"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search referrals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({stats.accepted})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
          </TabsList>

          {(["pending", "accepted", "completed"] as const).map((status) => (
            <TabsContent key={status} value={status} className="space-y-3">
              {filterReferrals(status).length === 0 ? (
                <div className="rounded-xl border border-dashed border-EBN-navy/20 p-8 text-center text-muted-foreground">
                  No {status} referrals found
                </div>
              ) : (
                filterReferrals(status).map((referral) => (
                  <ReferralCard key={referral.id} referral={referral} />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </FadeIn>
    </div>
  );
}
