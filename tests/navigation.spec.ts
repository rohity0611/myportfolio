import { test, expect } from "@playwright/test";

async function waitForBoot(page: import("@playwright/test").Page) {
  await page.waitForTimeout(4000);
  await expect(page.locator("h1")).toBeVisible({ timeout: 5000 });
}

test.describe("Page load", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Rohit Yadav/);
  });

  test("hero section is visible with name and title", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    const hero = page.locator("#hero");
    await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(hero.getByText("ROHIT")).toBeVisible();
    await expect(hero.getByText("YADAV")).toBeVisible();
    await expect(hero.getByText("QA Engineer")).toBeVisible();
  });

  test("main landmark is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("main")).toBeVisible();
  });
});

test.describe("Scroll", () => {
  test("page can scroll down", async ({ page }) => {
    await page.goto("/");
    const scrollYBefore = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => window.scrollBy(0, 500));
    const scrollYAfter = await page.evaluate(() => window.scrollY);
    expect(scrollYAfter).toBeGreaterThan(scrollYBefore);
  });

  test("no horizontal overflow on desktop", async ({ page }) => {
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
    await waitForBoot(page);
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();
  });

  test("desktop nav has all section links", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
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
    await waitForBoot(page);
    const resumeLink = page.getByRole("link", { name: "RESUME" }).first();
    await expect(resumeLink).toBeVisible();
  });

  test("desktop nav scrolls to section", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    await page.getByRole("navigation").getByText("ABOUT").click();
    await page.waitForTimeout(1000);
    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();
  });
});

test.describe("Mobile sidebar", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile menu button is visible", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    const menuButton = page.locator('button[aria-controls="mobile-sidebar"]');
    await expect(menuButton).toBeVisible();
  });

  test("mobile sidebar opens on menu click", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar).toBeVisible();
  });

  test("mobile sidebar has nav links", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar.getByText("ABOUT")).toBeVisible();
    await expect(sidebar.getByText("EXPERIENCE")).toBeVisible();
    await expect(sidebar.getByText("PROJECTS")).toBeVisible();
    await expect(sidebar.getByText("CONTACT")).toBeVisible();
  });

  test("mobile sidebar has resume link", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar.getByText("RESUME")).toBeVisible();
  });

  test("mobile sidebar closes on close button", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    // Scope close button to the sidebar (not the hamburger which also gets this label)
    const sidebar = page.locator("#mobile-sidebar");
    await sidebar.getByRole("button", { name: /close navigation menu/i }).click();
    await expect(sidebar).not.toBeVisible();
  });

  test("mobile sidebar closes on Escape key", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(sidebar).not.toBeVisible();
  });

  test("mobile sidebar closes on backdrop click", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    // Click the backdrop (the semi-transparent overlay behind sidebar)
    const backdrop = page.locator("[aria-hidden='true']").first();
    await backdrop.click({ position: { x: 50, y: 400 } });
    const sidebar = page.locator("#mobile-sidebar");
    await expect(sidebar).not.toBeVisible();
  });

  test("mobile sidebar nav link scrolls to section and closes", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    await page.locator('button[aria-controls="mobile-sidebar"]').click();
    const sidebar = page.locator("#mobile-sidebar");
    await sidebar.getByText("ABOUT").click();
    await page.waitForTimeout(1000);
    await expect(sidebar).not.toBeVisible();
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
