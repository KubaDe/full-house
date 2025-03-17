import { test as base, expect } from "@playwright/test";
import { clerk } from "@clerk/testing/playwright";
import { Account } from "../fixtures/account";
import { db } from "@repo/db";

const test = base.extend<{}, { account: Account }>({
  account: [
    async ({ browser }, use) => {
      const account = new Account();
      await account.init({ browser }, { skipProfile: true });
      await use(account);
      await account.cleanup();
    },
    { scope: "worker", auto: true },
  ],
});

test.describe.serial("Create user", () => {
  test("Fill onboarding info", async ({ account }) => {
    await account.page.goto("/");
    await clerk.loaded({ page: account.page });
    await account.page.locator("[name='name']").fill("Basic test user");
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

  test("Assert created user", async ({ account }) => {
    const user = await db.user.findFirst({
      where: { email: account.testUserEmail },
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
          accessory: "GlassAviator",
          body: "BlazerBlackTee",
          face: "Cheeky",
          facialHair: "None",
          hair: "GrayMedium",
        },
        name: "Basic test user",
      },
    });
  });
});
