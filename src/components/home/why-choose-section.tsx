"use client";

import {
  Handshake, Calendar, GraduationCap, Award, Globe, ShieldCheck,
} from "lucide-react";
import { WHY_CHOOSE } from "@/lib/constants";
import { GlassCard, SectionHeading, FadeIn } from "@/components/shared/animations";

const icons = { Handshake, Calendar, GraduationCap, Award, Globe, ShieldCheck };

export function WhyChooseSection() {
  return (
    <section className="section-padding bg-EBN-light dark:bg-EBN-dark/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-EBN-teal/5 rounded-full blur-3xl" />
      <div className="container-EBN relative">
        <SectionHeading
          badge="Why EBN"
          title="The Network That Works"
          subtitle="Structured networking designed for serious business professionals who want measurable results."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <GlassCard className="h-full group cursor-default">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-EBN-navy dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
