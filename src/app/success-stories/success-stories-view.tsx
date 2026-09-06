"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Play,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  GlassCard,
  SectionHeading,
  AnimatedCounter,
} from "@/components/shared/animations";
import { STATS } from "@/lib/constants";
import { SUCCESS_STORIES, FEATURED_VIDEO } from "@/lib/data/success-stories";

export function SuccessStoriesView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const next = () => setActiveIndex((i) => (i + 1) % SUCCESS_STORIES.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);

  const active = SUCCESS_STORIES[activeIndex];

  return (
    <div className="pt-28 pb-20">
      <div className="container-EBN">
        <SectionHeading
          badge="Success Stories"
          title="Real Results, Real People"
          subtitle="Discover how Indian entrepreneurs transformed their businesses through EBN's referral-based networking."
        />

        {/* Impact Stats */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {STATS.map((stat) => (
              <GlassCard key={stat.label} hover={false} className="text-center">
                <p className="text-3xl font-heading font-bold text-EBN-navy dark:text-white">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={"prefix" in stat ? stat.prefix : ""}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </FadeIn>

        {/* Video Testimonial Section */}
        <FadeIn>
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <div className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer">
              {!isPlaying ? (
                <>
                  <Image
                    src={FEATURED_VIDEO.thumbnail}
                    alt={FEATURED_VIDEO.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-EBN-navy/40 flex flex-col items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                      aria-label="Play video"
                    >
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </button>
                    <p className="text-white/80 text-sm mt-4">
                      {FEATURED_VIDEO.duration} · {FEATURED_VIDEO.views} views
                    </p>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-EBN-navy flex flex-col items-center justify-center text-white p-8">
                  <Play className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-center text-lg font-heading">
                    Video player would load here
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-4"
                    onClick={() => setIsPlaying(false)}
                  >
                    Close Preview
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-EBN-teal/10 text-EBN-teal border border-EBN-teal/20 w-fit">
                Featured Documentary
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-EBN-navy dark:text-white mb-4">
                {FEATURED_VIDEO.title}
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                {FEATURED_VIDEO.description}
              </p>
              <Button onClick={() => setIsPlaying(true)} className="w-fit">
                <Play className="w-4 h-4 fill-current" />
                Watch Now
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Carousel */}
        <FadeIn>
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-heading font-bold text-EBN-navy dark:text-white">
                Member Success Carousel
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prev} aria-label="Previous story">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={next} aria-label="Next story">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active._id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <GlassCard hover={false} className="md:flex gap-8 items-center">
                    <div className="shrink-0 mx-auto md:mx-0">
                      <Image
                        src={active.image}
                        alt={active.name}
                        width={160}
                        height={160}
                        className="rounded-2xl object-cover ring-4 ring-EBN-teal/20"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-EBN-teal/10 text-EBN-teal">
                          {active.category}
                        </span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3.5 h-3.5 fill-EBN-teal text-EBN-teal" />
                          ))}
                        </div>
                      </div>
                      <h4 className="text-xl font-heading font-bold text-EBN-navy dark:text-white">
                        {active.name}
                      </h4>
                      <p className="text-EBN-teal font-medium mb-4">{active.business}</p>
                      <p className="text-muted italic leading-relaxed mb-6">
                        &ldquo;{active.quote}&rdquo;
                      </p>
                      <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-EBN-navy/5 dark:bg-white/5">
                        <div className="text-center">
                          <p className="text-xs text-muted mb-1">Before</p>
                          <p className="font-bold text-EBN-navy dark:text-white">
                            {active.growthBefore}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted mb-1">After</p>
                          <p className="font-bold text-EBN-teal">{active.growthAfter}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted mb-1 flex items-center justify-center gap-1">
                            <TrendingUp className="w-3 h-3" /> Growth
                          </p>
                          <p className="font-bold text-green-600">{active.revenueIncrease}</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </AnimatePresence>

              {/* Carousel dots */}
              <div className="flex justify-center gap-2 mt-6">
                {SUCCESS_STORIES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === activeIndex ? "gradient-bg w-8" : "bg-EBN-navy/20"
                    }`}
                    aria-label={`Go to story ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Success Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story, i) => (
            <FadeIn key={story._id} delay={i * 0.1}>
              <GlassCard className="h-full flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover ring-2 ring-EBN-teal/30"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-EBN-navy dark:text-white">
                      {story.name}
                    </h4>
                    <p className="text-sm text-muted">{story.business}</p>
                    <span className="text-xs text-EBN-teal">{story.category}</span>
                  </div>
                </div>
                <p className="text-muted leading-relaxed mb-6 flex-1 italic text-sm">
                  &ldquo;{story.quote.slice(0, 120)}...&rdquo;
                </p>
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-EBN-navy/5 dark:bg-white/5 text-center">
                  <div>
                    <p className="text-[10px] text-muted uppercase">Before</p>
                    <p className="font-bold text-sm text-EBN-navy dark:text-white">
                      {story.growthBefore}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase">After</p>
                    <p className="font-bold text-sm text-EBN-teal">{story.growthAfter}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase">Growth</p>
                    <p className="font-bold text-sm text-green-600">{story.revenueIncrease}</p>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-16">
          <Link href="/membership">
            <Button size="lg" className="group">
              Start Your Success Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
