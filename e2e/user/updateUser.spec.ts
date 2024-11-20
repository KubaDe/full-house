import { expect, test } from "@playwright/test";
import { clerk } from "@clerk/testing/playwright";
import { db } from "@/server/db/prisma";
import { e2eTestUtils, TestUser } from "@/e2e/utils";

const email = e2eTestUtils.auth.getTestUserEmail(TestUser.update);

test.describe.serial("Update user", () => {
  test.use({ storageState: "e2e/playwright/.auth/update.json" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await clerk.loaded({ page });
    const user = await db.user.findFirstOrThrow({ where: { email } });
    await db.user.delete({ where: { id: user.id } });
    await db.user.create({
      data: {
        email,
        clerkId: user.clerkId,
        profile: {
          create: {
            name: "Basic test user",
            avatar: {
              create: {
                accessory: "GlassAviator",
                body: "BlazerBlackTee",
                face: "Cheeky",
                facialHair: "None",
                hair: "GrayMedium",
              },
            },
          },
        },
      },
    });
  });

  test("Change user details", async ({ page }) => {
    await page.getByTestId("menu.account").click();
    await page.getByTestId("menu.account.editProfile").click();
    await page.locator("[name='name']").fill("Update test user");
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
