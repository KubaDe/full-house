import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@/testUtils/render";
import { userToRoomInvitationsQueryMock } from "@/server/api/invitation/__mocks__/userToRoomInvitationsQuery.mock.ts";
import { AddParticipantButton } from "@/components/parts/participantsList/addParticipantButton";

export const server = setupServer();

describe("AddParticipantButton", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render pending invitations counter for less than 9 invitations pending", async () => {
    const roomId = "test-room-id";
    server.use(userToRoomInvitationsQueryMock.default());
    render(<AddParticipantButton roomId={roomId} />);
    expect(await screen.findByLabelText("pending invitations counter")).toBeVisible();
    expect(screen.getByLabelText("pending invitations counter")).toHaveTextContent("3");
  });

  it("should render pending invitations counter for more than 9 invitations pending", async () => {
    const roomId = "test-room-id";
    server.use(userToRoomInvitationsQueryMock.moreThan9());
    render(<AddParticipantButton roomId={roomId} />);
    expect(await screen.findByLabelText("pending invitations counter")).toBeVisible();
    expect(screen.getByLabelText("pending invitations counter")).toHaveTextContent("9+");
  });

  it("should render hover card with emails of invited people", async () => {
    const roomId = "test-room-id";
    server.use(userToRoomInvitationsQueryMock.default());
    render(<AddParticipantButton roomId={roomId} />);
    expect(await screen.findByLabelText("pending invitations counter")).toBeVisible();
    await userEvent.hover(screen.getByLabelText("pending invitations counter"));
    expect(await screen.findByText("Invited people")).toBeVisible();
    expect(screen.getByLabelText("invitations list").children).toHaveLength(3);
    const invitationsBadges = screen.getByLabelText("invitations list").children;
    expect(invitationsBadges[0].textContent).toEqual("user1@mail.com");
    expect(invitationsBadges[1].textContent).toEqual("user2@mail.com");
    expect(invitationsBadges[2].textContent).toEqual("user3@mail.com");
  });
});
