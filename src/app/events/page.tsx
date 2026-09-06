import type { Metadata } from "next";
import { EventsView } from "./events-view";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Register for EBN networking events, workshops, webinars, and business expos across Mumbai, Delhi, Bangalore, and online.",
  keywords: ["business events India", "networking summit Mumbai", "EBN workshops", "business expo Delhi"],
};

export default function EventsPage() {
  return <EventsView />;
}
