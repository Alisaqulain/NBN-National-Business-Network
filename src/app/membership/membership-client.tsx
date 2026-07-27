"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, X } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeading, FadeIn, AnimatedCounter } from "@/components/shared/animations";
import { formatCurrency, cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const COMPARISON_FEATURES = [
  { name: "Chapter Access", individual: "1", professional: "2", corporate: "5", enterprise: "Unlimited" },
  { name: "Weekly Meetings", individual: true, professional: true, corporate: true, enterprise: true },
  { name: "Member Directory", individual: true, professional: true, corporate: true, enterprise: true },
  { name: "Referral Tracking", individual: "Basic", professional: "Advanced", corporate: "Advanced", enterprise: "Premium" },
  { name: "Event Discounts", individual: false, professional: true, corporate: true, enterprise: true },
  { name: "Business Templates", individual: false, professional: true, corporate: true, enterprise: true },
  { name: "Team Members", individual: "1", professional: "1", corporate: "5", enterprise: "Unlimited" },
  { name: "Dedicated Manager", individual: false, professional: false, corporate: true, enterprise: true },
  { name: "API Access", individual: false, professional: false, corporate: true, enterprise: true },
  { name: "White-label Portal", individual: false, professional: false, corporate: false, enterprise: true },
];

const FAQ = [
  { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle." },
  { q: "Is there a free trial?", a: "We offer a 14-day money-back guarantee on all plans. Attend your first chapter meeting risk-free." },
  { q: "Can I join multiple chapters?", a: "Individual members get 1 chapter. Professional gets 2, Corporate gets 5, and Enterprise gets unlimited chapter access." },
  { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, UPI, net banking, and wallets through Razorpay. GST invoices are provided." },
];

export default function MembershipPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nbn-light to-white dark:from-nbn-dark dark:to-nbn-navy/20" />
        <div className="container-nbn relative">
          <SectionHeading badge="Membership" title="Invest in Your Network" subtitle="Choose the plan that fits your business ambitions." />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-nbn">
          <FadeIn className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 p-1.5 rounded-full glass dark:glass-dark">
              <button onClick={() => setYearly(false)} className={cn("px-6 py-2 rounded-full text-sm font-semibold transition-all", !yearly ? "gradient-bg text-white shadow-lg" : "text-muted")}>Monthly</button>
              <button onClick={() => setYearly(true)} className={cn("px-6 py-2 rounded-full text-sm font-semibold transition-all", yearly ? "gradient-bg text-white shadow-lg" : "text-muted")}>Yearly <span className="text-xs opacity-80">Save 17%</span></button>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {MEMBERSHIP_PLANS.map((plan, i) => (
              <FadeIn key={plan.id} delay={i * 0.1}>
                <GlassCard className={cn("h-full flex flex-col relative", "popular" in plan && plan.popular && "ring-2 ring-nbn-teal")}>
                  {"popular" in plan && plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold gradient-bg text-white">Most Popular</span>
                  )}
                  <h3 className="text-xl font-heading font-bold text-nbn-navy dark:text-white mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-heading font-bold gradient-text">{formatCurrency(yearly ? plan.yearly : plan.monthly)}</span>
                    <span className="text-muted text-sm">/{yearly ? "year" : "month"}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted"><Check className="w-4 h-4 text-nbn-teal shrink-0 mt-0.5" />{f}</li>
                    ))}
                  </ul>
                  <Link href={`/signup?plan=${plan.id}`}><Button className="w-full">Join Now</Button></Link>
                </GlassCard>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h3 className="text-2xl font-heading font-bold text-center text-nbn-navy dark:text-white mb-8">Plan Comparison</h3>
            <div className="overflow-x-auto rounded-2xl glass dark:glass-dark">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-nbn-navy/10">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    {MEMBERSHIP_PLANS.map((p) => (<th key={p.id} className="p-4 font-semibold">{p.name}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((row) => (
                    <tr key={row.name} className="border-b border-nbn-navy/5">
                      <td className="p-4 text-muted">{row.name}</td>
                      {(["individual", "professional", "corporate", "enterprise"] as const).map((plan) => {
                        const val = row[plan];
                        return (
                          <td key={plan} className="p-4 text-center">
                            {typeof val === "boolean" ? (val ? <Check className="w-5 h-5 text-nbn-teal mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />) : val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="benefits" className="section-padding bg-nbn-light dark:bg-nbn-dark/50">
        <div className="container-nbn">
          <SectionHeading badge="Benefits" title="What You Get" subtitle="Every membership includes access to our complete networking ecosystem." />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Quality Referrals", desc: "Receive pre-qualified business referrals from verified professionals.", stat: 2400000 },
              { title: "Weekly Meetings", desc: "Structured chapter meetings every week.", stat: 52 },
              { title: "Business Education", desc: "Workshops, webinars, and training programs.", stat: 100 },
            ].map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.1}>
                <GlassCard>
                  <p className="text-3xl font-heading font-bold gradient-text mb-2"><AnimatedCounter value={b.stat} suffix="+" /></p>
                  <h4 className="font-heading font-bold text-nbn-navy dark:text-white mb-2">{b.title}</h4>
                  <p className="text-muted text-sm">{b.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-nbn max-w-3xl">
          <SectionHeading title="Frequently Asked Questions" />
          <Accordion type="single" collapsible>
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-padding gradient-bg text-center">
        <FadeIn>
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Ready to Join?</h2>
          <Link href="/signup"><Button size="lg" variant="secondary" className="bg-white text-nbn-navy">Get Started <ArrowRight className="w-4 h-4" /></Button></Link>
        </FadeIn>
      </section>
    </>
  );
}
