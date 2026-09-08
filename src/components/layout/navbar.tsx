"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Search, Menu, X, ChevronDown,
  Handshake, Calendar, GraduationCap, Award, ShieldCheck,
  BookOpen, Users, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MEGA_MENU = [
  {
    title: "Emerald",
    icon: Users,
    links: [
      { label: "Emerald Chapter", href: "/emerald" },
      { label: "Apply to Join", href: "/apply" },
      { label: "Open Categories", href: "/emerald#directory" },
    ],
  },
  {
    title: "Chapters",
    icon: Building2,
    links: [
      { label: "Find a Chapter", href: "/chapters" },
      { label: "Start a Chapter", href: "/contact" },
      { label: "Chapter Leaders", href: "/about#leadership" },
    ],
  },
  {
    title: "Resources",
    icon: BookOpen,
    links: [
      { label: "Templates", href: "/resources" },
      { label: "Guides", href: "/resources#guides" },
      { label: "Business Tips", href: "/blog" },
    ],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Handshake, Calendar, GraduationCap, Award, ShieldCheck,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-slate-200/80 bg-white/95 shadow-[0_4px_24px_rgba(20,48,85,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95 dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
            : "bg-white/70 backdrop-blur-md dark:bg-slate-950/70"
        )}
      >
        <motion.div
          style={{ opacity: navOpacity }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-EBN-navy/5 to-EBN-teal/5 dark:from-EBN-teal/5 dark:to-EBN-navy/10"
        />
        <nav className="container-EBN relative">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link href="/" className="group flex shrink-0 items-center" onClick={closeMobile}>
              <Image
                src={BRAND.logo}
                alt={`${BRAND.shortName} – ${BRAND.name}`}
                width={160}
                height={48}
                className="h-8 w-auto transition-transform group-hover:scale-105 md:h-10"
                priority
              />
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative px-3 py-2 text-sm font-medium text-EBN-navy/80 transition-colors hover:text-EBN-teal dark:text-slate-200/90 dark:hover:text-EBN-teal"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-EBN-navy to-EBN-teal transition-transform group-hover:scale-x-100" />
                </Link>
              ))}
              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-EBN-navy/80 transition-colors hover:text-EBN-teal dark:text-slate-200/90 dark:hover:text-EBN-teal"
                >
                  More <ChevronDown className={cn("h-4 w-4 transition-transform", megaOpen && "rotate-180")} />
                </button>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full right-0 grid w-[480px] grid-cols-3 gap-6 rounded-2xl glass p-6 shadow-2xl"
                  >
                    {MEGA_MENU.map((section) => (
                      <div key={section.title}>
                        <div className="mb-3 flex items-center gap-2">
                          <section.icon className="h-4 w-4 text-EBN-teal" />
                          <span className="text-sm font-semibold text-EBN-navy dark:text-slate-100">{section.title}</span>
                        </div>
                        <ul className="space-y-2">
                          {section.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className="text-sm text-muted transition-colors hover:text-EBN-teal">
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="rounded-xl p-2 transition-colors hover:bg-EBN-navy/5 dark:hover:bg-white/10"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-EBN-navy dark:text-slate-100" />
              </button>
              <ThemeToggle className="hidden sm:flex" />
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/apply" className="hidden md:block">
                <Button size="sm">Apply</Button>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-xl p-2 lg:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <X className="h-6 w-6 text-EBN-navy dark:text-slate-100" />
                ) : (
                  <Menu className="h-6 w-6 text-EBN-navy dark:text-slate-100" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pb-4"
              >
                <input
                  type="search"
                  placeholder="Search chapters, members, events..."
                  className="h-12 w-full rounded-xl border border-slate-200/80 bg-white/90 px-4 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-EBN-teal dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-EBN-navy/40 backdrop-blur-sm lg:hidden dark:bg-black/60"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-white pt-20 shadow-2xl dark:bg-slate-950 lg:hidden"
            >
              <div className="flex flex-col gap-1 px-5 pb-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-EBN-navy transition-colors hover:bg-EBN-teal/5 dark:text-slate-100 dark:hover:bg-EBN-teal/10"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 border-t border-slate-200/80 pt-4 dark:border-slate-800">
                  {MEGA_MENU.map((section) => (
                    <div key={section.title} className="mb-4">
                      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted">
                        {section.title}
                      </p>
                      {section.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          onClick={closeMobile}
                          className="block rounded-lg px-3 py-2 text-sm text-EBN-navy/80 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto space-y-3 border-t border-slate-200/80 p-5 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted">Theme</span>
                  <ThemeToggle />
                </div>
                <Link href="/apply" onClick={closeMobile}>
                  <Button className="w-full">Apply to Join Emerald</Button>
                </Link>
                <Link href="/login" onClick={closeMobile}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export { iconMap };
