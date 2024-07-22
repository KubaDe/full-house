import { z } from "zod";
export const roomSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(3).max(255),
});
