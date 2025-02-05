import { toast } from "sonner";
import { Button } from "@/components/uiKit/button";
import { api } from "@/utils/api";
import { sessionTypeSchema } from "@/modules/session/schemas/sessionType";
import { ButtonSpinner } from "@/components/uiKit/buttonSpinner";
import { useCurrentRoom } from "@/modules/room/hooks/useCurrentRoom";

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
