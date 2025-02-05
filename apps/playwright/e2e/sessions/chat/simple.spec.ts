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

test.describe.serial("Send simple message", () => {
  test("Users A starts chat and sends message", async ({
    participantA,
    room,
  }) => {
    await participantA.page.goto(`/room/${room.stateHelpers.roomId}`);
    await participantA.page
      .getByTestId("roomSplitView.modeButton.chat")
      .click();
    await participantA.page.getByTestId("chat.startChat").click();
    await participantA.page
      .getByTestId("chat.messageInput")
      .fill("User A - Hello, world!");
    await participantA.page.getByTestId("chat.sendMessage").click();
    await test
      .expect(participantA.page.getByTestId("chat.message.content"))
      .toHaveCount(1);
  });

  test("Users B sends message", async ({ participantB, room }) => {
    await participantB.page.goto(`/room/${room.stateHelpers.roomId}`);
    await participantB.page
      .getByTestId("roomSplitView.modeButton.chat")
      .click();
    await test
      .expect(participantB.page.getByTestId("chat.message.content"))
      .toHaveCount(1);
    await participantB.page
      .getByTestId("chat.messageInput")
      .fill("User B - Hello, world!");
    await participantB.page.getByTestId("chat.sendMessage").click();
    await test
      .expect(participantB.page.getByTestId("chat.message.content"))
      .toHaveCount(2);
  });

  test("Users C sends message", async ({ participantC, room }) => {
    await participantC.page.goto(`/room/${room.stateHelpers.roomId}`);
    await participantC.page
      .getByTestId("roomSplitView.modeButton.chat")
      .click();
    await test
      .expect(participantC.page.getByTestId("chat.message.content"))
      .toHaveCount(2);
    await participantC.page
      .getByTestId("chat.messageInput")
      .fill("User C - Hello, world!");
    await participantC.page.getByTestId("chat.sendMessage").click();
    await test
      .expect(participantC.page.getByTestId("chat.message.content"))
      .toHaveCount(3);
  });
});
