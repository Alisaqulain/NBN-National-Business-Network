"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import {
  ALL_BUSINESS_CATEGORIES,
  CATEGORY_GROUPS,
  type CategoryGroup,
} from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, string> = {
  Construction: "🏗️",
  "IT & Technology": "💻",
  Education: "📚",
  Healthcare: "🏥",
  Finance: "💰",
  Legal: "⚖️",
  "Real Estate": "🏠",
  Manufacturing: "🏭",
  Retail: "🛍️",
  Marketing: "📢",
  Hospitality: "🏨",
  Automobile: "🚗",
  Consulting: "💼",
  Insurance: "🛡️",
  Logistics: "🚚",
  Architecture: "📐",
  "Interior Design": "🛋️",
  "Food & Beverage": "🍽️",
  Travel: "✈️",
  Media: "📺",
  Agriculture: "🌾",
  Pharmaceuticals: "💊",
  Cybersecurity: "🔒",
  "AI & Machine Learning": "🤖",
  "Renewable Energy": "☀️",
};

const FILTER_GROUPS: CategoryGroup[] = [
  "All",
  "Professional Services",
  "Technology",
  "Trade & Industry",
  "Consumer & Lifestyle",
];

export function CategoriesGrid() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<CategoryGroup>("All");

  const filteredCategories = useMemo(() => {
    let categories = [...ALL_BUSINESS_CATEGORIES];

    if (activeGroup !== "All") {
      const groupSet = new Set(CATEGORY_GROUPS[activeGroup]);
      categories = categories.filter((cat) => groupSet.has(cat));
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      categories = categories.filter((cat) => cat.toLowerCase().includes(query));
    }

    return categories.sort((a, b) => a.localeCompare(b));
  }, [search, activeGroup]);

  return (
    <section className="section-padding">
      <div className="container-EBN">
        <SectionHeading
          badge={`${ALL_BUSINESS_CATEGORIES.length}+ Categories`}
          title="Find Your Industry"
          subtitle="Search and filter across every business category represented in the EBN network."
        />

        {/* Search & Filters */}
        <FadeIn className="mb-10 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input
              type="search"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-11"
              aria-label="Search business categories"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-EBN-navy transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {FILTER_GROUPS.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setActiveGroup(group)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                  activeGroup === group
                    ? "gradient-bg text-white shadow-lg"
                    : "glass dark:glass-dark text-muted hover:text-EBN-navy dark:hover:text-white"
                )}
              >
                {group}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Results count */}
        <FadeIn>
          <p className="text-sm text-muted text-center mb-8">
            Showing {filteredCategories.length} of {ALL_BUSINESS_CATEGORIES.length} categories
            {search && (
              <>
                {" "}
                matching &ldquo;{search}&rdquo;
              </>
            )}
          </p>
        </FadeIn>

        {/* Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCategories.map((cat, i) => (
              <FadeIn key={cat} delay={Math.min(i * 0.02, 0.4)}>
                <Link href={`/chapters?category=${encodeURIComponent(cat)}`}>
                  <GlassCard className="text-center p-5 h-full cursor-pointer">
                    <span className="text-3xl mb-3 block">
                      {categoryIcons[cat] ?? "💼"}
                    </span>
                    <span className="text-sm font-semibold text-EBN-navy dark:text-white hover:text-EBN-teal transition-colors">
                      {cat}
                    </span>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className="text-center py-16">
              <p className="text-lg text-muted mb-4">
                No categories found matching your search.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setActiveGroup("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
