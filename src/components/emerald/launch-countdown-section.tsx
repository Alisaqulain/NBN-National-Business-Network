"use client";

import { useEffect, useState } from "react";
import { EMERALD } from "@/lib/constants";
import { FadeIn, SectionHeading } from "@/components/shared/animations";
import { CountdownTimer } from "@/components/shared/countdown-timer";

function isLaunchPast(targetDate: string): boolean {
  return new Date(targetDate).getTime() <= Date.now();
}

export function LaunchCountdownSection() {
  const [launched, setLaunched] = useState(() => isLaunchPast(EMERALD.launchDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setLaunched(isLaunchPast(EMERALD.launchDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding premium-section">
      <div className="container-EBN">
        <FadeIn>
          <SectionHeading
            badge="Launch"
            title="Emerald Chapter Launch"
            subtitle={EMERALD.launchDateDisplay}
          />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mx-auto max-w-2xl text-center">
            {launched ? (
              <div className="glass rounded-2xl p-10">
                <p className="font-heading text-2xl font-bold text-EBN-navy md:text-3xl">
                  Emerald Chapter is now live.
                </p>
              </div>
            ) : (
              <CountdownTimer targetDate={EMERALD.launchDate} />
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
