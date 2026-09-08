"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassCard } from "@/components/shared/animations";
import { EMERALD } from "@/lib/constants";
import { getApplicableCategories, getCategoryByName } from "@/lib/data/emerald-directory";
import { cn } from "@/lib/utils";
import { FormSection, FormField, InfoBox } from "./form-section";
import { ApplicationSuccess } from "./application-success";

const yesNo = z.enum(["yes", "no"], { required_error: "Please select an option" });

const referenceSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company is required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Valid email required"),
});

const schema = z
  .object({
    region: z.string().min(1),
    chapter: z.string().min(1),
    applicantName: z.string().min(2, "Required"),
    applicationDate: z.string().min(1, "Required"),
    businessCategory: z.string().min(1, "Select a category"),
    sponsorReferrer: z.string().optional(),
    companyName: z.string().min(2, "Required"),
    yearsInBusiness: z.string().min(1, "Required"),
    primaryMember: z.string().min(2, "Required"),
    alternateRepresentative: z.string().optional(),
    phone: z.string().min(10, "Valid phone required"),
    email: z.string().email("Valid email required"),
    whyJoin: z.string().min(20, "At least 20 characters"),
    strengths: z.string().min(20, "At least 20 characters"),
    hopingToGain: z.string().min(20, "At least 20 characters"),
    meetingTimeWorks: yesNo,
    canAttendFullSession: yesNo,
    hasReferralRelationships: yesNo,
    referralRelationshipsCount: z.string().optional(),
    otherCommunities: z.string().min(5, "Required"),
    hasLeadershipExperience: yesNo,
    professionalContactsCount: z.string().min(1, "Required"),
    developmentPrograms: z.string().min(10, "Required"),
    openToCoaching: yesNo,
    willingOneOnOne: yesNo,
    understandsAttendance: yesNo,
    canSendSubstitute: yesNo,
    willingToInvite: yesNo,
    productsServices: z.string().min(20, "At least 20 characters"),
    specialization: z.string().min(10, "Required"),
    enjoysMost: z.string().min(10, "Required"),
    previouslyAppliedElsewhere: yesNo,
    previouslyAppliedDetails: z.string().optional(),
    willingOnboarding: yesNo,
    openToLeadership: yesNo,
    concerns: z.string().optional(),
    questionsForTeam: z.string().optional(),
    reference1: referenceSchema,
    reference2: referenceSchema,
    confirmedAccurate: z.literal(true, {
      errorMap: () => ({ message: "You must confirm accuracy" }),
    }),
    applicantSignature: z.string().min(2, "Required"),
    signatureDate: z.string().min(1, "Required"),
  })
  .refine(
    (d) => d.hasReferralRelationships !== "yes" || !!d.referralRelationshipsCount,
    { message: "Required", path: ["referralRelationshipsCount"] }
  )
  .refine(
    (d) => d.previouslyAppliedElsewhere !== "yes" || (d.previouslyAppliedDetails && d.previouslyAppliedDetails.length >= 10),
    { message: "Please provide details", path: ["previouslyAppliedDetails"] }
  );

type FormData = z.infer<typeof schema>;

const STEPS = [
  { id: 1, title: "Applicant" },
  { id: 2, title: "Business" },
  { id: 3, title: "Network" },
  { id: 4, title: "Participation" },
  { id: 5, title: "Category" },
  { id: 6, title: "References" },
  { id: 7, title: "Review & Submit" },
];

const STEP_FIELDS: Record<number, (keyof FormData)[]> = {
  1: ["applicantName", "applicationDate", "businessCategory", "companyName", "yearsInBusiness", "primaryMember", "phone", "email"],
  2: ["whyJoin", "strengths", "hopingToGain"],
  3: ["hasReferralRelationships", "referralRelationshipsCount", "otherCommunities", "hasLeadershipExperience", "professionalContactsCount", "previouslyAppliedElsewhere", "previouslyAppliedDetails"],
  4: ["meetingTimeWorks", "canAttendFullSession", "developmentPrograms", "openToCoaching", "willingOneOnOne", "understandsAttendance", "canSendSubstitute", "willingToInvite", "willingOnboarding", "openToLeadership"],
  5: ["productsServices", "specialization", "enjoysMost", "businessCategory"],
  6: ["reference1", "reference2"],
  7: ["concerns", "questionsForTeam", "confirmedAccurate", "applicantSignature", "signatureDate"],
};

const openCategories = getApplicableCategories();

