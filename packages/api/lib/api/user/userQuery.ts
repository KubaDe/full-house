import { protectedProcedure } from "../trpc";
import { db } from "@repo/db";
import { userOutputSchema } from "@repo/schemas";
export const userQuery = protectedProcedure
  .output(userOutputSchema.nullish())
  .query(async ({ ctx }) => {
    if (!ctx.user.id) {
      return null;
    }
    const user = await db.user.findFirst({
      where: { id: ctx.user.id },
      include: {
        profile: {
          include: {
            avatar: true,
          },
        },
      },
    });
    if (!user) {
      return null;
    }
    return userOutputSchema.safeParse(user).data;
  });
