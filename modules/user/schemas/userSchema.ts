import { z } from "zod";
import { profileSchema } from "./profileSchema";

export const userSchema = z.object({
  id: z.string(),
  clerkId: z.string(),
  profile: profileSchema.nullish(),
  createdAt: z.date(),
});
