"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { EMERALD } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { FadeIn, GlassCard } from "@/components/shared/animations";

export function EmeraldLaunchCTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-EBN-light/40 to-white" />
      <div className="container-EBN relative z-10">
        <FadeIn>
          <GlassCard
            hover={false}
            className="mx-auto max-w-4xl border-EBN-teal/10 bg-gradient-to-br from-white via-white to-EBN-teal/5 p-10 text-center md:p-14"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-EBN-teal/20 bg-EBN-teal/5 px-4 py-2">
              <Sparkles className="h-4 w-4 text-EBN-teal" />
              <span className="text-sm font-medium text-EBN-navy">
                Launching {EMERALD.launchDateDisplay}
              </span>
            </div>
            <h2 className="mx-auto mb-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-EBN-navy md:text-4xl">
              Be Part of the Emerald Launch
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted">
              Join a growing network of professionals and businesses building meaningful connections across
              Bangalore and India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <Button size="lg" className="group">
                  Apply for Emerald
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline">
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
