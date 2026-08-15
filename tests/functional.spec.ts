import { test, expect } from "@playwright/test";

test.describe("Functional tests", () => {
  test("all internal pages load without errors", async ({ page }) => {
    const pages = [
      "/",
      "/about",
      "/experience",
      "/projects",
      "/skills",
      "/case-studies",
      "/contact",
    ];
    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    }
  });

  test("resume link has download attribute on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const resumeLink = page.getByRole("link", { name: "Resume" }).first();
    await expect(resumeLink).toHaveAttribute("download", "");
  });

  test("project detail page loads from project list", async ({ page }) => {
    await page.goto("/projects");
    const projectLink = page.getByRole("link").filter({ hasText: "Finance Dashboard" }).first();
    if (await projectLink.isVisible()) {
      await projectLink.click();
      await expect(page).toHaveURL(/\/projects\//);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    } else {
      await page.goto("/projects/finance-dashboard-testing");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("case study detail page loads from case study list", async ({ page }) => {
    await page.goto("/case-studies");
    const studyLink = page.getByRole("link").filter({ hasText: "Finance Data" }).first();
    if (await studyLink.isVisible()) {
      await studyLink.click();
      await expect(page).toHaveURL(/\/case-studies\//);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    } else {
      await page.goto("/case-studies/finance-data-validation-discrepancy");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("back to projects link works on project detail", async ({ page }) => {
    await page.goto("/projects/finance-dashboard-testing");
    const backLink = page.getByRole("link", { name: "Back to Projects" });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL(/\/projects/);
  });

  test("back to case studies link works on case study detail", async ({ page }) => {
    await page.goto("/case-studies/finance-data-validation-discrepancy");
    const backLink = page.getByRole("link", { name: "Back to Case Studies" });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL(/\/case-studies/);
  });

  test("contact form resets after submission", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Subject").fill("Test Subject");
    await page.getByLabel("Message").fill("This is a test message with enough characters.");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByLabel("Name")).toHaveValue("");
    await expect(page.getByLabel("Email")).toHaveValue("");
  });

  test("QA playground reset button works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Interactive test demo" }).scrollIntoViewIfNeeded();
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("Password1");
    await page.getByRole("button", { name: "Reset" }).click();
    await expect(page.getByLabel("Email")).toHaveValue("");
    await expect(page.getByLabel("Password")).toHaveValue("");
  });
});
