"use client";

import { EMERALD } from "@/lib/constants";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";

export function WelcomeEmeraldSection() {
  return (
    <section id="about" className="section-padding premium-section-alt relative overflow-hidden">
      <div className="container-EBN">
        <SectionHeading
          badge="Emerald Chapter"
          title="Welcome to Emerald"
          subtitle={`Emerald is a Bangalore chapter of the ${EMERALD.community} professional business network. Our purpose is to create meaningful professional relationships, referrals, partnerships, business opportunities and knowledge-sharing between complementary businesses — building a premium, trustworthy community for entrepreneurs and business owners.`}
        />

        <FadeIn>
          <GlassCard hover={false} className="mx-auto max-w-4xl border-EBN-teal/15 bg-gradient-to-br from-white to-EBN-teal/5 p-8 text-center md:p-10">
            <p className="text-lg leading-relaxed text-muted">
              Each member represents a distinct professional category, ensuring focused representation,
              stronger referral opportunities, and meaningful collaboration across industries.
            </p>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
