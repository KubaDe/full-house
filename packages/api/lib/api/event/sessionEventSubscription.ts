import { observable } from "@trpc/server/observable";
import { match, P } from "ts-pattern";
import { protectedProcedure } from "../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { rdsSub } from "@repo/db";
import { sessionEventSubscriptionInputSchema } from "@repo/schemas";
import { deserializePublishToOutputEvent } from "@repo/utils";
export const sessionEventSubscription = protectedProcedure
  .input(sessionEventSubscriptionInputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .subscription(async (opts) => {
    const channel = `outputEvents:${opts.input.roomId}`;

    void rdsSub.subscribe(channel);
    return observable((emit) => {
      rdsSub.on("message", (_: string, message: string) => {
        const messageObj = deserializePublishToOutputEvent(message);
        if (!messageObj || opts.input.roomId !== messageObj?.roomId) {
          return;
        }

        const shouldGetMessage = match(messageObj)
          .with(
            {
              pickRecipientIds: P.array().select(),
              skipRecipientIds: undefined,
            },
            (pickRecipientIds) => pickRecipientIds.includes(opts.ctx.user.id),
          )
          .with(
            {
              pickRecipientIds: undefined,
              skipRecipientIds: P.array().select(),
            },
            (skipRecipientIds) => !skipRecipientIds?.includes(opts.ctx.user.id),
          )

          .with(
            { pickRecipientIds: undefined, skipRecipientIds: undefined },
            () => true,
          )
          .with(
            { pickRecipientIds: P.array(), skipRecipientIds: P.array() },
            () => {
              console.error(
                "Invalid pickRecipientIds and skipRecipientIds config",
              );
              return false;
            },
          );

        if (shouldGetMessage) {
          emit.next(messageObj);
        }
      });

      return () => {
        void rdsSub.unsubscribe(channel);
      };
    });
  });
