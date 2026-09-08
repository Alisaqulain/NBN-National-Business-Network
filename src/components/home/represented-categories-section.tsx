"use client";

import { REPRESENTED_CATEGORIES, EMERALD_MEMBERS } from "@/lib/constants";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { Lock } from "lucide-react";

export function RepresentedCategoriesSection() {
  return (
    <section className="section-padding premium-section">
      <div className="container-EBN">
        <SectionHeading
          badge="Membership Status"
          title="Already Represented Categories"
          subtitle="These business specialties already have an active member representing the category within the Emerald community."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REPRESENTED_CATEGORIES.map((category, i) => (
            <FadeIn key={category.name} delay={i * 0.06}>
              <GlassCard hover={false} className="border-slate-200/80 bg-slate-50/80">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200/80">
                    <Lock className="h-4 w-4 text-slate-500" />
                  </div>
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-slate-200/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                      Already Represented
                    </span>
                    <h3 className="font-heading text-base font-bold text-EBN-navy/80">{category.name}</h3>
                    {category.memberId && (
                      <p className="mt-1 text-xs text-muted">
                        Represented by {EMERALD_MEMBERS.find((m) => m.id === category.memberId)?.name}
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
