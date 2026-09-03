import { db } from "@/src/prisma/db";
import { fail, ok } from "@/lib/api-response";
import { z } from "zod";

const querySchema = z.object({
  q: z.string().trim().optional(),
  location: z.string().trim().optional(),
  active: z.enum(["true", "false"]).default("true"),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  offset: z.coerce.number().int().min(0).default(0),
});

export async function GET(request: Request) {
  const url = new URL(request.url);

  const parsed = querySchema.safeParse({
    q: url.searchParams.get("q") ?? undefined,
    location: url.searchParams.get("location") ?? undefined,
    active: url.searchParams.get("active") ?? "true",
    limit: url.searchParams.get("limit") ?? 25,
    offset: url.searchParams.get("offset") ?? 0,
  });

  if (!parsed.success) {
    return fail("Invalid query parameters", 400, parsed.error.flatten());
  }

  const { q, location, active, limit, offset } = parsed.data;

  let query = db.orm.public.Job.where({ isActive: active === "true" });

  if (q) {
    query = query.where((job) => job.title.ilike(`%${q}%`));
  }

  if (location) {
    query = query.where((job) => job.location.ilike(`%${location}%`));
  }

  const jobs = await query
    .include("company")
    .orderBy((job) => job.createdAt.desc())
    .skip(offset)
    .take(limit)
    .all();

  return ok({
    items: jobs,
    pagination: {
      limit,
      offset,
    },
  });
}
