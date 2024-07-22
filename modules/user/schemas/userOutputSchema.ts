import { z } from "zod";
import { profileOutputSchema } from "./profileSchema";

export const userOutputSchema = z.object({
  id: z.string(),
  clerkId: z.string(),
  profile: profileOutputSchema.nullish(),
  createdAt: z.date(),
});
