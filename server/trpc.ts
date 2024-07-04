import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { type Context } from "@/server/context";
import { db } from "@/server/db/prisma";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

const syncUser = t.middleware(async ({ next, ctx }) => {
  const clerkId = ctx.auth.userId;
  if (clerkId) {
    let user = await db.user.findUnique({ where: { clerkId: ctx.auth.userId } });
    if (!user) {
      user = await db.user.create({
        data: {
          clerkId,
        },
      });
    }
    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  }
  return next();
});

export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed).use(syncUser);
