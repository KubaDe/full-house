import { z } from "zod";
import { profileOutputSchema } from "@/modules/user/schemas/profileSchema";

export const participantsOutputSchema = z.array(profileOutputSchema);
