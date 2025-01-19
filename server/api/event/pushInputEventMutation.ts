import { protectedProcedure } from "../../trpc";
import { requireSessionAllowedMiddleware } from "../authorization/requireSessionAllowedMiddleware";
import {
  pushInputEventMutationInputSchema,
  pushInputEventMutationOutputSchema,
} from "@/modules/event/schemas/api";
import { inputEventService } from "@/server/services/event/inputEventService";

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
