import { z } from "zod";
import { sessionEventTypeSchema } from "./sessionEventType";

export const sessionEventBase = z.object({
  type: sessionEventTypeSchema,
  userId: z.string().optional(),
  payload: z.object({}).optional(),
});

export type SessionEventBase = z.infer<typeof sessionEventBase>;
