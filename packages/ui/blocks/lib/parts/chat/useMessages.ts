import { api } from "@repo/api/client";
import { type Message } from "@repo/schemas";
type MessagesProps = {
  sessionId: string;
};

export type MessagesGroup = { userId: string; id: string; messages: Message[] };

const MESSAGE_PAGE_SIZE = 20;

export const useMessages = ({ sessionId }: MessagesProps) => {
  const [headCursor] = api.session.chat.headCursorQuery.useSuspenseQuery(
    { sessionId },
    { staleTime: Infinity },
  );

  const { data: liveMessages = [] } =
    api.session.chat.liveMessagesQuery.useQuery(
      {
        sessionId,
        cursor: headCursor ? `(${headCursor}` : undefined,
      },
      { refetchOnWindowFocus: "always" },
    );

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
  } = api.session.chat.messagesQuery.useInfiniteQuery(
    {
      sessionId,
      limit: MESSAGE_PAGE_SIZE,
    },
    {
      initialCursor: headCursor ?? undefined,
      getNextPageParam: ({ messages, moreCount }) => {
        if (moreCount > 0) {
          return `(${messages[messages.length - 1]?.id}`;
        }
      },
    },
  );
  const moreCount =
    messagesData?.pages[messagesData.pages.length - 1]?.moreCount;

  const messages = [
    ...liveMessages,
    ...(messagesData?.pages ?? []).map(({ messages }) => messages).flat(),
  ];

  return { messages, fetchNextPage, hasNextPage, moreCount };
};
