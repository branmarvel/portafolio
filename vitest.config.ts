import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.{ts,js,tsx,jsx}"],
    setupFiles: ["./vitest.setup.js"],
  },
});
