import { SectionHeading, FadeIn } from "@/components/shared/animations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "NBN Privacy Policy - How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-nbn max-w-4xl">
        <SectionHeading title="Privacy Policy" subtitle="Last updated: July 27, 2026" />
        <FadeIn>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted">
            <section>
              <h2 className="text-2xl font-heading font-bold text-nbn-navy dark:text-white">1. Information We Collect</h2>
              <p>We collect information you provide directly, including name, email, phone number, business details, and payment information when you register for NBN membership.</p>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-bold text-nbn-navy dark:text-white">2. How We Use Your Information</h2>
              <p>Your information is used to provide networking services, process payments, send event notifications, facilitate referrals between members, and improve our platform.</p>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-bold text-nbn-navy dark:text-white">3. Data Sharing</h2>
              <p>Member business profiles are visible to other verified NBN members. We do not sell personal data to third parties. Payment processing is handled securely through Razorpay.</p>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-bold text-nbn-navy dark:text-white">4. Data Security</h2>
              <p>We implement industry-standard security measures including encryption, secure JWT authentication, and regular security audits to protect your data.</p>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-bold text-nbn-navy dark:text-white">5. Contact Us</h2>
              <p>For privacy-related inquiries, contact us at privacy@nbn.in or write to National Business Network, 123 Business Park, BKC, Mumbai 400051.</p>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
