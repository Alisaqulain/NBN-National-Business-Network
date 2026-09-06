import type { Metadata } from "next";
import { BlogView } from "./blog-view";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Business networking tips, referral strategies, GST guides, and member success stories from India's Entrepreneur Business Network.",
  keywords: ["business networking blog", "referral tips India", "SME growth", "EBN blog"],
};

export default function BlogPage() {
  return <BlogView />;
}
