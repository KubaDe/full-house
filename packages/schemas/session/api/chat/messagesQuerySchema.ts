import { z } from "zod";
import { messageSchema } from "../../chat/messageSchema";

export const messagesQueryInputSchema = z.object({
  sessionId: z.string(),
  cursor: z.string().optional(),
  limit: z.number().min(1).max(100),
});

export const messagesQueryOutputSchema = z.object({
  moreCount: z.number(),
  messages: z.array(messageSchema).default([]),
});
