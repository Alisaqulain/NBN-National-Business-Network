"use client";

import { useMemo, useState } from "react";
import {
  MapPin,
  Users,
  Clock,
  Calendar,
  Phone,
  Mail,
  Search,
  ChevronLeft,
  ChevronRight,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import {
  CHAPTERS,
  CHAPTER_CITIES,
  INDIAN_STATES,
  CHAPTERS_PER_PAGE,
} from "@/lib/data/chapters";

export function ChaptersView() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Cities");
  const [state, setState] = useState("All States");
  const [category, setCategory] = useState("All Categories");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return CHAPTERS.filter((chapter) => {
      const matchesSearch =
        search === "" ||
        chapter.name.toLowerCase().includes(search.toLowerCase()) ||
        chapter.city.toLowerCase().includes(search.toLowerCase()) ||
        chapter.address.toLowerCase().includes(search.toLowerCase());
      const matchesCity = city === "All Cities" || chapter.city === city;
      const matchesState = state === "All States" || chapter.state === state;
      const matchesCategory =
        category === "All Categories" || chapter.category === category;
      return matchesSearch && matchesCity && matchesState && matchesCategory;
    });
  }, [search, city, state, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / CHAPTERS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * CHAPTERS_PER_PAGE,
    page * CHAPTERS_PER_PAGE
  );

  const handleFilterChange = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="container-EBN">
        <SectionHeading
          badge="Chapters"
          title="Find a Chapter Near You"
          subtitle="Join 5 chapters across India. Connect with verified business professionals in your area."
        />

        {/* Filters */}
        <FadeIn>
          <GlassCard hover={false} className="mb-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="search" className="mb-2 block">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <Input
                    id="search"
                    placeholder="Search by name, city, or address..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="city" className="mb-2 block">
                  City
                </Label>
                <select
                  id="city"
                  value={city}
                  onChange={(e) => handleFilterChange(setCity)(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-EBN-navy/10 bg-white/80 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-EBN-teal"
                >
                  {CHAPTER_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="state" className="mb-2 block">
                  State
                </Label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => handleFilterChange(setState)(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-EBN-navy/10 bg-white/80 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-EBN-teal"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="category" className="mb-2 block">
                  Category
                </Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => handleFilterChange(setCategory)(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-EBN-navy/10 bg-white/80 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-EBN-teal"
                >
                  <option value="All Categories">All Categories</option>
                  {BUSINESS_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-muted mt-4">
              Showing {filtered.length} chapter{filtered.length !== 1 ? "s" : ""}
              {city !== "All Cities" && ` in ${city}`}
              {state !== "All States" && `, ${state}`}
            </p>
          </GlassCard>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chapter Cards */}
          <div className="lg:col-span-2 space-y-6">
            {paginated.length === 0 ? (
              <FadeIn>
                <Card className="p-12 text-center">
                  <p className="text-muted text-lg">
                    No chapters match your filters. Try adjusting your search criteria.
                  </p>
                </Card>
              </FadeIn>
            ) : (
              paginated.map((chapter, i) => (
                <FadeIn key={chapter._id} delay={i * 0.05}>
                  <Card className="group hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <CardTitle className="group-hover:text-EBN-teal transition-colors">
                            {chapter.name}
                          </CardTitle>
                          <p className="text-sm text-EBN-teal font-medium mt-1">
                            {chapter.city}, {chapter.state}
                          </p>
                        </div>
                        {chapter.category && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-EBN-teal/10 text-EBN-teal">
                            {chapter.category}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2 text-sm text-muted">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-EBN-teal" />
                        {chapter.address}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-EBN-navy" />
                          {chapter.meetingDay}s
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-EBN-navy" />
                          {chapter.meetingTime} IST
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-EBN-navy" />
                          {chapter.memberCount} members
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <a
                          href={`mailto:${chapter.contactEmail}`}
                          className="flex items-center gap-1.5 text-EBN-teal hover:underline"
                        >
                          <Mail className="w-4 h-4" />
                          {chapter.contactEmail}
                        </a>
                        <a
                          href={`tel:${chapter.contactPhone.replace(/\s/g, "")}`}
                          className="flex items-center gap-1.5 text-EBN-teal hover:underline"
                        >
                          <Phone className="w-4 h-4" />
                          {chapter.contactPhone}
                        </a>
                      </div>
                    </CardContent>
                    <CardFooter className="gap-3">
                      <Button size="sm">Request Visit</Button>
                      <Button size="sm" variant="outline">
                        View on Map
                      </Button>
                    </CardFooter>
                  </Card>
                </FadeIn>
              ))
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <FadeIn>
                <div className="flex items-center justify-center gap-4 pt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.2}>
              <div className="sticky top-28">
                <Card className="overflow-hidden">
                  <div className="relative h-80 lg:h-[500px] bg-gradient-to-br from-EBN-navy/5 to-EBN-teal/10 flex flex-col items-center justify-center">
                    <Map className="w-16 h-16 text-EBN-teal/40 mb-4" />
                    <p className="text-EBN-navy font-heading font-bold text-lg">
                      Interactive Map
                    </p>
                    <p className="text-sm text-muted text-center px-6 mt-2">
                      Chapter locations across India. Map integration coming soon.
                    </p>
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-EBN-teal animate-pulse" />
                      <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-EBN-teal animate-pulse" />
                      <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-EBN-teal animate-pulse" />
                      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-EBN-teal animate-pulse" />
                      <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-EBN-teal animate-pulse" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted text-center">
                      {filtered.length} chapters displayed based on current filters
                    </p>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
