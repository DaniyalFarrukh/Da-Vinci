import fs from "node:fs";
import path from "node:path";
import { chromium, devices } from "playwright";

export const DEVICE_PROFILES = [
  {
    name: "iphone-se",
    label: "iPhone SE",
    ...devices["iPhone SE"],
  },
  {
    name: "iphone-14-pro-max",
    label: "iPhone 14 Pro Max",
    ...devices["iPhone 14 Pro Max"],
  },
  {
    name: "pixel-7",
    label: "Pixel 7",
    ...devices["Pixel 7"],
  },
  {
    name: "galaxy-s9-plus",
    label: "Galaxy S9+",
    ...devices["Galaxy S9+"],
  },
  {
    name: "ipad-mini",
    label: "iPad Mini",
    ...devices["iPad Mini"],
  },
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
const ROUTES = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ["/"];
const OUT_DIR = path.resolve("screenshots");

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  try {
    for (const profile of DEVICE_PROFILES) {
      const { name, label, ...contextOptions } = profile;
      const context = await browser.newContext(contextOptions);
      const page = await context.newPage();

      for (const route of ROUTES) {
        const slug = route === "/" ? "home" : route.replace(/^\/+|\/+$/g, "").replace(/\//g, "_");
        const url = `${BASE_URL}${route}`;
        await page.goto(url, { waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready);
        const filePath = path.join(OUT_DIR, `${slug}__${name}.png`);
        await page.screenshot({ path: filePath, fullPage: true });
        console.log(`Captured [${label}] ${url} -> ${filePath}`);
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
