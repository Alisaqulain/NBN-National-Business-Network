"use client";

import {
  Handshake, GraduationCap, Globe, Share2, TrendingUp, Users,
} from "lucide-react";
import { EMERALD_WHY_JOIN } from "@/lib/constants";
import { GlassCard, SectionHeading, FadeIn } from "@/components/shared/animations";

const icons = {
  Handshake,
  GraduationCap,
  Globe,
  Share2,
  TrendingUp,
  Users,
};

export function WhyJoinSection() {
  return (
    <section className="section-padding premium-section">
      <div className="container-EBN">
        <SectionHeading
          badge="Member Benefits"
          title="Why Join Emerald?"
          subtitle="A professional community built for business owners who value quality introductions, strategic partnerships, and long-term commercial relationships."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EMERALD_WHY_JOIN.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Handshake;
            return (
              <FadeIn key={item.title} delay={i * 0.08}>
                <GlassCard className="h-full">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg shadow-lg shadow-EBN-teal/20">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-heading font-bold text-EBN-navy">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
