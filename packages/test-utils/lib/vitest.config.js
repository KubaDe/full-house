import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: ["node_modules", "dist", ".next", "e2e"],
    setupFiles: ["./vitest-setup.ts"],
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules",
        "test",
        ".next",
        "dist",
        "coverage",
        "components/uiKit",
        "**/*.config.mjs",
        "**/*.config.cjs",
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
});
