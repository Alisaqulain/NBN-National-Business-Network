"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/animations";
import { EMERALD } from "@/lib/constants";

export function ApplicationSuccess() {
  return (
    <GlassCard hover={false} className="p-10 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-EBN-teal/10">
        <Check className="h-8 w-8 text-EBN-teal" />
      </div>
      <h2 className="mb-3 font-heading text-2xl font-bold text-EBN-navy">Application Received</h2>
      <p className="mb-2 text-muted">
        Thank you for applying to the {EMERALD.chapter} Chapter of {EMERALD.community}.
      </p>
      <p className="mb-2 text-muted">
        Your application has been successfully submitted for review.
      </p>
      <p className="mb-8 text-muted">
        Our team will contact you regarding the next steps.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/emerald#directory">
          <Button variant="outline">Back to Categories</Button>
        </Link>
        <Link href="/emerald#contact">
          <Button>Contact Emerald Team</Button>
        </Link>
      </div>
    </GlassCard>
  );
}
