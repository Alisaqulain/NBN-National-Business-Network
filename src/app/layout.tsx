import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ConditionalShell } from "@/components/layout/conditional-shell";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NBN – National Business Network | Grow Through Trusted Relationships",
    template: "%s | NBN – National Business Network",
  },
  description:
    "Join India's premier business networking platform. Generate quality referrals, attend weekly meetings, and grow your business through trusted professional relationships.",
  keywords: ["business networking", "referrals", "BNI alternative", "India business network", "entrepreneurs"],
  authors: [{ name: "National Business Network" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nbn.in",
    siteName: "National Business Network",
    title: "NBN – National Business Network",
    description: "Grow your business through trusted relationships.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NBN – National Business Network",
    description: "Grow your business through trusted relationships.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://nbn.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-body antialiased">
        <Providers>
          <ConditionalShell>{children}</ConditionalShell>
        </Providers>
      </body>
    </html>
  );
}
