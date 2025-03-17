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
import { userEvent } from "@testing-library/user-event";
import { useMessageForm } from "../messageForm";
import {
  fireEvent,
  screen,
  render,
  waitFor,
  renderHook,
} from "@repo/test-utils";
import { pushInputEventMutationMock } from "@repo/api/mocks";

export const server = setupServer();

const testSessionId = "test-session-id";

describe("MessageForm", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should call submit when form is valid", async () => {
    const onSuccess = vi.fn();
    const pushEventSpy = vi.fn();
    server.use(pushInputEventMutationMock.default(pushEventSpy));

    const { result } = renderHook(() =>
      useMessageForm({ onSuccess, sessionId: testSessionId }),
    );
    await waitFor(() => expect(result.current.formUI).toBeDefined());
    render(result.current.formUI);

    await userEvent.type(
      screen.getByPlaceholderText("Type a message"),
      "My message",
    );
    fireEvent.click(screen.getByLabelText("Send message"));

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());

    expect(pushEventSpy).toHaveBeenCalledWith({
      message: "My message",
      sessionId: testSessionId,
      type: "message",
    });
  });

  it("should call onInvalid when form is invalid", async () => {
    server.use(pushInputEventMutationMock.default());

    const onSuccess = vi.fn();
    const onInvalid = vi.fn();

    const { result } = renderHook(() =>
      useMessageForm({ onSuccess, onInvalid, sessionId: testSessionId }),
    );
    await waitFor(() => expect(result.current.formUI).toBeDefined());
    render(result.current.formUI);

    fireEvent.click(screen.getByLabelText("Send message"));

    await waitFor(() => expect(onInvalid).toHaveBeenCalled());
    expect(onInvalid).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.objectContaining({ type: "too_small" }),
      }),
      expect.anything(),
    );
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
