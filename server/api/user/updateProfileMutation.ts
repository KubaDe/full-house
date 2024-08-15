import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";
import { profileInputSchema, profileOutputSchema } from "@/modules/user/schemas/profileSchema";

export const updateProfileMutation = protectedProcedure
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
  });
