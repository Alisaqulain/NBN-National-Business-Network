"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { FadeIn, GlassCard } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { useAuthStore } from "@/store/auth-store";
import type { ApiResponse, User } from "@/types";

const OTP_LENGTH = 6;

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const type = searchParams.get("type") ?? "verify";
  const setAuth = useAuthStore((s) => s.setAuth);

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) {
      toast.error("Please enter the complete verification code");
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint = type === "reset" ? "/auth/verify-reset-otp" : "/auth/verify-otp";
      const res = await api.post<ApiResponse<{ user: User; token: string }>>(endpoint, {
        email,
        otp: code,
      });

      if (type === "reset") {
        toast.success("Code verified! Set your new password.");
        router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${code}`);
      } else {
        setAuth(res.data.data.user, res.data.data.token);
        toast.success("Email verified successfully!");
        router.push("/dashboard");
      }
    } catch {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      await api.post("/auth/resend-otp", { email });
      setCountdown(60);
      toast.success("New code sent to your email");
    } catch {
      toast.error("Failed to resend code");
    }
  };

  return (
    <FadeIn className="w-full max-w-md">
      <GlassCard hover={false} className="p-8">
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-EBN-navy/10 to-EBN-teal/10">
            <ShieldCheck className="h-7 w-7 text-EBN-teal" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="font-heading text-2xl font-bold text-EBN-navy">Verify Your Email</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-EBN-navy">{email || "your email"}</span>
          </p>
        </div>

        <div className="mb-8 flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-14 w-12 text-center text-xl font-bold"
            />
          ))}
        </div>

        <Button
          onClick={handleVerify}
          className="w-full"
          disabled={isSubmitting || otp.join("").length !== OTP_LENGTH}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          {countdown > 0 ? (
            <span>Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-EBN-teal hover:underline"
            >
              Resend code
            </button>
          )}
        </p>
      </GlassCard>
    </FadeIn>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full max-w-md items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-EBN-teal" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
