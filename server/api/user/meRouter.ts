import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../../trpc";
import { db } from "@/server/db/prisma";
import { userOutputSchema } from "@/modules/user/schemas/userOutputSchema";
import { profileInputSchema, profileOutputSchema } from "@/modules/user/schemas/profileSchema";

export const meRouter = router({
  user: protectedProcedure.output(userOutputSchema.nullish()).query(async ({ ctx }) => {
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
  }),
  updateProfile: protectedProcedure
    .input(profileInputSchema)
    .output(profileOutputSchema.nullish())
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
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }
      return profileOutputSchema.safeParse(user.profile).data;
    }),
});

export type MeRouter = typeof meRouter;
