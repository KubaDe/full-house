import { protectedProcedure, router } from "../../trpc";
import { db } from "@/server/db/prisma";
import { userSchema } from "@/modules/user/schemas/userSchema";
import { profileSchema } from "@/modules/user/schemas/profileSchema";

export const meRouter = router({
  user: protectedProcedure.output(userSchema.nullish()).query(async ({ ctx }) => {
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
    return userSchema.safeParse(user).data;
  }),
  updateProfile: protectedProcedure
    .input(profileSchema)
    .output(userSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await db.user.update({
        where: { id: ctx.user.id },
        data: {
          profile: {
            upsert: {
              create: {
                name: input.name,
                avatar: {
                  create: input.avatar,
                },
              },
              update: {
                name: input.name,
                avatar: {
                  upsert: {
                    update: input.avatar,
                    create: input.avatar,
                  },
                },
              },
            },
          },
        },
        include: {
          profile: {
            include: {
              avatar: true,
            },
          },
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const userParsed = userSchema.safeParse(user);
      if (!userParsed.data) {
        throw new Error("User data is incorrect");
      }
      return userParsed.data;
    }),
});

export type MeRouter = typeof meRouter;
