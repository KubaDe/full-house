"use client";
import { match, P } from "ts-pattern";
import { type MessagesGroup } from "./useMessages";
import { cn } from "@/lib/utils";
import { PersonBadge } from "@/components/parts/personBadge";
import { useCurrentRoom } from "@/modules/room/hooks/useCurrentRoom";
import { api } from "@/utils/api";
import { useMe } from "@/modules/user/hooks/useMe";

type MessageGroupProps = {
  messagesGroup: MessagesGroup;
};

export const MessagesGroupContent = ({ messagesGroup }: MessageGroupProps) => {
  const { roomId } = useCurrentRoom();
  const { data: participantsData, isLoading } =
    api.room.participantsQuery.useQuery(
      { roomId, includeMe: true },
      { enabled: !!roomId },
    );
  const { userData } = useMe();

  const isMyMessage = messagesGroup.userId === userData?.id;

  const profile = participantsData?.find(
    (participant) => participant.id === messagesGroup.userId,
  )?.profile;

  return (
    <div className="px-2 py-4" data-testid="chat.messagesGroup">
      <div className="relative flex flex-col-reverse gap-0.5">
        <div
          className={cn("absolute top-4", isMyMessage ? "right-0" : "left-0")}
        >
          {profile && !isMyMessage && (
            <PersonBadge
              profile={profile}
              avatar={profile.avatar}
              showStatusDot={false}
              isOpen={false}
              openOnHover={false}
            />
          )}
        </div>
        {messagesGroup.messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "w-max max-w-[75%] overflow-hidden rounded-xl px-3 py-2 text-sm",
              isMyMessage
                ? "mp-auto bg-secondary text-secondary-foreground"
                : "ml-auto bg-primary text-primary-foreground",
            )}
          >
            <p
              className="break-all"
              data-testid="chat.message.content"
              data-author={messagesGroup.userId}
            >
              {message.payload.message}
            </p>
          </div>
        ))}
        <p
          className={cn(
            "flex w-full px-2 text-xs font-semibold",
            isMyMessage ? "justify-start" : "justify-end",
          )}
          data-testid="chat.messageGroup.sender"
        >
          {match([profile?.name, isLoading])
            .with([P.nullish, true], () => "")
            .with([P.nullish, false], () => "Unknown")
            .with([P.string, P.any], ([name]) => name)
            .exhaustive()}
        </p>
      </div>
    </div>
  );
};
