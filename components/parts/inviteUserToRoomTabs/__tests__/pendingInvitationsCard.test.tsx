import { it, describe, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { PendingInvitationsCard } from "../pendingInvitationsCard";
import { screen, render, waitFor } from "@/testUtils/render";
import { userToRoomInvitationsQueryMock } from "@/server/api/invitation/__mocks__/userToRoomInvitationsQuery.mock";

const server = setupServer();

describe("PendingInvitationsCard", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display emails for pending invitations", async () => {
    const testRoomId = "testRoomId";
    server.use(userToRoomInvitationsQueryMock.default());

    render(<PendingInvitationsCard roomId={testRoomId} />);
    await waitFor(() => expect(screen.getByText("Pending invitations")).toBeVisible());
    expect(screen.getAllByTestId("badge-content").map((element) => element.textContent)).toEqual([
      "user1@mail.com",
      "user2@mail.com",
      "user3@mail.com",
    ]);
  });
});
