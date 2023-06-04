import { test, expect } from "@playwright/test";
import path from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

test("open and close dialog", async ({ page }) => {
  const dialog = await openDialog(page);

  const closeIcon = dialog.getByLabel("Close");
  await closeIcon.click();
  
  await expect(dialog).not.toBeVisible();
});

test("clone successfully", async ({ page }) => {
  const dialog = await openDialog(page);

  await dialog
    .getByLabel("Repository URL")
    .fill("https://github.com/go-git/go-git.git");
  await dialog.getByLabel("Folder Path").fill(getTempDir());
  await dialog.getByRole("button", { name: "Clone" }).click();

  await expect(dialog.getByText("Cloned successfully")).toBeVisible();
});

test("display error message", async ({ page }) => {
  const dialog = await openDialog(page);

  await dialog
    .getByLabel("Repository URL")
    .fill("https://github.com/samuelko123/no-such-repo.git");
  await dialog.getByLabel("Folder Path").fill(getTempDir());
  await dialog.getByRole("button", { name: "Clone" }).click();

  await expect(
    dialog.getByText(
      "Repository 'https://github.com/samuelko123/no-such-repo.git/' not found"
    )
  ).toBeVisible();
});

async function openDialog(page) {
  await page.goto("http://localhost:34115/");
  const button = page.getByRole("button", { name: "Clone" });
  await button.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  return dialog;
}

function getTempDir() {
  return path.join(tmpdir(), randomUUID());
}
