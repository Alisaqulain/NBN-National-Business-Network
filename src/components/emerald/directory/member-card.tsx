"use client";

import { Mail, Phone, Globe, ExternalLink } from "lucide-react";
import type { EmeraldMemberRecord } from "@/lib/data/emerald-directory";
import { GlassCard } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";

interface MemberCardProps {
  member: EmeraldMemberRecord;
  onView?: () => void;
}

function formatWebsite(url: string) {
  return url.replace(/^https?:\/\//, "");
}

export function MemberCard({ member, onView }: MemberCardProps) {
  const websiteHref = member.website
    ? member.website.startsWith("http")
      ? member.website
      : `https://${member.website}`
    : undefined;

  return (
    <div onClick={onView} className="h-full cursor-pointer">
    <GlassCard className="flex h-full flex-col">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-200/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
        Represented
      </span>

      <h3 className="mt-3 font-heading text-lg font-bold text-EBN-navy">{member.name}</h3>
      <p className="text-sm font-semibold text-EBN-teal">{member.category}</p>
      {member.company && (
        <p className="mt-1 text-sm font-medium text-EBN-navy/80">{member.company}</p>
      )}

      {member.description && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {member.description}
        </p>
      )}

      {member.weeklySpecificAsk && (
        <div className="mt-3 rounded-xl bg-EBN-light/80 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-EBN-navy/70">
            Weekly Specific Ask
          </p>
          <p className="mt-1 text-xs text-muted">{member.weeklySpecificAsk}</p>
        </div>
      )}

      <div className="mt-4 space-y-1.5 border-t border-slate-200/80 pt-3 text-xs">
        {member.phone && (
          <p className="flex items-center gap-2 text-muted">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            {member.phone}
          </p>
        )}
        {member.email && (
          <p className="flex items-center gap-2 break-all text-muted">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            {member.email}
          </p>
        )}
        {websiteHref && member.website && (
          <p className="flex items-center gap-2 text-muted">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            {formatWebsite(member.website)}
          </p>
        )}
      </div>

      <div className="mt-4" onClick={(e) => e.stopPropagation()}>
        <Button size="sm" variant="outline" className="w-full" onClick={onView}>
          View Member
        </Button>
      </div>
    </GlassCard>
    </div>
  );
}

export function MemberProfileContent({ member }: { member: EmeraldMemberRecord }) {
  const websiteHref = member.website
    ? member.website.startsWith("http")
      ? member.website
      : `https://${member.website}`
    : undefined;

  return (
    <div className="space-y-4">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
          Represented
        </span>
        <h3 className="mt-3 font-heading text-2xl font-bold text-EBN-navy">{member.name}</h3>
        <p className="text-sm font-semibold text-EBN-teal">{member.category}</p>
        {member.company && (
          <p className="mt-1 font-medium text-EBN-navy">{member.company}</p>
        )}
        <p className="mt-1 text-xs text-muted">{member.industry}</p>
      </div>

      {member.description && (
        <p className="text-sm leading-relaxed text-muted">{member.description}</p>
      )}

      {member.weeklySpecificAsk && (
        <div className="rounded-xl bg-EBN-light/80 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-EBN-navy/70">
            Weekly Specific Ask
          </p>
          <p className="mt-1 text-sm text-muted">{member.weeklySpecificAsk}</p>
        </div>
      )}

      <div className="space-y-2 text-sm">
        {member.phone && (
          <a
            href={`tel:${member.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-muted hover:text-EBN-teal"
          >
            <Phone className="h-4 w-4" /> {member.phone}
          </a>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2 break-all text-muted hover:text-EBN-teal"
          >
            <Mail className="h-4 w-4" /> {member.email}
          </a>
        )}
        {websiteHref && member.website && (
          <a
            href={websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-EBN-teal"
          >
            <Globe className="h-4 w-4" />
            {formatWebsite(member.website)}
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {member.phone && (
          <a href={`tel:${member.phone.replace(/\s/g, "")}`}>
            <Button size="sm">Call</Button>
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`}>
            <Button size="sm" variant="secondary">Email</Button>
          </a>
        )}
        {websiteHref && (
          <a href={websiteHref} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline">Visit Website</Button>
          </a>
        )}
      </div>
    </div>
  );
}
