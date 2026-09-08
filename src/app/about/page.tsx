import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Heart,
  Lightbulb,
  Shield,
  Target,
  Users,
  Handshake,
} from "lucide-react";
import { BRAND, STATS } from "@/lib/constants";
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

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Entrepreneur Business Network — our mission, leadership team, journey, and commitment to helping Indian entrepreneurs grow through trusted referrals.",
};

const VALUES = [
  {
    icon: Handshake,
    title: "Givers Gain",
    description:
      "We believe in the philosophy that by giving business to others, we receive business in return. Generosity drives sustainable growth.",
  },
  {
    icon: Shield,
    title: "Integrity First",
    description:
      "Every member is verified. We maintain the highest standards of trust, transparency, and ethical business conduct across all chapters.",
  },
  {
    icon: Users,
    title: "Relationship Capital",
    description:
      "We invest in genuine, long-term professional relationships — not transactional networking. People buy from people they know and trust.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Growth",
    description:
      "From weekly education slots to leadership tracks, we equip members with skills, mindset, and tools to scale their businesses.",
  },
  {
    icon: Target,
    title: "Accountability",
    description:
      "Structured meetings, referral tracking, and chapter leadership ensure members stay committed to delivering results for one another.",
  },
  {
    icon: Heart,
    title: "Community Impact",
    description:
      "Beyond business, EBN chapters contribute to local communities through CSR initiatives, mentorship, and social enterprise support.",
  },
] as const;

const LEADERSHIP = [
  {
    name: "Rajesh Mehta",
    role: "Founder & CEO",
    bio: "Serial entrepreneur with 25+ years in B2B networking. Rajesh founded EBN in 2010 with a vision to democratise quality business referrals across India.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Priya Sharma",
    role: "Chief Operating Officer",
    bio: "Former McKinsey consultant who scaled EBN operations from 50 to 500+ chapters. Priya oversees chapter excellence and member experience nationwide.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Amit Patel",
    role: "Chief Technology Officer",
    bio: "Ex-Google engineer leading EBN's digital platform — member portal, referral analytics, and AI-powered business matching across 100+ cities.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Sneha Reddy",
    role: "VP, Member Success",
    bio: "Passionate about member outcomes, Sneha has helped 3,000+ entrepreneurs achieve measurable ROI within their first year of membership.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Vikram Singh",
    role: "Director, Regional Expansion",
    bio: "Architect of EBN's tier-2 and tier-3 city strategy. Vikram has opened 200+ chapters in emerging markets from Jaipur to Coimbatore.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Ananya Iyer",
    role: "Head of Training & Education",
    bio: "Corporate trainer turned networking educator. Ananya designs EBN's flagship programs on sales, leadership, and referral mastery.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8cd5?w=400&h=400&fit=crop&crop=face",
  },
] as const;

const TIMELINE = [
  {
    year: "2010",
    title: "EBN Founded in Mumbai",
    description:
      "Rajesh Mehta launches the first EBN chapter with 12 members in Bandra, Mumbai — focused on structured referral networking for SMEs.",
  },
  {
    year: "2013",
    title: "100 Chapters Milestone",
    description:
      "Rapid expansion across Maharashtra, Gujarat, and Karnataka. EBN introduces its proprietary referral tracking system.",
  },
  {
    year: "2016",
    title: "National Launch",
    description:
      "Headquarters established in Bengaluru. Launch of the EBN Member Portal with directory, analytics, and event management.",
  },
  {
    year: "2019",
    title: "₹100 Cr Referrals Generated",
    description:
      "Members collectively generate over ₹100 crore in tracked business referrals. EBN wins 'Best Business Network' at India SME Awards.",
  },
  {
    year: "2022",
    title: "20,000 Members Strong",
    description:
      "Crosses 20,000 verified members across 500+ chapters. Introduces Corporate and Enterprise membership tiers.",
  },
  {
    year: "2025",
    title: "AI-Powered Matching",
    description:
      "Launch of intelligent referral matching, virtual hybrid chapters, and the EBN Business Academy with 50+ courses.",
  },
] as const;

const PARTNERS = [
  "HDFC Bank", "TCS", "Zoho", "Freshworks", "Razorpay",
  "IndiaMART", "Cleartax", "Dunzo Business", "LinkedIn India", "AWS Activate",
] as const;

