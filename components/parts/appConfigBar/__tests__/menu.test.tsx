import { describe, expect, it, vi } from "vitest";
import { within } from "@storybook/test";
import { userEvent } from "@testing-library/user-event";
import { Menu } from "../menu";
import { render, screen } from "@/testUtils/render";

vi.mock("@/modules/user/hooks/useMe");
vi.mock("next/navigation", async () => ({
  ...(await vi.importActual("next-router-mock")),
  useParams: vi.fn().mockImplementation(() => {
    return {};
  }),
}));

describe("Menu - MVP", () => {
  it("should render all menus", () => {
    render(<Menu />);
    const menus = screen.getAllByRole("menuitem").map((menuItem) => menuItem.textContent);
    expect(menus).toEqual(["Account", "Rooms"]);
  });

  it("should render all sub menu items for Account", async () => {
    render(<Menu />);
    const accountMenuButton = screen.getByRole("menuitem", { name: "Account" });
    await userEvent.click(accountMenuButton);
    const accountSubMenu = await screen.findByRole("menu", { hidden: true });
    expect(within(accountSubMenu).getAllByRole("menuitem")).toHaveLength(2);
    expect(within(accountSubMenu).getByRole("menuitem", { name: "Edit Profile" })).toBeDefined();
    expect(within(accountSubMenu).getByRole("menuitem", { name: "Logout" })).toBeDefined();
  });
});
