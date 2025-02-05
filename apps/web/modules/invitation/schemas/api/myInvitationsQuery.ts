import { z } from "zod";

export const myInvitationsQueryInputSchema = z.undefined();

export const myInvitationsQueryOutputSchema = z
  .array(
    z.object({
      id: z.string(),
      sender: z.object({
        email: z.string(),
      }),
      room: z.object({
        id: z.string(),
        name: z.string(),
      }),
    }),
  )
  .default([]);

export type MyInvitationsQueryOutput = z.infer<
  typeof myInvitationsQueryOutputSchema
>;
