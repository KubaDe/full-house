import { z } from "zod";

export const paginationInputSchema = z.object({
  take: z.number().min(1).max(100).default(10),
  skip: z.number().default(0),
});

export const paginationOutputSchema = z.object({
  take: z.number().min(1).max(100).default(10),
  skip: z.number().default(0),
  total: z.number(),
});
