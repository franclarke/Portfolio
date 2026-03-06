import { expect, test } from "@playwright/test";

test("hero and primary ctas render", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Build signal/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore projects" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download CV" }).first()).toBeVisible();
});

test("project filters show expected counts", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: /All\s*5/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Applied AI\s*2/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Football Lab\s*3/i })).toBeVisible();

  await page.getByRole("button", { name: /Applied AI\s*2/i }).click();
  await expect(page.locator('article[id^="project-"]')).toHaveCount(2);

  await page.getByRole("button", { name: /Football Lab\s*3/i }).click();
  await expect(page.locator('article[id^="project-"]')).toHaveCount(3);
});

test("atlas domain button navigates and applies football filter", async ({ page }) => {
  await page.goto("/");

  await page.locator("button.atlas-inline-btn", { hasText: "Football Lab" }).first().click();

  await expect(page.getByRole("button", { name: /Football Lab\s*3/i })).toHaveAttribute(
    "aria-pressed",
    "true"
  );

  await page.waitForTimeout(900);
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeGreaterThan(500);
});

test("atlas reliability button moves to reliability section", async ({ page }) => {
  await page.goto("/");

  await page.locator("button.atlas-inline-btn", { hasText: "Reliability" }).first().click();

  await page.waitForTimeout(900);
  await expect(page.getByRole("heading", { name: "Reliability Vault" })).toBeVisible();
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeGreaterThan(1200);
});

test("download cv is reachable", async ({ page, request }) => {
  await page.goto("/");

  const cvLink = page.getByRole("link", { name: "Download CV" }).first();
  await expect(cvLink).toHaveAttribute("href", "/cv/Clarke-Francisco.pdf");

  const response = await request.get("/cv/Clarke-Francisco.pdf");
  expect(response.status()).toBe(200);
});

test("contact links are the final public links", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('a[href="mailto:ffranclarke@gmail.com"]')).toBeVisible();
  await expect(page.locator('a[href="https://github.com/franclarke"]')).toBeVisible();
  await expect(page.locator('a[href="https://linkedin.com/in/franciscoclarke"]')).toBeVisible();
});

test("reduced motion uses fallback atlas", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();

  await page.goto("/");

  await expect(page.locator('[data-testid="atlas-fallback"]')).toBeVisible();
  await expect(page.locator('[data-testid="atlas-scene-canvas"]')).toHaveCount(0);

  await context.close();
});
