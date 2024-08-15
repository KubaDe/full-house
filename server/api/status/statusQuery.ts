import { db } from "@/server/db/prisma";
import { publicProcedure } from "@/server/trpc";

export const statusQuery = publicProcedure.query(async () => {
  let database = false;
  try {
    await db.$queryRaw`SELECT 1`;
    database = true;
  } catch {
    void 0;
  }

  return {
    api: true,
    database,
  };
});
