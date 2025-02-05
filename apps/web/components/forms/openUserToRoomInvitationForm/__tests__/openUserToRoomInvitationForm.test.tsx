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
import { useOpenUserToRoomInvitationForm } from "../openUserToRoomInvitationForm";
import {
  fireEvent,
  screen,
  render,
  waitFor,
  renderHook,
} from "@/testUtils/render";
import { userRoomQueryMock } from "@/server/api/room/__mocks__/userRoomQuery.mock";
import { switchOpenInvitationMutationMock } from "@/server/api/invitation/__mocks__/switchOpenInvitationMutation.mock";
import { roomOpenInvitationQueryMock } from "@/server/api/invitation/__mocks__/roomOpenInvitationQuery.mock";

export const server = setupServer();

describe("InviteUserToRoomForm", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should enable open invitation when switching disabled invitation", async () => {
    const testRoomId = "testRoomId";
    const onSuccess = vi.fn();
    const switchOpenInvitationSpy = vi.fn();
    server.use(
      switchOpenInvitationMutationMock.default(switchOpenInvitationSpy),
      roomOpenInvitationQueryMock.disabled(),
      userRoomQueryMock.default(),
    );

    const { result } = renderHook(() =>
      useOpenUserToRoomInvitationForm({ onSuccess, roomId: testRoomId }),
    );
    await waitFor(() => expect(result.current.formUI).toBeDefined());
    render(result.current.formUI);

    fireEvent.click(screen.getByLabelText(/Open invitation/));

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());

    expect(switchOpenInvitationSpy).toHaveBeenCalledWith({
      roomId: testRoomId,
      value: true,
    });
  });

  it("should disable open invitation when switching enabled invitation", async () => {
    const testRoomId = "testRoomId";
    const onSuccess = vi.fn();
    const switchOpenInvitationSpy = vi.fn();
    server.use(
      switchOpenInvitationMutationMock.default(switchOpenInvitationSpy),
      roomOpenInvitationQueryMock.enabled(),
      userRoomQueryMock.default(),
    );

    const { result } = renderHook(() =>
      useOpenUserToRoomInvitationForm({ onSuccess, roomId: testRoomId }),
    );
    await waitFor(() => expect(result.current.formUI).toBeDefined());
    render(result.current.formUI);

    fireEvent.click(screen.getByLabelText(/Open invitation/));

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());

    expect(switchOpenInvitationSpy).toHaveBeenCalledWith({
      roomId: testRoomId,
      value: false,
    });
  });

  it("should display correct switch description", async () => {
    const testRoomId = "testRoomId";
    const onSuccess = vi.fn();
    const switchOpenInvitationSpy = vi.fn();
    server.use(
      switchOpenInvitationMutationMock.default(switchOpenInvitationSpy),
      roomOpenInvitationQueryMock.enabled(),
      userRoomQueryMock.default(),
    );

    const { result, rerender: rerenderHook } = renderHook(() =>
      useOpenUserToRoomInvitationForm({ onSuccess, roomId: testRoomId }),
    );
    await waitFor(() => expect(result.current.formUI).toBeDefined());
    const { rerender: rerenderUi } = render(result.current.formUI);
    fireEvent.click(screen.getByLabelText(/Open invitation/));
    rerenderHook();
    rerenderUi(result.current.formUI);
    expect(
      await screen.findByText(
        /Allow to join the "Room 1" room for everybody with the link/,
      ),
    ).toBeVisible();
  });
});
