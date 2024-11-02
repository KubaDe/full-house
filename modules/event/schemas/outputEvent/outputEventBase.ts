import { z } from "zod";
import { outputEventTypeSchema } from "./outputEventType";

export const outputEventBase = z.object({
  type: outputEventTypeSchema,
  sessionId: z.string(),
  payload: z.object({}).optional(),
});
