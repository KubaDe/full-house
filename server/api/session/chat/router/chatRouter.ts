import { router } from "../../../../trpc";
import { messagesQuery } from "../messagesQuery";
import { liveMessagesQuery } from "../liveMessagesQuery";

export const chatRouter = router({
  messagesQuery,
  liveMessagesQuery,
});
