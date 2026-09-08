"use client";

import { EMERALD_WELCOME_POINTS } from "@/lib/constants";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { CheckCircle2 } from "lucide-react";

export function AboutCommunitySection() {
  return (
    <section id="about" className="section-padding premium-section-alt relative overflow-hidden">
      <div className="container-EBN">
        <SectionHeading
          badge="Our Community"
          title="Welcome to Emerald"
          subtitle="Emerald is a new chapter within the Elite Explorers business networking community — bringing together professionals from complementary industries to create meaningful relationships, quality referrals, and long-term growth opportunities."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {EMERALD_WELCOME_POINTS.map((point, i) => (
            <FadeIn key={point.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-EBN-teal/10">
                  <CheckCircle2 className="h-5 w-5 text-EBN-teal" />
                </div>
                <h3 className="mb-3 font-heading text-lg font-bold text-EBN-navy">{point.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{point.description}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
