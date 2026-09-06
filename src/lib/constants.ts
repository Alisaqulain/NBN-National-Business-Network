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
  { label: "About", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Chapters", href: "/chapters" },
  { label: "Events", href: "/events" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Business Categories", href: "/categories" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const STATS = [
  { label: "Members", value: 20000, suffix: "+" },
  { label: "Cities", value: 100, suffix: "+" },
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
