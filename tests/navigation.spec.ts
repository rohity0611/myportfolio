import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Rohit Yadav/);
  });

  test("all navigation links are visible on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation");
    await expect(nav.getByText("Home", { exact: true }).first()).toBeVisible();
    await expect(nav.getByText("About", { exact: true }).first()).toBeVisible();
    await expect(nav.getByText("Experience", { exact: true }).first()).toBeVisible();
    await expect(nav.getByText("Projects", { exact: true }).first()).toBeVisible();
    await expect(nav.getByText("Skills", { exact: true }).first()).toBeVisible();
    await expect(nav.getByText("Case Studies", { exact: true }).first()).toBeVisible();
    await expect(nav.getByText("Contact", { exact: true }).first()).toBeVisible();
  });

  test("navigation links go to correct pages on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.getByRole("navigation").getByText("About", { exact: true }).first().click();
    await expect(page).toHaveURL(/\/about/);
    await page.getByRole("navigation").getByText("Projects", { exact: true }).first().click();
    await expect(page).toHaveURL(/\/projects/);
    await page.getByRole("navigation").getByText("Skills", { exact: true }).first().click();
    await expect(page).toHaveURL(/\/skills/);
    await page.getByRole("navigation").getByText("Contact", { exact: true }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });
});

test.describe("Homepage sections", () => {
  test("hero section is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("about section is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Engineering quality into")).toBeVisible();
  });

  test("skills section is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Engineering skill system")).toBeVisible();
  });
});

test.describe("Projects page", () => {
  test("projects page loads", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  });

  test("project cards are clickable", async ({ page }) => {
    await page.goto("/projects");
    const firstProject = page.getByRole("link").filter({ hasText: "Finance Dashboard" }).first();
    await firstProject.click();
    await expect(page).toHaveURL(/\/projects\//);
  });
});

test.describe("Case Studies page", () => {
  test("case studies page loads", async ({ page }) => {
    await page.goto("/case-studies");
    await expect(page.getByRole("heading", { name: "Case Studies", exact: true })).toBeVisible();
  });
});

test.describe("Skills page", () => {
  test("skills page loads with categories", async ({ page }) => {
    await page.goto("/skills");
    await expect(page.getByRole("heading", { name: "Skills", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "QA & Testing", exact: true })).toBeVisible();
  });
});

test.describe("Contact page", () => {
  test("contact form is present", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h2").filter({ hasText: "Contact" }).first()).toBeVisible();
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Subject")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
  });

  test("contact form validates empty submission", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
  });

  test("contact form validates invalid email", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Subject").fill("Test");
    await page.getByLabel("Message").fill("This is a test message with enough characters.");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();
  });
});

test.describe("QA Playground", () => {
  test("login form validates required fields", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Interactive test demo" }).scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("login form validates email format", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Interactive test demo" }).scrollIntoViewIfNeeded();
    const qaForm = page.locator("form").last();
    // "foo@bar" is accepted by browser's type=email validation but fails our custom regex (no dot)
    await qaForm.locator("input[type='email']").fill("foo@bar");
    await qaForm.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();
  });

  test("login form validates password rules", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Interactive test demo" }).scrollIntoViewIfNeeded();
    const qaForm = page.locator("form").last();
    await qaForm.locator("input[type='email']").fill("test@example.com");
    await qaForm.locator("input[type='password']").fill("short");
    await qaForm.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Password must be at least 8 characters")).toBeVisible();
  });

  test("login form successful validation", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Interactive test demo" }).scrollIntoViewIfNeeded();
    const qaForm = page.locator("form").last();
    await qaForm.locator("input[type='email']").fill("test@example.com");
    await qaForm.locator("input[type='password']").fill("Password1");
    await qaForm.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Login successful")).toBeVisible({ timeout: 3000 });
  });
});

test.describe("Resume download", () => {
  test("resume link is present in navigation on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const resumeLink = page.getByRole("link", { name: "Resume" }).first();
    await expect(resumeLink).toBeVisible();
    await expect(resumeLink).toHaveAttribute("download", "");
  });
});

test.describe("404 page", () => {
  test("shows 404 for non-existent page", async ({ page }) => {
    await page.goto("/non-existent-page");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Page Not Found")).toBeVisible();
  });

  test("404 has return home link", async ({ page }) => {
    await page.goto("/non-existent-page");
    await page.getByRole("link", { name: "Return Home" }).click();
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");
  });
});
