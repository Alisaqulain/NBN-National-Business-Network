"use client";

import { AnimatedCounter, FadeIn } from "@/components/shared/animations";

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
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-95" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="container-nbn relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Numbers That Speak
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Real impact from real connections across India&apos;s business landscape.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {EXTENDED_STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix ?? ""}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-sm text-white/70 font-medium">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
