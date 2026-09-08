"use client";

import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { Shield, Users } from "lucide-react";

export function CategorySystemSection() {
  return (
    <section className="section-padding premium-section">
      <div className="container-EBN">
        <SectionHeading
          badge="Category Model"
          title="One Category. One Representative. Stronger Opportunities."
          subtitle="Selected business categories are represented individually within Emerald to encourage collaboration, reduce unnecessary direct competition, and create stronger referral opportunities for every member."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <GlassCard className="h-full border-EBN-teal/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-EBN-teal/10">
                <Shield className="h-6 w-6 text-EBN-teal" />
              </div>
              <span className="mb-3 inline-block rounded-full bg-EBN-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-EBN-teal">
                Available
              </span>
              <h3 className="mb-3 font-heading text-xl font-bold text-EBN-navy">Open Categories</h3>
              <p className="text-sm leading-relaxed text-muted">
                Categories without a current representative are open for qualified professionals who can
                contribute meaningfully to the community and uphold the chapter&apos;s standards of engagement.
              </p>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.1}>
            <GlassCard hover={false} className="h-full border-slate-200/80 bg-slate-50/80">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200/80">
                <Users className="h-6 w-6 text-slate-500" />
              </div>
              <span className="mb-3 inline-block rounded-full bg-slate-200/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Already Represented
              </span>
              <h3 className="mb-3 font-heading text-xl font-bold text-EBN-navy/80">Represented Categories</h3>
              <p className="text-sm leading-relaxed text-muted">
                Categories with an active member representative are protected to ensure each specialty has a
                dedicated voice within the chapter and referral opportunities remain clear and valuable.
              </p>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
