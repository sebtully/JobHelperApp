import { db } from "@/src/prisma/db";
import { fail, ok } from "@/lib/api-response";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const job = await db.orm.public.Job
    .where({ id })
    .include("company")
    .first();

  if (!job) {
    return fail("Job not found", 404);
  }

  return ok(job);
}
