import { test as base } from "@playwright/test";
import { range } from "lodash-es";
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
      const participantB = new Account();
      await participantB.init({ browser });
      await use(participantB);
      await participantB.cleanup();
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

test.describe.serial("History messages", () => {
  test("Users send messages", async ({ participantA, participantB, room }) => {
    test.slow();
    await participantA.page.goto(`/room/${room.stateHelpers.roomId}`);
    await participantA.page
      .getByTestId("roomSplitView.modeButton.chat")
      .click();
    await participantA.page.getByTestId("chat.startChat").click();

    await participantB.page.goto(`/room/${room.stateHelpers.roomId}`);
    await participantB.page
      .getByTestId("roomSplitView.modeButton.chat")
      .click();

    for (const i of range(4)) {
      for (const j of range(4)) {
        await participantA.page
          .getByTestId("chat.messageInput")
          .fill(`User A - Message ${i * 8 + j + 1}`);
        await participantA.page.getByTestId("chat.sendMessage").click();
        await test
          .expect(participantA.page.getByTestId("chat.message.content").first())
          .toContainText(`User A - Message ${i * 8 + j + 1}`);
      }

      for (const j of range(4)) {
        await participantB.page
          .getByTestId("chat.messageInput")
          .fill(`User B - Message ${i * 8 + 4 + j + 1}`);
        await participantB.page.getByTestId("chat.sendMessage").click();
        await test
          .expect(participantB.page.getByTestId("chat.message.content").first())
          .toContainText(`User B - Message ${i * 8 + 4 + j + 1}`);
      }
    }
  });

  test("Users C sees past conversation", async ({ participantC, room }) => {
    await participantC.page.goto(`/room/${room.stateHelpers.roomId}`);
    await participantC.page
      .getByTestId("roomSplitView.modeButton.chat")
      .click();

    await test
      .expect(participantC.page.getByTestId("chat.message.content"))
      .toHaveCount(20);
    await test
      .expect(participantC.page.getByTestId("chat.message.content").last())
      .toContainText(`User B - Message ${13}`);
    await test
      .expect(participantC.page.getByTestId("chat.loadMore"))
      .toHaveAttribute("data-value", "12");

    await participantC.page.getByTestId("chat.loadMore").click();

    await test
      .expect(participantC.page.getByTestId("chat.message.content"))
      .toHaveCount(32);
    await test
      .expect(participantC.page.getByTestId("chat.message.content").last())
      .toContainText(`User A - Message ${1}`);
  });
});
