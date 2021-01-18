import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

const getPrisma = (): PrismaClient => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  }
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  return globalThis.prisma || new PrismaClient();
};

const prisma = getPrisma();

export default prisma;
