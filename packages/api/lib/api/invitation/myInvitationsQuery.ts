import { protectedProcedure } from "../trpc";
import { db } from "@repo/db";
import {
  myInvitationsQueryOutputSchema,
  myInvitationsQueryInputSchema,
} from "@repo/schemas";
export const myInvitationsQuery = protectedProcedure
  .input(myInvitationsQueryInputSchema)
  .output(myInvitationsQueryOutputSchema)
  .query(async ({ ctx }) => {
    const userToRoomInvitations = await db.invitation.findMany({
      where: { email: ctx.user.email },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        sender: {
          select: {
            email: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return myInvitationsQueryOutputSchema.safeParse(userToRoomInvitations).data;
  });
