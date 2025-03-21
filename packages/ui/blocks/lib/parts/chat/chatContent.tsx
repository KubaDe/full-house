import { Suspense } from "react";
import { Messages } from "./messages";
import { useMessageForm } from "../../forms";
import { Spinner } from "@repo/ui-kit/spinner";

type ChatProps = {
  sessionId: string;
};

export const ChatContent = ({ sessionId }: ChatProps) => {
  const { formUI } = useMessageForm({ sessionId });
  return (
    <div
      className="flex h-full max-h-screen flex-col"
      data-testid="chat.chatContent"
    >
      <div className="grow overflow-hidden">
        <Suspense fallback={<Spinner />}>
          <Messages sessionId={sessionId} />
        </Suspense>
      </div>
      <div>
        <div className="border-t border-gray-200">{formUI}</div>
      </div>
    </div>
  );
};
