import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: { name: string; avatar?: string };
  image: string;
  readingTime: number;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      avatar: String,
    },
    image: { type: String, required: true },
    readingTime: { type: Number, default: 5 },
    tags: [String],
    isPublished: { type: Boolean, default: true },
    publishedAt: Date,
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
