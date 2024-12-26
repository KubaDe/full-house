import { z } from "zod";

export const featureTypeSchema = z.enum(["poll", "chat"]);

export type FeatureType = z.infer<typeof featureTypeSchema>;
