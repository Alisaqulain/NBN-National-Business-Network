"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Download,
  FileText,
  PlayCircle,
  LayoutTemplate,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import {
  RESOURCES,
  RESOURCE_CATEGORIES,
  RESOURCE_TYPE_COLORS,
} from "@/lib/data/resources";
import type { Resource } from "@/types";

const TYPE_ICONS = {
  pdf: FileText,
  video: PlayCircle,
  template: LayoutTemplate,
  guide: BookOpen,
} as const;

export function ResourcesView() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [typeFilter, setTypeFilter] = useState<string>("All Types");

  const filtered = useMemo(() => {
    return RESOURCES.filter((resource) => {
      const matchesSearch =
        search === "" ||
        resource.title.toLowerCase().includes(search.toLowerCase()) ||
        resource.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "All Categories" || resource.category === category;
      const matchesType = typeFilter === "All Types" || resource.type === typeFilter;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [search, category, typeFilter]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: RESOURCES.length };
    RESOURCES.forEach((r) => {
      counts[r.type] = (counts[r.type] ?? 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="pt-28 pb-20">
      <div className="container-nbn">
        <SectionHeading
          badge="Resources"
          title="Business Resources & Downloads"
          subtitle="Free templates, guides, PDFs, and video courses to help NBN members and entrepreneurs grow their businesses."
        />

        {/* Search & Filters */}
        <FadeIn>
          <GlassCard hover={false} className="mb-10">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
                <Label htmlFor="resource-search" className="mb-2 block">
                  Search Resources
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <Input
                    id="resource-search"
                    placeholder="Search templates, guides, PDFs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="resource-category" className="mb-2 block">
                  Category
                </Label>
                <select
                  id="resource-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-nbn-navy/10 bg-white/80 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nbn-teal"
                >
                  {RESOURCE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Type pills */}
            <div className="flex flex-wrap gap-2">
              {(["All Types", "pdf", "video", "template", "guide"] as const).map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={typeFilter === type ? "default" : "outline"}
                  onClick={() => setTypeFilter(type)}
                >
                  {type === "All Types"
                    ? `All (${typeCounts.All})`
                    : `${type.charAt(0).toUpperCase() + type.slice(1)}s (${typeCounts[type] ?? 0})`}
                </Button>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Resources Grid */}
        {filtered.length === 0 ? (
          <FadeIn>
            <Card className="p-12 text-center">
              <p className="text-muted text-lg">
                No resources match your search. Try different keywords or categories.
              </p>
            </Card>
          </FadeIn>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource, i) => (
              <ResourceCard key={resource._id} resource={resource} index={i} />
            ))}
          </div>
        )}

        <FadeIn className="mt-12">
          <GlassCard hover={false} className="text-center">
            <h3 className="text-xl font-heading font-bold text-nbn-navy dark:text-white mb-2">
              NBN Members Get Premium Access
            </h3>
            <p className="text-muted mb-4 max-w-xl mx-auto">
              Join NBN to unlock exclusive resources, video courses, and chapter-specific templates
              not available to the public.
            </p>
            <Button variant="secondary">Explore Membership</Button>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const Icon = TYPE_ICONS[resource.type];

  return (
    <FadeIn delay={index * 0.05}>
      <Card className="h-full flex flex-col group hover:shadow-xl transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${RESOURCE_TYPE_COLORS[resource.type]}`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-nbn-navy/5 text-nbn-navy">
              {resource.category}
            </span>
          </div>
          <CardTitle className="mt-4 group-hover:text-nbn-teal transition-colors">
            {resource.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted leading-relaxed">{resource.description}</p>
          <p className="text-xs text-muted mt-4">
            {resource.downloads.toLocaleString("en-IN")} downloads
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            <Download className="w-4 h-4" />
            {resource.type === "video" ? "Watch" : "Download"}
          </Button>
        </CardFooter>
      </Card>
    </FadeIn>
  );
}
