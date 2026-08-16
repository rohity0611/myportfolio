import { test, expect } from "@playwright/test";

test.describe("Page load", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Rohit Yadav/);
  });

  test("hero section is visible with name and title", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    await expect(page.getByText("ROHIT", { exact: true }).last()).toBeVisible();
    await expect(page.getByText("YADAV", { exact: true }).last()).toBeVisible();
    await expect(page.getByText("QA ENGINEER").last()).toBeVisible();
  });
});

test.describe("Scroll", () => {
  test("page can scroll down on home", async ({ page }) => {
    await page.goto("/");
    const scrollYBefore = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => window.scrollBy(0, 500));
    const scrollYAfter = await page.evaluate(() => window.scrollY);
    expect(scrollYAfter).toBeGreaterThan(scrollYBefore);
  });

  test("no horizontal overflow on home", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10);
  });
});

test.describe("Desktop navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("desktop nav is visible", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();
  });

  test("desktop nav has all section links", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");
    await expect(nav.getByText("ABOUT")).toBeVisible();
    await expect(nav.getByText("EXPERIENCE")).toBeVisible();
    await expect(nav.getByText("SKILLS")).toBeVisible();
    await expect(nav.getByText("QA LAB")).toBeVisible();
    await expect(nav.getByText("PROJECTS")).toBeVisible();
    await expect(nav.getByText("CONTACT")).toBeVisible();
  });

  test("desktop resume link is present", async ({ page }) => {
    await page.goto("/");
    const resumeLink = page.getByRole("link", { name: "RESUME" }).first();
    await expect(resumeLink).toBeVisible();
  });

  test("desktop nav navigates to about page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").getByText("ABOUT").click();
    await page.waitForURL("/about");
    await expect(page).toHaveURL("/about");
  });

  test("desktop nav navigates to projects page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").getByText("PROJECTS").click();
    await page.waitForURL("/projects");
    await expect(page).toHaveURL("/projects");
  });

  test("brand navigates to home", async ({ page }) => {
    await page.goto("/about");
    await page.getByText("ROHIT YADAV").first().click();
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");
  });
});

test.describe("Mobile sidebar", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile menu button is visible", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    const menuButton = page.locator('button[aria-controls="mobile-sidebar"]');
    await expect(menuButton).toBeVisible();
  });

  test("mobile sidebar opens on menu click", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar).toBeVisible();
  });

  test("mobile sidebar has nav links", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar.getByText("ABOUT")).toBeVisible();
    await expect(sidebar.getByText("EXPERIENCE")).toBeVisible();
    await expect(sidebar.getByText("PROJECTS")).toBeVisible();
    await expect(sidebar.getByText("CONTACT")).toBeVisible();
  });

  test("mobile sidebar has resume link", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar.getByText("RESUME")).toBeVisible();
  });

  test("mobile sidebar closes on close button", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await sidebar.getByRole("button", { name: /close navigation menu/i }).click();
    await expect(sidebar).not.toBeVisible();
  });

  test("mobile sidebar closes on Escape key", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(sidebar).not.toBeVisible();
  });

  test("mobile sidebar closes on backdrop click", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const backdrop = page.locator("[aria-hidden='true']").first();
    await backdrop.click({ position: { x: 50, y: 400 } });
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar).not.toBeVisible();
  });

  test("mobile sidebar navigates to page", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await sidebar.getByText("ABOUT").click();
    await page.waitForURL("/about");
    await expect(page).toHaveURL("/about");
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10);
  });
});

test.describe("Tablet", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("no horizontal overflow on tablet", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10);
  });
});
