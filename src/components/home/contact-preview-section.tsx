"use client";

import Link from "next/link";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { EMERALD } from "@/lib/constants";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";

export function ContactPreviewSection() {
  const whatsappUrl = `https://wa.me/${EMERALD.primaryWhatsApp.replace(/\D/g, "")}`;

  return (
    <section id="contact" className="section-padding premium-section">
      <div className="container-EBN">
        <SectionHeading
          badge="Get In Touch"
          title="Connect With the Emerald Team"
          subtitle="Have questions about membership, category availability, or the chapter launch? Our team is available to help."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {EMERALD.phones.map((phone, i) => (
            <FadeIn key={phone} delay={i * 0.08}>
              <GlassCard hover={false} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-bg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">Phone</p>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-medium text-EBN-navy transition-colors hover:text-EBN-teal">
                    {phone}
                  </a>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25} className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={`tel:${EMERALD.primaryPhone.replace(/\s/g, "")}`}>
            <Button size="lg">Call Us</Button>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
          <Link href="/apply">
            <Button size="lg" variant="outline" className="group">
              Apply Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
