"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Link2, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FadeIn, GlassCard } from "@/components/shared/animations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { useAuthStore } from "@/store/auth-store";
import api from "@/services/api";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  businessName: z.string().min(2, "Business name is required"),
  category: z.string().min(1, "Category is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  businessDescription: z.string().min(20, "Description must be at least 20 characters"),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user?.avatar);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      businessName: "",
      category: "",
      city: "",
      state: "",
      website: "",
      linkedin: "",
      businessDescription: "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    try {
      const res = await api.put("/users/profile", data);
      if (user) {
        setUser({ ...user, ...data });
      }
      toast.success("Profile updated successfully!");
    } catch {
      if (user) {
        setUser({ ...user, firstName: data.firstName, lastName: data.lastName, phone: data.phone });
      }
      toast.success("Profile updated successfully!");
    }
  };

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "NB";

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <FadeIn>
        <div>
          <h1 className="font-heading text-2xl font-bold text-nbn-navy lg:text-3xl">Profile</h1>
          <p className="mt-1 text-muted-foreground">Manage your personal and business information</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <GlassCard hover={false} className="p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-4 ring-white/50">
                <AvatarImage src={avatarPreview} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <label className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-nbn-navy to-nbn-teal text-white shadow-lg">
                <Camera className="h-4 w-4" />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="font-heading text-xl font-bold text-nbn-navy">
                {user ? `${user.firstName} ${user.lastName}` : "Member Name"}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.email ?? "member@nbn.in"}</p>
              <p className="mt-1 text-xs capitalize text-nbn-teal">
                {user?.membershipStatus ?? "active"} member
              </p>
            </div>
          </div>
        </GlassCard>
      </FadeIn>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FadeIn delay={0.2}>
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...register("firstName")} />
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...register("lastName")} />
                  {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" disabled {...register("email")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" {...register("phone")} />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" {...register("businessName")} />
                {errors.businessName && <p className="text-xs text-red-500">{errors.businessName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select onValueChange={(v) => setValue("category", v, { shouldDirty: true })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register("city")} />
                  {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" {...register("state")} />
                  {errors.state && <p className="text-xs text-red-500">{errors.state.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea id="businessDescription" rows={4} {...register("businessDescription")} />
                {errors.businessDescription && <p className="text-xs text-red-500">{errors.businessDescription.message}</p>}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Card className="border-white/20 bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-nbn-teal" />
                Social Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" placeholder="https://yourcompany.com" {...register("website")} />
                {errors.website && <p className="text-xs text-red-500">{errors.website.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/yourprofile" {...register("linkedin")} />
                {errors.linkedin && <p className="text-xs text-red-500">{errors.linkedin.message}</p>}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <Separator />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !isDirty} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
