import { SectionHeading, FadeIn } from "@/components/shared/animations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "EBN Cookie Policy - How we use cookies on our website.",
};

export default function CookiesPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-EBN max-w-4xl">
        <SectionHeading title="Cookie Policy" subtitle="Last updated: July 27, 2026" />
        <FadeIn>
          <div className="space-y-6 text-muted">
            <p>We use cookies to enhance your experience, analyze site traffic, and personalize content. Essential cookies are required for authentication and security. Analytics cookies help us improve our platform.</p>
            <p>You can manage cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
