import { db } from "@/src/prisma/db";
import { fail, ok } from "@/lib/api-response";

export async function GET() {
  try {
    await db.orm.public.User.first();

    return ok({
      status: "ok",
      database: "connected",
      prisma: 8,
      node: process.version,
    });
  } catch (error) {
    return fail("Database connection failed", 503, String(error));
  }
}
