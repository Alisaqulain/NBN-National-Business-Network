"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { EMERALD } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeading, FadeIn } from "@/components/shared/animations";

const HIGHLIGHTS = [
  "Application-based membership — no online payment",
  "One professional category per member",
  "Weekly structured networking meetings",
  "Referrals across Bangalore and India",
];

export function MembershipPreview() {
  return (
    <section className="section-padding premium-section relative">
      <div className="container-EBN">
        <SectionHeading
          badge="Emerald Chapter"
          title="Join Elite Explorers"
          subtitle={`Apply to the ${EMERALD.chapter} Chapter — membership is reviewed by our team, not purchased online.`}
        />

        <FadeIn>
          <GlassCard
            hover={false}
            className="mx-auto max-w-3xl border-EBN-teal/15 bg-gradient-to-br from-white to-EBN-teal/5 p-8 md:p-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-EBN-teal/20 bg-EBN-teal/5 px-4 py-2">
              <Sparkles className="h-4 w-4 text-EBN-teal" />
              <span className="text-sm font-medium text-EBN-navy">
                Launching {EMERALD.launchDateDisplay}
              </span>
            </div>

            <ul className="mb-8 space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-EBN-teal" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <Button className="group">
                  Apply to Join
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/emerald">
                <Button variant="outline">Explore Emerald Chapter</Button>
              </Link>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
