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

test.describe.serial("Update user", () => {
  test("Change user details", async ({ account }) => {
    await account.page.goto("/");
    await account.page.getByTestId("menu.account").click();
    await account.page.getByTestId("menu.account.editProfile").click();
    await account.page.locator("[name='name']").fill("Update test user");
    for (let i = 0; i < 5; i++) {
      await account.page.getByTestId("previousAccessory").click();
    }
    for (let i = 0; i < 3; i++) {
      await account.page.getByTestId("nextFace").click();
    }
    for (let i = 0; i < 10; i++) {
      await account.page.getByTestId("previousHair").click();
    }
    await account.page.locator("button[form='editProfileForm']").click();
    await account.page.waitForResponse("**/api/trpc/me.updateProfileMutation");
  });

  test("Assert updated user", async ({ account }) => {
    const user = await db.user.findFirst({
      where: { id: account.stateHelpers.userId },
      include: {
        profile: {
          include: {
            avatar: true,
          },
        },
      },
    });

    expect(user).toMatchObject({
      email: account.testUserEmail,
      profile: {
        avatar: {
          accessory: "None",
          body: "BlazerBlackTee",
          face: "Cute",
          facialHair: "None",
          hair: "ShortMessy",
        },
        name: "Update test user",
      },
    });
  });
});
