import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  EmploymentType,
  PrismaClient,
  Seniority,
  SkillImportance,
  WorkplaceType,
} from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@jobpilot.local" },
    update: {},
    create: {
      email: "demo@jobpilot.local",
      name: "Demo User",
      profile: {
        create: {
          headline: "Junior softwareudvikler",
          city: "Aarhus",
          seniority: Seniority.JUNIOR,
          remotePreference: WorkplaceType.HYBRID,
        },
      },
    },
  });

  const typescript = await prisma.skill.upsert({
    where: { normalizedName: "typescript" },
    update: {},
    create: { name: "TypeScript", normalizedName: "typescript" },
  });

  const react = await prisma.skill.upsert({
    where: { normalizedName: "react" },
    update: {},
    create: { name: "React", normalizedName: "react" },
  });

  const company = await prisma.company.upsert({
    where: { slug: "demo-software" },
    update: {},
    create: {
      name: "Demo Software",
      slug: "demo-software",
      city: "Aarhus",
      country: "DK",
      website: "https://example.com",
    },
  });

  const job = await prisma.job.upsert({
    where: {
      source_externalId: {
        source: "seed",
        externalId: "junior-fullstack-001",
      },
    },
    update: {},
    create: {
      companyId: company.id,
      externalId: "junior-fullstack-001",
      source: "seed",
      title: "Junior Full-stack Developer",
      normalizedTitle: "junior full stack developer",
      description:
        "Vi søger en junior udvikler med interesse for TypeScript, React og API-udvikling.",
      requirements: "TypeScript, React, REST APIs",
      location: "Aarhus",
      workplaceType: WorkplaceType.HYBRID,
      employmentType: EmploymentType.FULL_TIME,
      seniority: Seniority.JUNIOR,
      sourceUrl: "https://example.com/jobs/junior-fullstack",
      isActive: true,
      skills: {
        create: [
          {
            skillId: typescript.id,
            importance: SkillImportance.HIGH,
            required: true,
          },
          {
            skillId: react.id,
            importance: SkillImportance.HIGH,
            required: true,
          },
        ],
      },
    },
  });

  await prisma.searchProfile.upsert({
    where: { id: "demo-search-profile" },
    update: {},
    create: {
      id: "demo-search-profile",
      userId: user.id,
      name: "Junior softwareudvikler – Aarhus",
      jobTitles: [
        "Junior Software Developer",
        "Junior Full-stack Developer",
        "Junior Backend Developer",
      ],
      keywords: ["TypeScript", "React", "backend", "cloud"],
      excludeKeywords: [],
      location: "Aarhus",
      radiusKm: 15,
      seniority: [Seniority.JUNIOR],
      employmentTypes: [EmploymentType.FULL_TIME],
      workplaceTypes: [
        WorkplaceType.ONSITE,
        WorkplaceType.HYBRID,
        WorkplaceType.REMOTE,
      ],
      minimumMatchScore: 60,
    },
  });

  console.log({ userId: user.id, jobId: job.id });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
