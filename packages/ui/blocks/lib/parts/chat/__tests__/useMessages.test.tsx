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
import { useMessages } from "../useMessages";
import { renderHook, waitFor } from "@repo/test-utils";
import { TestCurrentRoomProvider } from "@repo/ui-hooks/room";
import { messagesQueryMock } from "@repo/api/mocks";
import { liveMessagesQueryMock } from "@repo/api/mocks";
import { headCursorQueryMock } from "@repo/api/mocks";

vi.mock("@repo/ui-hooks/user");
export const server = setupServer();

const testSessionId = "testSessionId";

describe("useMessages", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should initially load first result to get the starting index", async () => {
    const spy = vi.fn();
    server.use(
      headCursorQueryMock.once(spy),
      messagesQueryMock.middleMessagesPageOnce(),
      liveMessagesQueryMock.empty(),
    );
    renderHook(() => useMessages({ sessionId: testSessionId }), {
      wrapper: TestCurrentRoomProvider,
    });
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith({ sessionId: testSessionId });
    });
  });

  it("should load first page of results based on the returned index", async () => {
    const spy = vi.fn();
    server.use(
      headCursorQueryMock.once(),
      messagesQueryMock.middleMessagesPageOnce(spy),
      liveMessagesQueryMock.empty(),
    );
    const { result } = renderHook(
      () => useMessages({ sessionId: testSessionId }),
      {
        wrapper: TestCurrentRoomProvider,
      },
    );

    await waitFor(() => expect(result.current.messages.length).not.toBe(0));
    expect(spy).toHaveBeenCalledWith({
      cursor: "1735741291228-0",
      direction: "forward",
      limit: 20,
      sessionId: "testSessionId",
    });
    await waitFor(() => expect(result.current.messages.length).toBe(3));
    const messages = result.current.messages;
    expect(messages[0]!.payload.message).toBe("46");
    expect(messages[1]!.payload.message).toBe("45");
    expect(messages[2]!.payload.message).toBe("44");
  });

  it("should returns true for hasNextPage for middle page", async () => {
    server.use(
      headCursorQueryMock.once(),
      messagesQueryMock.middleMessagesPageOnce(),
      liveMessagesQueryMock.empty(),
    );
    const { result } = renderHook(
      () => useMessages({ sessionId: testSessionId }),
      {
        wrapper: TestCurrentRoomProvider,
      },
    );

    await waitFor(() => expect(result.current.messages.length).not.toBe(0));
    expect(result.current.hasNextPage).toBe(true);
  });

  it("should return false from hasNextPage for last page", async () => {
    server.use(
      headCursorQueryMock.once(),
      messagesQueryMock.lastMessagesPageOnce(),
      liveMessagesQueryMock.empty(),
    );
    const { result } = renderHook(
      () => useMessages({ sessionId: testSessionId }),
      {
        wrapper: TestCurrentRoomProvider,
      },
    );

    await waitFor(() => expect(result.current.messages.length).not.toBe(0));
    expect(result.current.hasNextPage).toBe(false);
  });

  it("should return false from hasNextPage for last page", async () => {
    server.use(
      headCursorQueryMock.once(),
      messagesQueryMock.lastMessagesPageOnce(),
      liveMessagesQueryMock.empty(),
    );
    const { result } = renderHook(
      () => useMessages({ sessionId: testSessionId }),
      {
        wrapper: TestCurrentRoomProvider,
      },
    );

    await waitFor(() => expect(result.current.messages.length).not.toBe(0));
    expect(result.current.hasNextPage).toBe(false);
  });

  it("should load more messages on demand", async () => {
    const spy = vi.fn();
    server.use(
      headCursorQueryMock.once(),
      messagesQueryMock.middleMessagesPageOnce(),
      messagesQueryMock.lastMessagesPageOnce(spy),
      liveMessagesQueryMock.empty(),
    );
    const { result } = renderHook(
      () => useMessages({ sessionId: testSessionId }),
      {
        wrapper: TestCurrentRoomProvider,
      },
    );

    await waitFor(() => expect(result.current.messages.length).not.toBe(0));
    expect(result.current.moreCount).toBe(44);
    await result.current.fetchNextPage();
    expect(spy).toHaveBeenCalledWith({
      cursor: "(1735521871610-0",
      direction: "forward",
      limit: 20,
      sessionId: "testSessionId",
    });
    await waitFor(() => expect(result.current.messages.length).toBe(6));
    expect(result.current.moreCount).toBe(0);
    const messages = result.current.messages;
    expect(messages).toEqual([
      expect.objectContaining({ payload: { message: "46" } }),
      expect.objectContaining({ payload: { message: "45" } }),
      expect.objectContaining({ payload: { message: "44" } }),
      expect.objectContaining({ payload: { message: "43" } }),
      expect.objectContaining({ payload: { message: "42" } }),
      expect.objectContaining({ payload: { message: "41" } }),
    ]);
  });

  it("should merge live messages with paginated results", async () => {
    const spy = vi.fn();
    server.use(
      headCursorQueryMock.once(),
      messagesQueryMock.middleMessagesPageOnce(),
      messagesQueryMock.lastMessagesPageOnce(spy),
      liveMessagesQueryMock.default(),
    );
    const { result } = renderHook(
      () => useMessages({ sessionId: testSessionId }),
      {
        wrapper: TestCurrentRoomProvider,
      },
    );

    await waitFor(() => expect(result.current.messages.length).not.toBe(0));
    await result.current.fetchNextPage();
    await waitFor(() => expect(result.current.messages.length).toBe(8));
    const messages = result.current.messages;
    expect(messages).toEqual([
      expect.objectContaining({ payload: { message: "Live message 2" } }),
      expect.objectContaining({ payload: { message: "Live message 1" } }),
      expect.objectContaining({ payload: { message: "46" } }),
      expect.objectContaining({ payload: { message: "45" } }),
      expect.objectContaining({ payload: { message: "44" } }),
      expect.objectContaining({ payload: { message: "43" } }),
      expect.objectContaining({ payload: { message: "42" } }),
      expect.objectContaining({ payload: { message: "41" } }),
    ]);
  });
});
