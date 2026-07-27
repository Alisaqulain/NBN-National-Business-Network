import Link from "next/link";
import Image from "next/image";
import { Share2, MessageCircle, Globe, Video, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FOOTER_LINKS = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Careers", href: "/contact" },
    { label: "Partners", href: "/about#partners" },
  ],
  Membership: [
    { label: "Plans", href: "/membership" },
    { label: "Benefits", href: "/membership#benefits" },
    { label: "Join Now", href: "/signup" },
    { label: "FAQ", href: "/about#faq" },
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
    <footer className="bg-nbn-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-nbn-navy/50 to-nbn-teal/20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-nbn-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nbn-navy/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-nbn relative pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt="NBN Logo" width={140} height={48} className="h-12 w-auto" />
              <div>
                <span className="font-heading font-bold text-xl">NBN</span>
                <span className="block text-xs text-white/60 tracking-wider uppercase">National Business Network</span>
              </div>
            </Link>
            <p className="text-white/60 mb-6 leading-relaxed max-w-sm">
              India&apos;s premier business networking platform connecting entrepreneurs through trusted relationships and quality referrals.
            </p>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-nbn-teal shrink-0" />
                <span>123 Business Park, Bandra Kurla Complex, Mumbai 400051</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-nbn-teal shrink-0" />
                <span>+91 1800-NBN-NETWORK</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-nbn-teal shrink-0" />
                <span>hello@nbn.in</span>
              </div>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-nbn-teal transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-10 pb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-heading font-semibold mb-2">Stay Updated</h4>
              <p className="text-sm text-white/60 mb-4">Get networking tips and event updates in your inbox.</p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/10 text-white placeholder:text-white/40 min-w-[280px]"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} National Business Network. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-nbn-teal/20 hover:text-nbn-teal transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
