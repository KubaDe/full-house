import { test as base } from "@playwright/test";
import { Account } from "@/e2e/fixtures/account";
import { Room } from "@/e2e/fixtures/room";

const test = base.extend<
  {},
  {
    participantA: Account;
    participantB: Account;
    participantC: Account;
    room: Room;
  }
>({
  participantA: [
    async ({ browser }, use) => {
      const participantA = new Account();
      await participantA.init({ browser });
      await use(participantA);
      await participantA.cleanup();
    },
    { scope: "worker", auto: true },
  ],
  participantB: [
    async ({ browser }, use) => {
      const participantB = new Account();
      await participantB.init({ browser });
      await use(participantB);
      await participantB.cleanup();
    },
    { scope: "worker", auto: true },
  ],
  participantC: [
    async ({ browser }, use) => {
      const participantC = new Account();
      await participantC.init({ browser });
      await use(participantC);
      await participantC.cleanup();
    },
    { scope: "worker", auto: true },
  ],
  room: [
    async ({ participantA, participantB, participantC }, use) => {
      const room = new Room();
      await room.init({ userId: participantA.stateHelpers.userId });
      await room.stateHelpers.addUser(participantA.stateHelpers.userId);
      await room.stateHelpers.addUser(participantB.stateHelpers.userId);
      await room.stateHelpers.addUser(participantC.stateHelpers.userId);
      await use(room);
      await room.cleanup();
    },
    { scope: "worker", auto: true },
  ],
});

test.describe.serial("Show user status", () => {
  test("User A sees all users as absent", async ({
    participantA,
    participantB,
    participantC,
    room,
  }) => {
    await participantA.page.goto(`/room/${room.stateHelpers.roomId}`);
    const statusBForA = participantA.page
      .getByTestId(`participantList.${participantB.stateHelpers.userId}`)
      .getByTestId("statusDot");
    const statusCForA = participantA.page
      .getByTestId(`participantList.${participantC.stateHelpers.userId}`)
      .getByTestId("statusDot");
    await test.expect(statusBForA).toHaveAttribute("data-value", "absent");
    await test.expect(statusCForA).toHaveAttribute("data-value", "absent");
  });

  test("User B joins the room", async ({
    participantA,
    participantB,
    participantC,
    room,
  }) => {
    await participantA.page.goto(`/room/${room.stateHelpers.roomId}`);
    const statusBForA = participantA.page
      .getByTestId(`participantList.${participantB.stateHelpers.userId}`)
      .getByTestId("statusDot");
    const statusCForA = participantA.page
      .getByTestId(`participantList.${participantC.stateHelpers.userId}`)
      .getByTestId("statusDot");
    await test.expect(statusBForA).toHaveAttribute("data-value", "absent");

    await participantB.page.goto(`/room/${room.stateHelpers.roomId}`);

    const statusAForB = participantB.page
      .getByTestId(`participantList.${participantA.stateHelpers.userId}`)
      .getByTestId("statusDot");
    const statusCForB = participantB.page
      .getByTestId(`participantList.${participantC.stateHelpers.userId}`)
      .getByTestId("statusDot");

    await test.expect(statusBForA).toHaveAttribute("data-value", "present");
    await test.expect(statusCForA).toHaveAttribute("data-value", "absent");
    await test.expect(statusAForB).toHaveAttribute("data-value", "present");
    await test.expect(statusCForB).toHaveAttribute("data-value", "absent");
  });

  test("User C joins the room", async ({
    participantA,
    participantB,
    participantC,
    room,
  }) => {
    await participantA.page.goto(`/room/${room.stateHelpers.roomId}`);
    const statusBForA = participantA.page
      .getByTestId(`participantList.${participantB.stateHelpers.userId}`)
      .getByTestId("statusDot");
    const statusCForA = participantA.page
      .getByTestId(`participantList.${participantC.stateHelpers.userId}`)
      .getByTestId("statusDot");
    await test.expect(statusBForA).toHaveAttribute("data-value", "present");
    await test.expect(statusCForA).toHaveAttribute("data-value", "absent");

    await participantC.page.goto(`/room/${room.stateHelpers.roomId}`);

    const statusAForC = participantC.page
      .getByTestId(`participantList.${participantA.stateHelpers.userId}`)
      .getByTestId("statusDot");
    const statusBForC = participantC.page
      .getByTestId(`participantList.${participantB.stateHelpers.userId}`)
      .getByTestId("statusDot");

    await test.expect(statusBForA).toHaveAttribute("data-value", "present");
    await test.expect(statusCForA).toHaveAttribute("data-value", "present");
    await test.expect(statusAForC).toHaveAttribute("data-value", "present");
    await test.expect(statusBForC).toHaveAttribute("data-value", "present");
  });

  // TODO: Implement after disconnecting feature implementation
  // test("User B leaves the room", async () => {});
});
