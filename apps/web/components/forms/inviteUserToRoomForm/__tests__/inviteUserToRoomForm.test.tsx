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
import {
  fireEvent,
  screen,
  render,
  waitFor,
  renderHook,
} from "@/testUtils/render";
import { inviteUserToRoomMutationMock } from "@/server/api/invitation/__mocks__/inviteUserToRoomMutation.mock";
import { useInviteUserToRoomForm } from "@/components/forms/inviteUserToRoomForm";

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

  it("should call submit when form is valid", async () => {
    const testRoomId = "testRoomId";
    const onSuccess = vi.fn();
    const inviteUserToRoomSpy = vi.fn();
    server.use(inviteUserToRoomMutationMock.default(inviteUserToRoomSpy));

    const { result } = renderHook(() =>
      useInviteUserToRoomForm({ onSuccess, roomId: testRoomId }),
    );
    await waitFor(() => expect(result.current.formUI).toBeDefined());
    render(result.current.formUI);

    await userEvent.type(screen.getByLabelText("User's email"), "foo@bar.com");
    fireEvent.click(screen.getByText("Invite user"));

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());

    expect(inviteUserToRoomSpy).toHaveBeenCalledWith({
      roomId: testRoomId,
      userEmail: "foo@bar.com",
    });
  });
});
