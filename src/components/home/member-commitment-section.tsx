"use client";

import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { Check } from "lucide-react";

const COMMITMENTS = [
  "Attend weekly chapter meetings consistently or arrange a qualified substitute.",
  "Participate actively in referral exchanges and one-to-one member meetings.",
  "Uphold professional standards and represent your category with integrity.",
  "Contribute to the community through knowledge sharing and collaboration.",
  "Support fellow members by providing quality introductions when appropriate.",
];

export function MemberCommitmentSection() {
  return (
    <section className="section-padding premium-section-alt">
      <div className="container-EBN">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <FadeIn>
            <SectionHeading
              badge="Expectations"
              title="Member Participation & Commitment"
              subtitle="Successful membership is built on consistent engagement, professional accountability, and a genuine commitment to the community's shared success."
              centered={false}
            />
            <GlassCard hover={false} className="mt-6 border-EBN-teal/15 bg-EBN-teal/5">
              <p className="text-sm font-medium leading-relaxed text-EBN-navy">
                Consistent participation is important for maintaining a strong and productive business community.
              </p>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.15}>
            <GlassCard hover={false} className="p-8">
              <ul className="space-y-4">
                {COMMITMENTS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-EBN-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
