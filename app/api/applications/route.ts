import { db } from "@/src/prisma/db";
import { fail, ok } from "@/lib/api-response";
import { z } from "zod";

const applicationSchema = z.object({
  userId: z.string().min(1),
  jobId: z.string().min(1),
  status: z
    .enum([
      "SAVED",
      "PREPARING",
      "APPLIED",
      "FOLLOW_UP",
      "INTERVIEW",
      "REJECTED",
      "OFFER",
      "WITHDRAWN",
    ])
    .default("SAVED"),
  resumeVariantId: z.string().nullable().optional(),
  coverLetterId: z.string().nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return fail("Invalid application", 400, parsed.error.flatten());
  }

  const existing = await db.orm.public.Application
    .where({
      userId: parsed.data.userId,
      jobId: parsed.data.jobId,
    })
    .first();

  if (existing) {
    return fail("Application already exists for this job", 409);
  }

  const application = await db.orm.public.Application.create(parsed.data);

  return ok(application, 201);
}
