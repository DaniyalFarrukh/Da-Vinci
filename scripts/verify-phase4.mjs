import fs from "node:fs";
import path from "node:path";
import { chromium, devices } from "playwright";

const ROUTES = [
  "/",
  "/what-we-do",
  "/what-we-do/cosmetic-dentistry",
  "/what-we-do/porcelain-veneers",
  "/what-we-do/smile-makeover-process",
  "/who-we-are",
  "/who-we-are/founder",
  "/who-we-are/team",
  "/locations",
  "/our-work",
  "/our-work/gallery",
  "/testimonials",
  "/media",
  "/blog",
  "/blog/architectural-smile-design",
  "/consultation",
  "/privacy-policy",
  "/accessibility",
];

const PROFILES = [
  { name: "iphone-se", label: "iPhone SE", ...devices["iPhone SE"] },
  { name: "pixel-7", label: "Pixel 7", ...devices["Pixel 7"] },
  {
    name: "desktop-1440",
    label: "Desktop 1440",
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  },
];

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots/phase4");

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const networkErrors = [];

  try {
    if (!process.env.SKIP_SCREENSHOTS) {
    for (const profile of PROFILES) {
      const { name, label, ...ctxOpts } = profile;
      const context = await browser.newContext(ctxOpts);
      const page = await context.newPage();

      page.on("response", (res) => {
        if (res.status() >= 400) {
          networkErrors.push(`[${label}] ${res.status()} ${res.url()}`);
        }
      });

      for (const route of ROUTES) {
        const slug =
          route === "/"
            ? "home"
            : route.replace(/^\/+|\/+$/g, "").replace(/\//g, "_");
        const resp = await page.goto(`${BASE_URL}${route}`, {
          waitUntil: "load",
        });
        if (!resp || resp.status() !== 200) {
          throw new Error(
            `[${label}] ${route} returned ${resp ? resp.status() : "null"}`
          );
        }
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(150);
        const outPath = path.join(OUT_DIR, `${slug}__${name}.png`);
        await page.screenshot({ path: outPath, fullPage: true });
      }
      console.log(`CAPTURED_ALL_${ROUTES.length}_ROUTES [${label}]`);
      await context.close();
    }
    }

    // Quick interactive smoke checks on Desktop
    {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/what-we-do/smile-makeover-process`, {
        waitUntil: "load",
      });
      await page.click('button:has-text("2. The Prep Appointment")');
      await page.waitForSelector("text=Conservative tooth preparation");
      console.log("CHECK_ACCORDION: ok");

      await page.goto(`${BASE_URL}/who-we-are/team`, { waitUntil: "load" });
      await page.click('button[role="tab"]:has-text("Chicago")');
      console.log("CHECK_TEAM_FILTER: ok");

      await page.goto(`${BASE_URL}/media`, { waitUntil: "load" });
      await page.click('button:has-text("Load More")');
      await page.waitForSelector("text=Press Feature 07");
      console.log("CHECK_BUZZ_LOAD_MORE: ok");

      await page.goto(`${BASE_URL}/blog`, { waitUntil: "load" });
      await page.click('button:has-text("2")');
      await page.waitForSelector("text=Why Hand-Layered Porcelain Still Matters");
      console.log("CHECK_BLOG_PAGINATION: ok");

      await context.close();
    }

    if (networkErrors.length > 0) {
      throw new Error(`Network >=400 errors:\n${networkErrors.join("\n")}`);
    }
    console.log("PHASE4_NETWORK_CHECK: 0 errors");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
