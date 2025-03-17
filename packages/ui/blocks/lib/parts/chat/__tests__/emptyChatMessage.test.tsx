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
import { screen, render, fireEvent, waitFor } from "@repo/test-utils";
import { createSessionMutationMock } from "@repo/api/mocks";
import { TEST_ROOM_ID, TestCurrentRoomProvider } from "@repo/ui-hooks/room";
import { EmptyChatMessage } from "../emptyChatMessage";

export const server = setupServer();

describe("EmptyChatMessage", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should create a new chat session when clicking the button", async () => {
    const createSessionSpy = vi.fn();
    server.use(createSessionMutationMock.default(createSessionSpy));
    render(<EmptyChatMessage />, { wrapper: TestCurrentRoomProvider });
    fireEvent.click(screen.getByText("Start chatting"));
    await waitFor(() => {
      expect(createSessionSpy).toHaveBeenCalledWith({
        roomId: TEST_ROOM_ID,
        type: "chat",
      });
    });
  });

  it("should show error toast when session creation fails", async () => {
    server.use(createSessionMutationMock.error());
    render(<EmptyChatMessage />, { wrapper: TestCurrentRoomProvider });
    fireEvent.click(screen.getByText("Start chatting"));
    await waitFor(() => {
      expect(screen.getByText("Failed to start chat")).toBeVisible();
    });
  });
});
