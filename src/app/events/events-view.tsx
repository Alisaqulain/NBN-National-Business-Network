"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  MapPin,
  Users,
  Clock,
  Calendar,
  Video,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { CountdownTimer } from "@/components/shared/countdown-timer";
import {
  EVENTS,
  EVENT_TYPES,
  EVENT_TYPE_LABELS,
  EVENT_TYPE_COLORS,
  getNextEvent,
} from "@/lib/data/events";
import type { Event } from "@/types";

export function EventsView() {
  const [typeFilter, setTypeFilter] = useState<string>("All Types");
  const nextEvent = getNextEvent();

  const filtered = useMemo(() => {
    const sorted = [...EVENTS].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    if (typeFilter === "All Types") return sorted;
    return sorted.filter((e) => e.type === typeFilter);
  }, [typeFilter]);

  const now = new Date();

  return (
    <div className="pt-28 pb-20">
      <div className="container-EBN">
        <SectionHeading
          badge="Events"
          title="Upcoming Events & Workshops"
          subtitle="Connect, learn, and grow at exclusive EBN events across India — from Mumbai summits to nationwide webinars."
        />

        {/* Countdown to Next Event */}
        <FadeIn>
          <GlassCard hover={false} className="mb-12 text-center">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-EBN-teal/10 text-EBN-teal border border-EBN-teal/20">
              Next Event
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-EBN-navy dark:text-white mb-2">
              {nextEvent.title}
            </h3>
            <p className="text-muted mb-6">
              {format(new Date(nextEvent.date), "EEEE, MMMM d, yyyy 'at' h:mm a")} IST
              {!nextEvent.isVirtual && ` · ${nextEvent.location}`}
            </p>
            <CountdownTimer targetDate={nextEvent.date} />
            <div className="mt-8">
              <Button size="lg">Register Now</Button>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Type Filter */}
        <FadeIn>
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <div className="flex items-center gap-2 text-EBN-navy font-medium">
              <Filter className="w-4 h-4" />
              Filter by type:
            </div>
            <div className="flex flex-wrap gap-2">
              {EVENT_TYPES.map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={typeFilter === type ? "default" : "outline"}
                  onClick={() => setTypeFilter(type)}
                >
                  {type === "All Types"
                    ? "All Types"
                    : EVENT_TYPE_LABELS[type as Event["type"]]}
                </Button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Timeline / Cards */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-EBN-navy/20 via-EBN-teal/40 to-EBN-navy/20 hidden md:block md:-translate-x-1/2" />

          <div className="space-y-8">
            {filtered.map((event, i) => {
              const eventDate = new Date(event.date);
              const isPast = eventDate < now;
              const isEven = i % 2 === 0;

              return (
                <FadeIn key={event._id} delay={i * 0.08}>
                  <div
                    className={`relative md:grid md:grid-cols-2 md:gap-8 items-center ${
                      isEven ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full gradient-bg ring-4 ring-white shadow-lg z-10" />

                    {/* Date badge (mobile + desktop side) */}
                    <div className={`${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12 md:col-start-2"}`}>
                      <div className="inline-flex items-center gap-3 mb-4 md:mb-0">
                        <div className="w-16 h-16 rounded-2xl gradient-bg flex flex-col items-center justify-center text-white shrink-0">
                          <span className="text-xl font-bold">
                            {format(eventDate, "dd")}
                          </span>
                          <span className="text-xs uppercase">
                            {format(eventDate, "MMM")}
                          </span>
                        </div>
                        <div className="md:hidden">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${EVENT_TYPE_COLORS[event.type]}`}
                          >
                            {EVENT_TYPE_LABELS[event.type]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Event Card */}
                    <div className={`${isEven ? "md:pl-12" : "md:pr-12 md:col-start-1 md:row-start-1"}`}>
                      <GlassCard className={`${isPast ? "opacity-60" : ""}`}>
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <span
                            className={`hidden md:inline-block px-3 py-1 rounded-full text-xs font-semibold ${EVENT_TYPE_COLORS[event.type]}`}
                          >
                            {EVENT_TYPE_LABELS[event.type]}
                          </span>
                          {isPast && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                              Past Event
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-heading font-bold text-EBN-navy dark:text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted mb-5">
                          <span className="flex items-center gap-1.5">
                            {event.isVirtual ? (
                              <Video className="w-4 h-4 text-EBN-teal" />
                            ) : (
                              <MapPin className="w-4 h-4 text-EBN-teal" />
                            )}
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-EBN-navy" />
                            {format(eventDate, "h:mm a")} IST
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-EBN-navy" />
                            {event.currentAttendees}/{event.maxAttendees}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-EBN-navy" />
                            {event.city}
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="mb-5">
                          <div className="flex justify-between text-xs text-muted mb-1">
                            <span>Registration</span>
                            <span>
                              {Math.round(
                                (event.currentAttendees / (event.maxAttendees ?? 1)) * 100
                              )}
                              % full
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-EBN-navy/10 overflow-hidden">
                            <div
                              className="h-full gradient-bg rounded-full transition-all"
                              style={{
                                width: `${(event.currentAttendees / (event.maxAttendees ?? 1)) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <Button disabled={isPast} className="w-full sm:w-auto">
                          {isPast ? "Event Ended" : "Register"}
                        </Button>
                      </GlassCard>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
