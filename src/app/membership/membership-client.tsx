"use client";

import Link from "next/link";
import { ArrowRight, Check, Handshake, Users, Globe, ShieldCheck, Calendar, GraduationCap } from "lucide-react";
import { EMERALD, EMERALD_WHY_JOIN } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeading, FadeIn } from "@/components/shared/animations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const icons = { Handshake, Users, Globe, ShieldCheck, Calendar, GraduationCap };

const BENEFITS = [
  "Structured weekly chapter meetings",
  "Access to the member business directory",
  "Quality referral exchange with vetted professionals",
  "One category, one representative model",
  "Cross-industry connections across Bangalore and India",
  "Knowledge sharing, mentoring, and professional development",
];

const FAQ = [
  {
    q: "Is there an online payment or subscription on this website?",
    a: "No. Membership is by application and review only. Submit the due diligence form and our team will contact you regarding next steps.",
  },
  {
    q: "How do I apply to join Emerald?",
    a: "Complete the Applicant's Due Diligence Form. You can also browse open business categories and apply directly for an available category.",
  },
  {
    q: "Can I join if my category is already represented?",
    a: "Each professional category has one representative. If your category is open, you may apply. Browse the category directory on the Emerald page to check availability.",
  },
  {
    q: "When does the Emerald Chapter launch?",
    a: `The Emerald Chapter launches on ${EMERALD.launchDateDisplay}. Applications are being accepted now for review.`,
  },
];

export default function MembershipPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-EBN-light to-white" />
        <div className="container-EBN relative">
          <SectionHeading
            badge="Emerald Chapter"
            title="Apply to Join Elite Explorers"
            subtitle={`Membership is by application and review — not online payment. Tell us about your business and how you can contribute to the ${EMERALD.chapter} Chapter.`}
          />
        </div>
      </section>

      <section id="benefits" className="pb-20">
        <div className="container-EBN">
          <FadeIn>
            <GlassCard hover={false} className="mb-12 border-EBN-teal/15 bg-EBN-teal/5 p-8 text-center">
              <p className="text-lg font-medium text-EBN-navy">
                {EMERALD.networkSizeLabel} professionals across India · {EMERALD.bangaloreMembersLabel} in Bangalore
              </p>
              <p className="mt-2 text-muted">Launching {EMERALD.launchDateDisplay}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link href="/apply">
                  <Button size="lg" className="group">
                    Apply to Join
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/emerald#directory">
                  <Button size="lg" variant="outline">View Open Categories</Button>
                </Link>
              </div>
            </GlassCard>
          </FadeIn>

          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {EMERALD_WHY_JOIN.map((item, i) => {
              const Icon = icons[item.icon as keyof typeof icons] ?? Handshake;
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <GlassCard className="h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-bg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-EBN-navy">{item.title}</h3>
                    <p className="text-sm text-muted">{item.description}</p>
                  </GlassCard>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn>
            <h3 className="mb-6 text-center font-heading text-2xl font-bold text-EBN-navy">
              What Membership Includes
            </h3>
            <GlassCard hover={false} className="mx-auto max-w-2xl p-8">
              <ul className="space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-EBN-teal" />
                    {b}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeIn>

          <FadeIn className="mt-16">
            <h3 className="mb-8 text-center font-heading text-2xl font-bold text-EBN-navy">FAQ</h3>
            <Accordion type="single" collapsible className="mx-auto max-w-2xl">
              {FAQ.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-medium text-EBN-navy">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>

          <FadeIn className="mt-16 text-center">
            <Link href="/apply">
              <Button size="lg" className="group">
                Start Your Application
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
