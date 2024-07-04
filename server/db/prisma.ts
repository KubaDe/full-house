import { PrismaClient } from "@prisma/client";

let _prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  _prisma = new PrismaClient();
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  _prisma = globalWithPrisma.prisma;
}
export const db = _prisma;
