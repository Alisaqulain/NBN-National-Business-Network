import Link from "next/link";
import Image from "next/image";
import { Share2, MessageCircle, Globe, Video, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BRAND, EMERALD } from "@/lib/constants";

const FOOTER_LINKS = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Careers", href: "/contact" },
    { label: "Partners", href: "/about#partners" },
  ],
  Membership: [
    { label: "Apply to Join", href: "/apply" },
    { label: "Emerald Chapter", href: "/emerald" },
    { label: "Open Categories", href: "/emerald#directory" },
    { label: "Benefits", href: "/membership#benefits" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Templates", href: "/resources" },
    { label: "Events", href: "/events" },
    { label: "Success Stories", href: "/success-stories" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Contact", href: "/contact" },
  ],
};

const SOCIAL = [
  { icon: Share2, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: ExternalLink, href: "#", label: "LinkedIn" },
  { icon: Globe, href: "#", label: "Instagram" },
  { icon: Video, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-EBN-light/50 via-white to-EBN-light/30" />
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-EBN-teal/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-EBN-navy/5 blur-3xl" />

      <div className="container-EBN relative pt-20 pb-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src={BRAND.logo}
                alt={`${BRAND.shortName} – ${BRAND.name}`}
                width={180}
                height={52}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mb-6 max-w-sm leading-relaxed text-muted">
              India&apos;s premier entrepreneur networking platform connecting business owners through trusted relationships and quality referrals.
            </p>
            <div className="space-y-3 text-sm text-muted">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-EBN-teal" />
                <span>123 Business Park, Bandra Kurla Complex, Mumbai 400051</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-EBN-teal" />
                <span>+91 1800-EBN-NETWORK</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-EBN-teal" />
                <span>hello@ebn.in</span>
              </div>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-heading font-semibold text-EBN-navy">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-EBN-teal">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-16 rounded-2xl border border-EBN-teal/15 bg-gradient-to-br from-EBN-teal/5 via-white to-EBN-navy/5 p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h4 className="mb-2 font-heading text-lg font-bold text-EBN-navy">{EMERALD.community}</h4>
              <p className="font-heading text-xl font-semibold gradient-text">{EMERALD.chapter} Chapter</p>
              <p className="mt-2 text-sm text-muted">Launching {EMERALD.launchDateDisplay}</p>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-muted">
                {EMERALD.networkSizeLabel} professionals across India | {EMERALD.bangaloreMembersLabel} Bangalore network
              </p>
              <Link href="/emerald" className="mt-3 inline-block text-sm font-medium text-EBN-teal hover:underline">
                Explore Emerald Chapter →
              </Link>
            </div>
            <div className="space-y-2 text-sm text-muted">
              {EMERALD.phones.map((phone) => (
                <div key={phone} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-EBN-teal" />
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-EBN-teal">
                    {phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200/80 py-10">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h4 className="mb-2 font-heading font-semibold text-EBN-navy">Stay Updated</h4>
              <p className="mb-4 text-sm text-muted">Get networking tips and event updates in your inbox.</p>
            </div>
            <div className="flex w-full gap-3 lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="min-w-[280px] border-slate-200/80 bg-white shadow-sm"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 md:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Entrepreneur Business Network. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-EBN-navy shadow-sm transition-all hover:border-EBN-teal/30 hover:bg-EBN-teal/5 hover:text-EBN-teal"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
