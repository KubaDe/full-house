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
import { Chat } from "../chat";
import { screen, render } from "@repo/test-utils";
import { roomSessionsQueryMock } from "@repo/api/mocks";
import { TestCurrentRoomProvider } from "@repo/ui-hooks/room";
import { Deferred } from "@repo/ui-kit/utils";
import { headCursorQueryMock } from "@repo/api/mocks";

vi.mock("@repo/ui-hooks/user");
export const server = setupServer();

describe("Chat", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render spinner when loading", async () => {
    const { promise } = new Deferred();
    const spy = vi.fn(() => promise);
    server.use(roomSessionsQueryMock.default(spy));
    render(<Chat />, { wrapper: TestCurrentRoomProvider });
    expect(await screen.findByTestId("fullPageSpinner")).toBeVisible();
  });

  it("should render 'No chat info' when session not started", async () => {
    server.use(roomSessionsQueryMock.noChat());
    render(<Chat />, { wrapper: TestCurrentRoomProvider });
    expect(await screen.findByTestId("chat.emptyChatMessage")).toBeVisible();
  });

  it("should render chat content when session started", async () => {
    server.use(roomSessionsQueryMock.default(), headCursorQueryMock.once());
    render(<Chat />, { wrapper: TestCurrentRoomProvider });
    expect(await screen.findByTestId("chat.chatContent")).toBeVisible();
  });
});
