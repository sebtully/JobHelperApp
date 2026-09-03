import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/api-response";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return ok({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    return fail("Database connection failed", 503, String(error));
  }
}
