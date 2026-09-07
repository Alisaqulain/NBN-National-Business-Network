"use client";

import { AnimatedCounter, FadeIn, GlassCard } from "@/components/shared/animations";

const EXTENDED_STATS = [
  { label: "Countries", value: 1, suffix: "" },
  { label: "Cities", value: 100, suffix: "+" },
  { label: "Members", value: 20000, suffix: "+" },
  { label: "Business Generated", value: 500, prefix: "₹", suffix: "Cr+" },
  { label: "Meetings Held", value: 50000, suffix: "+" },
  { label: "Referral Value", value: 2500, prefix: "₹", suffix: "Cr+" },
];

export function StatsSection() {
  return (
    <section className="section-padding premium-section-alt relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(22,153,154,0.08),transparent_55%)]" />

      <div className="container-EBN relative z-10">
        <FadeIn className="mb-16 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-EBN-navy md:text-4xl">
            Numbers That Speak
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Real impact from real connections across India&apos;s business landscape.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-6">
          {EXTENDED_STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <GlassCard hover={false} className="text-center">
                <p className="mb-2 font-heading text-2xl font-bold gradient-text md:text-3xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix ?? ""}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-sm font-medium text-muted">{stat.label}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
