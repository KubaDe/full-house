import { test, expect } from "@playwright/test";
import { clerk } from "@clerk/testing/playwright";
import { db } from "@/server/db/prisma";
import { e2eTestUtils, TestUser } from "@/e2e/utils";

const email = e2eTestUtils.auth.getTestUserEmail(TestUser.basic);

test.describe.serial("Create user", () => {
  test.use({ storageState: "e2e/playwright/.auth/basic.json" });

  test.beforeAll(async ({}) => {
    const user = await db.user.findFirst({ where: { email } });
    if (user) {
      await db.user.delete({ where: { id: user.id } });
    }
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await clerk.loaded({ page });
  });

  test("Fill onboarding info", async ({ page }) => {
    await page.locator("[name='name']").fill("Basic test user");
    for (let i = 0; i < 5; i++) {
      await page.getByTestId("previousAccessory").click();
    }
    for (let i = 0; i < 3; i++) {
      await page.getByTestId("nextFace").click();
    }
    for (let i = 0; i < 10; i++) {
      await page.getByTestId("previousHair").click();
    }
    await page.locator("button[form='editProfileForm']").click();
    await page.waitForResponse("**/api/trpc/me.updateProfileMutation");

    const user = await db.user.findFirst({
      where: { email: email },
      include: {
        profile: {
          include: {
            avatar: true,
          },
        },
      },
    });
    expect(user).toMatchObject({
      email: email,
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
