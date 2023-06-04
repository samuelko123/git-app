import { defineConfig, devices } from "@playwright/test";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
import path from "path";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: true,
  retries: 1,
  workers: 3,
  reporter: "list",
  use: {
    baseURL: "http://localhost:34115",
    trace: "off",
    video: {
      mode: "retain-on-failure",
    },
  },
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "edge",
      use: { ...devices["Desktop Edge"] },
    },
    {
      name: "safari",
      use: { ...devices["Desktop Safari"] },
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
