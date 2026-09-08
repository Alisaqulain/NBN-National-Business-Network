import type { Metadata } from "next";
import { EmeraldHeroSection } from "@/components/emerald/emerald-hero-section";
import { WelcomeEmeraldSection } from "@/components/emerald/welcome-emerald-section";
import { NetworkStatsSection } from "@/components/emerald/network-stats-section";
import { LaunchCountdownSection } from "@/components/emerald/launch-countdown-section";
import { WhyJoinEmeraldSection } from "@/components/emerald/why-join-emerald-section";
import { CategoryDirectory } from "@/components/emerald/directory/category-directory";
import { EmeraldContactSection } from "@/components/emerald/emerald-contact-section";
import { EmeraldLaunchCTASection } from "@/components/emerald/emerald-launch-cta-section";
import { EMERALD } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${EMERALD.chapter} Chapter — Elite Explorers | Business Networking Bangalore`,
  description: `Join the ${EMERALD.chapter} Chapter of Elite Explorers — ${EMERALD.networkSizeLabel} professionals across India, ${EMERALD.bangaloreMembersLabel} in Bangalore. B2B business networking, referrals, and professional connections. Launching ${EMERALD.launchDateDisplay}.`,
  keywords: [
    "Elite Explorers",
    "Emerald Chapter",
    "Business Networking Bangalore",
    "B2B Business Networking",
    "Professional Business Network India",
    "Business Referrals Bangalore",
    "Entrepreneur Networking Bangalore",
  ],
};

export default function EmeraldPage() {
  return (
    <>
      <EmeraldHeroSection />
      <WelcomeEmeraldSection />
      <NetworkStatsSection />
      <LaunchCountdownSection />
      <WhyJoinEmeraldSection />
      <CategoryDirectory />
      <EmeraldContactSection />
      <EmeraldLaunchCTASection />
    </>
  );
}
