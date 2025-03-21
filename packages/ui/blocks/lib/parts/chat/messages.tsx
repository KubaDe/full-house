import { useMessages } from "./useMessages";
import { MessagesGroupContent } from "./messagesGroupContent";
import { Button } from "@repo/ui-kit/button";
import { groupConsecutiveMessages } from "../chat/utils";

type MessagesProps = {
  sessionId: string;
};

export const Messages = ({ sessionId }: MessagesProps) => {
  const { messages, moreCount, hasNextPage, fetchNextPage } = useMessages({
    sessionId,
  });
  const messagesGroups = groupConsecutiveMessages(messages);

  return (
    <div
      className="flex size-full flex-col-reverse overflow-scroll"
      data-testid="chat.messages"
    >
      {messagesGroups?.map((messagesGroup) => (
        <MessagesGroupContent
          key={messagesGroup.id}
          messagesGroup={messagesGroup}
        />
      ))}

      {hasNextPage && (
        <div className="p-3">
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => fetchNextPage()}
            data-testid="chat.loadMore"
            data-value={moreCount}
          >
            Load more ({moreCount})
          </Button>
        </div>
      )}
    </div>
  );
};
