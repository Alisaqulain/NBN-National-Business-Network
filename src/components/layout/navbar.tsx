"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Search, Globe, Moon, Sun, Menu, X, ChevronDown,
  Handshake, Calendar, GraduationCap, Award, ShieldCheck,
  BookOpen, Users, Building2, Newspaper,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MEGA_MENU = [
  {
    title: "Membership",
    icon: Users,
    links: [
      { label: "Plans & Pricing", href: "/membership" },
      { label: "Benefits", href: "/membership#benefits" },
      { label: "Join Now", href: "/signup" },
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
  Handshake, Calendar, GraduationCap, Award, Globe, ShieldCheck,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 dark:bg-EBN-dark/90 backdrop-blur-xl shadow-lg shadow-EBN-navy/5 border-b border-EBN-navy/5"
            : "bg-transparent"
        )}
      >
        <motion.div
          style={{ opacity: navOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-EBN-navy/5 to-EBN-teal/5 pointer-events-none"
        />
        <nav className="container-EBN relative">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center group">
              <Image
                src={BRAND.logo}
                alt={`${BRAND.shortName} – ${BRAND.name}`}
                width={160}
                height={48}
                className="h-10 w-auto transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-EBN-navy/80 dark:text-white/80 hover:text-EBN-teal transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-EBN-navy to-EBN-teal scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </Link>
              ))}
              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-EBN-navy/80 dark:text-white/80 hover:text-EBN-teal transition-colors">
                  More <ChevronDown className={cn("w-4 h-4 transition-transform", megaOpen && "rotate-180")} />
                </button>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full right-0 w-[480px] p-6 rounded-2xl glass dark:glass-dark shadow-2xl grid grid-cols-3 gap-6"
                  >
                    {MEGA_MENU.map((section) => (
                      <div key={section.title}>
                        <div className="flex items-center gap-2 mb-3">
                          <section.icon className="w-4 h-4 text-EBN-teal" />
                          <span className="text-sm font-semibold text-EBN-navy dark:text-white">{section.title}</span>
                        </div>
                        <ul className="space-y-2">
                          {section.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className="text-sm text-muted hover:text-EBN-teal transition-colors">
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

            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-xl hover:bg-EBN-navy/5 dark:hover:bg-white/10 transition-colors" aria-label="Search">
                <Search className="w-5 h-5 text-EBN-navy dark:text-white" />
              </button>
              <button className="hidden md:flex p-2 rounded-xl hover:bg-EBN-navy/5 dark:hover:bg-white/10 transition-colors items-center gap-1" aria-label="Language">
                <Globe className="w-5 h-5 text-EBN-navy dark:text-white" />
                <span className="text-xs font-medium text-EBN-navy dark:text-white">EN</span>
              </button>
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-xl hover:bg-EBN-navy/5 dark:hover:bg-white/10 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-EBN-navy" />}
                </button>
              )}
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/signup" className="hidden md:block">
                <Button size="sm">Join EBN</Button>
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl" aria-label="Menu">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {searchOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pb-4">
              <input
                type="search"
                placeholder="Search chapters, members, events..."
                className="w-full h-12 px-4 rounded-xl border border-EBN-navy/10 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-EBN-teal"
                autoFocus
              />
            </motion.div>
          )}
        </nav>
      </motion.header>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed inset-0 z-40 lg:hidden bg-white dark:bg-EBN-dark pt-24 px-6 overflow-y-auto"
        >
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg font-medium text-EBN-navy dark:text-white border-b border-EBN-navy/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <Link href="/login"><Button variant="outline" className="w-full">Login</Button></Link>
            <Link href="/signup"><Button className="w-full">Join EBN</Button></Link>
          </div>
        </motion.div>
      )}
    </>
  );
}

export { iconMap };
