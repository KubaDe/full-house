import { z } from "zod";

export const sessionEventSubscriptionInputSchema = z.object({
  roomId: z.string(),
});
