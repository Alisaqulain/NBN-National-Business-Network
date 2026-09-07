"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { SectionHeading, FadeIn } from "@/components/shared/animations";
import { motion } from "framer-motion";

const categoryIcons: Record<string, string> = {
  Construction: "🏗️", "IT & Technology": "💻", Education: "📚", Healthcare: "🏥",
  Finance: "💰", Legal: "⚖️", "Real Estate": "🏠", Manufacturing: "🏭",
  Retail: "🛍️", Marketing: "📢", Hospitality: "🏨", Automobile: "🚗",
};

export function CategoriesPreview() {
  return (
    <section className="section-padding premium-section">
      <div className="container-EBN">
        <SectionHeading
          badge="Categories"
          title="Every Industry, Every Opportunity"
          subtitle="Connect with professionals across 50+ business categories."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {BUSINESS_CATEGORIES.map((cat, i) => (
            <FadeIn key={cat} delay={i * 0.05}>
              <motion.div whileHover={{ y: -4, scale: 1.03 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  href={`/categories?cat=${encodeURIComponent(cat)}`}
                  className="block p-5 rounded-2xl glass dark:glass-dark text-center hover:shadow-xl transition-shadow group"
                >
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">
                    {categoryIcons[cat] ?? "💼"}
                  </span>
                  <span className="text-sm font-semibold text-EBN-navy dark:text-white group-hover:text-EBN-teal transition-colors">
                    {cat}
                  </span>
                </Link>
              </motion.div>
            </FadeIn>
          ))}
          <FadeIn delay={0.5}>
            <Link
              href="/categories"
              className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-EBN-teal/30 text-EBN-teal hover:bg-EBN-teal/5 transition-colors h-full min-h-[120px]"
            >
              <span className="text-2xl mb-2">+30</span>
              <span className="text-sm font-semibold">More Categories</span>
            </Link>
          </FadeIn>
        </div>

        <FadeIn className="text-center mt-10">
          <Link href="/categories">
            <Button size="lg" className="group">
              Explore All Categories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
