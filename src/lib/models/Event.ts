import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  type: "meeting" | "networking" | "expo" | "workshop" | "webinar";
  date: Date;
  endDate?: Date;
  location: string;
  city: string;
  image?: string;
  maxAttendees?: number;
  currentAttendees: number;
  isVirtual: boolean;
  isPublished: boolean;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["meeting", "networking", "expo", "workshop", "webinar"], required: true },
    date: { type: Date, required: true, index: true },
    endDate: Date,
    location: { type: String, required: true },
    city: { type: String, required: true },
    image: String,
    maxAttendees: Number,
    currentAttendees: { type: Number, default: 0 },
    isVirtual: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Event = mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);
