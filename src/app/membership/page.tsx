import type { Metadata } from "next";
import MembershipPage from "./membership-client";

export const metadata: Metadata = {
  title: "Apply to Join — Emerald Chapter",
  description:
    "Apply to join the Emerald Chapter of Elite Explorers. Membership is by application and review — no online payment required.",
};

export default function Page() {
  return <MembershipPage />;
}
