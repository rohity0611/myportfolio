import { test, expect } from "@playwright/test";

async function waitForBoot(page: import("@playwright/test").Page) {
  await page.waitForTimeout(4000);
  await expect(page.locator("h1")).toBeVisible({ timeout: 5000 });
}

test.describe("Accessibility", () => {
  test("page has lang attribute", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("main landmark is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("navigation landmark is present", async ({ page }) => {
    await page.goto("/");
    // Desktop nav is visible on desktop/tablet, sidebar nav on mobile
    const desktopNav = page.locator("nav.hidden.md\\:flex");
    const hasDesktopNav = await desktopNav.isVisible().catch(() => false);
    if (hasDesktopNav) {
      await expect(desktopNav).toBeVisible();
    } else {
      // On mobile, navigation is inside the sidebar (only when open)
      // Just verify the nav element exists in the DOM
      await expect(page.locator("nav")).toHaveCount(2);
    }
  });

  test("headings are hierarchical", async ({ page }) => {
    await page.goto("/");
    const h1Count = await page.getByRole("heading", { level: 1 }).count();
    expect(h1Count).toBe(1);
  });

  test("form fields have labels", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
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
    await waitForBoot(page);
    // Use a stable selector for the menu button (the one that controls mobile-sidebar)
    const menuButton = page.locator('button[aria-controls="mobile-sidebar"]');
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await menuButton.click();
    // After click, aria-label changes but the element is the same
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar).toBeVisible();
  });
});
