import { api } from "@/utils/api";
import { type Message } from "@/modules/session/schemas/chat/messageSchema";

type MessagesProps = {
  sessionId: string;
};

export type MessagesGroup = { userId: string; id: string; messages: Message[] };

const MESSAGE_PAGE_SIZE = 20;

export const useMessages = ({ sessionId }: MessagesProps) => {
  const [initMessagesData] = api.session.chat.messagesQuery.useSuspenseQuery(
    { sessionId, limit: 1 },
    { staleTime: Infinity },
  );
  const initialCursor = initMessagesData.messages[0]?.id;
  const { data: liveMessages = [] } = api.session.chat.liveMessagesQuery.useQuery({
    sessionId,
    cursor: `(${initialCursor}`,
  });

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
      initialCursor,
      getNextPageParam: ({ messages, moreCount }) => {
        if (moreCount > 0) {
          return `(${messages[messages.length - 1].id}`;
        }
      },
    },
  );
  const moreCount = messagesData?.pages[messagesData.pages.length - 1].moreCount;

  const messages = [...liveMessages, ...(messagesData?.pages ?? []).map(({ messages }) => messages).flat()];

  return { messages, fetchNextPage, hasNextPage, moreCount };
};
