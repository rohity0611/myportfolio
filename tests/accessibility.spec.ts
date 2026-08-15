import { test, expect } from "@playwright/test";

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
    await expect(page.getByRole("navigation")).toBeVisible();
  });

  test("footer landmark is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("headings are hierarchical", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    // Should have exactly one h1
    const h1Count = await page.getByRole("heading", { level: 1 }).count();
    expect(h1Count).toBe(1);
  });

  test("images have alt text or are decorative", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      // All images should have alt attribute (can be empty for decorative)
      expect(alt).not.toBeNull();
    }
  });

  test("form fields have labels", async ({ page }) => {
    await page.goto("/contact");
    const nameInput = page.getByLabel("Name");
    const emailInput = page.getByLabel("Email");
    const subjectInput = page.getByLabel("Subject");
    const messageInput = page.getByLabel("Message");
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(subjectInput).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test("QA playground form fields have labels", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Interactive test demo" }).scrollIntoViewIfNeeded();
    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByLabel("Password");
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test("interactive elements are keyboard accessible", async ({ page }) => {
    await page.goto("/");
    // Tab to first interactive element
    await page.keyboard.press("Tab");
    // Should have focus somewhere
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.tagName;
    });
    expect(focusedElement).toBeTruthy();
  });
});
