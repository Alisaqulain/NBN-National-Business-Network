import type { Metadata } from "next";
import { ChaptersView } from "./chapters-view";

export const metadata: Metadata = {
  title: "Find a Chapter",
  description:
    "Discover NBN chapters across Mumbai, Delhi, Bangalore, Hyderabad, and 100+ Indian cities. Join weekly meetings and grow through trusted referrals.",
  keywords: ["NBN chapters", "business networking Mumbai", "BNI chapters India", "find networking group"],
};

export default function ChaptersPage() {
  return <ChaptersView />;
}
