import { expect, test as setup } from "@playwright/test";
import { clerk, clerkSetup, setupClerkTestingToken } from "@clerk/testing/playwright";
import { e2eTestUtils, TestUser } from "@/e2e/utils";

setup("setup", async ({ page }) => {
  await clerkSetup();
  await setupClerkTestingToken({ page });
});

const basicUserFile = "e2e/playwright/.auth/basic.json";
const updateUserFile = "e2e/playwright/.auth/update.json";

setup("authenticate as basic user", async ({ page }) => {
  await page.goto("/");
  await clerkSetup();
  await setupClerkTestingToken({ page });
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: e2eTestUtils.auth.getTestUserEmail(TestUser.basic),
      password: process.env.E2E_USER_PASSWORD!,
    },
  });
  await expect(page.title()).resolves.toBe("Dashboard");
  await page.context().storageState({ path: basicUserFile });
});

setup("authenticate as update user", async ({ page }) => {
  await page.goto("/");
  await clerkSetup();
  await setupClerkTestingToken({ page });
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: e2eTestUtils.auth.getTestUserEmail(TestUser.update),
      password: process.env.E2E_USER_PASSWORD!,
    },
  });
  await expect(page.title()).resolves.toBe("Dashboard");
  await page.context().storageState({ path: updateUserFile });
});
