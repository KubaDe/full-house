import { useQueryClient } from "@tanstack/react-query";
import { type InvalidateQueryEvent } from "@/modules/event/schemas/outputEvent";

const keyToQueryKey = (key: string) => key.split("__");
export const useInvalidateQueryHandler = () => {
  const queryClient = useQueryClient();
  return {
    invalidateQueryHandler: async (event: InvalidateQueryEvent) => {
      return Promise.all(
        event.payload.keys.map((key) => queryClient.invalidateQueries({ queryKey: [keyToQueryKey(key)] })),
      );
    },
  };
};
