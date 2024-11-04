import { match } from "ts-pattern";
import { useInvalidateQueryHandler } from "./eventHandlers";
import { outputEventSchema, outputEventTypeSchema } from "@/modules/event/schemas/outputEvent";

export const useEventStreamHandler = () => {
  const { invalidateQueryHandler } = useInvalidateQueryHandler();

  const eventStreamHandler = (data: unknown) => {
    const { data: event } = outputEventSchema.safeParse(data);
    void match(event)
      .with({ type: outputEventTypeSchema.enum.invalidateQuery }, invalidateQueryHandler)
      .with(undefined, () => {
        console.error("Unknown event", data);
      })
      .exhaustive();
  };

  return { eventStreamHandler };
};
