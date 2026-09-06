import { SectionHeading, FadeIn } from "@/components/shared/animations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "EBN Terms of Service - Membership terms and conditions.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-EBN max-w-4xl">
        <SectionHeading title="Terms of Service" subtitle="Last updated: July 27, 2026" />
        <FadeIn>
          <div className="space-y-6 text-muted">
            <section>
              <h2 className="text-2xl font-heading font-bold text-EBN-navy dark:text-white mb-3">1. Membership Agreement</h2>
              <p>By joining Entrepreneur Business Network (EBN), you agree to participate actively in chapter meetings, provide quality referrals, and maintain professional conduct at all times.</p>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-bold text-EBN-navy dark:text-white mb-3">2. Membership Fees</h2>
              <p>Membership fees are billed monthly or annually as selected. Refunds are available within 14 days of initial purchase. Renewals are automatic unless cancelled 30 days before expiry.</p>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-bold text-EBN-navy dark:text-white mb-3">3. Code of Ethics</h2>
              <p>Members must provide accurate business information, give referrals in good faith, attend meetings regularly, and treat all members with respect and professionalism.</p>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-bold text-EBN-navy dark:text-white mb-3">4. Termination</h2>
              <p>EBN reserves the right to terminate membership for violation of code of ethics, non-payment, or conduct detrimental to the network. Members may cancel with 30 days written notice.</p>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
