"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, GlassCard, SectionHeading } from "@/components/shared/animations";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/data/blog";

export function BlogView() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        search === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        category === "All Categories" || post.category === category;
      return matchesSearch && matchesCategory;
    }).sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [search, category]);

  const featured = BLOG_POSTS[0];

  return (
    <div className="pt-28 pb-20">
      <div className="container-EBN">
        <SectionHeading
          badge="Blog"
          title="Insights & Business Growth"
          subtitle="Expert advice on networking, referrals, leadership, and growing your business in India's competitive market."
        />

        {/* Featured Post */}
        <FadeIn>
          <Link href={`/blog/${featured.slug}`}>
            <GlassCard className="mb-12 overflow-hidden group cursor-pointer">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto min-h-[280px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold gradient-bg text-white">
                    Featured
                  </span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-EBN-teal text-sm font-semibold mb-2">
                    {featured.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-EBN-navy dark:text-white mb-3 group-hover:text-EBN-teal transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {featured.author.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featured.readingTime} min read
                    </span>
                    <span>{format(new Date(featured.publishedAt), "MMM d, yyyy")}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        </FadeIn>

        {/* Search & Categories */}
        <FadeIn>
          <GlassCard hover={false} className="mb-10">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="blog-search" className="mb-2 block">
                  Search Articles
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <Input
                    id="blog-search"
                    placeholder="Search by title, topic, or tag..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="blog-category" className="mb-2 block">
                  Category
                </Label>
                <select
                  id="blog-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-EBN-navy/10 bg-white/80 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-EBN-teal"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {BLOG_CATEGORIES.slice(1).map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={category === cat ? "default" : "outline"}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Blog Grid */}
        {filtered.length === 0 ? (
          <FadeIn>
            <Card className="p-12 text-center">
              <p className="text-muted text-lg">No articles match your search.</p>
            </Card>
          </FadeIn>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <FadeIn key={post._id} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full overflow-hidden group hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-EBN-navy">
                        {post.category}
                      </span>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-heading font-bold text-EBN-navy dark:text-white mb-2 group-hover:text-EBN-teal transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {post.author.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readingTime} min
                          </span>
                        </div>
                        <span>{format(new Date(post.publishedAt), "MMM d")}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-EBN-teal mt-4 group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
