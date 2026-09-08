"use client";

import { cn } from "@/lib/utils";
import type { EmeraldCategoryRecord } from "@/lib/data/emerald-directory";
import { GlassCard } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  category: EmeraldCategoryRecord;
  onViewMember?: () => void;
  onApply?: () => void;
  compact?: boolean;
}

export function CategoryCard({ category, onViewMember, onApply, compact }: CategoryCardProps) {
  const isOpen = category.status === "open";

  return (
    <div onClick={isOpen ? onApply : onViewMember} className="h-full">
    <GlassCard
      hover
      className={cn(
        "h-full cursor-pointer",
        !isOpen && "border-slate-200/80 bg-slate-50/60 dark:border-slate-700/50 dark:bg-slate-800/40"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
              isOpen
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-200/90 text-slate-600"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", isOpen ? "bg-emerald-500" : "bg-slate-500")} />
            {isOpen ? "Open" : "Represented"}
          </span>
          <h4 className={cn("mt-3 font-heading font-bold text-EBN-navy", compact ? "text-sm" : "text-base")}>
            {category.name}
          </h4>
          {!compact && (
            <p className="mt-1 text-xs text-muted">{category.industry}</p>
          )}
        </div>
      </div>
      <div className="mt-4" onClick={(e) => e.stopPropagation()}>
        {isOpen ? (
          <Button size="sm" className="w-full" onClick={onApply}>
            Apply for Category
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="w-full" onClick={onViewMember}>
            View Member
          </Button>
        )}
      </div>
    </GlassCard>
    </div>
  );
}
