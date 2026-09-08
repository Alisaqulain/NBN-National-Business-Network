import mongoose, { Document, Schema } from "mongoose";

export interface IReference {
  name: string;
  company: string;
  phone: string;
  email: string;
}

export interface IApplication extends Document {
  region: string;
  chapter: string;
  applicantName: string;
  applicationDate: string;
  businessCategory: string;
  sponsorReferrer?: string;
  companyName: string;
  yearsInBusiness: string;
  primaryMember: string;
  alternateRepresentative?: string;
  email: string;
  phone: string;
  whyJoin: string;
  strengths: string;
  hopingToGain: string;
  meetingTimeWorks: "yes" | "no";
  canAttendFullSession: "yes" | "no";
  hasReferralRelationships: "yes" | "no";
  referralRelationshipsCount?: string;
  otherCommunities: string;
  hasLeadershipExperience: "yes" | "no";
  professionalContactsCount: string;
  developmentPrograms: string;
  openToCoaching: "yes" | "no";
  willingOneOnOne: "yes" | "no";
  understandsAttendance: "yes" | "no";
  canSendSubstitute: "yes" | "no";
  willingToInvite: "yes" | "no";
  productsServices: string;
  specialization: string;
  enjoysMost: string;
  previouslyAppliedElsewhere: "yes" | "no";
  previouslyAppliedDetails?: string;
  willingOnboarding: "yes" | "no";
  openToLeadership: "yes" | "no";
  concerns?: string;
  questionsForTeam?: string;
  reference1: IReference;
  reference2: IReference;
  confirmedAccurate: boolean;
  applicantSignature: string;
  signatureDate: string;
  status: "pending" | "reviewing" | "accepted" | "rejected";
}

const referenceSchema = new Schema<IReference>(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
);

const yesNo = { type: String, enum: ["yes", "no"], required: true };

const applicationSchema = new Schema<IApplication>(
  {
    region: { type: String, required: true },
    chapter: { type: String, required: true },
    applicantName: { type: String, required: true },
    applicationDate: { type: String, required: true },
    businessCategory: { type: String, required: true },
    sponsorReferrer: String,
    companyName: { type: String, required: true },
    yearsInBusiness: { type: String, required: true },
    primaryMember: { type: String, required: true },
    alternateRepresentative: String,
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whyJoin: { type: String, required: true },
    strengths: { type: String, required: true },
    hopingToGain: { type: String, required: true },
    meetingTimeWorks: yesNo,
    canAttendFullSession: yesNo,
    hasReferralRelationships: yesNo,
    referralRelationshipsCount: String,
    otherCommunities: { type: String, required: true },
    hasLeadershipExperience: yesNo,
    professionalContactsCount: { type: String, required: true },
    developmentPrograms: { type: String, required: true },
    openToCoaching: yesNo,
    willingOneOnOne: yesNo,
    understandsAttendance: yesNo,
    canSendSubstitute: yesNo,
    willingToInvite: yesNo,
    productsServices: { type: String, required: true },
    specialization: { type: String, required: true },
    enjoysMost: { type: String, required: true },
    previouslyAppliedElsewhere: yesNo,
    previouslyAppliedDetails: String,
    willingOnboarding: yesNo,
    openToLeadership: yesNo,
    concerns: String,
    questionsForTeam: String,
    reference1: { type: referenceSchema, required: true },
    reference2: { type: referenceSchema, required: true },
    confirmedAccurate: { type: Boolean, required: true },
    applicantSignature: { type: String, required: true },
    signatureDate: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "reviewing", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Application =
  mongoose.models.Application || mongoose.model<IApplication>("Application", applicationSchema);
