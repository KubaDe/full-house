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
import { useAddRoomForm } from "../addRoomForm";
import {
  fireEvent,
  screen,
  render,
  waitFor,
  renderHook,
} from "@repo/test-utils";
import { addRoomMutationMock } from "@repo/api/mocks";

export const server = setupServer();

describe("AddRoomForm", () => {
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
    const addRoomSpy = vi.fn();
    server.use(addRoomMutationMock.default(addRoomSpy));

    const { result } = renderHook(() => useAddRoomForm({ onSuccess }));
    await waitFor(() => expect(result.current.formUI).toBeDefined());
    render(result.current.formUI);

    await userEvent.type(
      screen.getByPlaceholderText("Room name"),
      "My new room",
    );
    fireEvent.click(screen.getByText("Add room"));

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());

    expect(addRoomSpy).toHaveBeenCalledWith({
      room: {
        name: "My new room",
      },
    });
  });

  it("should call onInvalid when form is invalid", async () => {
    server.use(addRoomMutationMock.default());

    const onSuccess = vi.fn();
    const onInvalid = vi.fn();

    const { result } = renderHook(() =>
      useAddRoomForm({ onSuccess, onInvalid }),
    );
    await waitFor(() => expect(result.current.formUI).toBeDefined());
    render(result.current.formUI);

    fireEvent.click(screen.getByText("Add room"));
    await waitFor(() => expect(onInvalid).toHaveBeenCalled());
    expect(onInvalid).toHaveBeenCalledWith(
      expect.objectContaining({
        room: {
          name: expect.objectContaining({ type: "too_small" }),
        },
      }),
      expect.anything(),
    );
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
