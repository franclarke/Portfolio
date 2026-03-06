import { expect, test } from "@playwright/test";

test("home page smoke", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Build signal/i })).toBeVisible();
});
