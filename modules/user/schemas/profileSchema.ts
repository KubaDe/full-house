import { z } from "zod";
import { avatarSchema } from "./avatarSchema";

export const profileSchema = z.object({
  name: z.string().trim().min(3).max(255),
  avatar: avatarSchema,
});

export type Profile = z.infer<typeof profileSchema>;
