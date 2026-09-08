"use client";

import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { EMERALD } from "@/lib/constants";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";

export function EmeraldContactSection() {
  const whatsappNumber = EMERALD.primaryWhatsApp.replace(/\D/g, "");

  return (
    <section id="contact" className="section-padding premium-section-alt">
      <div className="container-EBN">
        <SectionHeading
          badge="Contact"
          title="Speak With the Emerald Team"
          subtitle="Questions about membership, categories, or the chapter launch? Reach our team directly."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {EMERALD.phones.map((phone, i) => (
            <FadeIn key={phone} delay={i * 0.08}>
              <GlassCard hover={false} className="text-center">
                <Phone className="mx-auto mb-3 h-6 w-6 text-EBN-teal" />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="font-heading text-lg font-bold text-EBN-navy transition-colors hover:text-EBN-teal"
                >
                  {phone}
                </a>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25} className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={`tel:${EMERALD.primaryPhone.replace(/\s/g, "")}`}>
            <Button size="lg">Call</Button>
          </a>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
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
