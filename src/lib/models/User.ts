import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role: "member" | "admin" | "moderator";
  avatar?: string;
  isVerified: boolean;
  isEmailVerified: boolean;
  membershipStatus: "active" | "inactive" | "pending" | "expired";
  membershipPlan?: string;
  otp?: string;
  otpExpiry?: Date;
  comparePassword(candidate: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    phone: String,
    role: { type: String, enum: ["member", "admin", "moderator"], default: "member" },
    avatar: String,
    isVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    membershipStatus: { type: String, enum: ["active", "inactive", "pending", "expired"], default: "pending" },
    membershipPlan: String,
    otp: { type: String, select: false },
    otpExpiry: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
