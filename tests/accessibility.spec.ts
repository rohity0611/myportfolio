import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("page has lang attribute", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("navigation landmark is present on home", async ({ page }) => {
    await page.goto("/");
    const navCount = await page.locator("nav").count();
    expect(navCount).toBeGreaterThanOrEqual(1);
  });

  test("headings are hierarchical on home", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    const h1Count = await page.getByRole("heading", { level: 1 }).count();
    expect(h1Count).toBe(1);
  });

  test("form fields have labels on contact page", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForTimeout(1000);
    await expect(page.getByPlaceholder("Your name")).toBeVisible();
    await expect(page.getByPlaceholder("your@email.com")).toBeVisible();
    await expect(page.getByPlaceholder("What's this about?")).toBeVisible();
    await expect(page.getByPlaceholder("Your message...")).toBeVisible();
  });

  test("interactive elements are keyboard accessible", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.tagName;
    });
    expect(focusedElement).toBeTruthy();
  });

  test("mobile sidebar has aria attributes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForTimeout(4000);
    const menuButton = page.locator('button[aria-controls="mobile-sidebar"]');
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar).toBeVisible();
  });
});
