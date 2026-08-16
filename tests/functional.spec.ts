import { test, expect } from "@playwright/test";

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
  test("contact form is visible on /contact", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForTimeout(1000);
    await expect(page.getByPlaceholder("Your name")).toBeVisible();
    await expect(page.getByPlaceholder("your@email.com")).toBeVisible();
    await expect(page.getByPlaceholder("What's this about?")).toBeVisible();
    await expect(page.getByPlaceholder("Your message...")).toBeVisible();
  });

  test("contact form validates empty submission", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: /TRANSMIT MESSAGE/i }).click();
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
  });

  test("contact form validates invalid email", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForTimeout(1000);
    await page.getByPlaceholder("Your name").fill("Test User");
    await page.getByPlaceholder("your@email.com").fill("foo@bar");
    await page.getByPlaceholder("What's this about?").fill("Test");
    await page.getByPlaceholder("Your message...").fill("Test message content here.");
    await page.getByRole("button", { name: /TRANSMIT MESSAGE/i }).click();
    await expect(page.getByText("Invalid email")).toBeVisible();
  });

  test("contact form accepts valid email", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForTimeout(1000);
    await page.getByPlaceholder("Your name").fill("Test User");
    await page.getByPlaceholder("your@email.com").fill("test@example.com");
    await page.getByPlaceholder("What's this about?").fill("Test Subject");
    await page.getByPlaceholder("Your message...").fill("Test message content here.");
    await page.getByRole("button", { name: /TRANSMIT MESSAGE/i }).click();
    await expect(page.getByText("Name is required")).not.toBeVisible();
    await expect(page.getByText("Email is required")).not.toBeVisible();
  });
});

test.describe("Routes", () => {
  test("all routes load successfully", async ({ page }) => {
    const routes = ["/", "/about", "/experience", "/skills", "/qa-lab", "/projects", "/contact"];
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
    }
  });

  test("about page has heading", async ({ page }) => {
    await page.goto("/about");
    await page.waitForTimeout(1000);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("experience page has heading", async ({ page }) => {
    await page.goto("/experience");
    await page.waitForTimeout(1000);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("skills page has heading", async ({ page }) => {
    await page.goto("/skills");
    await page.waitForTimeout(1000);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("qa-lab page has heading and stages", async ({ page }) => {
    await page.goto("/qa-lab");
    await page.waitForTimeout(1000);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("REQUIREMENT", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("BUILD VERIFIED", { exact: true }).first()).toBeVisible();
  });

  test("projects page has heading", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForTimeout(1000);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("contact page has heading and form", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForTimeout(1000);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByPlaceholder("Your name")).toBeVisible();
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

  test("QA Engineer is present on home", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4000);
    await expect(page.getByText("QA ENGINEER").last()).toBeVisible();
  });
});

test.describe("404", () => {
  test("shows 404 for non-existent page", async ({ page }) => {
    const response = await page.goto("/non-existent-page");
    expect(response?.status()).toBe(404);
  });
});
