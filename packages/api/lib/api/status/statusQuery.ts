import { db } from "@repo/db";
import { publicProcedure } from "../trpc";
import { rds } from "@repo/db";
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