function YesNo({ name, label, control, error }: {
  name: keyof FormData;
  label: string;
  control: ReturnType<typeof useForm<FormData>>["control"];
  error?: string;
}) {
  return (
    <FormField label={label} required error={error}>
      <Controller
        name={name as "meetingTimeWorks"}
        control={control}
        render={({ field }) => (
          <div className="flex gap-4">
            {(["yes", "no"] as const).map((v) => (
              <label key={v} className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="radio" value={v} checked={field.value === v} onChange={() => field.onChange(v)} className="accent-EBN-teal" />
                {v === "yes" ? "Yes" : "No"}
              </label>
            ))}
          </div>
        )}
      />
    </FormField>
  );
}

export function ApplicationForm() {
  const searchParams = useSearchParams();
  const prefillCategory = searchParams.get("category");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      region: "Bangalore",
      chapter: "Emerald",
      applicationDate: today,
      reference1: { name: "", company: "", phone: "", email: "" },
      reference2: { name: "", company: "", phone: "", email: "" },
      signatureDate: today,
    },
  });

  const { register, handleSubmit, control, watch, trigger, setValue, formState: { errors, isSubmitting } } = form;

  useEffect(() => {
    if (prefillCategory) {
      const cat = getCategoryByName(prefillCategory);
      if (cat?.status === "open") {
        setValue("businessCategory", cat.name);
      }
    }
  }, [prefillCategory, setValue]);

  const hasReferrals = watch("hasReferralRelationships");
  const previouslyApplied = watch("previouslyAppliedElsewhere");
  const values = watch();

  const next = async () => {
    const ok = await trigger(STEP_FIELDS[step]);
    if (ok) setStep((s) => Math.min(s + 1, 7));
  };

  const onSubmit = async (data: FormData) => {
    const cat = getCategoryByName(data.businessCategory);
    if (!cat || cat.status !== "open") {
      toast.error("Please select an open category");
      return;
    }
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Submission failed");
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    }
  };

  if (submitted) return <ApplicationSuccess />;

  return (
    <GlassCard hover={false}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-muted">
          Step {step} of {STEPS.length}
        </p>
        <p className="text-xs text-muted">Chapter Launch: {EMERALD.launchDateDisplay}</p>
      </div>

      <div className="mb-8 overflow-x-auto">
        <div className="flex min-w-max gap-2">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
                step === s.id ? "bg-EBN-teal text-white" : step > s.id ? "bg-EBN-teal/15 text-EBN-teal" : "bg-slate-100 text-muted"
              )}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
                {step > s.id ? <Check className="h-3 w-3" /> : String(s.id).padStart(2, "0")}
              </span>
              <span className="hidden sm:inline">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {step === 1 && (
          <FormSection title="Basic Information">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Region"><Input {...register("region")} readOnly className="bg-slate-50" /></FormField>
              <FormField label="Chapter"><Input {...register("chapter")} readOnly className="bg-slate-50" /></FormField>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Applicant / Visitor Name" required error={errors.applicantName?.message}>
                <Input {...register("applicantName")} />
              </FormField>
              <FormField label="Application Date" required error={errors.applicationDate?.message}>
                <Input type="date" {...register("applicationDate")} />
              </FormField>
            </div>
            <FormField label="Business Category" required error={errors.businessCategory?.message}>
              <Controller name="businessCategory" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Search and select a category" /></SelectTrigger>
                  <SelectContent className="max-h-60">
                    {openCategories.map((c) => (
                      <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </FormField>
            <FormField label="Sponsor / Referrer"><Input {...register("sponsorReferrer")} /></FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Company Name" required error={errors.companyName?.message}><Input {...register("companyName")} /></FormField>
              <FormField label="Number of Years in Business" required error={errors.yearsInBusiness?.message}><Input type="number" min={0} {...register("yearsInBusiness")} /></FormField>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Primary Member" required error={errors.primaryMember?.message}><Input {...register("primaryMember")} /></FormField>
              <FormField label="Substitute / Alternate Representative"><Input {...register("alternateRepresentative")} /></FormField>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Phone Number" required error={errors.phone?.message}><Input {...register("phone")} /></FormField>
              <FormField label="Email Address" required error={errors.email?.message}><Input type="email" {...register("email")} /></FormField>
            </div>
          </FormSection>
        )}

        {step === 2 && (
          <FormSection title="Motivation">
            <FormField label="Why have you decided to apply to Elite Explorers, specifically the Emerald Chapter?" required error={errors.whyJoin?.message}>
              <Textarea rows={4} {...register("whyJoin")} />
            </FormField>
            <FormField label="What strengths, experience, relationships, or resources would you bring to Emerald and its members?" required error={errors.strengths?.message}>
              <Textarea rows={4} {...register("strengths")} />
            </FormField>
            <FormField label="What do you expect to gain from Elite Explorers and the Emerald Chapter?" required error={errors.hopingToGain?.message}>
              <Textarea rows={4} {...register("hopingToGain")} />
            </FormField>
          </FormSection>
        )}

        {step === 3 && (
          <FormSection title="Referral Network">
            <YesNo name="hasReferralRelationships" label="Do you currently have professional referral relationships within your sphere of influence?" control={control} error={errors.hasReferralRelationships?.message} />
            {hasReferrals === "yes" && (
              <FormField label="Approximately how many referral relationships do you currently maintain?" required error={errors.referralRelationshipsCount?.message}>
                <Input type="number" min={0} {...register("referralRelationshipsCount")} />
              </FormField>
            )}
            <FormField label="Which professional, social, business, or networking organizations are you currently involved with or have participated in previously?" required error={errors.otherCommunities?.message}>
              <Textarea rows={3} {...register("otherCommunities")} />
            </FormField>
            <YesNo name="hasLeadershipExperience" label="Have you held any leadership responsibilities in those organizations?" control={control} error={errors.hasLeadershipExperience?.message} />
            <FormField label="Approximately how many relevant contacts do you have in your database, client list, professional network, or business community?" required error={errors.professionalContactsCount?.message}>
              <Input type="number" min={0} {...register("professionalContactsCount")} />
            </FormField>
            <YesNo name="previouslyAppliedElsewhere" label="Have you previously applied to or participated in another structured business networking community?" control={control} error={errors.previouslyAppliedElsewhere?.message} />
            {previouslyApplied === "yes" && (
              <FormField label="Please provide additional details" required error={errors.previouslyAppliedDetails?.message}>
                <Textarea rows={3} {...register("previouslyAppliedDetails")} />
              </FormField>
            )}
          </FormSection>
        )}

        {step === 4 && (
          <FormSection title="Participation & Commitment">
            <YesNo name="meetingTimeWorks" label="Will the chapter's scheduled meeting time create any difficulty with your existing commitments?" control={control} error={errors.meetingTimeWorks?.message} />
            <YesNo name="canAttendFullSession" label="Are you able to remain for the complete 90-minute weekly meeting?" control={control} error={errors.canAttendFullSession?.message} />
            <FormField label="What personal development, professional development, leadership, or people-skills programs have you attended in the past?" required error={errors.developmentPrograms?.message}>
              <Textarea rows={3} {...register("developmentPrograms")} />
            </FormField>
            <YesNo name="openToCoaching" label="Are you open to coaching and mentoring?" control={control} error={errors.openToCoaching?.message} />
            <InfoBox title="Member Relationship Building">
              Members are encouraged to dedicate time outside regular meetings to build meaningful one-to-one professional relationships with fellow members.
            </InfoBox>
            <YesNo name="willingOneOnOne" label="Are you willing to dedicate time outside the weekly meeting for one-to-one meetings with fellow members?" control={control} error={errors.willingOneOnOne?.message} />
            <InfoBox title="Attendance & Participation">
              Regular attendance is an important part of maintaining a strong and productive chapter. Members are expected to participate consistently in weekly meetings. If a member cannot attend, an alternate representative may attend on their behalf where permitted by chapter guidelines.
            </InfoBox>
            <YesNo name="understandsAttendance" label="Do you understand and accept the chapter's attendance expectations?" control={control} error={errors.understandsAttendance?.message} />
            <YesNo name="canSendSubstitute" label="If you cannot attend a meeting, will you be able to arrange for an alternate representative?" control={control} error={errors.canSendSubstitute?.message} />
            <YesNo name="willingToInvite" label="The chapter may organize special activities focused on increasing business referrals and connections. Are you willing to invite suitable professionals who may benefit from participating?" control={control} error={errors.willingToInvite?.message} />
            <InfoBox title="Member Orientation">
              New members may be required to complete an orientation and onboarding process during the initial period of membership.
            </InfoBox>
            <YesNo name="willingOnboarding" label="Are you willing to participate in the Emerald member orientation / success program after acceptance?" control={control} error={errors.willingOnboarding?.message} />
            <YesNo name="openToLeadership" label="Would you be willing to consider a leadership responsibility within the chapter when an opportunity becomes available?" control={control} error={errors.openToLeadership?.message} />
          </FormSection>
        )}

        {step === 5 && (
          <FormSection title="Your Professional Category">
            <FormField label="What specific products and services does your business provide?" required error={errors.productsServices?.message}>
              <Textarea rows={3} {...register("productsServices")} />
            </FormField>
            <FormField label="Is there a particular area or niche in which your business specializes?" required error={errors.specialization?.message}>
              <Textarea rows={3} {...register("specialization")} />
            </FormField>
            <FormField label="What do you like most about your profession or business?" required error={errors.enjoysMost?.message}>
              <Textarea rows={3} {...register("enjoysMost")} />
            </FormField>
            <FormField label="Primary Business Category" required error={errors.businessCategory?.message}>
              <Controller name="businessCategory" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent className="max-h-60">
                    {openCategories.map((c) => (
                      <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
            </FormField>
          </FormSection>
        )}

        {step === 6 && (
          <FormSection title="Professional References" description="Please inform your references that they may be contacted as part of the application review process.">
            {([1, 2] as const).map((n) => (
              <div key={n} className={cn("space-y-4 rounded-xl border border-slate-200/80 p-5", n === 2 && "mt-4")}>
                <h4 className="font-heading font-semibold text-EBN-navy">Reference {n}</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Name" required error={errors[`reference${n}`]?.name?.message}>
                    <Input {...register(`reference${n}.name`)} />
                  </FormField>
                  <FormField label="Business / Company" required>
                    <Input {...register(`reference${n}.company`)} />
                  </FormField>
                  <FormField label="Phone" required>
                    <Input {...register(`reference${n}.phone`)} />
                  </FormField>
                  <FormField label="Email" required>
                    <Input type="email" {...register(`reference${n}.email`)} />
                  </FormField>
                </div>
              </div>
            ))}
          </FormSection>
        )}

        {step === 7 && (
          <FormSection title="Review & Submit">
            <InfoBox title="Application Review">
              Submitting this form does not guarantee membership. Applications are reviewed by the appropriate chapter team, and applicants may be contacted for additional information or an interview before a final decision is made.
            </InfoBox>
            <FormField label="What reservations or concerns do you currently have about joining Emerald?">
              <Textarea rows={3} {...register("concerns")} />
            </FormField>
            <FormField label="Do you have any questions for the Emerald team?">
              <Textarea rows={3} {...register("questionsForTeam")} />
            </FormField>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 text-sm">
              <h4 className="mb-3 font-heading font-semibold text-EBN-navy">Application Summary</h4>
              <dl className="grid gap-2 sm:grid-cols-2">
                <div><dt className="text-xs text-muted">Applicant</dt><dd className="font-medium">{values.applicantName || "—"}</dd></div>
                <div><dt className="text-xs text-muted">Company</dt><dd className="font-medium">{values.companyName || "—"}</dd></div>
                <div><dt className="text-xs text-muted">Category</dt><dd className="font-medium">{values.businessCategory || "—"}</dd></div>
                <div><dt className="text-xs text-muted">Email</dt><dd className="font-medium">{values.email || "—"}</dd></div>
              </dl>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-EBN-navy">Applicant Declaration</h4>
              <div className="flex items-start gap-3">
                <Controller name="confirmedAccurate" control={control} render={({ field }) => (
                  <Checkbox id="confirmedAccurate" checked={field.value === true} onCheckedChange={(c) => field.onChange(c === true)} />
                )} />
                <label htmlFor="confirmedAccurate" className="cursor-pointer text-sm leading-relaxed">
                  I confirm that the information provided in this application is accurate and complete to the best of my knowledge.
                </label>
              </div>
              {errors.confirmedAccurate && <p className="text-xs text-red-500">{errors.confirmedAccurate.message}</p>}
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Applicant Signature / Full Name" required error={errors.applicantSignature?.message}>
                  <Input {...register("applicantSignature")} />
                </FormField>
                <FormField label="Date" required error={errors.signatureDate?.message}>
                  <Input type="date" {...register("signatureDate")} />
                </FormField>
              </div>
            </div>
          </FormSection>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200/80 pt-6 dark:border-slate-700 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-4">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)} className="w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : <div className="hidden sm:block" />}
          {step < 7 ? (
            <Button type="button" onClick={next} className="w-full sm:ml-auto sm:w-auto">Continue <ArrowRight className="h-4 w-4" /></Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="w-full sm:ml-auto sm:w-auto">
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : "Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </GlassCard>
  );
}
