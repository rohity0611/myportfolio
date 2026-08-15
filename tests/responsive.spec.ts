import { test, expect } from "@playwright/test";

test.describe("Responsive - Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile menu button is visible", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible();
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.goto("/");
    const openButton = page.getByRole("button", { name: "Open menu" });
    await openButton.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("mobile menu navigation works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    // Wait for animation
    await page.waitForTimeout(500);
    // Click the About link in the mobile drawer (the one with the accent bar)
    await page.getByRole("link", { name: "About" }).last().click();
    await expect(page).toHaveURL(/\/about/);
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
  });

  test("homepage sections render on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Engineering quality into")).toBeVisible();
    await expect(page.getByText("Engineering skill system")).toBeVisible();
  });
});

test.describe("Responsive - Tablet", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("no horizontal overflow on tablet", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
  });

  test("navigation works on tablet", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation")).toBeVisible();
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

  test("all navigation items visible on desktop", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");
    await expect(nav.getByText("Home", { exact: true }).first()).toBeVisible();
    await expect(nav.getByText("Contact", { exact: true }).first()).toBeVisible();
  });
});
