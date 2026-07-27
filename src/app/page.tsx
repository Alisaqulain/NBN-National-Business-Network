import { HeroSection } from "@/components/home/hero-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { StatsSection } from "@/components/home/stats-section";
import { CategoriesPreview } from "@/components/home/categories-preview";
import { MembershipPreview } from "@/components/home/membership-preview";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { EventsPreview } from "@/components/home/events-preview";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />
      <StatsSection />
      <CategoriesPreview />
      <MembershipPreview />
      <TestimonialsSection />
      <EventsPreview />
      <CTASection />
    </>
  );
}
