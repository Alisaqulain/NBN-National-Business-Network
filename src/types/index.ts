export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "member" | "admin" | "moderator";
  avatar?: string;
  isVerified: boolean;
  membershipStatus: "active" | "inactive" | "pending" | "expired";
  membershipPlan?: string;
  createdAt: string;
}

export interface Member extends User {
  businessName: string;
  businessLogo?: string;
  businessDescription?: string;
  category: string;
  city: string;
  state: string;
  website?: string;
  linkedin?: string;
  products?: string[];
  services?: string[];
  achievements?: string[];
  isVerified: boolean;
  experience?: number;
}

export interface Chapter {
  _id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  meetingDay: string;
  meetingTime: string;
  memberCount: number;
  category?: string;
  coordinates: { lat: number; lng: number };
  contactEmail: string;
  contactPhone: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  type: "meeting" | "networking" | "expo" | "workshop" | "webinar";
  date: string;
  endDate?: string;
  location: string;
  city: string;
  image?: string;
  registrationUrl?: string;
  maxAttendees?: number;
  currentAttendees: number;
  isVirtual: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: { name: string; avatar?: string };
  image: string;
  readingTime: number;
  publishedAt: string;
  tags: string[];
}

export interface Testimonial {
  _id: string;
  name: string;
  business: string;
  category: string;
  quote: string;
  image: string;
  videoUrl?: string;
  growthBefore: string;
  growthAfter: string;
  revenueIncrease: string;
}

export interface Referral {
  _id: string;
  from: Member;
  to: Member;
  status: "pending" | "accepted" | "completed" | "declined";
  description: string;
  value?: number;
  createdAt: string;
  completedAt?: string;
}

export interface Resource {
  _id: string;
  title: string;
  description: string;
  type: "pdf" | "video" | "template" | "guide";
  category: string;
  downloadUrl: string;
  thumbnail?: string;
  downloads: number;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "referral" | "event";
  read: boolean;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
