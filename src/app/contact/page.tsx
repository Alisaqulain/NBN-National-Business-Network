import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FadeIn,
  GlassCard,
  SectionHeading,
} from "@/components/shared/animations";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Entrepreneur Business Network. Reach our team for membership inquiries, chapter visits, partnerships, or general support.",
};

const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 1800-123-4567 (Toll Free)", "+91 80 4567 8900"],
    href: "tel:+9118001234567",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@ebn.in", "support@ebn.in"],
    href: "mailto:hello@ebn.in",
  },
  {
    icon: MapPin,
    title: "Head Office",
    lines: [
      "EBN House, 42 MG Road",
      "Bengaluru, Karnataka 560001",
      "India",
    ],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Mon – Fri: 9:00 AM – 6:00 PM IST", "Sat: 10:00 AM – 2:00 PM IST"],
  },
] as const;

const FAQ = [
  {
    q: "How quickly will I receive a response?",
    a: "Our team responds to all inquiries within 24 business hours. Urgent membership or chapter-related queries are typically answered within 4 hours during business hours.",
  },
  {
    q: "Can I schedule a chapter visit through this form?",
    a: "Yes. Select 'Chapter Visit' as your subject and mention your preferred city and date. A local chapter director will contact you to arrange your guest visit.",
  },
  {
    q: "Do you have regional offices?",
    a: "Yes. EBN has regional offices in Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, and Ahmedabad. All regional inquiries are routed to the appropriate team automatically.",
  },
  {
    q: "How do I report a technical issue with the member portal?",
    a: "Email support@ebn.in with your member ID and a description of the issue. Our tech team resolves most portal issues within one business day.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-EBN-light via-white to-EBN-teal/5 dark:from-EBN-dark dark:via-EBN-dark dark:to-EBN-navy/20" />
        <div className="container-EBN relative z-10">
          <FadeIn>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-EBN-teal/10 text-EBN-teal border border-EBN-teal/20">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-EBN-navy dark:text-white mb-6 max-w-4xl leading-tight">
              We&apos;d Love to{" "}
              <span className="gradient-text">Hear From You</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              Whether you&apos;re exploring membership, planning a chapter visit, or
              exploring a partnership — the {BRAND.shortName} team is here to help.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding">
        <div className="container-EBN">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {CONTACT_INFO.map((info, i) => (
                <FadeIn key={info.title} delay={i * 0.08}>
                  <GlassCard hover={false} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-EBN-navy dark:text-white mb-1">
                        {info.title}
                      </h3>
                      {info.lines.map((line) => (
                        <p key={line} className="text-sm text-muted">
                          {"href" in info ? (
                            <a href={info.href} className="hover:text-EBN-teal transition-colors">
                              {line}
                            </a>
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </div>
                  </GlassCard>
                </FadeIn>
              ))}
            </div>

            <div className="lg:col-span-3">
              <FadeIn delay={0.2}>
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="section-padding bg-EBN-light dark:bg-EBN-dark/50 pt-0">
        <div className="container-EBN">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-96 glass dark:glass-dark">
              <div className="absolute inset-0 bg-gradient-to-br from-EBN-navy/10 to-EBN-teal/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-12 h-12 text-EBN-teal mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold text-EBN-navy dark:text-white mb-2">
                    EBN House, Bengaluru
                  </h3>
                  <p className="text-muted text-sm max-w-md">
                    42 MG Road, Bengaluru, Karnataka 560001 — Visit us by appointment
                    Monday through Saturday.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#143055" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <circle cx="400" cy="200" r="80" fill="none" stroke="#16999A" strokeWidth="2" opacity="0.5" />
                  <circle cx="400" cy="200" r="8" fill="#16999A" />
                </svg>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-EBN max-w-3xl">
          <SectionHeading
            badge="FAQ"
            title="Contact & Support FAQ"
            subtitle="Quick answers before you reach out."
          />
          <FadeIn>
            <GlassCard hover={false}>
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((item, i) => (
                  <AccordionItem key={item.q} value={`faq-${i}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="container-EBN relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Prefer to Explore on Your Own?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Browse membership plans, find a chapter near you, or read success stories
              from members like you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/membership">
                <Button size="lg" variant="secondary" className="bg-white text-EBN-navy hover:bg-white/90">
                  View Plans
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/chapters">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Find a Chapter
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
