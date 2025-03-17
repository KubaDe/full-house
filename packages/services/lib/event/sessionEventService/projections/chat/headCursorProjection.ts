import { rds } from "@repo/db";

type headCursorProjectionProps = {
  sessionId: string;
};

export const headCursorProjection = async ({
  sessionId,
}: headCursorProjectionProps) => {
  try {
    const entries = await rds.xrevrange(
      `sessionEvents:${sessionId}`,
      "+",
      "-",
      "COUNT",
      1,
    );
    const [id] = entries[0] ?? [];
    return id ?? null;
  } catch (error) {
    console.error("headCursorProjection error", error);
    return null;
  }
};
