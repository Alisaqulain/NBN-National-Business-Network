import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Application } from "@/lib/models";
import { apiSuccess, apiError } from "@/lib/api-utils";
import { getCategoryByName } from "@/lib/data/emerald-directory";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.confirmedAccurate) {
      return apiError("You must confirm that the information provided is accurate", 400);
    }

    const cat = getCategoryByName(body.businessCategory);
    if (!cat || cat.status !== "open") {
      return apiError("The selected category is not available for application", 400);
    }

    const required = [
      "region", "chapter", "applicantName", "applicationDate", "businessCategory",
      "companyName", "yearsInBusiness", "primaryMember", "email", "phone",
      "whyJoin", "strengths", "hopingToGain", "meetingTimeWorks", "canAttendFullSession",
      "hasReferralRelationships", "otherCommunities", "hasLeadershipExperience",
      "professionalContactsCount", "developmentPrograms", "openToCoaching",
      "willingOneOnOne", "understandsAttendance", "canSendSubstitute", "willingToInvite",
      "productsServices", "specialization", "enjoysMost",
      "previouslyAppliedElsewhere", "willingOnboarding", "openToLeadership",
      "reference1", "reference2", "applicantSignature", "signatureDate",
    ];

    for (const field of required) {
      if (!body[field]) {
        return apiError(`Missing required field: ${field}`, 400);
      }
    }

    const application = await Application.create(body);
    return apiSuccess(application, "Application submitted successfully", 201);
  } catch (error) {
    console.error("Application POST error:", error);
    return apiError("Failed to submit application", 500);
  }
}
