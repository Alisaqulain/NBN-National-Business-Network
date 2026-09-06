"use client";

import { useState } from "react";
import { Calendar, Edit, MapPin, Plus, Search, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { FadeIn } from "@/components/shared/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminEvent {
  id: string;
  title: string;
  type: "meeting" | "networking" | "expo" | "workshop" | "webinar";
  date: string;
  location: string;
  city: string;
  attendees: number;
  maxAttendees: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

const MOCK_EVENTS: AdminEvent[] = [
  { id: "1", title: "Mumbai Chapter Weekly Meeting", type: "meeting", date: "2026-07-30", location: "Andheri West", city: "Mumbai", attendees: 45, maxAttendees: 60, status: "upcoming" },
  { id: "2", title: "Business Growth Workshop", type: "workshop", date: "2026-08-05", location: "Virtual", city: "Online", attendees: 120, maxAttendees: 200, status: "upcoming" },
  { id: "3", title: "National Networking Expo", type: "expo", date: "2026-08-15", location: "BKC Convention", city: "Mumbai", attendees: 350, maxAttendees: 500, status: "upcoming" },
  { id: "4", title: "Delhi NCR Networking Night", type: "networking", date: "2026-07-20", location: "Connaught Place", city: "Delhi", attendees: 80, maxAttendees: 80, status: "completed" },
  { id: "5", title: "Digital Marketing Webinar", type: "webinar", date: "2026-07-25", location: "Zoom", city: "Online", attendees: 200, maxAttendees: 300, status: "ongoing" },
];

const STATUS_VARIANT: Record<AdminEvent["status"], "secondary" | "success" | "warning" | "destructive"> = {
  upcoming: "secondary",
  ongoing: "success",
  completed: "warning",
  cancelled: "destructive",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [search, setSearch] = useState("");

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.success("Event deleted");
  };

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-EBN-navy lg:text-3xl">Events</h1>
            <p className="mt-1 text-muted-foreground">Create and manage platform events</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>All Events ({filtered.length})</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <p className="font-medium">{event.title}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{event.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {event.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        {event.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        {event.attendees}/{event.maxAttendees}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[event.status]}>{event.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
