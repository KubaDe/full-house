import { z } from "zod";
import { inputEventSchema } from "../inputEvent";

export const pushInputEventMutationInputSchema = inputEventSchema;
export const pushInputEventMutationOutputSchema = z.undefined();
