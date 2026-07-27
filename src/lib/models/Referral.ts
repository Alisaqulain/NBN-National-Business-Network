import mongoose, { Document, Schema, Types } from "mongoose";

export interface IReferral extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  status: "pending" | "accepted" | "completed" | "declined";
  description: string;
  value?: number;
  completedAt?: Date;
}

const referralSchema = new Schema<IReferral>(
  {
    from: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    to: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    status: { type: String, enum: ["pending", "accepted", "completed", "declined"], default: "pending" },
    description: { type: String, required: true },
    value: Number,
    completedAt: Date,
  },
  { timestamps: true }
);

export const Referral = mongoose.models.Referral || mongoose.model<IReferral>("Referral", referralSchema);
