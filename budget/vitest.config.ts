import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      exclude: [
        "**/build/",
        "react-router.config.ts",
        "**/.react-router/",
        ...configDefaults.exclude,
      ],
    },
    setupFiles: [
        "app/vitest.setup.ts",
      ],
  },
});
