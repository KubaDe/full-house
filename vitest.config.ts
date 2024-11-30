import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
    exclude: ["node_modules", "dist", "storybook-static", ".next", ".storybook", "e2e"],
    setupFiles: ["./vitest-setup.ts"],
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules",
        "test",
        "storybook-static",
        ".next",
        ".storybook",
        "dist",
        "coverage",
        "components/uiKit",
        "**/*.config.mjs",
        "**/*.config.cjs",
        "**/*.stories.tsx",
        "**/*.stories.ts",
        "**/*.testUtils.tsx",
        "**/*.testUtils.ts",
        ".eslintrc.cjs",
      ],
    },
  },
  server: {
    fs: {
      cachedChecks: false,
    },
  },
  resolve: {
    alias: {
      "@": "/",
    },
  },
});
