import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { type Context } from "@/server/context";
import { db } from "@/server/db/prisma";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      message: shape.data.code === "INTERNAL_SERVER_ERROR" ? "An error occurred" : error.message,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
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
  const clerkEmail = ctx.auth.email;
  if (clerkId) {
    let user = await db.user.findUnique({ where: { clerkId } });
    if (!user) {
      user = await db.user.create({
        data: {
          clerkId,
          email: clerkEmail,
        },
      });
    }
    // TODO: Sync user email
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
