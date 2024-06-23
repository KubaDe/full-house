import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { within } from "@storybook/test";
import { userEvent } from "@testing-library/user-event";
import { Menu } from "../menu";

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

  it("should render all sub menu items for Rooms", async () => {
    render(<Menu />);
    const roomMenuButton = screen.getByRole("menuitem", { name: "Rooms" });
    await userEvent.click(roomMenuButton);
    const roomsSubMenu = await screen.findByRole("menu", { hidden: true });
    expect(within(roomsSubMenu).getAllByRole("menuitem")).toHaveLength(1);
    expect(within(roomsSubMenu).getAllByRole("menuitemradio")).toHaveLength(3);
    expect(within(roomsSubMenu).getByRole("menuitem", { name: "Add room..." })).toBeDefined();
    expect(within(roomsSubMenu).getByRole("menuitemradio", { name: "Planning" })).toBeDefined();
    expect(within(roomsSubMenu).getByRole("menuitemradio", { name: "Knowledge transfer" })).toBeDefined();
  });
});
