import { prisma } from "@/lib/prisma";
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

  const where = {
    isActive: active === "true",
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" as const } },
            { description: { contains: q, mode: "insensitive" as const } },
            { company: { name: { contains: q, mode: "insensitive" as const } } },
          ],
        }
      : {}),
    ...(location
      ? {
          location: {
            contains: location,
            mode: "insensitive" as const,
          },
        }
      : {}),
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      include: {
        company: true,
        skills: {
          include: {
            skill: true,
          },
        },
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip: offset,
      take: limit,
    }),
    prisma.job.count({ where }),
  ]);

  return ok({
    items: jobs,
    pagination: {
      total,
      limit,
      offset,
    },
  });
}
