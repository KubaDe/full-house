import { expect, test as base } from "@playwright/test";
import { db } from "@/server/db/prisma";
import { Account } from "@/e2e/fixtures/account";

const test = base.extend<{}, { account: Account }>({
  account: [
    async ({ browser }, use) => {
      const account = new Account();
      await account.init({ browser });
      await use(account);
      await account.cleanup();
    },
    { scope: "worker", auto: true },
  ],
});

test.describe.serial("Create room", () => {
  test("Create a room", async ({ account }) => {
    await account.page.goto("/");
    await account.page.getByTestId("menu.rooms").click();
    await account.page.getByTestId("menu.rooms.addRoom").click();
    await account.page.locator("[name='room.name']").fill("Test room");
    await account.page.locator("button[form='addRoomForm']").click();
    await account.page.waitForResponse("**/api/trpc/room.addRoomMutation");
  });

  test("Navigate to the room page", async ({ account }) => {
    await account.page.goto("/");
    await account.page.getByTestId("menu.rooms").click();
    await account.page.getByText("Test room").click();
    await test.expect(account.page.getByTestId("menu.room")).toHaveText("Test room");
  });

  test("Assert created room", async ({ account }) => {
    const { room } = await db.usersOnRooms.findFirstOrThrow({
      where: { userId: account.stateHelpers.userId },
      include: {
        room: true,
      },
    });

    expect(room).toMatchObject({
      name: "Test room",
    });
  });
});
