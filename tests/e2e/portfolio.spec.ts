import { expect, test } from "@playwright/test";

test("homepage presents recruiter-first evidence and working routes", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("reliable systems");
  await expect(page.getByText("290 solved", { exact: true })).toBeVisible();
  await expect(page.getByText("8.86 CGPA", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Read DSA Revision Tracker case study" }).click();
  await expect(page).toHaveURL(/\/work\/dsa-revision-tracker$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("DSA Revision Tracker");
});

test("all case study routes render and expose correct attribution", async ({ page }) => {
  for (const route of ["dsa-revision-tracker", "raahsathi", "aqi-predictor"]) {
    await page.goto(`/work/${route}`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Limitations" })).toBeVisible();
  }
  await page.goto("/work/raahsathi");
  await expect(page.getByText("13 commits", { exact: false })).toBeVisible();
});

test("command palette supports keyboard navigation and theme switching", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+K");
  await expect(page.getByRole("dialog", { name: "Site command palette" })).toBeVisible();
  await page.getByPlaceholder("Type a command or search…").fill("theme");
  await page.getByText(/Use (dark|light) theme/).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("copy email and activity tooltips work", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("kushagrasaxena0210@gmail.com");
  const activityCell = page.locator(".activity-card.github .heatmap .active-day title").first();
  await expect(activityCell).toContainText("contributions");
});

test("project cards remain usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#work");
  await expect(page.locator(".project-card")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Read RaahSathi case study" })).toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
});
