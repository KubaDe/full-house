import { z } from "zod";
import { messageSchema } from "../../chat/messageSchema";

export const liveMessagesQueryInputSchema = z.object({
  sessionId: z.string(),
  cursor: z.string().optional(),
});

export const liveMessagesQueryOutputSchema = z.array(messageSchema).default([]);
