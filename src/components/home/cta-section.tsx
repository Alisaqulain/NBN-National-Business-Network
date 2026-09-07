"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, GlassCard } from "@/components/shared/animations";

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-EBN-light/40 to-white" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-EBN-teal/5 blur-3xl" />

      <div className="container-EBN relative z-10">
        <FadeIn>
          <GlassCard hover={false} className="mx-auto max-w-4xl border-EBN-teal/10 bg-gradient-to-br from-white via-white to-EBN-teal/5 p-10 text-center md:p-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-EBN-teal/20 bg-EBN-teal/5 px-4 py-2">
              <Sparkles className="h-4 w-4 text-EBN-teal" />
              <span className="text-sm font-medium text-EBN-navy">Start Your Journey Today</span>
            </div>
            <h2 className="mx-auto mb-6 max-w-3xl font-heading text-3xl font-bold leading-tight text-EBN-navy md:text-5xl">
              Ready to Transform Your Business Network?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted">
              Join 20,000+ entrepreneurs who are already generating quality referrals and building lasting business relationships through EBN.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="group">
                  Join EBN Today
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/chapters">
                <Button size="lg" variant="outline">
                  Find a Chapter Near You
                </Button>
              </Link>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
