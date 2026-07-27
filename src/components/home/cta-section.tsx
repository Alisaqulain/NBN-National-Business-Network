"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/animations";

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="container-nbn relative z-10 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">Start Your Journey Today</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            Ready to Transform Your Business Network?
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            Join 20,000+ entrepreneurs who are already generating quality referrals and building lasting business relationships through NBN.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="group bg-white text-nbn-navy hover:bg-white/90">
                Join NBN Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/chapters">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Find a Chapter Near You
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
