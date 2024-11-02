import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import {
  createSessionMutationInputSchema,
  createSessionMutationOutputSchema,
} from "@/modules/session/schemas/api";
import { db } from "@/server/db/prisma";

export const createSessionMutation = protectedProcedure
  .input(createSessionMutationInputSchema)
  .output(createSessionMutationOutputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .mutation(async ({ input }) => {
    const { roomId, type } = input;

    const existingSession = await db.session.findFirst({
      where: {
        roomId,
        type,
      },
    });
    if (existingSession) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Session already exists",
      });
    }

    await db.session.create({
      data: {
        roomId,
        type,
      },
    });
  });
