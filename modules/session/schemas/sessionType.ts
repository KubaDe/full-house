import { z } from "zod";

export const sessionTypeSchema = z.enum(["simpleMessage"]);
