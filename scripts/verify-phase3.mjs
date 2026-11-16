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
  const networkErrors = [];

  try {
    for (const profile of DEVICE_PROFILES) {
      const { name, label, ...ctxOpts } = profile;
      const context = await browser.newContext(ctxOpts);
      const page = await context.newPage();

      page.on("response", (res) => {
        if (res.status() >= 400) {
          networkErrors.push(`[${label}] ${res.status()} ${res.url()}`);
        }
      });

      await page.addInitScript(() => {
        window.__clsValue = 0;
        if ("PerformanceObserver" in window) {
          try {
            const obs = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                  window.__clsValue += entry.value;
                }
              }
            });
            obs.observe({ type: "layout-shift", buffered: true });
          } catch {}
        }
      });

      await page.goto(BASE_URL, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);

      // Scroll down through page to trigger Reveal sections and check CLS
      const totalHeight = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y <= totalHeight; y += 500) {
        await page.evaluate((pos) => window.scrollTo(0, pos), y);
        await page.waitForTimeout(120);
      }
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);

      const cls = await page.evaluate(() => window.__clsValue || 0);
      const panelRatio = await page.evaluate(() => {
        const el = document.querySelector("#experience article a");
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { width: Math.round(r.width), height: Math.round(r.height) };
      });

      console.log(
        `PROFILE [${label}]: CLS=${cls.toFixed(4)}, panelBox=${panelRatio ? `${panelRatio.width}x${panelRatio.height}` : "none"}`
      );

      const outPath = path.join(OUT_DIR, `phase3__${name}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`SCREENSHOT [${label}]: ${outPath}`);

      await context.close();
    }

    if (networkErrors.length > 0) {
      throw new Error(`Network >=400 errors:\n${networkErrors.join("\n")}`);
    }
    console.log("NETWORK_404_CHECK: 0 errors");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
