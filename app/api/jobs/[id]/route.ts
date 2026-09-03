import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/api-response";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      company: true,
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  if (!job) {
    return fail("Job not found", 404);
  }

  return ok(job);
}
