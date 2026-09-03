// @ts-check
import { module } from "@prisma/composer";
import { postgres, dataContract } from "@prisma/composer-prisma-cloud/orm";
import jobpilotContractJson from "./src/prisma/contract.json" with { type: "json" };
import jobpilotService from "./service.mjs";

export default module("jobpilot-database", ({ provision }) => {
  const database = provision(postgres({ name: "database", contract: dataContract(jobpilotContractJson), config: "./prisma.config.ts" }));
  provision(jobpilotService, { deps: { db: database } });
});
