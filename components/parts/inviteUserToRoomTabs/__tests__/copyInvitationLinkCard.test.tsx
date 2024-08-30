import { it, describe, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { userEvent } from "@testing-library/user-event";
import { CopyInvitationLinkCard } from "../copyInvitationLinkCard";
import { screen, render, waitFor } from "@/testUtils/render";
import { roomOpenInvitationQueryMock } from "@/server/api/invitation/__mocks__/roomOpenInvitationQuery.mock.ts";

const server = setupServer();

describe("CopyInvitationLinkCard", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display tooltip for copy link button", async () => {
    const testRoomId = "testRoomId";
    server.use(roomOpenInvitationQueryMock.enabled());

    render(<CopyInvitationLinkCard roomId={testRoomId} />);
    await waitFor(() => expect(screen.getByText("Copy link to clipboard")).toBeVisible());
    await userEvent.hover(screen.getByText("Copy link to clipboard"));
    expect(await screen.findByTestId("tooltip-content")).toHaveTextContent(/http:\/\/test.com/);
  });
});
