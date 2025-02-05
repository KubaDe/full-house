import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";
import {
  myInvitationsQueryOutputSchema,
  myInvitationsQueryInputSchema,
} from "@/modules/invitation/schemas/api";

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
