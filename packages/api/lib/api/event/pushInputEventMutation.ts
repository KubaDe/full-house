import { protectedProcedure } from "../trpc";
import { requireSessionAllowedMiddleware } from "../authorization/requireSessionAllowedMiddleware";
import {
  pushInputEventMutationInputSchema,
  pushInputEventMutationOutputSchema,
} from "@repo/schemas";
import { inputEventService } from "@repo/services/event";

export const pushInputEventMutation = protectedProcedure
  .input(pushInputEventMutationInputSchema)
  .output(pushInputEventMutationOutputSchema)
  .unstable_concat(requireSessionAllowedMiddleware)
  .mutation(async ({ ctx, input }) => {
    await inputEventService.onPush({
      event: input,
      userId: ctx.user.id,
      roomId: ctx.roomId,
    });
  });
