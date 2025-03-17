import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { setupServer } from "msw/node";
import { ParticipantsList } from "../participantsList";
import { render, screen, waitFor } from "@repo/test-utils";
import { participantsQueryMock } from "@repo/api/mocks";
import { userToRoomInvitationsQueryMock } from "@repo/api/mocks";
import { roomAggregatedActiveParticipantsQueryMock } from "@repo/api/mocks";
import { roomAggregatedJoinedParticipantsQueryMock } from "@repo/api/mocks";
import { TEST_ROOM_ID, TestCurrentRoomProvider } from "@repo/ui-hooks/room";

export const server = setupServer();

const defaultMocks = [
  participantsQueryMock.default(),
  userToRoomInvitationsQueryMock.default(),
  roomAggregatedActiveParticipantsQueryMock.default({ ids: [] }),
  roomAggregatedJoinedParticipantsQueryMock.default({ ids: [] }),
];

describe("ParticipantsList", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should fetch participants for chosen room without current user", async () => {
    const getParticipantsSpy = vi.fn();
    server.use(
      participantsQueryMock.default(getParticipantsSpy),
      ...defaultMocks,
    );
    render(<ParticipantsList />, { wrapper: TestCurrentRoomProvider });
    await waitFor(() => expect(getParticipantsSpy).toHaveBeenCalled());
    expect(getParticipantsSpy).toHaveBeenCalledWith({
      includeMe: false,
      roomId: TEST_ROOM_ID,
    });
  });

  it("should render participants list", async () => {
    server.use(...defaultMocks);
    render(<ParticipantsList />, { wrapper: TestCurrentRoomProvider });
    await waitFor(() =>
      expect(screen.getAllByLabelText("Avatar with name")).toHaveLength(2),
    );
    expect(screen.getAllByLabelText("Avatar with name")[0]).toHaveTextContent(
      "John Smith",
    );
    expect(screen.getAllByLabelText("Avatar with name")[1]).toHaveTextContent(
      "Will Brown",
    );
  });

  it("should render add participant button", async () => {
    server.use(...defaultMocks);
    render(<ParticipantsList />, { wrapper: TestCurrentRoomProvider });
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Add participant" }),
      ).toBeDefined(),
    );
  });

  it("should display users status based on joined and active participants", async () => {
    server.use(
      participantsQueryMock.manyParticipants(),
      userToRoomInvitationsQueryMock.default(),
      roomAggregatedActiveParticipantsQueryMock.default({
        ids: ["clzj4o50g0001ajewnsnipmpfs"],
      }),
      roomAggregatedJoinedParticipantsQueryMock.default({
        ids: ["clzj4o50g0001ajewnsnipmpfs", "clzj4o50g0001ocgamdsnasdds"],
      }),
    );
    render(<ParticipantsList />, { wrapper: TestCurrentRoomProvider });

    await waitFor(() =>
      expect(screen.getAllByLabelText("Avatar with name")).toHaveLength(4),
    );
    expect(screen.getAllByTestId("statusDot")[0]).toHaveAttribute(
      "aria-label",
      "Present",
    );
    expect(screen.getAllByTestId("statusDot")[1]).toHaveAttribute(
      "aria-label",
      "Inactive",
    );
    expect(screen.getAllByTestId("statusDot")[2]).toHaveAttribute(
      "aria-label",
      "Absent",
    );
  });

  it.todo(
    "should open add participant modal when add participant button is clicked",
    async () => {},
  );
});
