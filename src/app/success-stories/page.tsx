import type { Metadata } from "next";
import { SuccessStoriesView } from "./success-stories-view";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Read inspiring success stories from EBN members across India — real revenue growth through referral networking in Mumbai, Delhi, Bangalore, and beyond.",
  keywords: ["business success stories India", "referral networking results", "EBN testimonials"],
};

export default function SuccessStoriesPage() {
  return <SuccessStoriesView />;
}
