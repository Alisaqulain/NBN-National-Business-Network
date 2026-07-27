import type { Metadata } from "next";
import { ResourcesView } from "./resources-view";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Download free business templates, GST guides, referral tracking tools, and video courses for Indian SMEs from NBN.",
  keywords: ["business templates India", "referral tracking", "SME guides", "GST templates"],
};

export default function ResourcesPage() {
  return <ResourcesView />;
}
