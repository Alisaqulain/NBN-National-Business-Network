"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  getIndustryGroups,
  getMemberById,
  getCategoryById,
  searchDirectory,
  EMERALD_INDUSTRIES,
  type EmeraldCategoryRecord,
} from "@/lib/data/emerald-directory";
import { FadeIn, SectionHeading } from "@/components/shared/animations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { IndustrySection } from "./industry-section";
import { CategoryCard } from "./category-card";
import { MemberCard, MemberProfileContent } from "./member-card";

type StatusFilter = "all" | "represented" | "open";

export function CategoryDirectory() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<EmeraldCategoryRecord | null>(null);

  const isSearching = query.trim().length > 0 || categoryQuery.trim().length > 0;

  const searchQuery = categoryQuery.trim() || query.trim();

  const { categories: searchResults, members: memberResults } = useMemo(
    () => searchDirectory(searchQuery, statusFilter, industryFilter),
    [searchQuery, statusFilter, industryFilter]
  );

  const industryGroups = useMemo(() => {
    if (!isSearching && statusFilter === "all" && industryFilter === "All") {
      return getIndustryGroups();
    }
    const industries = new Set<string>();
    searchResults.forEach((c) => industries.add(c.industry));
    memberResults.forEach((m) => industries.add(m.industry));

    return Array.from(industries).map((industry) => ({
      industry,
      represented: searchResults.filter(
        (c) => c.industry === industry && c.status === "represented"
      ),
      open: searchResults.filter(
        (c) => c.industry === industry && c.status === "open"
      ),
      members: memberResults.filter((m) => m.industry === industry),
    }));
  }, [isSearching, statusFilter, industryFilter, searchResults, memberResults]);

  const selectedMember = selectedMemberId ? getMemberById(selectedMemberId) : null;

  const handleApplyCategory = (categoryId: string) => {
    const cat = getCategoryById(categoryId);
    if (cat?.status === "open") {
      router.push(`/apply?category=${encodeURIComponent(cat.name)}`);
    }
  };

  const handleApplyFromModal = () => {
    if (selectedCategory) {
      router.push(`/apply?category=${encodeURIComponent(selectedCategory.name)}`);
    }
  };

  return (
    <>
      <section id="directory" className="section-padding premium-section-alt">
        <div className="container-EBN">
          <SectionHeading
            badge="Category Directory"
            title="Explore Business Categories"
            subtitle="Discover who already represents each category and which opportunities are currently available."
          />

          <FadeIn>
            <div className="mb-6 space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <Input
                    type="search"
                    placeholder="Search members by name, company, category, or industry..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <Input
                    type="search"
                    placeholder="Search a category..."
                    value={categoryQuery}
                    onChange={(e) => setCategoryQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {(["all", "represented", "open"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setStatusFilter(f)}
                      className={cn(
                        "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                        statusFilter === f
                          ? "bg-EBN-teal text-white"
                          : "bg-slate-100 text-muted hover:bg-slate-200"
                      )}
                    >
                      {f === "all" ? "All" : f === "represented" ? "Represented" : "Open Categories"}
                    </button>
                  ))}
                </div>
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="h-10 rounded-xl border border-slate-200/80 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-EBN-teal"
                >
                  <option value="All">All Industries</option>
                  {EMERALD_INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            </div>
          </FadeIn>

          {isSearching && searchResults.length === 0 && memberResults.length === 0 ? (
            <FadeIn>
              <p className="py-12 text-center text-muted">No results match your search.</p>
            </FadeIn>
          ) : isSearching ? (
            <div className="space-y-8">
              {memberResults.length > 0 && (
                <div>
                  <h3 className="mb-4 font-heading text-lg font-bold text-EBN-navy">Members</h3>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {memberResults.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        onView={() => setSelectedMemberId(member.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
              {searchResults.length > 0 && (
                <div>
                  <h3 className="mb-4 font-heading text-lg font-bold text-EBN-navy">Categories</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {searchResults.map((cat) => (
                      <CategoryCard
                        key={cat.id}
                        category={cat}
                        compact
                        onApply={() => {
                          if (cat.status === "open") setSelectedCategory(cat);
                          else if (cat.memberId) setSelectedMemberId(cat.memberId);
                        }}
                        onViewMember={() => cat.memberId && setSelectedMemberId(cat.memberId)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-14">
              {industryGroups.map((group) => (
                <IndustrySection
                  key={group.industry}
                  group={group}
                  onViewMember={setSelectedMemberId}
                  onApplyCategory={(id) => {
                    const cat = getCategoryById(id);
                    if (cat) setSelectedCategory(cat);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Member profile modal */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMemberId(null)}>
        <DialogContent className="max-w-md">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="sr-only">{selectedMember.name}</DialogTitle>
              </DialogHeader>
              <MemberProfileContent member={selectedMember} />
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Open category detail modal */}
      <Dialog open={!!selectedCategory} onOpenChange={(open) => !open && setSelectedCategory(null)}>
        <DialogContent className="max-w-md">
          {selectedCategory && (
            <>
              <DialogHeader>
                <DialogTitle>Category Available</DialogTitle>
                <DialogDescription>
                  This category is currently open for representation in Emerald.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">Category</p>
                  <p className="font-heading text-lg font-bold text-EBN-navy">{selectedCategory.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">Industry</p>
                  <p className="text-sm text-EBN-navy">{selectedCategory.industry}</p>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Open
                  </span>
                </div>
                <p className="text-sm text-muted">
                  Emerald currently has an opportunity for a business in this category.
                </p>
                <Button className="w-full" onClick={handleApplyFromModal}>
                  Apply for This Category
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
