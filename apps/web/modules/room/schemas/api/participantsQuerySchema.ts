import { z } from "zod";
import { profileOutputSchema } from "@/modules/user/schemas/profileSchema";

export const participantsQueryInputSchema = z.object({
  includeMe: z.boolean().optional().default(true),
  roomId: z.string(),
});
export const participantsQueryOutputSchema = z
  .array(
    z.object({
      id: z.string(),
      profile: profileOutputSchema,
    }),
  )
  .default([]);
