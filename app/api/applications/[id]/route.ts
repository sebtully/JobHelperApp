import { db } from "@/src/prisma/db";
import { fail, ok } from "@/lib/api-response";
import { z } from "zod";

const patchSchema = z.object({
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
    .optional(),
  notes: z.string().max(5000).nullable().optional(),
  followUpAt: z.coerce.date().nullable().optional(),
  appliedAt: z.coerce.date().nullable().optional(),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await request.json();
  const parsed = patchSchema.safeParse(body);

  if (!parsed.success) {
    return fail("Invalid application update", 400, parsed.error.flatten());
  }

  const application = await db.orm.public.Application
    .where({ id })
    .update(parsed.data);

  if (!application) {
    return fail("Application not found", 404);
  }

  return ok(application);
}
