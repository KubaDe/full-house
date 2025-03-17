import { match, P } from "ts-pattern";
import { ChatContent } from "./chatContent";
import { EmptyChatMessage } from "./emptyChatMessage";
import { api } from "@repo/api/client";
import { sessionTypeSchema } from "@repo/schemas";
import { Spinner } from "@repo/ui-kit/spinner";
import { useCurrentRoom } from "@repo/ui-hooks/room";

export const Chat = () => {
  const { roomId } = useCurrentRoom();
  const { data: sessionsData, isFetching } =
    api.session.roomSessionsQuery.useQuery({ roomId }, { enabled: !!roomId });

  const chatSessionId = sessionsData?.find(
    (session) => session.type === sessionTypeSchema.enum.chat,
  )?.id;

  return match([chatSessionId, isFetching])
    .with([P.nullish, false], () => <EmptyChatMessage />)
    .with([P.nullish, true], () => <Spinner />)
    .with([P.nonNullable, P.any], ([sessionId]) => (
      <ChatContent sessionId={sessionId} />
    ))
    .exhaustive();
};
