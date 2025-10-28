import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
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
    setupFiles: ["app/vitest.setup.ts"],
  },
});
