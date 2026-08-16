import { test, expect } from "@playwright/test";

async function waitForBoot(page: import("@playwright/test").Page) {
  await page.waitForTimeout(4000);
  await expect(page.locator("h1")).toBeVisible({ timeout: 5000 });
}

test.describe("Resume", () => {
  test("resume link exists in desktop nav", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const resumeLink = page.getByRole("link", { name: "RESUME" }).first();
    await expect(resumeLink).toBeVisible();
    await expect(resumeLink).toHaveAttribute("href", "/certificates/Rohit-Yadav-CV.pdf");
  });

  test("resume PDF is accessible", async ({ request }) => {
    const response = await request.get("/certificates/Rohit-Yadav-CV.pdf");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("pdf");
  });
});

test.describe("Contact form", () => {
  test("contact form is visible", async ({ page }) => {
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

  test("contact form validates empty submission", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page
      .locator("#contact")
      .getByRole("button", { name: /TRANSMIT MESSAGE/i })
      .click();
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
  });

  test("contact form validates invalid email", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.getByPlaceholder("Your name").fill("Test User");
    // foo@bar is accepted by browser's type=email but fails regex (no dot)
    await page.getByPlaceholder("your@email.com").fill("foo@bar");
    await page.getByPlaceholder("What's this about?").fill("Test");
    await page.getByPlaceholder("Your message...").fill("Test message content here.");
    await page
      .locator("#contact")
      .getByRole("button", { name: /TRANSMIT MESSAGE/i })
      .click();
    await expect(page.getByText("Invalid email")).toBeVisible();
  });

  test("contact form accepts valid email", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.getByPlaceholder("Your name").fill("Test User");
    await page.getByPlaceholder("your@email.com").fill("test@example.com");
    await page.getByPlaceholder("What's this about?").fill("Test Subject");
    await page.getByPlaceholder("Your message...").fill("Test message content here.");
    await page
      .locator("#contact")
      .getByRole("button", { name: /TRANSMIT MESSAGE/i })
      .click();
    // Should not show validation errors
    await expect(page.getByText("Name is required")).not.toBeVisible();
    await expect(page.getByText("Email is required")).not.toBeVisible();
  });
});

test.describe("Sections", () => {
  test("all major sections exist", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    await expect(page.locator("#hero")).toBeAttached();
    await expect(page.locator("#about")).toBeAttached();
    await expect(page.locator("#experience")).toBeAttached();
    await expect(page.locator("#skills")).toBeAttached();
    await expect(page.locator("#qa-lab")).toBeAttached();
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("QA Lab section displays stages", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    const qaSection = page.locator("#qa-lab");
    await qaSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(qaSection.getByText("REQUIREMENT", { exact: true }).first()).toBeVisible();
    await expect(qaSection.getByText("TEST DESIGN", { exact: true }).first()).toBeVisible();
    await expect(qaSection.getByText("BUILD VERIFIED", { exact: true }).first()).toBeVisible();
  });

  test("projects section shows project cards", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    const projectsSection = page.locator("#projects");
    await projectsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(projectsSection.getByText("Project Archive")).toBeVisible();
  });
});

test.describe("Branding", () => {
  test("Full Stack Developer is not present", async ({ page }) => {
    await page.goto("/");
    const content = await page.content();
    expect(content).not.toContain("Full Stack Developer");
    expect(content).not.toContain("Full-Stack Developer");
    expect(content).not.toContain("full-stack developer");
    expect(content).not.toContain("full stack developer");
  });

  test("QA Engineer is present", async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
    const hero = page.locator("#hero");
    await expect(hero.getByText("QA Engineer")).toBeVisible();
  });
});

test.describe("404", () => {
  test("shows 404 for non-existent page", async ({ page }) => {
    const response = await page.goto("/non-existent-page");
    expect(response?.status()).toBe(404);
  });
});
