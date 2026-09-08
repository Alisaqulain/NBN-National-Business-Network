import { Suspense } from "react";
import type { Metadata } from "next";
import { FadeIn, SectionHeading } from "@/components/shared/animations";
import { ApplicationForm } from "@/components/emerald/application/application-form";
import { EMERALD } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Applicant's Due Diligence Form — Emerald Chapter",
  description: `Apply to join the ${EMERALD.chapter} Chapter of ${EMERALD.community}. Chapter Launch: ${EMERALD.launchDateDisplay}. Submit your application for membership consideration.`,
  keywords: [
    "Elite Explorers",
    "Emerald Chapter",
    "B2B Business Networking",
    "Business Networking Bangalore",
    "Professional Business Network India",
    "Business Referrals Bangalore",
    "Entrepreneur Networking Bangalore",
  ],
};

function FormFallback() {
  return (
    <div className="glass rounded-2xl p-10 text-center text-muted">
      Loading application form...
    </div>
  );
}

export default function ApplyPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-EBN-light via-white to-EBN-teal/5" />
        <div className="container-EBN relative z-10">
          <FadeIn>
            <SectionHeading
              badge="Membership Application"
              title="Applicant's Due Diligence Form"
              subtitle={`${EMERALD.chapter} Chapter — ${EMERALD.community} · Chapter Launch: ${EMERALD.launchDateDisplay}`}
            />
          </FadeIn>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-EBN max-w-4xl">
          <FadeIn delay={0.15}>
            <Suspense fallback={<FormFallback />}>
              <ApplicationForm />
            </Suspense>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
