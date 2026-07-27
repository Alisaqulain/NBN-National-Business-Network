"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeading, FadeIn } from "@/components/shared/animations";
import { format } from "date-fns";

const EVENTS = [
  {
    title: "Mumbai Business Leaders Summit 2026",
    type: "Networking Event",
    date: new Date("2026-08-15"),
    location: "Taj Lands End, Mumbai",
    attendees: 250,
    maxAttendees: 300,
  },
  {
    title: "Leadership Excellence Workshop",
    type: "Workshop",
    date: new Date("2026-08-22"),
    location: "Virtual + Delhi Hub",
    attendees: 120,
    maxAttendees: 150,
  },
  {
    title: "NBN National Business Expo",
    type: "Business Expo",
    date: new Date("2026-09-05"),
    location: "Pragati Maidan, New Delhi",
    attendees: 800,
    maxAttendees: 1000,
  },
  {
    title: "Referral Mastery Webinar",
    type: "Webinar",
    date: new Date("2026-08-10"),
    location: "Online",
    attendees: 450,
    maxAttendees: 500,
  },
];

const typeColors: Record<string, string> = {
  "Networking Event": "bg-blue-500/10 text-blue-600",
  Workshop: "bg-purple-500/10 text-purple-600",
  "Business Expo": "bg-orange-500/10 text-orange-600",
  Webinar: "bg-green-500/10 text-green-600",
};

export function EventsPreview() {
  return (
    <section className="section-padding">
      <div className="container-nbn">
        <SectionHeading
          badge="Events"
          title="Upcoming Events"
          subtitle="Connect, learn, and grow at exclusive NBN events across the country."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {EVENTS.map((event, i) => (
            <FadeIn key={event.title} delay={i * 0.1}>
              <GlassCard className="group">
                <div className="flex gap-6">
                  <div className="shrink-0 w-20 h-20 rounded-2xl gradient-bg flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-bold">{format(event.date, "dd")}</span>
                    <span className="text-xs uppercase">{format(event.date, "MMM")}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${typeColors[event.type]}`}>
                      {event.type}
                    </span>
                    <h3 className="text-lg font-heading font-bold text-nbn-navy dark:text-white mb-2 group-hover:text-nbn-teal transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />10:00 AM IST</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{event.attendees}/{event.maxAttendees}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-nbn-navy/5 flex justify-between items-center">
                  <Link href="/events" className="text-sm font-semibold text-nbn-teal hover:underline">
                    View Details
                  </Link>
                  <Button size="sm">Register</Button>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-10">
          <Link href="/events">
            <Button variant="secondary" size="lg" className="group">
              <Calendar className="w-4 h-4" />
              View All Events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
