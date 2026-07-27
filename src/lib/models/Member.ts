import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMember extends Document {
  user: Types.ObjectId;
  businessName: string;
  businessLogo?: string;
  businessDescription?: string;
  category: string;
  city: string;
  state: string;
  chapter?: Types.ObjectId;
  website?: string;
  linkedin?: string;
  products: string[];
  services: string[];
  achievements: string[];
  experience: number;
  isVerified: boolean;
}

const memberSchema = new Schema<IMember>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    businessName: { type: String, required: true },
    businessLogo: String,
    businessDescription: String,
    category: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter" },
    website: String,
    linkedin: String,
    products: [String],
    services: [String],
    achievements: [String],
    experience: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

memberSchema.index({ businessName: "text", category: "text", city: "text" });

export const Member = mongoose.models.Member || mongoose.model<IMember>("Member", memberSchema);
