import { test, expect } from "@playwright/test";
import { tmpdir } from "os";
import path from "path";
import { randomUUID } from "crypto";

test("open and close dialog", async ({ page }) => {
  await page.goto("http://localhost:34115/");

  const button = page.getByRole("button", { name: "Clone" });
  await button.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const closeIcon = dialog.getByLabel("Close");
  await closeIcon.click();
  await expect(dialog).not.toBeVisible();
});

test("cloned successfully", async ({ page }) => {
  await page.goto("http://localhost:34115/");
  await page.getByRole("button", { name: "Clone" }).click();
  const dialog = page.getByRole("dialog");

  await dialog
    .getByLabel("Repository URL")
    .fill("https://github.com/go-git/go-git.git");
  await dialog.getByLabel("Folder Path").fill(getTempDir());
  await page.getByRole("button", { name: "Clone" }).click();

  await expect(page.getByText("Cloned successfully")).toBeVisible();
});

function getTempDir() {
  return path.join(tmpdir(), randomUUID());
}
