"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter, FadeIn } from "@/components/shared/animations";
import { STATS } from "@/lib/constants";

function HeroIllustration() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative w-full aspect-square max-w-lg mx-auto"
    >
      {/* Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-EBN-teal/30 relative"
        >
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-EBN-navy/20 to-EBN-teal/20 backdrop-blur-sm" />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-EBN-teal"
              style={{
                top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating cards */}
      {[
        { label: "Referrals", value: "₹2.4L", top: "5%", left: "10%", delay: 0 },
        { label: "Members", value: "20K+", top: "15%", right: "0%", delay: 0.5 },
        { label: "Growth", value: "+340%", bottom: "20%", left: "0%", delay: 1 },
        { label: "Meetings", value: "Weekly", bottom: "10%", right: "10%", delay: 1.5 },
      ].map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ opacity: { delay: card.delay + 0.5 }, y: { duration: 4, repeat: Infinity, delay: card.delay } }}
          className="absolute glass dark:glass-dark rounded-xl px-4 py-3 shadow-xl"
          style={{ top: card.top, left: card.left, right: card.right, bottom: card.bottom }}
        >
          <p className="text-xs text-muted">{card.label}</p>
          <p className="text-lg font-bold gradient-text">{card.value}</p>
        </motion.div>
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        <motion.path
          d="M200,200 Q250,100 300,150 T350,200"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#143055" />
            <stop offset="100%" stopColor="#16999A" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-EBN-light via-white to-EBN-teal/5 dark:from-EBN-dark dark:via-EBN-dark dark:to-EBN-navy/20" />
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-EBN-navy/5 via-transparent to-EBN-teal/10" />

      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-EBN-teal/20"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <div className="container-EBN relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass dark:glass-dark mb-6">
                <Sparkles className="w-4 h-4 text-EBN-teal" />
                <span className="text-sm font-medium text-nbn-navy dark:text-white">India&apos;s #1 Entrepreneur Network</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-EBN-navy dark:text-white leading-[1.1] mb-6">
                Grow Your Business Through{" "}
                <span className="gradient-text">Trusted Relationships</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted leading-relaxed mb-8 max-w-xl">
                Join thousands of entrepreneurs who generate quality referrals through structured networking. Build lasting partnerships that transform your business.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/signup">
                  <Button size="lg" className="group">
                    Join EBN
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/chapters">
                  <Button variant="secondary" size="lg">Find a Chapter</Button>
                </Link>
                <Button variant="outline" size="lg" className="group">
                  <Play className="w-4 h-4 fill-current" />
                  Watch Video
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-heading font-bold gradient-text">
                      <AnimatedCounter
                        value={stat.value}
                        prefix={"prefix" in stat ? stat.prefix : ""}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="text-sm text-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="left" delay={0.3}>
            <HeroIllustration />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
