import { z } from "zod";

export const messageSchema = z.object({
  id: z.string(),
  payload: z.object({
    message: z.string(),
  }),
  userId: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
