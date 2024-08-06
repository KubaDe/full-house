import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { useParams } from "next/navigation";
import { render, screen } from "@/testUtils/render";
import { Menubar } from "@/components/uiKit/menubar";
import { getUserRoomMyRoomHandler } from "@/server/api/room/__mocks__/getUserRoomMyRoomHandler.mock";
import { MenuRoom } from "@/components/parts/appConfigBar/menuRoom";
import { deleteUserRoomHandler } from "@/server/api/room/__mocks__/deleteUserRoomHandler.mock";
import { leaveUserRoomHandler } from "@/server/api/room/__mocks__/leaveUserRoomHandler.mock";

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
    vi.mocked(useParams).mockImplementation(() => ({ roomId: ["clyw3nw6z0002tz76hwd51xfm"] }));
    server.use(getUserRoomMyRoomHandler.default());
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", { name: "Room 1" });
    expect(roomMenuButton).toBeDefined();
  });

  it("should render delete room and leave room options for owner", async () => {
    vi.mocked(useParams).mockImplementation(() => ({ roomId: ["clyw3nw6z0002tz76hwd51xfm"] }));
    server.use(getUserRoomMyRoomHandler.default());
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", { name: "Room 1" });
    await userEvent.click(roomMenuButton);
    const deleteRoomButton = screen.getByRole("menuitem", { name: "Delete room" });
    expect(deleteRoomButton).toBeDefined();
    const leaveRoomButton = screen.getByRole("menuitem", { name: "Leave room" });
    expect(leaveRoomButton).toBeDefined();
  });

  it("should render leave room option and no delete room option for member", async () => {
    vi.mocked(useParams).mockImplementation(() => ({ roomId: ["clyw3nw6z0002tz76hwd51xfm"] }));
    server.use(getUserRoomMyRoomHandler.member());
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", { name: "Room 1" });
    await userEvent.click(roomMenuButton);
    const leaveRoomButton = screen.getByRole("menuitem", { name: "Leave room" });
    expect(leaveRoomButton).toBeDefined();
    const deleteRoomButton = screen.queryByRole("menuitem", { name: "Delete room" });
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
    vi.mocked(useParams).mockImplementation(() => ({ roomId: ["clyw3nw6z0002tz76hwd51xfm"] }));
    server.use(getUserRoomMyRoomHandler.default());
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", { name: "Room 1" });
    await userEvent.click(roomMenuButton);
    const deleteRoomButton = screen.getByRole("menuitem", { name: "Delete room" });
    await userEvent.click(deleteRoomButton);
    expect(await screen.findByRole("dialog")).toBeDefined();
    expect(screen.getByRole("heading", { name: "Delete room" })).toBeDefined();
  });

  it("should send deleteRoom mutation when delete room is clicked", async () => {
    const deleteRoomSpy = vi.fn();
    vi.mocked(useParams).mockImplementation(() => ({ roomId: ["clyw3nw6z0002tz76hwd51xfm"] }));
    server.use(getUserRoomMyRoomHandler.default(), deleteUserRoomHandler.default(deleteRoomSpy));
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", { name: "Room 1" });
    await userEvent.click(roomMenuButton);
    const deleteRoomButton = screen.getByRole("menuitem", { name: "Delete room" });
    await userEvent.click(deleteRoomButton);
    await screen.findByRole("dialog");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await userEvent.click(confirmButton);
    expect(deleteRoomSpy).toHaveBeenCalledWith({ roomId: "clyw3nw6z0002tz76hwd51xfm" });
  });

  it("should open leave room modal when leave room is clicked", async () => {
    vi.mocked(useParams).mockImplementation(() => ({ roomId: ["clyw3nw6z0002tz76hwd51xfm"] }));
    server.use(getUserRoomMyRoomHandler.member());
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", { name: "Room 1" });
    await userEvent.click(roomMenuButton);
    const leaveRoomButton = screen.getByRole("menuitem", { name: "Leave room" });
    await userEvent.click(leaveRoomButton);
    expect(await screen.findByRole("dialog")).toBeDefined();
    expect(screen.getByRole("heading", { name: "Leave room" })).toBeDefined();
  });

  it("should send leaveRoom mutation when leave room is clicked", async () => {
    const leaveRoomSpy = vi.fn();
    vi.mocked(useParams).mockImplementation(() => ({ roomId: ["clyw3nw6z0002tz76hwd51xfm"] }));
    server.use(getUserRoomMyRoomHandler.member(), leaveUserRoomHandler.default(leaveRoomSpy));
    render(
      <Menubar>
        <MenuRoom />
      </Menubar>,
    );
    const roomMenuButton = await screen.findByRole("menuitem", { name: "Room 1" });
    await userEvent.click(roomMenuButton);
    const leaveRoomButton = screen.getByRole("menuitem", { name: "Leave room" });
    await userEvent.click(leaveRoomButton);
    await screen.findByRole("dialog");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await userEvent.click(confirmButton);
    expect(leaveRoomSpy).toHaveBeenCalledWith({ roomId: "clyw3nw6z0002tz76hwd51xfm" });
  });
});
