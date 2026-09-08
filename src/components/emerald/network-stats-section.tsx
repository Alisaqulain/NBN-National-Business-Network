"use client";

import { EMERALD } from "@/lib/constants";
import { AnimatedCounter, FadeIn, SectionHeading } from "@/components/shared/animations";
import { Calendar, Globe, Shield, Users } from "lucide-react";

const STATS = [
  { icon: Globe, value: EMERALD.networkSize, suffix: "+", label: "Professionals Across India" },
  { icon: Users, value: EMERALD.bangaloreMembers, suffix: "+", label: "Bangalore Network" },
  { icon: Calendar, display: EMERALD.launchDateDisplay, label: "Emerald Chapter Launch" },
  { icon: Shield, display: "One Professional Category", label: "Focused Representation" },
];

export function NetworkStatsSection() {
  return (
    <section className="section-padding premium-section">
      <div className="container-EBN">
        <SectionHeading
          badge="Network"
          title="A Premium Business Network"
          subtitle={`${EMERALD.networkSizeLabel} professionals across India. ${EMERALD.bangaloreMembersLabel} in Bangalore. Launching ${EMERALD.launchDateDisplay}.`}
        />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="glass rounded-2xl p-6 text-center">
                <stat.icon className="mx-auto mb-3 h-6 w-6 text-EBN-teal" />
                <p className="font-heading text-2xl font-bold gradient-text md:text-3xl">
                  {"display" in stat && stat.display ? (
                    stat.display
                  ) : (
                    <AnimatedCounter value={stat.value!} suffix={stat.suffix} />
                  )}
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
