import { z } from "zod";
import { avatarSchema } from "./avatarSchema";

export const profileOutputSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(3).max(255),
  avatar: avatarSchema,
});

export const profileInputSchema = z.object({
  name: z.string().trim().min(3).max(255),
  avatar: avatarSchema,
});

export type Profile = z.infer<typeof profileOutputSchema>;
