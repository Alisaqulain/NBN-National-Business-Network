import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  business: string;
  category: string;
  quote: string;
  image: string;
  videoUrl?: string;
  growthBefore: string;
  growthAfter: string;
  revenueIncrease: string;
  isPublished: boolean;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    business: { type: String, required: true },
    category: { type: String, required: true },
    quote: { type: String, required: true },
    image: { type: String, required: true },
    videoUrl: String,
    growthBefore: { type: String, required: true },
    growthAfter: { type: String, required: true },
    revenueIncrease: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", testimonialSchema);
