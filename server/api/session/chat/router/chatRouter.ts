import { router } from "../../../../trpc";
import { messagesQuery } from "../messagesQuery";
import { liveMessagesQuery } from "../liveMessagesQuery";
import { headCursorQuery } from "@/server/api/session/chat/headCursorQuery";

export const chatRouter = router({
  messagesQuery,
  liveMessagesQuery,
  headCursorQuery,
});
