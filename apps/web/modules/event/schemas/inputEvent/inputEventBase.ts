import { z } from "zod";

export const inputEventBase = z.object({
  sessionId: z.string(),
});
