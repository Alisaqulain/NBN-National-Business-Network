import type { Metadata } from "next";
import MembershipPage from "./membership-client";

export const metadata: Metadata = {
  title: "Membership Plans",
  description: "Choose your NBN membership plan. Individual, Professional, Corporate, and Enterprise options with flexible monthly and yearly billing.",
};

export default function Page() {
  return <MembershipPage />;
}
