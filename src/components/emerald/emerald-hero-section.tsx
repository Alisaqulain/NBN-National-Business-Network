"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, Users, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter, FadeIn } from "@/components/shared/animations";
import { EMERALD } from "@/lib/constants";

export function EmeraldHeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-16 sm:min-h-[90vh] sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-EBN-light/30 to-EBN-teal/5 dark:from-slate-950 dark:via-slate-900 dark:to-EBN-navy/20" />
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-EBN-navy/[0.03] via-transparent to-EBN-teal/[0.06] dark:from-EBN-teal/[0.06] dark:to-transparent" />

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-EBN-teal/20"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <div className="container-EBN relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2">
              <Sparkles className="h-4 w-4 text-EBN-teal" />
              <span className="text-sm font-medium text-EBN-navy dark:text-slate-100">
                {EMERALD.community} · {EMERALD.chapter} Chapter
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-EBN-teal">
              Emerald Chapter
            </p>
            <h1 className="mb-6 font-heading text-3xl font-bold leading-[1.15] text-EBN-navy dark:text-slate-100 sm:text-4xl sm:leading-[1.1] lg:text-6xl">
              Building Business Relationships.{" "}
              <span className="gradient-text">Creating Real Opportunities.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
              {EMERALD.community} is a growing professional business network connecting entrepreneurs,
              founders, professionals and business owners across India.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mb-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {[
                { icon: Globe, value: EMERALD.networkSize, suffix: "+", label: "Professionals Across India" },
                { icon: Users, value: EMERALD.bangaloreMembers, suffix: "+", label: "Professionals in Bangalore" },
                { icon: Calendar, value: 0, suffix: "", label: "Emerald Chapter Launch", display: EMERALD.launchDateDisplay },
                { icon: Shield, value: 0, suffix: "", label: "Focused Representation", display: "One Professional Category" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-4 shadow-lg sm:p-6">
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-EBN-teal sm:mb-3 sm:h-6 sm:w-6" />
                  <p className="font-heading text-base font-bold gradient-text sm:text-xl md:text-2xl">
                    {"display" in stat && stat.display ? (
                      stat.display
                    ) : (
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    )}
                  </p>
                  <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <Link href="/apply" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto">
                  Apply to Join
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#directory" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">View Categories</Button>
              </Link>
              <Link href="#contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">Contact Emerald Team</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
