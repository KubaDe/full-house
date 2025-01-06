import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { setupServer } from "msw/node";
import { MetaSessionManager } from "../metaSessionManager";
import { render, screen, act } from "@/testUtils/render";
import { userRoomQueryMock } from "@/server/api/room/__mocks__/userRoomQuery.mock";
import { pushInputEventMutationMock } from "@/server/api/event/__mocks__/pushInputEventMutation.mock";
import { Deferred } from "@/lib/deferred";
import { TestCurrentRoomProvider } from "@/testUtils/wrappers";

vi.mock("next/navigation", async () => vi.importActual("next-router-mock"));

export const server = setupServer();

describe("MetaSessionManager", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display loader and content after loading is finished", async () => {
    const { promise, resolve } = new Deferred();
    const spy = vi.fn(() => promise);
    server.use(pushInputEventMutationMock.default(), userRoomQueryMock.withSessions(spy));
    render(
      <MetaSessionManager>
        <div>Test content</div>
      </MetaSessionManager>,
      { wrapper: TestCurrentRoomProvider },
    );

    expect(await screen.findByTestId("full-page-spinner")).toBeVisible();

    act(() => resolve());
    expect(await screen.findByText("Test content")).toBeVisible();
  });

  it("should display loader and 'no session dialog' after loading is finished and no sessions are available", async () => {
    const { promise, resolve } = new Deferred();
    const spy = vi.fn(() => promise);
    server.use(pushInputEventMutationMock.default(), userRoomQueryMock.default(spy));
    render(
      <MetaSessionManager>
        <div>Test content</div>
      </MetaSessionManager>,
      { wrapper: TestCurrentRoomProvider },
    );

    expect(await screen.findByTestId("full-page-spinner")).toBeVisible();

    act(() => resolve());
    expect(await screen.findByText(/There is no active session started./)).toBeVisible();
  });
});
