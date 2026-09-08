import type { Metadata } from "next";
import { ChaptersView } from "./chapters-view";

export const metadata: Metadata = {
  title: "Find a Chapter",
  description:
    "Discover EBN chapters across Mumbai, Delhi, Bangalore, Hyderabad, and 100+ Indian cities. Join weekly meetings and grow through trusted referrals.",
  keywords: ["EBN chapters", "business networking Mumbai", "networking chapters India", "find networking group"],
};

export default function ChaptersPage() {
  return <ChaptersView />;
}
