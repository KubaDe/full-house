import crypto from "crypto";
import { TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@/server/db/prisma";
import {
  inviteUserToRoomMutationInputSchema,
  inviteUserToRoomMutationOutputSchema,
} from "@/modules/invitation/schemas/api";

export const inviteUserToRoomMutation = protectedProcedure
  .input(inviteUserToRoomMutationInputSchema)
  .output(inviteUserToRoomMutationOutputSchema.nullish())
  .unstable_concat(requireRoomParticipantMiddleware)
  .mutation(async ({ ctx, input }) => {
    const existingUser = await db.user.findFirst({ where: { email: input.userEmail } });

    const existingRoomParticipant = await db.usersOnRooms.findFirst({
      where: { userId: existingUser?.id, roomId: input.roomId },
    });

    if (existingRoomParticipant) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Cannot invite the user to this room.",
        cause: new ZodError([
          {
            code: "custom",
            path: ["userEmail"],
            message: "User is already a participant in this room.",
          },
        ]),
      });
    }

    const existingInvitation = await db.invitation.findFirst({
      where: { roomId: input.roomId, email: input.userEmail, isOpen: false },
    });

    if (existingInvitation) {
      const invitation = await db.invitation.update({
        where: {
          id: existingInvitation.id,
        },
        data: {
          receiverId: existingUser?.id,
          email: input.userEmail,
          updatedAt: new Date(),
        },
      });
      return inviteUserToRoomMutationOutputSchema.safeParse(invitation).data;
    }

    const invitation = await db.invitation.create({
      data: {
        receiverId: existingUser?.id,
        senderId: ctx.user.id,
        email: input.userEmail,
        roomId: input.roomId,
        isOpen: false,
        token: crypto.randomBytes(32).toString("hex"),
      },
    });

    return inviteUserToRoomMutationOutputSchema.safeParse(invitation).data;
  });
