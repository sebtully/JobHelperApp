import { ApplicationStatus } from "@/generated/prisma/client";
import { fail, ok } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const applicationSchema = z.object({
  userId: z.string().min(1),
  jobId: z.string().min(1),
  status: z.nativeEnum(ApplicationStatus).default(ApplicationStatus.SAVED),
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

  const application = await prisma.application.upsert({
    where: {
      userId_jobId: {
        userId: parsed.data.userId,
        jobId: parsed.data.jobId,
      },
    },
    create: parsed.data,
    update: {
      status: parsed.data.status,
      resumeVariantId: parsed.data.resumeVariantId,
      coverLetterId: parsed.data.coverLetterId,
      notes: parsed.data.notes,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  return ok(application, 201);
}
