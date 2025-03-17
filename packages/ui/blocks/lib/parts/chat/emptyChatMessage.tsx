import { toast } from "sonner";
import { Button } from "@repo/ui-kit/button";
import { api } from "@repo/api/client";
import { sessionTypeSchema } from "@repo/schemas";
import { ButtonSpinner } from "@repo/ui-kit/buttonSpinner";
import { useCurrentRoom } from "@repo/ui-hooks/room";

export const EmptyChatMessage = () => {
  const { roomId } = useCurrentRoom();

  const utils = api.useUtils();
  const { mutate: createSession, isPending } =
    api.session.createSessionMutation.useMutation({
      onSuccess: () => utils.session.roomSessionsQuery.refetch(),
      onError: () => toast.error("Failed to start chat", { richColors: true }),
    });
  const onClick = () => {
    createSession({ roomId, type: sessionTypeSchema.enum.chat });
  };

  return (
    <div
      className="flex size-full items-center justify-center"
      data-testid="chat.emptyChatMessage"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">No chat messages yet</p>
        <Button
          variant="outline"
          onClick={onClick}
          data-testid="chat.startChat"
        >
          <ButtonSpinner isLoading={isPending} />
          Start chatting
        </Button>
      </div>
    </div>
  );
};
