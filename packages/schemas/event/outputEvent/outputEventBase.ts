import { z } from "zod";
import { outputEventTypeSchema } from "./outputEventType";

export const outputEventBase = z.object({
  type: outputEventTypeSchema,
  roomId: z.string(),
  skipRecipientIds: z.array(z.string()).optional(),
  pickRecipientIds: z.array(z.string()).optional(),
  payload: z.object({}).optional(),
});
