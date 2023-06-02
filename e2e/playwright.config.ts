import { defineConfig, devices } from "@playwright/test";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
import path from "path";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: true,
  retries: 1,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:34115",
    trace: "off",
    video: {
      mode: "retain-on-failure",
      size: { width: 640, height: 480 },
    },
  },
  projects: [
    {
      name: "edge",
      use: { ...devices["Desktop Edge"] },
    },
  ],
  outputDir: path.join(tmpdir(), randomUUID()),
  webServer: {
    command: `cd .. && wails dev -noreload -loglevel "error"`,
    url: "http://127.0.0.1:34115",
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
