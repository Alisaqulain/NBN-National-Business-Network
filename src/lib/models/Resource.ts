import mongoose, { Document, Schema } from "mongoose";

export interface IResource extends Document {
  title: string;
  description: string;
  type: "pdf" | "video" | "template" | "guide";
  category: string;
  downloadUrl: string;
  thumbnail?: string;
  downloads: number;
  isPublished: boolean;
}

const resourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["pdf", "video", "template", "guide"], required: true },
    category: { type: String, required: true },
    downloadUrl: { type: String, required: true },
    thumbnail: String,
    downloads: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Resource = mongoose.models.Resource || mongoose.model<IResource>("Resource", resourceSchema);
