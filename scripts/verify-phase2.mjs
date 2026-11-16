import fs from "node:fs";
import path from "node:path";
import { chromium, devices } from "playwright";

const DEVICE_PROFILES = [
  { name: "iphone-se", label: "iPhone SE", ...devices["iPhone SE"] },
  { name: "iphone-14-pro-max", label: "iPhone 14 Pro Max", ...devices["iPhone 14 Pro Max"] },
  { name: "pixel-7", label: "Pixel 7", ...devices["Pixel 7"] },
  { name: "galaxy-s9-plus", label: "Galaxy S9+", ...devices["Galaxy S9+"] },
  { name: "ipad-mini", label: "iPad Mini", ...devices["iPad Mini"] },
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
const OUT_DIR = path.resolve("screenshots");

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  try {
    // 1. Capture all 6 device profile screenshots
    for (const profile of DEVICE_PROFILES) {
      const { name, label, ...ctxOpts } = profile;
      const context = await browser.newContext(ctxOpts);
      const page = await context.newPage();
      await page.goto(BASE_URL, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(400);
      const outPath = path.join(OUT_DIR, `phase2__${name}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`SCREENSHOT [${label}]: ${outPath}`);
      await context.close();
    }

    // 2. Touch emulation + focus trap + Escape + iOS scroll lock test (iPhone SE)
    {
      const context = await browser.newContext({ ...devices["iPhone SE"] });
      const page = await context.newPage();
      await page.goto(BASE_URL, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);

      const initialScrolled = await page.getAttribute("header", "data-scrolled");
      await page.evaluate(() => window.scrollTo(0, 200));
      await page.waitForTimeout(150);
      const afterScrolled = await page.getAttribute("header", "data-scrolled");
      console.log(`HEADER_SCROLL_STATE: top=${initialScrolled}, scrolled=${afterScrolled}`);
      if (initialScrolled !== "false" || afterScrolled !== "true") {
        throw new Error(`Header scroll state failed: top=${initialScrolled}, scrolled=${afterScrolled}`);
      }

      await page.tap('button[aria-label="Open navigation menu"]');
      await page.waitForSelector("#site-drawer");
      const lockedPos = await page.evaluate(() => document.body.style.position);
      console.log(`DRAWER_OPEN_BODY_POSITION: ${lockedPos}`);
      if (lockedPos !== "fixed") {
        throw new Error(`Expected iOS body scroll lock position=fixed, got ${lockedPos}`);
      }

      await page.tap('button[aria-label="Toggle What We Do submenu"]');
      await page.waitForSelector('#site-drawer a:has-text("Cosmetic Dentistry")');
      console.log("ACCORDION_SUBMENU_OPEN: Cosmetic Dentistry visible");

      // Verify focus trap keeps focus inside #site-drawer on Tab
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press("Tab");
      }
      const focusInside = await page.evaluate(() =>
        Boolean(document.getElementById("site-drawer")?.contains(document.activeElement))
      );
      console.log(`FOCUS_TRAP_INSIDE_DRAWER: ${focusInside}`);
      if (!focusInside) {
        throw new Error("Focus escaped #site-drawer during Tab cycling");
      }

      // Verify Escape closes drawer and unlocks body scroll
      await page.keyboard.press("Escape");
      await page.waitForSelector("#site-drawer", { state: "detached" });
      const unlockedPos = await page.evaluate(() => document.body.style.position);
      console.log(`DRAWER_CLOSED_BODY_POSITION: "${unlockedPos}"`);
      if (unlockedPos !== "") {
        throw new Error(`Expected body position reset after Escape, got ${unlockedPos}`);
      }

      await context.close();
    }

    // 3. No horizontal scroll check at 320px width
    {
      const context = await browser.newContext({
        viewport: { width: 320, height: 568 },
        isMobile: true,
        hasTouch: true,
      });
      const page = await context.newPage();
      await page.goto(BASE_URL, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const dims = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      console.log(`VIEWPORT_320_OVERFLOW_CHECK: scrollWidth=${dims.scrollWidth}, clientWidth=${dims.clientWidth}`);
      if (dims.scrollWidth > dims.clientWidth) {
        throw new Error(`Horizontal overflow at 320px: ${dims.scrollWidth} > ${dims.clientWidth}`);
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
