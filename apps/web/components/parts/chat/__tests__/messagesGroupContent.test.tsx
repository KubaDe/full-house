import {
  vi,
  it,
  describe,
  expect,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@/testUtils/render";
import { TestCurrentRoomProvider } from "@/testUtils/wrappers";
import { MessagesGroupContent } from "@/components/parts/chat/messagesGroupContent";
import { participantsQueryMock } from "@/server/api/room/__mocks__/participantsQuery.mock";

vi.mock("@/modules/user/hooks/useMe");
export const server = setupServer();

describe("MessagesGroupContent", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render user name correctly", async () => {
    server.use(participantsQueryMock.default());
    render(
      <MessagesGroupContent
        messagesGroup={{
          userId: "participant-1",
          id: "1735741291228-0",
          messages: [
            {
              userId: "participant-1",
              id: "1735741291228-0",
              payload: {
                message: "Single message",
              },
            },
          ],
        }}
      />,
      {
        wrapper: TestCurrentRoomProvider,
      },
    );

    await waitFor(() =>
      expect(screen.getByTestId("chat.messageGroup.sender")).toHaveTextContent(
        "John Smith",
      ),
    );
  });

  it("should render message when user is not found", async () => {
    server.use(participantsQueryMock.default());
    render(
      <MessagesGroupContent
        messagesGroup={{
          userId: "participant-3",
          id: "1735741291228-0",
          messages: [
            {
              userId: "participant-3",
              id: "1735741291228-0",
              payload: {
                message: "Single message",
              },
            },
          ],
        }}
      />,
      {
        wrapper: TestCurrentRoomProvider,
      },
    );

    await waitFor(() =>
      expect(screen.getByTestId("chat.messageGroup.sender")).toHaveTextContent(
        "Unknown",
      ),
    );
  });

  it("should render single message correctly", async () => {
    server.use(participantsQueryMock.default());
    render(
      <MessagesGroupContent
        messagesGroup={{
          userId: "participant-1",
          id: "1735741291228-0",
          messages: [
            {
              userId: "participant-1",
              id: "1735741291228-0",
              payload: {
                message: "Single message",
              },
            },
          ],
        }}
      />,
      {
        wrapper: TestCurrentRoomProvider,
      },
    );

    expect(screen.getByTestId("chat.message.content")).toHaveTextContent(
      "Single message",
    );
  });

  it("should render multiple messages correctly", async () => {
    server.use(participantsQueryMock.default());
    render(
      <MessagesGroupContent
        messagesGroup={{
          userId: "participant-2",
          id: "1735741291228-0,1735741291228-1",
          messages: [
            {
              userId: "participant-2",
              id: "1735741291228-0",
              payload: {
                message: "First message",
              },
            },
            {
              userId: "participant-2",
              id: "1735741291228-1",
              payload: {
                message: "Second message",
              },
            },
          ],
        }}
      />,
      {
        wrapper: TestCurrentRoomProvider,
      },
    );

    const messages = screen.getAllByTestId("chat.message.content");
    expect(messages[0]).toHaveTextContent("First message");
    expect(messages[1]).toHaveTextContent("Second message");
  });
});
