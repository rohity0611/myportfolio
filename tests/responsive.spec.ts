import { test, expect } from "@playwright/test";

async function waitForBoot(page: import("@playwright/test").Page) {
  await page.waitForTimeout(4000);
  await expect(page.locator("h1")).toBeVisible({ timeout: 5000 });
}

test.describe("Responsive - Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hero heading is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10);
  });

  test("mobile menu button opens sidebar", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    const menuButton = page.getByRole("button", { name: /open navigation menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar).toBeVisible();
  });

  test("page scrolls on mobile", async ({ page }) => {
    await page.goto("/");
    const scrollYBefore = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => window.scrollBy(0, 500));
    const scrollYAfter = await page.evaluate(() => window.scrollY);
    expect(scrollYAfter).toBeGreaterThan(scrollYBefore);
  });
});

test.describe("Responsive - Tablet", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("no horizontal overflow on tablet", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10);
  });

  test("hero heading is visible on tablet", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Responsive - Desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("no horizontal overflow on desktop", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
  });

  test("desktop navigation is visible", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();
  });
});
