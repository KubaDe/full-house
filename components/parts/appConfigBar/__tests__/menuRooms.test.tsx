import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { render, screen } from "@/testUtils/render";
import { MenuRooms } from "@/components/parts/appConfigBar/menuRooms";
import { Menubar } from "@/components/uiKit/menubar";
import { getUserRoomMyRoomsHandler } from "@/server/api/room/__mocks__/getUserRoomMyRoomsHandler.mock";

export const server = setupServer();

describe("MenuRooms", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render 'Add room...' option", async () => {
    server.use(getUserRoomMyRoomsHandler.default());
    render(
      <Menubar>
        <MenuRooms />
      </Menubar>,
    );
    const roomMenuButton = screen.getByRole("menuitem", { name: "Rooms" });
    await userEvent.click(roomMenuButton);

    await userEvent.click(screen.getByRole("menuitem", { name: "Add room..." }));
    expect(screen.getByRole("dialog", { name: "Add room" })).toBeDefined();
  });

  it("should request only 5 rooms", async () => {
    const querySpy = vi.fn();
    server.use(getUserRoomMyRoomsHandler.default(querySpy));
    render(
      <Menubar>
        <MenuRooms />
      </Menubar>,
    );

    const roomMenuButton = screen.getByRole("menuitem", { name: "Rooms" });
    await userEvent.click(roomMenuButton);
    expect(querySpy).toHaveBeenCalledWith({ skip: 0, take: 5 });
    expect(screen.getAllByRole("menuitemradio")).toHaveLength(5);
  });

  it("should display 'Show all rooms' when there are more than 5 rooms", async () => {
    server.use(getUserRoomMyRoomsHandler.default());
    render(
      <Menubar>
        <MenuRooms />
      </Menubar>,
    );

    const roomMenuButton = screen.getByRole("menuitem", { name: "Rooms" });
    await userEvent.click(roomMenuButton);
    expect(screen.getByRole("menuitem", { name: "Show all rooms..." })).toBeDefined();
  });

  it("should not display 'Show all rooms' when there are less than 5 rooms", async () => {
    server.use(getUserRoomMyRoomsHandler.lessThan5Rooms());
    render(
      <Menubar>
        <MenuRooms />
      </Menubar>,
    );

    const roomMenuButton = screen.getByRole("menuitem", { name: "Rooms" });
    await userEvent.click(roomMenuButton);
    expect(screen.queryByRole("menuitem", { name: "Show all rooms..." })).toBeNull();
  });
});
