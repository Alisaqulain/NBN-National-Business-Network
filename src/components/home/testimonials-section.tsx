"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeading, FadeIn } from "@/components/shared/animations";

const TESTIMONIALS = [
  {
    name: "Rajesh Mehta",
    business: "Mehta Constructions",
    category: "Construction",
    quote: "EBN transformed my business. In just 18 months, I received referrals worth ₹2.4 crore. The structured approach to networking is unmatched.",
    growthBefore: "₹1.2Cr",
    growthAfter: "₹3.6Cr",
    revenueIncrease: "+200%",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Priya Sharma",
    business: "TechVision Solutions",
    category: "IT & Technology",
    quote: "The quality of referrals through EBN is exceptional. Every connection has been genuine and has led to real business opportunities.",
    growthBefore: "₹45L",
    growthAfter: "₹1.8Cr",
    revenueIncrease: "+300%",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Amit Patel",
    business: "Patel Financial Services",
    category: "Finance",
    quote: "Being part of EBN gave me access to a network I could never build alone. My client base grew 4x in two years through trusted referrals.",
    growthBefore: "₹80L",
    growthAfter: "₹3.2Cr",
    revenueIncrease: "+400%",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding premium-section-alt">
      <div className="container-EBN">
        <SectionHeading
          badge="Success Stories"
          title="Real Results, Real People"
          subtitle="Hear from entrepreneurs who transformed their businesses through EBN networking."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <GlassCard className="h-full flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover ring-2 ring-EBN-teal/30"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-EBN-navy dark:text-white">{t.name}</h4>
                    <p className="text-sm text-muted">{t.business}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-EBN-teal text-EBN-teal" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-muted leading-relaxed mb-6 flex-1 italic">&ldquo;{t.quote}&rdquo;</p>

                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-EBN-navy/5 dark:bg-white/5">
                  <div className="text-center">
                    <p className="text-xs text-muted mb-1">Before</p>
                    <p className="font-bold text-EBN-navy dark:text-white text-sm">{t.growthBefore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted mb-1">After</p>
                    <p className="font-bold text-EBN-teal text-sm">{t.growthAfter}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted mb-1">Growth</p>
                    <p className="font-bold text-green-600 text-sm">{t.revenueIncrease}</p>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/success-stories">
            <Button variant="secondary" size="lg" className="group">
              View All Stories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            <Play className="w-4 h-4 fill-current" />
            Watch Testimonials
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
