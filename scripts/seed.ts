import mongoose from "mongoose";

import { Chapter, User, Member } from "../src/lib/models";

const chapters = [
  { name: "NBN Mumbai Central", city: "Mumbai", state: "Maharashtra", address: "BKC, Bandra Kurla Complex, Mumbai 400051", meetingDay: "Tuesday", meetingTime: "7:00 AM", memberCount: 42, coordinates: { lat: 19.0596, lng: 72.8656 }, contactEmail: "mumbai@nbn.in", contactPhone: "+91 9876543210" },
  { name: "NBN Delhi NCR", city: "Delhi", state: "Delhi", address: "Connaught Place, New Delhi 110001", meetingDay: "Wednesday", meetingTime: "7:30 AM", memberCount: 38, coordinates: { lat: 28.6315, lng: 77.2167 }, contactEmail: "delhi@nbn.in", contactPhone: "+91 9876543211" },
  { name: "NBN Bangalore Tech", city: "Bangalore", state: "Karnataka", address: "Koramangala, Bangalore 560034", meetingDay: "Thursday", meetingTime: "7:00 AM", memberCount: 45, coordinates: { lat: 12.9352, lng: 77.6245 }, contactEmail: "bangalore@nbn.in", contactPhone: "+91 9876543212" },
  { name: "NBN Chennai Marina", city: "Chennai", state: "Tamil Nadu", address: "Anna Salai, Chennai 600002", meetingDay: "Friday", meetingTime: "7:00 AM", memberCount: 35, coordinates: { lat: 13.0604, lng: 80.2496 }, contactEmail: "chennai@nbn.in", contactPhone: "+91 9876543213" },
  { name: "NBN Hyderabad HITEC", city: "Hyderabad", state: "Telangana", address: "HITEC City, Hyderabad 500081", meetingDay: "Tuesday", meetingTime: "7:30 AM", memberCount: 40, coordinates: { lat: 17.4435, lng: 78.3772 }, contactEmail: "hyderabad@nbn.in", contactPhone: "+91 9876543214" },
  { name: "NBN Pune IT Park", city: "Pune", state: "Maharashtra", address: "Hinjewadi IT Park, Pune 411057", meetingDay: "Wednesday", meetingTime: "7:00 AM", memberCount: 32, coordinates: { lat: 18.5912, lng: 73.7389 }, contactEmail: "pune@nbn.in", contactPhone: "+91 9876543215" },
];

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/nbn";
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  await Chapter.deleteMany({});
  await Chapter.insertMany(chapters);
  console.log(`Seeded ${chapters.length} chapters`);

  const adminExists = await User.findOne({ email: "admin@nbn.in" });
  if (!adminExists) {
    const admin = await User.create({
      firstName: "Admin",
      lastName: "NBN",
      email: "admin@nbn.in",
      password: "admin123",
      role: "admin",
      isVerified: true,
      isEmailVerified: true,
      membershipStatus: "active",
    });
    await Member.create({
      user: admin._id,
      businessName: "National Business Network",
      category: "Consulting",
      city: "Mumbai",
      state: "Maharashtra",
      isVerified: true,
    });
    console.log("Admin created: admin@nbn.in / admin123");
  }

  await mongoose.disconnect();
  console.log("Seed complete");
}

seed().catch(console.error);
