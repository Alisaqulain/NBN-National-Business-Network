"use client";

import { EMERALD, EMERALD_STATS } from "@/lib/constants";
import { AnimatedCounter, FadeIn, SectionHeading } from "@/components/shared/animations";

export function IndiaNetworkSection() {
  return (
    <section className="section-padding premium-section">
      <div className="container-EBN">
        <SectionHeading
          badge="National Reach"
          title="A Growing Network Across India"
          subtitle={`${EMERALD.networkSizeLabel} professionals are part of the wider Elite Explorers network across India. Emerald provides an opportunity to connect with professionals beyond a single local market — expanding your business relationships across regions and industries.`}
        />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {EMERALD_STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="glass rounded-2xl p-6 text-center">
                <p className="font-heading text-3xl font-bold gradient-text md:text-4xl">
                  {"display" in stat && stat.display ? (
                    stat.display
                  ) : (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
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
