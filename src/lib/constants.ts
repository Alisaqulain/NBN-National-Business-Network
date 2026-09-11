export const BRAND = {
  name: "Entrepreneur Business Network",
  shortName: "EBN",
  logo: "/EBN Logo.png",
  tagline: "Grow Your Business Through Trusted Relationships",
  colors: {
    navy: "#143055",
    teal: "#16999A",
    background: "#FFFFFF",
    dark: "#0F172A",
    lightGray: "#F7F8FA",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Emerald", href: "/emerald" },
  { label: "About", href: "/about" },
  { label: "Apply", href: "/apply" },
  { label: "Chapters", href: "/chapters" },
  { label: "Events", href: "/events" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Business Categories", href: "/categories" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const STATS = [
  { label: "Members Across India", value: 2000, suffix: "+" },
  { label: "Bangalore Network", value: 100, suffix: "+" },
  { label: "Chapters", value: 500, suffix: "+" },
  { label: "Business Generated", value: 500, prefix: "₹", suffix: "Cr+" },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Business Referrals",
    description: "Receive qualified, pre-vetted referrals from trusted business professionals in your network.",
    icon: "Handshake",
  },
  {
    title: "Weekly Meetings",
    description: "Structured weekly chapter meetings designed to build relationships and generate consistent referrals.",
    icon: "Calendar",
  },
  {
    title: "Business Education",
    description: "Access exclusive workshops, webinars, and training programs to sharpen your business skills.",
    icon: "GraduationCap",
  },
  {
    title: "Leadership",
    description: "Develop leadership skills through chapter roles, regional events, and mentorship programs.",
    icon: "Award",
  },
  {
    title: "Global Community",
    description: "Connect with entrepreneurs across India and expand your business reach nationally.",
    icon: "Globe",
  },
  {
    title: "Verified Members",
    description: "Every member is verified, ensuring you network with genuine business professionals.",
    icon: "ShieldCheck",
  },
] as const;

export const BUSINESS_CATEGORIES = [
  "Construction", "IT & Technology", "Education", "Healthcare", "Finance",
  "Legal", "Real Estate", "Manufacturing", "Retail", "Marketing",
  "Hospitality", "Automobile", "Consulting", "Insurance", "Logistics",
  "Architecture", "Interior Design", "Food & Beverage", "Travel", "Media",
] as const;

export const ALL_BUSINESS_CATEGORIES = [
  ...BUSINESS_CATEGORIES,
  "Agriculture", "Pharmaceuticals", "Textiles", "Energy", "Telecommunications",
  "E-commerce", "Beauty & Wellness", "Sports & Fitness", "Entertainment", "Photography",
  "Printing", "Security Services", "Cleaning Services", "Plumbing", "Electrical",
  "HVAC", "Landscaping", "Event Management", "Wedding Planning", "Coaching",
  "HR & Recruitment", "Accounting", "Tax Advisory", "Import & Export", "Packaging",
  "Warehousing", "Freight Forwarding", "Aviation", "Marine", "Mining",
  "Chemical", "Biotechnology", "Veterinary", "Pet Services", "Childcare",
  "Senior Care", "Non-profit", "Public Relations", "Cybersecurity", "Cloud Services",
  "SaaS", "Mobile Apps", "Web Development", "AI & Machine Learning", "Data Analytics",
  "Blockchain", "Renewable Energy", "Waste Management", "Water Treatment", "Furniture",
  "Jewelry", "Fashion", "Art & Design", "Music", "Publishing",
  "Translation", "Research", "Training & Development",
] as const;

export type CategoryGroup =
  | "All"
  | "Professional Services"
  | "Technology"
  | "Trade & Industry"
  | "Consumer & Lifestyle";

export const CATEGORY_GROUPS: Record<
  Exclude<CategoryGroup, "All">,
  readonly string[]
> = {
  "Professional Services": [
    "Legal", "Finance", "Consulting", "Accounting", "Tax Advisory",
    "Insurance", "HR & Recruitment", "Coaching", "Training & Development", "Research",
  ],
  Technology: [
    "IT & Technology", "E-commerce", "Cybersecurity", "Cloud Services", "SaaS",
    "Mobile Apps", "Web Development", "AI & Machine Learning", "Data Analytics", "Blockchain",
    "Telecommunications",
  ],
  "Trade & Industry": [
    "Construction", "Manufacturing", "Logistics", "Import & Export", "Packaging",
    "Warehousing", "Freight Forwarding", "Mining", "Chemical", "Energy",
    "Renewable Energy", "Automobile", "Aviation", "Marine",
  ],
  "Consumer & Lifestyle": [
    "Retail", "Hospitality", "Food & Beverage", "Travel", "Beauty & Wellness",
    "Sports & Fitness", "Entertainment", "Fashion", "Jewelry", "Furniture",
    "Wedding Planning", "Event Management", "Photography", "Music", "Art & Design",
  ],
} as const;

export const EMERALD = {
  community: "Elite Explorers",
  chapter: "Emerald",
  launchDate: "2026-09-28T09:00:00+05:30",
  launchDateDisplay: "28 September 2026",
  networkSize: 2000,
  networkSizeLabel: "2,000+",
  bangaloreMembers: 100,
  bangaloreMembersLabel: "100+",
  phones: ["+91 91136 61064", "+91 95388 74221", "+91 95912 84431"] as const,
  primaryPhone: "+91 91136 61064",
  primaryWhatsApp: "+91 91136 61064",
} as const;

export const EMERALD_WELCOME_POINTS = [
  { title: "Structured Networking", description: "Regular chapter meetings designed to build trust and generate meaningful business introductions." },
  { title: "Business Referrals", description: "Exchange qualified referrals with professionals who understand the value of mutual growth." },
  { title: "Professional Relationships", description: "Develop lasting connections with entrepreneurs, founders, and service providers." },
  { title: "Strategic Partnerships", description: "Discover collaboration opportunities with businesses that complement your services." },
  { title: "Cross-Industry Connections", description: "Connect across sectors to expand your reach beyond a single market or niche." },
  { title: "Business Growth", description: "Leverage the collective strength of a focused business community to accelerate growth." },
  { title: "Knowledge Sharing", description: "Participate in mentoring, workshops, and professional development activities." },
  { title: "Community Participation", description: "Contribute actively to a culture of accountability, support, and shared success." },
] as const;

export const EMERALD_WHY_JOIN = [
  { title: "Build Strong Connections", description: "Meet business owners and professionals from complementary industries.", icon: "Users" },
  { title: "Generate Referrals", description: "Create opportunities to exchange relevant business referrals.", icon: "Handshake" },
  { title: "Expand Your Reach", description: "Connect with professionals within Bangalore and across India.", icon: "Globe" },
  { title: "Build Strategic Partnerships", description: "Discover collaboration opportunities with businesses that complement your services.", icon: "Share2" },
  { title: "Grow Your Business Network", description: "Develop meaningful professional relationships rather than simply collecting contacts.", icon: "TrendingUp" },
  { title: "Learn & Grow", description: "Participate in knowledge-sharing, mentoring, and professional development activities.", icon: "GraduationCap" },
] as const;

export const EMERALD_STATS = [
  { label: "Network Professionals", value: 2000, suffix: "+" },
  { label: "Bangalore Community", value: 100, suffix: "+" },
  { label: "Business Connections", value: 0, suffix: "", display: "Pan-India" },
  { label: "Emerald Launch", value: 0, suffix: "", display: "28 Sept 2026" },
] as const;

export {
  EMERALD_CATEGORIES,
  OPEN_CATEGORIES as AVAILABLE_CATEGORIES,
  REPRESENTED_CATEGORIES,
  EMERALD_MEMBERS,
  EMERALD_INDUSTRIES as EMERALD_MEMBER_SECTORS,
} from "./data/emerald-directory";
export type {
  EmeraldCategoryRecord as EmeraldCategoryItem,
  CategoryStatus,
  EmeraldMemberRecord as EmeraldMember,
} from "./data/emerald-directory";

export const MEMBERSHIP_PLANS = [
  {
    id: "individual",
    name: "Individual",
    monthly: 2999,
    yearly: 29999,
    features: ["1 Chapter Access", "Weekly Meetings", "Member Directory", "Basic Analytics", "Email Support"],
  },
  {
    id: "professional",
    name: "Professional",
    monthly: 4999,
    yearly: 49999,
    popular: true,
    features: ["2 Chapter Access", "Priority Referrals", "Advanced Analytics", "Event Discounts", "Business Templates", "Priority Support"],
  },
  {
    id: "corporate",
    name: "Corporate",
    monthly: 9999,
    yearly: 99999,
    features: ["5 Team Members", "Multi-Chapter Access", "Dedicated Account Manager", "Custom Branding", "API Access", "24/7 Support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: 19999,
    yearly: 199999,
    features: ["Unlimited Team Members", "National Access", "White-label Portal", "Custom Integrations", "Executive Coaching", "Dedicated Success Manager"],
  },
] as const;
