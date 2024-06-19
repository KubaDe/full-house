import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
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
      ],
    },
  },
  resolve: {
    alias: {
      "@": "/",
    },
  },
});
