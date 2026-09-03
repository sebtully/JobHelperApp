import { db } from "@/src/prisma/db";
import { fail, ok } from "@/lib/api-response";
import { z } from "zod";

const searchProfileSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(1).max(100),

  jobTitles: z.array(z.string().min(1)).default([]),
  keywords: z.array(z.string().min(1)).default([]),
  excludeKeywords: z.array(z.string().min(1)).default([]),

  location: z.string().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  radiusKm: z.number().int().min(1).max(500).nullable().optional(),

  seniority: z
    .array(z.enum(["INTERN", "JUNIOR", "MID", "SENIOR", "LEAD", "UNKNOWN"]))
    .default([]),

  employmentTypes: z
    .array(
      z.enum([
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
        "TEMPORARY",
        "FREELANCE",
        "UNKNOWN",
      ]),
    )
    .default([]),

  workplaceTypes: z
    .array(z.enum(["ONSITE", "HYBRID", "REMOTE", "UNKNOWN"]))
    .default([]),

  minimumMatchScore: z.number().int().min(0).max(100).default(0),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = searchProfileSchema.safeParse(body);

  if (!parsed.success) {
    return fail("Invalid search profile", 400, parsed.error.flatten());
  }

  const profile = await db.orm.public.SearchProfile.create(parsed.data);

  return ok(profile, 201);
}
