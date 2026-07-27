"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, Check, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { FadeIn, GlassCard } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import api from "@/services/api";
import type { ApiResponse } from "@/types";

const step1Schema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const step2Schema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  category: z.string().min(1, "Please select a category"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  businessDescription: z.string().min(20, "Description must be at least 20 characters"),
});

type Step1Form = z.infer<typeof step1Schema>;
type Step2Form = z.infer<typeof step2Schema>;

const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Business Info", icon: Building2 },
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Form | null>(null);

  const step1Form = useForm<Step1Form>({
    resolver: zodResolver(step1Schema),
  });

  const step2Form = useForm<Step2Form>({
    resolver: zodResolver(step2Schema),
  });

  const onStep1Submit = (data: Step1Form) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2Submit = async (data: Step2Form) => {
    if (!step1Data) return;
    try {
      await api.post<ApiResponse<unknown>>("/auth/register", {
        ...step1Data,
        ...data,
      });
      toast.success("Account created! Please verify your email.");
      router.push(`/verify-otp?email=${encodeURIComponent(step1Data.email)}`);
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <FadeIn className="w-full max-w-lg">
      <GlassCard hover={false} className="p-8">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-2xl font-bold text-nbn-navy">Join NBN</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your member account in 2 simple steps
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isComplete = step > s.id;

            return (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                    isComplete
                      ? "bg-gradient-to-r from-nbn-navy to-nbn-teal text-white"
                      : isActive
                        ? "border-2 border-nbn-teal bg-nbn-teal/10 text-nbn-teal"
                        : "border border-nbn-navy/20 bg-white/50 text-muted-foreground"
                  }`}
                >
                  {isComplete ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={`hidden text-sm font-medium sm:block ${isActive ? "text-nbn-navy" : "text-muted-foreground"}`}>
                  {s.title}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 w-8 ${step > s.id ? "bg-nbn-teal" : "bg-nbn-navy/10"}`} />
                )}
              </div>
            );
          })}
        </div>

        {step === 1 && (
          <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" {...step1Form.register("firstName")} />
                {step1Form.formState.errors.firstName && (
                  <p className="text-xs text-red-500">{step1Form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" {...step1Form.register("lastName")} />
                {step1Form.formState.errors.lastName && (
                  <p className="text-xs text-red-500">{step1Form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@company.com" {...step1Form.register("email")} />
              {step1Form.formState.errors.email && (
                <p className="text-xs text-red-500">{step1Form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+91 98765 43210" {...step1Form.register("phone")} />
              {step1Form.formState.errors.phone && (
                <p className="text-xs text-red-500">{step1Form.formState.errors.phone.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Min 8 characters" {...step1Form.register("password")} />
                {step1Form.formState.errors.password && (
                  <p className="text-xs text-red-500">{step1Form.formState.errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Repeat password" {...step1Form.register("confirmPassword")} />
                {step1Form.formState.errors.confirmPassword && (
                  <p className="text-xs text-red-500">{step1Form.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" placeholder="Your Company Pvt Ltd" {...step2Form.register("businessName")} />
              {step2Form.formState.errors.businessName && (
                <p className="text-xs text-red-500">{step2Form.formState.errors.businessName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Business Category</Label>
              <Select onValueChange={(v) => step2Form.setValue("category", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {step2Form.formState.errors.category && (
                <p className="text-xs text-red-500">{step2Form.formState.errors.category.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Mumbai" {...step2Form.register("city")} />
                {step2Form.formState.errors.city && (
                  <p className="text-xs text-red-500">{step2Form.formState.errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Maharashtra" {...step2Form.register("state")} />
                {step2Form.formState.errors.state && (
                  <p className="text-xs text-red-500">{step2Form.formState.errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (optional)</Label>
              <Input id="website" type="url" placeholder="https://yourcompany.com" {...step2Form.register("website")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessDescription">Business Description</Label>
              <Textarea
                id="businessDescription"
                placeholder="Tell us about your business, products, and services..."
                rows={3}
                {...step2Form.register("businessDescription")}
              />
              {step2Form.formState.errors.businessDescription && (
                <p className="text-xs text-red-500">{step2Form.formState.errors.businessDescription.message}</p>
              )}
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={step2Form.formState.isSubmitting}>
                {step2Form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-nbn-teal hover:underline">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </FadeIn>
  );
}
