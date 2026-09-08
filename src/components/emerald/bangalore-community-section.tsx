"use client";

import { EMERALD } from "@/lib/constants";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { Users } from "lucide-react";

export function BangaloreCommunitySection() {
  return (
    <section className="section-padding premium-section-alt">
      <div className="container-EBN">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              badge="Bangalore"
              title="100+ Professionals. One Powerful Business Community."
              subtitle={`The Bangalore ecosystem already has a strong base of ${EMERALD.bangaloreMembersLabel} professionals connected through Elite Explorers. Emerald is being launched to create another focused environment for business relationships, referrals, and collaborative growth within this thriving business community.`}
              centered={false}
            />
          </FadeIn>

          <FadeIn delay={0.15}>
            <GlassCard hover={false} className="p-10 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl gradient-bg shadow-lg shadow-EBN-teal/20">
                <Users className="h-10 w-10 text-white" />
              </div>
              <p className="font-heading text-5xl font-bold gradient-text">{EMERALD.bangaloreMembersLabel}</p>
              <p className="mt-2 text-lg font-medium text-EBN-navy">Bangalore Professionals</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                A established local network ready to welcome the Emerald Chapter launch on{" "}
                {EMERALD.launchDateDisplay}.
              </p>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
