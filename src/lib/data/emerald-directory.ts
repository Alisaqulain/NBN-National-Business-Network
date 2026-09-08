import { slugify } from "@/lib/utils";

export type CategoryStatus = "open" | "represented";

export interface EmeraldMemberRecord {
  id: string;
  name: string;
  category: string;
  company?: string;
  industry: string;
  description?: string;
  weeklySpecificAsk?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface EmeraldCategoryRecord {
  id: string;
  name: string;
  industry: string;
  status: CategoryStatus;
  memberId?: string;
}

export const EMERALD_INDUSTRIES = [
  "Health, Pharma & Wellness",
  "Funded Startups",
  "Apartment Associations",
  "Education",
  "Weddings & Celebrations",
  "High Net Worth Individuals",
  "Micro, Small & Medium Enterprises",
  "Industrial & Infrastructure",
  "HORECA",
  "Multimedia & Branding",
  "Planning & Construction",
  "Interiors & Furnishing",
  "Corporate",
  "New Members",
] as const;

export type EmeraldIndustry = (typeof EMERALD_INDUSTRIES)[number];

/** Verified member data — add entries from supplied member list only */
export const EMERALD_MEMBERS: EmeraldMemberRecord[] = [
  {
    id: "prashanth-v-swamy",
    name: "Prashanth V. Swamy",
    category: "Ayurveda & Wellness",
    company: "Badri Ayur Kendra",
    industry: "Health, Pharma & Wellness",
    description:
      "One-stop Ayurveda solutions including consultation, Panchakarma therapies and pregnancy yoga.",
    phone: "98802 11115",
    email: "prashanth.vswamy@gmail.com",
    website: "badriayurkendra.com",
  },
];

const OPEN_BY_INDUSTRY: Record<string, readonly string[]> = {
  "Health, Pharma & Wellness": [
    "Pharma & Food Licensing Consultant",
    "Hospital Consultant",
    "Surgical Equipment",
    "Fitness Trainer",
    "Dermatologist",
    "Diagnostic Laboratory",
  ],
  "Funded Startups": ["Startup Mentors", "Angel Investors"],
  Education: [
    "Apartment Management Software Companies",
    "Admission Consultant",
    "Overseas Education Consultant",
  ],
  "Weddings & Celebrations": ["Makeup Artist"],
  "High Net Worth Individuals": [
    "4 Wheeler Showroom",
    "Club Membership Aggregator",
    "Car Accessories Supplier",
  ],
  "Micro, Small & Medium Enterprises": [
    "Car Service",
    "Property Valuators",
    "Car Accessory Dealer",
    "Debt Recovery Agent",
    "Barcode Equipment Dealer",
    "2 Wheeler Showroom",
    "Tyre Dealer",
    "Electrical Appliances Dealer",
  ],
  "Industrial & Infrastructure": ["Corrugated Box Manufacturer", "UPS Supplier"],
  HORECA: ["Coffee Vendors", "Drinking Water Suppliers"],
  "Multimedia & Branding": [
    "Modelling Agency",
    "Content & Copywriter",
    "Web Designer & Developer",
  ],
  "Planning & Construction": [
    "Hollow Block / M-Sand Dealers",
    "Plumbing Contractors",
    "Lift Vendor",
    "Government Contractors",
    "Fire & Safety Equipment",
    "Electrical Material Supplier",
    "Painting Contractor",
    "Ready Mix Concrete Supplier",
    "Borewell Driller",
  ],
  "Interiors & Furnishing": [
    "Commercial Kitchen Supplier",
    "Hardware Dealer",
    "Glass Dealers",
    "Centralised Vacuum Cleaning System",
    "Water Softener Dealer",
  ],
  Corporate: ["EV Aggregator"],
};

function buildCategories(): EmeraldCategoryRecord[] {
  const categories: EmeraldCategoryRecord[] = [];
  const memberByCategory = new Map(
    EMERALD_MEMBERS.map((m) => [m.category.toLowerCase(), m])
  );

  for (const [industry, names] of Object.entries(OPEN_BY_INDUSTRY)) {
    for (const name of names) {
      const member = memberByCategory.get(name.toLowerCase());
      if (member) {
        categories.push({
          id: slugify(name),
          name,
          industry,
          status: "represented",
          memberId: member.id,
        });
      } else {
        categories.push({
          id: slugify(name),
          name,
          industry,
          status: "open",
        });
      }
    }
  }

  for (const member of EMERALD_MEMBERS) {
    const exists = categories.some(
      (c) => c.name.toLowerCase() === member.category.toLowerCase()
    );
    if (!exists) {
      categories.push({
        id: slugify(member.category),
        name: member.category,
        industry: member.industry,
        status: "represented",
        memberId: member.id,
      });
    }
  }

  return categories;
}

export const EMERALD_CATEGORIES = buildCategories();

export const OPEN_CATEGORIES = EMERALD_CATEGORIES.filter((c) => c.status === "open");
export const REPRESENTED_CATEGORIES = EMERALD_CATEGORIES.filter((c) => c.status === "represented");

export function getMemberById(id: string): EmeraldMemberRecord | undefined {
  return EMERALD_MEMBERS.find((m) => m.id === id);
}

export function getCategoryById(id: string): EmeraldCategoryRecord | undefined {
  return EMERALD_CATEGORIES.find((c) => c.id === id);
}

export function getCategoryByName(name: string): EmeraldCategoryRecord | undefined {
  return EMERALD_CATEGORIES.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export function getIndustriesWithData(): EmeraldIndustry[] {
  const industries = new Set<string>();
  for (const c of EMERALD_CATEGORIES) industries.add(c.industry);
  for (const m of EMERALD_MEMBERS) industries.add(m.industry);
  return EMERALD_INDUSTRIES.filter((i) => industries.has(i));
}

export interface IndustryGroup {
  industry: string;
  represented: EmeraldCategoryRecord[];
  open: EmeraldCategoryRecord[];
  members: EmeraldMemberRecord[];
}

export function getIndustryGroups(): IndustryGroup[] {
  const industries = getIndustriesWithData();
  return industries.map((industry) => {
    const cats = EMERALD_CATEGORIES.filter((c) => c.industry === industry);
    const memberIds = new Set(
      cats.filter((c) => c.memberId).map((c) => c.memberId!)
    );
    return {
      industry,
      represented: cats.filter((c) => c.status === "represented"),
      open: cats.filter((c) => c.status === "open"),
      members: EMERALD_MEMBERS.filter(
        (m) => m.industry === industry || memberIds.has(m.id)
      ),
    };
  });
}

export function searchDirectory(query: string, statusFilter: string, industryFilter: string) {
  const q = query.trim().toLowerCase();
  let categories = [...EMERALD_CATEGORIES];
  let members = [...EMERALD_MEMBERS];

  if (statusFilter === "represented") {
    categories = categories.filter((c) => c.status === "represented");
  } else if (statusFilter === "open") {
    categories = categories.filter((c) => c.status === "open");
  }

  if (industryFilter && industryFilter !== "All") {
    categories = categories.filter((c) => c.industry === industryFilter);
    members = members.filter((m) => m.industry === industryFilter);
  }

  if (q) {
    categories = categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q)
    );
    members = members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        (m.company?.toLowerCase().includes(q) ?? false) ||
        m.industry.toLowerCase().includes(q) ||
        (m.description?.toLowerCase().includes(q) ?? false)
    );
    const memberCategoryIds = new Set(members.map((m) => m.category.toLowerCase()));
    for (const m of members) {
      if (!categories.some((c) => c.memberId === m.id)) {
        const cat = EMERALD_CATEGORIES.find((c) => c.memberId === m.id);
        if (cat && !categories.includes(cat)) categories.push(cat);
      }
    }
  }

  return { categories, members };
}

/** All category names available for application dropdown (open only) */
export function getApplicableCategories(): EmeraldCategoryRecord[] {
  return OPEN_CATEGORIES;
}
