import { type Message } from "@/modules/session/schemas/chat/messageSchema";

export type MessagesGroup = { userId: string; id: string; messages: Message[] };

export const groupConsecutiveMessages = (
  messages: Message[],
): MessagesGroup[] => {
  const groups = messages.reduce((acc, message) => {
    if (acc.length === 0) {
      return [[message]];
    }

    const lastGroup = acc[acc.length - 1];
    const lastMessage = lastGroup?.[lastGroup.length - 1];

    if (lastMessage?.userId === message.userId) {
      lastGroup?.push(message);
    } else {
      acc.push([message]);
    }
    return acc;
  }, [] as Message[][]);

  return groups.map((messages) => ({
    userId: messages[0]?.userId ?? "",
    id: messages.map((message) => message.id).join(","),
    messages,
  }));
};
