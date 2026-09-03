import { ApplicationStatus } from "@/generated/prisma/client";
import { fail, ok } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  status: z.nativeEnum(ApplicationStatus).optional(),
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

  const exists = await prisma.application.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!exists) {
    return fail("Application not found", 404);
  }

  const application = await prisma.application.update({
    where: { id },
    data: parsed.data,
  });

  return ok(application);
}
