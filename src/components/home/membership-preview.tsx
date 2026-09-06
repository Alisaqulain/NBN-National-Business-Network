"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeading, FadeIn } from "@/components/shared/animations";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function MembershipPreview() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="section-padding relative">
      <div className="container-EBN">
        <SectionHeading
          badge="Membership"
          title="Choose Your Plan"
          subtitle="Flexible plans designed for every stage of your business journey."
        />

        <FadeIn className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full glass dark:glass-dark">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all",
                !yearly ? "gradient-bg text-white shadow-lg" : "text-muted"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all",
                yearly ? "gradient-bg text-white shadow-lg" : "text-muted"
              )}
            >
              Yearly <span className="text-xs opacity-80">Save 17%</span>
            </button>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERSHIP_PLANS.map((plan, i) => (
            <FadeIn key={plan.id} delay={i * 0.1}>
              <GlassCard
                className={cn(
                  "h-full flex flex-col relative",
                  "popular" in plan && plan.popular && "ring-2 ring-EBN-teal"
                )}
              >
                {"popular" in plan && plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold gradient-bg text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-heading font-bold text-EBN-navy dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-heading font-bold gradient-text">
                    {formatCurrency(yearly ? plan.yearly : plan.monthly)}
                  </span>
                  <span className="text-muted text-sm">/{yearly ? "year" : "month"}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="w-4 h-4 text-EBN-teal shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/signup?plan=${plan.id}`}>
                  <Button className="w-full group" variant={"popular" in plan && plan.popular ? "default" : "secondary"}>
                    Join Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-10">
          <Link href="/membership" className="text-EBN-teal font-semibold hover:underline inline-flex items-center gap-2">
            Compare all plans in detail <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
