import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { defineConfig, devices } from "@playwright/test";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

dotenv.config({ path: path.resolve(__dirname, ".env.development") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: "html",
  use: {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },
  ],
});
