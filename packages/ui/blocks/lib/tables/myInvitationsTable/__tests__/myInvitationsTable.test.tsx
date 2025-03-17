import { it, describe, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { screen, render, waitFor } from "@repo/test-utils";
import { myInvitationsQueryMock } from "@repo/api/mocks";
import { MyInvitationsTable } from "../myInvitationsTable";

export const server = setupServer();

describe("MyInvitationsTable", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display a row for each invitation", async () => {
    server.use(myInvitationsQueryMock.default());
    render(<MyInvitationsTable />);
    await waitFor(() => {
      expect(screen.getAllByRole("row").length).gt(1);
    });
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Test room 1");
    expect(rows[2]).toHaveTextContent("Test room 2");
  });

  it("should display a caption for table", async () => {
    server.use(myInvitationsQueryMock.default());
    render(<MyInvitationsTable />);
    await waitFor(() => {
      expect(screen.getAllByRole("row").length).gt(1);
    });
    expect(screen.getByRole("caption")).toHaveTextContent(
      "A list of your invitations",
    );
  });

  it("should display a message when there are no invitations", async () => {
    server.use(myInvitationsQueryMock.empty());
    render(<MyInvitationsTable />);
    await waitFor(() => {
      expect(screen.getByRole("caption")).toHaveTextContent(
        "You have no invitations",
      );
    });
  });
});
