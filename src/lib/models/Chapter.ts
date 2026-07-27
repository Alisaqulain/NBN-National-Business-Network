import mongoose, { Document, Schema } from "mongoose";

export interface IChapter extends Document {
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
  isActive: boolean;
}

const chapterSchema = new Schema<IChapter>(
  {
    name: { type: String, required: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    address: { type: String, required: true },
    meetingDay: { type: String, required: true },
    meetingTime: { type: String, required: true },
    memberCount: { type: Number, default: 0 },
    category: String,
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Chapter = mongoose.models.Chapter || mongoose.model<IChapter>("Chapter", chapterSchema);
