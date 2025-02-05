import { db } from "@/server/db/prisma";
import { publicProcedure } from "@/server/trpc";
import { rds } from "@/server/db/redis";

export const statusQuery = publicProcedure.query(async () => {
  let database = false;
  let rdsStatus = false;
  try {
    await rds.set("status", "ok");
    rdsStatus = !!(await rds.get("status"));
  } catch {
    void 0;
  }
  try {
    await db.$queryRaw`SELECT 1`;
    database = true;
  } catch {
    void 0;
  }

  return {
    api: true,
    database,
    rds: rdsStatus,
  };
});
