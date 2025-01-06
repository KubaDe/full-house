import { match, P } from "ts-pattern";
import { ChatContent } from "./chatContent";
import { EmptyChatMessage } from "./emptyChatMessage";
import { api } from "@/utils/api";
import { sessionTypeSchema } from "@/modules/session/schemas/sessionType";
import { Spinner } from "@/components/uiKit/Spinner";
import { useCurrentRoom } from "@/modules/room/hooks/useCurrentRoom";

export const Chat = () => {
  const { roomId } = useCurrentRoom();
  const { data: sessionsData, isFetching } = api.session.roomSessionsQuery.useQuery(
    { roomId },
    { enabled: !!roomId },
  );

  const chatSessionId = sessionsData?.find((session) => session.type === sessionTypeSchema.enum.chat)?.id;

  return match([chatSessionId, isFetching])
    .with([P.nullish, false], () => <EmptyChatMessage />)
    .with([P.nullish, true], () => <Spinner />)
    .with([P.nonNullable, P.any], ([sessionId]) => <ChatContent sessionId={sessionId} />)
    .exhaustive();
};
