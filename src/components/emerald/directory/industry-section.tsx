"use client";

import type { IndustryGroup } from "@/lib/data/emerald-directory";
import { FadeIn } from "@/components/shared/animations";
import { CategoryCard } from "./category-card";
import { MemberCard } from "./member-card";

interface IndustrySectionProps {
  group: IndustryGroup;
  onViewMember: (memberId: string) => void;
  onApplyCategory: (categoryId: string) => void;
}

export function IndustrySection({ group, onViewMember, onApplyCategory }: IndustrySectionProps) {
  const representedCount = group.represented.length;
  const openCount = group.open.length;

  if (representedCount === 0 && openCount === 0 && group.members.length === 0) return null;

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
          <h3 className="font-heading text-xl font-bold text-EBN-navy md:text-2xl">
            {group.industry}
          </h3>
          <div className="flex gap-4 text-xs font-medium text-muted">
            <span>{representedCount} represented</span>
            <span>{openCount} open</span>
          </div>
        </div>
      </FadeIn>

      {group.members.length > 0 && (
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
            Represented Members
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.members.map((member, i) => (
              <FadeIn key={member.id} delay={i * 0.04}>
                <MemberCard member={member} onView={() => onViewMember(member.id)} />
              </FadeIn>
            ))}
          </div>
        </div>
      )}

      {group.open.length > 0 && (
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Open Categories
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.open.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 0.03}>
                <CategoryCard
                  category={cat}
                  compact
                  onApply={() => onApplyCategory(cat.id)}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      )}

      {group.represented.length > 0 && group.members.length === 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {group.represented.map((cat, i) => (
            <FadeIn key={cat.id} delay={i * 0.03}>
              <CategoryCard
                category={cat}
                onViewMember={() => cat.memberId && onViewMember(cat.memberId)}
              />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
