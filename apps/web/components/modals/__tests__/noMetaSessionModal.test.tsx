import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import mockRouter from "next-router-mock";
import { setupServer } from "msw/node";
import { NoMetaSessionModal } from "../noMetaSessionModal";
import { render, screen, act, fireEvent } from "@/testUtils/render";
import { createSessionMutationMock } from "@/server/api/session/__mocks__/createSessionMutation.mock";

vi.mock("next/navigation", async () => vi.importActual("next-router-mock"));

export const server = setupServer();

describe("NoMetaSessionModal", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should always render opened modal", async () => {
    const roomId = "test-room-id";
    render(<NoMetaSessionModal roomId={roomId} />);
    const confirmActionModal = await screen.findByRole("dialog", {
      name: "You have entered the meeting room",
    });
    expect(confirmActionModal).toBeVisible();
    const action = screen.getByText("Start meeting");
    expect(action).toBeDefined();
  });

  it("should redirect to home page when modal is closed", async () => {
    const roomId = "test-room-id";
    await mockRouter.push("/room/test-room-id");
    render(<NoMetaSessionModal roomId={roomId} />);
    fireEvent.click(screen.getByText("Close"));
    expect(mockRouter).toMatchObject({ asPath: "/" });
  });

  it("should trigger creating session when start meeting button is clicked", async () => {
    const createSessionSpy = vi.fn();

    server.use(createSessionMutationMock.default(createSessionSpy));
    const roomId = "test-room-id";
    render(<NoMetaSessionModal roomId={roomId} />);
    const action = screen.getByText("Start meeting");
    await act(async () => {
      fireEvent.click(action);
    });
    expect(createSessionSpy).toHaveBeenCalledWith({ roomId, type: "meta" });
  });
});
