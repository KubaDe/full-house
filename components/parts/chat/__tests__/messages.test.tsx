import { vi, it, describe, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { fireEvent } from "@testing-library/react";
import { render, screen, waitFor, within } from "@/testUtils/render";
import { TestCurrentRoomProvider } from "@/testUtils/wrappers";
import { messagesQueryMock } from "@/server/api/session/chat/__mocks__/messagesQuery";
import { liveMessagesQueryMock } from "@/server/api/session/chat/__mocks__/liveMessagesQuery";
import { ChatContent } from "@/components/parts/chat/chatContent";
import { participantsQueryMock } from "@/server/api/room/__mocks__/participantsQuery.mock";

vi.mock("@/modules/user/hooks/useMe");
export const server = setupServer();

const testSessionId = "testSessionId";

describe("Messages", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should load initial chat data, fetch live messages, and loads second page after clicking button", async () => {
    server.use(
      participantsQueryMock.default(),
      messagesQueryMock.singleMessageOnce(),
      messagesQueryMock.middleMessagesPageOnce(),
      messagesQueryMock.lastMessagesPageOnce(),
      liveMessagesQueryMock.default(),
    );
    render(<ChatContent sessionId={testSessionId} />, {
      wrapper: TestCurrentRoomProvider,
    });
    await waitFor(() => expect(screen.getAllByTestId("chat.messagesGroup").length).toBe(5));
    fireEvent.click(screen.getByTestId("chat.loadMore"));
    await waitFor(() => expect(screen.getAllByTestId("chat.messagesGroup").length).toBe(7));

    const messagesGroups = screen.getAllByTestId("chat.messagesGroup");
    expect(within(messagesGroups[0]).getAllByTestId("chat.message.content").length).toBe(1);
    expect(within(messagesGroups[1]).getAllByTestId("chat.message.content").length).toBe(1);
    expect(within(messagesGroups[2]).getAllByTestId("chat.message.content").length).toBe(1);
    expect(within(messagesGroups[3]).getAllByTestId("chat.message.content").length).toBe(1);
    expect(within(messagesGroups[4]).getAllByTestId("chat.message.content").length).toBe(2);
    expect(within(messagesGroups[5]).getAllByTestId("chat.message.content").length).toBe(1);
    expect(within(messagesGroups[5]).getAllByTestId("chat.message.content").length).toBe(1);
  });
});