const FAQ = [
  {
    q: "What makes EBN different from other networking groups?",
    a: "EBN combines structured weekly meetings, a proven referral methodology, verified membership, and technology-driven analytics. Unlike casual networking events, every meeting has a defined agenda focused on generating measurable business outcomes for members.",
  },
  {
    q: "How are EBN chapters formed?",
    a: "Chapters are launched when a city has sufficient demand — typically 15–20 committed business owners. A trained Director Consultant guides the launch, and members undergo a rigorous onboarding and category exclusivity process.",
  },
  {
    q: "Is EBN only for large businesses?",
    a: "Not at all. Our membership spans solopreneurs, SMEs, and enterprise teams. Whether you run a boutique consultancy or a 500-person manufacturing unit, EBN provides structured networking scaled to your growth stage.",
  },
  {
    q: "How does EBN ensure member quality?",
    a: "Every applicant passes identity verification, business registration checks, and a visitor orientation session. Category exclusivity ensures only one member per profession per chapter, eliminating internal competition.",
  },
  {
    q: "Can I visit a chapter before joining?",
    a: "Absolutely. We encourage prospective members to attend up to two chapter meetings as guests. Contact our team or find a chapter near you to schedule a visit — no obligation required.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-EBN-light via-white to-EBN-teal/5 dark:from-EBN-dark dark:via-EBN-dark dark:to-EBN-navy/20" />
        <div className="container-EBN relative z-10">
          <FadeIn>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-EBN-teal/10 text-EBN-teal border border-EBN-teal/20">
              About {BRAND.shortName}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-EBN-navy dark:text-white mb-6 max-w-4xl leading-tight">
              Building India&apos;s Most Trusted{" "}
              <span className="gradient-text">Business Community</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              Since 2010, {BRAND.name} has connected entrepreneurs, professionals, and
              business leaders through structured referral networking — generating over
              ₹500 crore in member business across {STATS[1].value}+ cities.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-EBN-light dark:bg-EBN-dark/50">
        <div className="container-EBN">
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn>
              <GlassCard className="h-full">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-EBN-navy dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-muted leading-relaxed">
                  To empower Indian entrepreneurs with a structured, technology-enabled
                  networking platform that generates measurable business growth through
                  trusted referrals — one relationship at a time.
                </p>
              </GlassCard>
            </FadeIn>
            <FadeIn delay={0.1}>
              <GlassCard className="h-full">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-EBN-navy dark:text-white mb-4">
                  Our Vision
                </h2>
                <p className="text-muted leading-relaxed">
                  To become India&apos;s largest and most impactful business network —
                  where every entrepreneur, regardless of city or industry, has access to
                  a trusted community that accelerates their success.
                </p>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-EBN">
          <SectionHeading
            badge="Our Values"
            title="What We Stand For"
            subtitle="These core principles guide every chapter meeting, leadership decision, and member interaction."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.08}>
                <GlassCard className="h-full">
                  <value.icon className="w-8 h-8 text-EBN-teal mb-4" />
                  <h3 className="text-lg font-heading font-bold text-EBN-navy dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{value.description}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-EBN-light dark:bg-EBN-dark/50">
        <div className="container-EBN">
          <SectionHeading
            badge="Leadership"
            title="Meet Our Leadership Team"
            subtitle="Experienced entrepreneurs and operators committed to your business growth."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {LEADERSHIP.map((leader, i) => (
              <FadeIn key={leader.name} delay={i * 0.08}>
                <GlassCard hover={false} className="text-center p-0 overflow-hidden">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-EBN-navy dark:text-white">
                      {leader.name}
                    </h3>
                    <p className="text-EBN-teal font-semibold text-sm mb-3">{leader.role}</p>
                    <p className="text-sm text-muted leading-relaxed">{leader.bio}</p>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding">
        <div className="container-EBN">
          <SectionHeading
            badge="Our Journey"
            title="15 Years of Impact"
            subtitle="From a single Mumbai chapter to India's fastest-growing business network."
          />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-EBN-navy to-EBN-teal md:-translate-x-px" />
            {TIMELINE.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1}>
                <div
                  className={`relative flex items-start gap-8 mb-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div
                    className={`md:w-1/2 pl-16 md:pl-0 ${
                      i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold gradient-bg text-white mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-heading font-bold text-EBN-navy dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                  </div>
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full gradient-bg md:-translate-x-1/2 ring-4 ring-white dark:ring-EBN-dark" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-EBN-light dark:bg-EBN-dark/50">
        <div className="container-EBN">
          <SectionHeading
            badge="Partners"
            title="Trusted by Industry Leaders"
            subtitle="We collaborate with leading brands to deliver exclusive benefits to EBN members."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {PARTNERS.map((partner, i) => (
              <FadeIn key={partner} delay={i * 0.05}>
                <div className="flex items-center justify-center p-6 rounded-2xl glass dark:glass-dark">
                  <span className="text-sm font-heading font-bold text-EBN-navy dark:text-white text-center">
                    {partner}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-EBN max-w-3xl">
          <SectionHeading
            badge="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about EBN and our community."
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
              Ready to Join Our Community?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Discover how EBN can transform your business through trusted referrals and
              lasting professional relationships.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <Button size="lg" variant="secondary" className="bg-white text-EBN-navy hover:bg-white/90">
                  Apply to Join Emerald
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
