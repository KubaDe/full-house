import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { render, screen, waitFor, within } from "@/testUtils/render";
import { Menubar } from "@/components/uiKit/menubar";
import { MenuAccount } from "@/components/parts/appConfigBar/menuAccount";
import { myInvitationsQueryMock } from "@/server/api/invitation/__mocks__/myInvitationsQuery.mock";
import { userQueryMock } from "@/server/api/user/__mocks__/userQuery.mock";

export const server = setupServer();

vi.mock("@/modules/user/hooks/useMe");

describe("MenuAccount", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render edit profile modal when option is selected", async () => {
    server.use(myInvitationsQueryMock.default(), userQueryMock.default());
    render(
      <Menubar>
        <MenuAccount />
      </Menubar>,
    );
    const accountMenuButton = await screen.findByRole("menuitem", { name: "Account" });
    await userEvent.click(accountMenuButton);
    const editProfileButton = screen.getByRole("menuitem", { name: "Edit profile" });
    expect(editProfileButton).toBeDefined();
    await userEvent.click(editProfileButton);
    expect(screen.getByRole("dialog", { name: "Edit profile" })).toBeDefined();
  });

  it("should render disabled invitations button when there are no pending invitations", async () => {
    server.use(myInvitationsQueryMock.empty());
    render(
      <Menubar>
        <MenuAccount />
      </Menubar>,
    );
    const accountMenuButton = await screen.findByRole("menuitem", { name: "Account" });
    await userEvent.click(accountMenuButton);
    const invitationsButton = screen.getByRole("menuitem", { name: "Invitations" });
    await waitFor(() => expect(invitationsButton).toHaveAttribute("aria-disabled", "true"));
  });

  it("should render enabled invitations button with counter when there are pending invitations", async () => {
    server.use(myInvitationsQueryMock.default());
    render(
      <Menubar>
        <MenuAccount />
      </Menubar>,
    );
    const accountMenuButton = await screen.findByRole("menuitem", { name: "Account" });
    await userEvent.click(accountMenuButton);
    const invitationsButton = screen.getByRole("menuitem", { name: /Invitations/ });
    expect(within(invitationsButton).getByTestId("badge-content")).toHaveTextContent("2");
    expect(invitationsButton).not.toHaveAttribute("aria-disabled");
  });

  it("should open invitations dialog when invitations button is clicked", async () => {
    server.use(myInvitationsQueryMock.default());
    render(
      <Menubar>
        <MenuAccount />
      </Menubar>,
    );
    const accountMenuButton = await screen.findByRole("menuitem", { name: "Account" });
    await userEvent.click(accountMenuButton);
    const invitationsButton = screen.getByRole("menuitem", { name: /Invitations/ });
    await userEvent.click(invitationsButton);
    expect(screen.getByRole("dialog", { name: "Invitations" })).toBeDefined();
  });
});
