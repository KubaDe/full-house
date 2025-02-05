import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { userEvent } from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { useParams } from "next/navigation";
import { render, screen, within } from "@/testUtils/render";
import { MenuRooms } from "@/components/parts/appConfigBar/menuRooms";
import { Menubar } from "@/components/uiKit/menubar";
import { userRoomsQueryMock } from "@/server/api/room/__mocks__/userRoomsQuery.mock";

export const server = setupServer();

vi.mock("next/navigation", async () => ({
  ...(await vi.importActual("next-router-mock")),
  useParams: vi.fn().mockImplementation(() => {
    return {};
  }),
}));

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
    server.use(userRoomsQueryMock.default());
    render(
      <Menubar>
        <MenuRooms />
      </Menubar>,
    );
    const roomMenuButton = screen.getByRole("menuitem", { name: "Rooms" });
    await userEvent.click(roomMenuButton);

    await userEvent.click(
      screen.getByRole("menuitem", { name: "Add room..." }),
    );
    expect(screen.getByRole("dialog", { name: "Add room" })).toBeDefined();
  });

  it("should request only 5 rooms", async () => {
    const querySpy = vi.fn();
    server.use(userRoomsQueryMock.default(querySpy));
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
    server.use(userRoomsQueryMock.default());
    render(
      <Menubar>
        <MenuRooms />
      </Menubar>,
    );

    const roomMenuButton = screen.getByRole("menuitem", { name: "Rooms" });
    await userEvent.click(roomMenuButton);
    expect(
      screen.getByRole("menuitem", { name: "Show all rooms..." }),
    ).toBeDefined();
  });

  it("should not display 'Show all rooms' when there are less than 5 rooms", async () => {
    server.use(userRoomsQueryMock.lessThan5Rooms());
    render(
      <Menubar>
        <MenuRooms />
      </Menubar>,
    );

    const roomMenuButton = screen.getByRole("menuitem", { name: "Rooms" });
    await userEvent.click(roomMenuButton);
    expect(
      screen.queryByRole("menuitem", { name: "Show all rooms..." }),
    ).toBeNull();
  });

  it("should highlight selected room", async () => {
    server.use(userRoomsQueryMock.default());
    vi.mocked(useParams).mockImplementation(() => ({
      roomId: ["clyw3nw6z0002tz76hwd51xfm"],
    }));

    render(
      <Menubar>
        <MenuRooms />
      </Menubar>,
    );

    const roomMenuButton = screen.getByRole("menuitem", { name: "Rooms" });
    await userEvent.click(roomMenuButton);
    expect(
      screen.getByRole("menuitemradio", { name: "Room 1" }),
    ).toHaveAttribute("aria-checked", "true");
  });

  it("should show owner badge only for owners", async () => {
    server.use(userRoomsQueryMock.default());
    render(
      <Menubar>
        <MenuRooms />
      </Menubar>,
    );

    const roomsMenuButton = screen.getByRole("menuitem", { name: "Rooms" });
    await userEvent.click(roomsMenuButton);
    const buttons = screen.getAllByRole("menuitemradio");
    expect(within(buttons[0]!).queryByTestId("owner")).toBeDefined();
    expect(within(buttons[1]!).queryByTestId("owner")).toBeNull();
  });
});
