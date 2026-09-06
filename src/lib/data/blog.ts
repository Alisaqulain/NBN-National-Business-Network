import type { BlogPost } from "@/types";

export const BLOG_CATEGORIES = [
  "All Categories",
  "Networking",
  "Business Growth",
  "Leadership",
  "Industry Insights",
  "Member Spotlight",
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    _id: "blog-001",
    title: "5 Referral Strategies That Work for Indian SMEs",
    slug: "referral-strategies-indian-smes",
    excerpt: "Discover proven referral techniques adapted for India's diverse business landscape, from family-run shops to tech startups.",
    content: `
Referrals remain the most cost-effective growth channel for Indian SMEs. Yet many entrepreneurs struggle to build a systematic referral engine. Here are five strategies that EBN members use consistently to generate qualified leads.

## 1. Be Specific About Your Ideal Client

Vague asks like "send me anyone who needs my service" rarely work. Instead, describe your ideal client in detail: industry, company size, location, and pain points. For example, a Mumbai-based CA might say: "I'm looking for GST-registered manufacturing companies in Maharashtra with turnover between ₹5–50 crore who need audit support."

## 2. Give Before You Ask

The EBN philosophy of "Givers Gain" isn't just a slogan. Members who consistently give quality referrals receive 3x more referrals in return. Track your giving ratio monthly — aim for at least 5 quality referrals per month.

## 3. Follow Up Within 24 Hours

Speed matters in India’s competitive market. When you receive a referral, acknowledge it within 24 hours and update the referring member within 48 hours of your first contact attempt.

## 4. Use the REFERRAL Framework

- **R**ecognize the referral giver publicly at chapter meetings
- **E**ducate your network about what you do (weekly 60-second pitch)
- **F**ollow a structured contact process
- **E**valuate and report outcomes
- **R**eward with thank-you notes and reciprocal referrals
- **R**epeat consistently every week
- **A**sk for introductions, not just names
- **L**everage digital tools (EBN app, WhatsApp groups)

## 5. Attend Cross-Chapter Events

Your chapter is your home base, but national events like the EBN Business Expo expose you to members across 100+ cities. Many of our highest-value referrals come from connections made at regional summits.

Start implementing one strategy this week. Small, consistent actions compound into transformational business growth.
    `.trim(),
    category: "Networking",
    author: { name: "Dr. Anil Kapoor", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=450&fit=crop",
    readingTime: 6,
    publishedAt: "2026-07-15T09:00:00+05:30",
    tags: ["referrals", "SME", "networking"],
  },
  {
    _id: "blog-002",
    title: "How Bangalore Tech Founders Are Scaling Through EBN",
    slug: "bangalore-tech-founders-scaling-EBN",
    excerpt: "Inside the EBN Bangalore Tech chapter — where SaaS founders, dev agencies, and IT consultants generate ₹50Cr+ in annual referrals.",
    content: `
Bangalore's startup ecosystem is fiercely competitive. Standing out requires more than a great product — it requires trusted relationships. The EBN Bangalore Tech chapter has become a hub for technology entrepreneurs who want structured, accountable networking.

## The Chapter Profile

With 48 members representing one member per category, the chapter includes SaaS founders, cloud architects, cybersecurity consultants, and digital marketing agencies. Weekly meetings at Embassy Tech Village start at 7:00 AM — before the traffic hits Outer Ring Road.

## Referral Success Stories

In 2025 alone, Bangalore Tech members reported:
- ₹52 crore in closed referral business
- 340 qualified leads exchanged
- 89% member retention rate

## What Makes It Work

**Category exclusivity** ensures no direct competition within the chapter. **Structured agendas** keep meetings focused — 15 minutes for open networking, 45 minutes for referrals and testimonials, 30 minutes for education.

## Tips from Chapter President

"Don't treat EBN as a lead generation tool. Treat it as a relationship-building commitment. The leads follow naturally when trust is established," says Priya Sharma, chapter president and founder of TechVision Solutions.

Whether you're bootstrapped or funded, the Bangalore Tech chapter offers a proven framework for B2B growth in India's Silicon Valley.
    `.trim(),
    category: "Member Spotlight",
    author: { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
    readingTime: 5,
    publishedAt: "2026-07-08T10:30:00+05:30",
    tags: ["Bangalore", "tech", "startups"],
  },
  {
    _id: "blog-003",
    title: "GST Changes 2026: What Every Business Owner Must Know",
    slug: "gst-changes-2026-business-guide",
    excerpt: "A practical breakdown of the latest GST amendments affecting SMEs, with compliance checklists for EBN members.",
    content: `
The GST Council's 2026 updates bring significant changes for Indian businesses. Here's what EBN members need to know to stay compliant and avoid penalties.

## Key Changes

1. **E-invoicing threshold lowered** to ₹5 crore annual turnover (previously ₹10 crore)
2. **Input tax credit rules** tightened for real estate and construction sectors
3. **Quarterly return filing** option extended to businesses up to ₹2 crore turnover
4. **Penalty structure revised** for late filing — now ₹100 per day per return with a cap of ₹5,000

## Action Items for SMEs

- Review your turnover against new e-invoicing thresholds
- Update accounting software for revised ITC rules
- Consider quarterly filing if eligible — reduces compliance burden
- Schedule a GST health check with your CA before September 2026

## EBN Resources

Download our free GST Invoice Template Pack from the Resources section. EBN members also get exclusive access to our GST Compliance Masterclass webinar on September 18.

Staying compliant protects your business reputation — and makes you a more trustworthy referral partner.
    `.trim(),
    category: "Industry Insights",
    author: { name: "CA Ravi Menon", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&h=450&fit=crop",
    readingTime: 7,
    publishedAt: "2026-07-01T08:00:00+05:30",
    tags: ["GST", "compliance", "finance"],
  },
  {
    _id: "blog-004",
    title: "From Chapter Member to Regional Director: A Leadership Journey",
    slug: "chapter-member-to-regional-director",
    excerpt: "Rajesh Mehta shares how EBN leadership roles accelerated both his construction business and personal growth.",
    content: `
Leadership in EBN isn't just about titles — it's about service, accountability, and leading by example. Rajesh Mehta's journey from Mumbai Central chapter member to Western India Regional Director offers lessons for every entrepreneur.

## Starting Point

When Rajesh joined EBN in 2022, Mehta Constructions was doing ₹1.2 crore annually. He joined primarily for referrals but quickly discovered the leadership development track.

## The Leadership Path

1. **Member** (2022) — Focused on giving referrals and attending every meeting
2. **Education Coordinator** (2023) — Organized monthly skill sessions for the chapter
3. **Chapter President** (2024) — Grew membership from 32 to 42, increased referral value by 180%
4. **Regional Director** (2025) — Oversees 45 chapters across Maharashtra and Gujarat

## Business Impact

Revenue grew from ₹1.2Cr to ₹3.6Cr during this period. Rajesh attributes 60% of new business directly to EBN referrals and cross-chapter connections.

## Advice for Aspiring Leaders

"Leadership roles force you to think beyond your own business. You learn delegation, conflict resolution, and strategic planning — skills that directly translate to running a larger company."

EBN offers leadership pathways at chapter, regional, and national levels. Talk to your chapter president about available roles.
    `.trim(),
    category: "Leadership",
    author: { name: "Rajesh Mehta", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=450&fit=crop",
    readingTime: 8,
    publishedAt: "2026-06-22T11:00:00+05:30",
    tags: ["leadership", "Mumbai", "growth"],
  },
  {
    _id: "blog-005",
    title: "Digital Marketing on a Budget: A Guide for EBN Members",
    slug: "digital-marketing-budget-guide",
    excerpt: "Practical digital marketing tactics for Indian SMEs spending less than ₹20,000 per month on marketing.",
    content: `
You don't need a massive marketing budget to build visibility. EBN members across India are winning clients through smart, low-cost digital strategies.

## LinkedIn: Your B2B Powerhouse

- Post 3x per week with industry insights (not sales pitches)
- Engage with 10 prospects' posts daily before asking for connections
- Share member success stories (with permission) to build social proof

## Google Business Profile

For local businesses — restaurants, clinics, retail — a optimized Google Business Profile drives foot traffic. Add photos, respond to reviews within 24 hours, and post weekly updates.

## WhatsApp Business

India runs on WhatsApp. Use broadcast lists (not groups) for event invites and referral thank-yous. Keep messages personal and valuable.

## Content That Converts

Our Social Media Content Calendar (free in Resources) provides 30 days of post ideas. Focus on education over promotion — the 80/20 rule applies.

## Measure What Matters

Track referral source, not vanity metrics. If LinkedIn brings 2 clients per month at zero ad spend, that's better than 10,000 impressions with no conversions.

Digital marketing amplifies your EBN networking — it doesn't replace face-to-face trust building.
    `.trim(),
    category: "Business Growth",
    author: { name: "Kavita Desai", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    readingTime: 6,
    publishedAt: "2026-06-10T09:30:00+05:30",
    tags: ["marketing", "digital", "SME"],
  },
  {
    _id: "blog-006",
    title: "Why Weekly Meetings Beat Monthly Networking Events",
    slug: "weekly-meetings-vs-monthly-networking",
    excerpt: "The science behind EBN's weekly meeting model and why consistency builds stronger referral relationships.",
    content: `
Most networking groups meet monthly. EBN chapters meet weekly. This isn't arbitrary — it's strategic.

## The Trust Equation

Trust builds through repeated, positive interactions. Research on professional networks shows that trust scores increase significantly after 5+ face-to-face meetings. Weekly meetings achieve this threshold in just over a month.

## Accountability Through Frequency

Weekly check-ins create natural accountability. Members report referrals given and received every week. Monthly groups often see "referral amnesia" — good intentions without follow-through.

## The Compound Effect

Consider two entrepreneurs:
- **Monthly networker**: 12 touchpoints per year
- **EBN member**: 48+ touchpoints per year

The EBN member has 4x the relationship depth, leading to higher quality referrals and faster deal closure.

## Making Weekly Meetings Work

- Block the time in your calendar as non-negotiable
- Prepare your 60-second pitch and referral asks in advance
- Arrive 15 minutes early for informal networking
- Follow up on referrals within 24 hours

Consistency is the secret weapon of EBN's highest-performing members.
    `.trim(),
    category: "Networking",
    author: { name: "Dr. Anil Kapoor", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" },
    image: "https://images.unsplash.com/photo-1515187024625-57bc888b4d6f?w=800&h=450&fit=crop",
    readingTime: 5,
    publishedAt: "2026-05-28T10:00:00+05:30",
    tags: ["meetings", "networking", "trust"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, limit);

  return BLOG_POSTS.filter(
    (post) => post.slug !== currentSlug && post.category === current.category
  )
    .slice(0, limit)
    .concat(
      BLOG_POSTS.filter(
        (post) => post.slug !== currentSlug && post.category !== current.category
      ).slice(0, limit)
    )
    .slice(0, limit);
}
