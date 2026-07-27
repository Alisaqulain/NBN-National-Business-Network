import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/animations";
import { CategoriesGrid } from "./categories-grid";

export const metadata: Metadata = {
  title: "Business Categories",
  description:
    "Explore 50+ business categories in the NBN network. Find professionals in construction, technology, healthcare, finance, and every industry that drives Indian business.",
};

export default function CategoriesPage() {
  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nbn-light via-white to-nbn-teal/5 dark:from-nbn-dark dark:via-nbn-dark dark:to-nbn-navy/20" />
        <div className="container-nbn relative z-10">
          <FadeIn>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-nbn-teal/10 text-nbn-teal border border-nbn-teal/20">
              Business Categories
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-nbn-navy dark:text-white mb-6 max-w-4xl leading-tight">
              Every Industry,{" "}
              <span className="gradient-text">Every Opportunity</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-8">
              NBN chapters represent professionals across 50+ industries. Find members
              in your category or discover referral partners in complementary fields.
            </p>
            <Link href="/signup">
              <Button size="lg" className="group">
                Join Your Category
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
      <CategoriesGrid />
    </>
  );
}
