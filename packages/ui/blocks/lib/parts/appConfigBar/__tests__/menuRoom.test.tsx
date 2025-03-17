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
import { render, screen } from "@repo/test-utils";
import { Menubar } from "@repo/ui-kit/menubar";
import { MenuRoom } from "../menuRoom";
import { userRoomQueryMock } from "@repo/api/mocks";
import { deleteRoomMutationMock } from "@repo/api/mocks";
import { leaveRoomMutationMock } from "@repo/api/mocks";

export const server = setupServer();

vi.mock("next/navigation", async () => ({
  ...(await vi.importActual("next-router-mock")),
  useParams: vi.fn().mockImplementation(() => {
    return {};
  }),
}));

describe("MenuRoom", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render room menu when room is selected", async () => {
    vi.mocked(useParams).mockImplementation(() => ({
      roomId: ["clyw3nw6z0002tz76hwd51xfm"],
    }));
    server.use(userRoomQueryMock.default());
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", {
      name: "Room 1",
    });
    expect(roomMenuButton).toBeDefined();
  });

  it("should render delete room and leave room options for owner", async () => {
    vi.mocked(useParams).mockImplementation(() => ({
      roomId: ["clyw3nw6z0002tz76hwd51xfm"],
    }));
    server.use(userRoomQueryMock.default());
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", {
      name: "Room 1",
    });
    await userEvent.click(roomMenuButton);
    const deleteRoomButton = screen.getByRole("menuitem", {
      name: "Delete room",
    });
    expect(deleteRoomButton).toBeDefined();
    const leaveRoomButton = screen.getByRole("menuitem", {
      name: "Leave room",
    });
    expect(leaveRoomButton).toBeDefined();
  });

  it("should render leave room option and no delete room option for member", async () => {
    vi.mocked(useParams).mockImplementation(() => ({
      roomId: ["clyw3nw6z0002tz76hwd51xfm"],
    }));
    server.use(userRoomQueryMock.member());
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", {
      name: "Room 1",
    });
    await userEvent.click(roomMenuButton);
    const leaveRoomButton = screen.getByRole("menuitem", {
      name: "Leave room",
    });
    expect(leaveRoomButton).toBeDefined();
    const deleteRoomButton = screen.queryByRole("menuitem", {
      name: "Delete room",
    });
    expect(deleteRoomButton).toBeNull();
  });

  it("should render null when room data is not available", async () => {
    vi.mocked(useParams).mockImplementation(() => ({ roomId: [] }));
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = screen.queryByRole("menuitem");
    expect(roomMenuButton).toBeNull();
  });

  it("should open delete room modal when delete room is clicked", async () => {
    vi.mocked(useParams).mockImplementation(() => ({
      roomId: ["clyw3nw6z0002tz76hwd51xfm"],
    }));
    server.use(userRoomQueryMock.default());
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", {
      name: "Room 1",
    });
    await userEvent.click(roomMenuButton);
    const deleteRoomButton = screen.getByRole("menuitem", {
      name: "Delete room",
    });
    await userEvent.click(deleteRoomButton);
    expect(await screen.findByRole("dialog")).toBeDefined();
    expect(screen.getByRole("heading", { name: "Delete room" })).toBeDefined();
  });

  it("should send deleteRoom mutation when delete room is clicked", async () => {
    const deleteRoomSpy = vi.fn();
    vi.mocked(useParams).mockImplementation(() => ({
      roomId: ["clyw3nw6z0002tz76hwd51xfm"],
    }));
    server.use(
      userRoomQueryMock.default(),
      deleteRoomMutationMock.default(deleteRoomSpy),
    );
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", {
      name: "Room 1",
    });
    await userEvent.click(roomMenuButton);
    const deleteRoomButton = screen.getByRole("menuitem", {
      name: "Delete room",
    });
    await userEvent.click(deleteRoomButton);
    await screen.findByRole("dialog");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await userEvent.click(confirmButton);
    expect(deleteRoomSpy).toHaveBeenCalledWith({
      roomId: "clyw3nw6z0002tz76hwd51xfm",
    });
  });

  it("should open leave room modal when leave room is clicked", async () => {
    vi.mocked(useParams).mockImplementation(() => ({
      roomId: ["clyw3nw6z0002tz76hwd51xfm"],
    }));
    server.use(userRoomQueryMock.member());
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", {
      name: "Room 1",
    });
    await userEvent.click(roomMenuButton);
    const leaveRoomButton = screen.getByRole("menuitem", {
      name: "Leave room",
    });
    await userEvent.click(leaveRoomButton);
    expect(await screen.findByRole("dialog")).toBeDefined();
    expect(screen.getByRole("heading", { name: "Leave room" })).toBeDefined();
  });

  it("should send leaveRoom mutation when leave room is clicked", async () => {
    const leaveRoomSpy = vi.fn();
    vi.mocked(useParams).mockImplementation(() => ({
      roomId: ["clyw3nw6z0002tz76hwd51xfm"],
    }));
    server.use(
      userRoomQueryMock.member(),
      leaveRoomMutationMock.default(leaveRoomSpy),
    );
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", {
      name: "Room 1",
    });
    await userEvent.click(roomMenuButton);
    const leaveRoomButton = screen.getByRole("menuitem", {
      name: "Leave room",
    });
    await userEvent.click(leaveRoomButton);
    await screen.findByRole("dialog");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await userEvent.click(confirmButton);
    expect(leaveRoomSpy).toHaveBeenCalledWith({
      roomId: "clyw3nw6z0002tz76hwd51xfm",
    });
  });
});
