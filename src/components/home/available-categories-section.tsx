"use client";

import Link from "next/link";
import { AVAILABLE_CATEGORIES } from "@/lib/constants";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AvailableCategoriesSection() {
  return (
    <section id="categories" className="section-padding premium-section-alt relative overflow-hidden">
      <div className="container-EBN">
        <SectionHeading
          badge="Open Opportunities"
          title="Open Business Categories"
          subtitle="These categories are currently available for qualified professionals ready to contribute to and benefit from the Emerald community."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AVAILABLE_CATEGORIES.slice(0, 12).map((category, i) => (
            <FadeIn key={category.id} delay={i * 0.04}>
              <GlassCard className="group h-full">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-EBN-teal/20 bg-EBN-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-EBN-teal">
                    <Sparkles className="h-3 w-3" />
                    Open
                  </span>
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-EBN-navy transition-colors group-hover:text-EBN-teal">
                  {category.name}
                </h3>
                <p className="text-xs text-muted">{category.industry}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <Link href="/emerald#open-categories">
            <Button size="lg" variant="outline" className="mr-4">
              View All Categories
            </Button>
          </Link>
          <Link href="/apply">
            <Button size="lg" className="group">
              Apply for an Open Category
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
