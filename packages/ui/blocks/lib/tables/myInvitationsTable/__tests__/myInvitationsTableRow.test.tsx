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
import { type ReactNode } from "react";
import { screen, render, waitFor, within } from "@repo/test-utils";
import { MyInvitationsTableRow } from "../myInvitationsTableRow";
import { respondInvitationMutationMock } from "@repo/api/mocks";

export const server = setupServer();

const INVITATION = {
  id: "invitationId1",
  room: {
    name: "Room 1",
    id: "roomId1",
  },
  sender: {
    email: "foo@bar.pl",
  },
};

const TableWrapper = ({ children }: { children: ReactNode }) => (
  <table>
    <tbody>{children}</tbody>
  </table>
);

describe("MyInvitationsTableRow", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display invitation row correctly", async () => {
    render(<MyInvitationsTableRow invitation={INVITATION} />, {
      wrapper: TableWrapper,
    });
    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Room 1");
    expect(cells[1]).toHaveTextContent("foo@bar.pl");
    const actionsButtons = within(cells[2]!).getAllByRole("button");
    expect(actionsButtons[0]).toHaveAttribute(
      "aria-label",
      "Accept invitation",
    );
    expect(actionsButtons[1]).toHaveAttribute(
      "aria-label",
      "Reject invitation",
    );
  });

  it("should call respondInvitationMutation when clicking accept button and confirming", async () => {
    const respondInvitationSpy = vi.fn();
    server.use(respondInvitationMutationMock.default(respondInvitationSpy));
    render(<MyInvitationsTableRow invitation={INVITATION} />, {
      wrapper: TableWrapper,
    });
    await userEvent.click(
      screen.getByRole("button", { name: "Accept invitation" }),
    );
    await userEvent.click(screen.getByRole("button", { name: "Accept" }));
    await waitFor(() => expect(respondInvitationSpy).toHaveBeenCalled());
    expect(respondInvitationSpy).toHaveBeenCalledWith({
      invitationId: "invitationId1",
      accept: true,
    });
  });

  it("should call respondInvitationMutation when clicking reject button and confirming", async () => {
    const respondInvitationSpy = vi.fn();
    server.use(respondInvitationMutationMock.default(respondInvitationSpy));
    render(<MyInvitationsTableRow invitation={INVITATION} />, {
      wrapper: TableWrapper,
    });
    await userEvent.click(
      screen.getByRole("button", { name: "Reject invitation" }),
    );
    await userEvent.click(screen.getByRole("button", { name: "Reject" }));
    await waitFor(() => expect(respondInvitationSpy).toHaveBeenCalled());
    expect(respondInvitationSpy).toHaveBeenCalledWith({
      invitationId: "invitationId1",
      accept: false,
    });
  });
});
