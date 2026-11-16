import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function main() {
  // 1. UI validation test on /schedule-a-consult and /schedule-a-consult/chicago
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    const hubRes = await page.goto(`${BASE_URL}/schedule-a-consult`, { waitUntil: "load" });
    if (!hubRes || hubRes.status() !== 200) throw new Error("Hub returned non-200");
    console.log("HUB_STATUS: 200");

    const locRes = await page.goto(`${BASE_URL}/schedule-a-consult/chicago`, { waitUntil: "load" });
    if (!locRes || locRes.status() !== 200) throw new Error("Chicago consult returned non-200");
    console.log("LOCATION_FORM_STATUS: 200");

    await page.fill("#consult-email", "bad-email");
    await page.click('button[type="submit"]');
    await page.waitForSelector("#err-name");
    await page.waitForSelector("#err-email");
    await page.waitForSelector("#err-phone");
    await page.waitForSelector("#err-street");
    console.log("UI_VALIDATION_ERRORS_RENDERED: ok");
  } finally {
    await browser.close();
  }

  // 2. API validation test (bad input -> 400)
  const badRes = await fetch(`${BASE_URL}/api/consult`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.1" },
    body: JSON.stringify({
      locationId: "chicago",
      name: "A",
      email: "not-an-email",
      countryCode: "+1",
      phone: "12",
      streetAddress: "1",
      city: "C",
      state: "I",
      postalCode: "1",
      doctor: "Dr. Shuaib Malik",
    }),
  });
  const badJson = await badRes.json();
  if (badRes.status !== 400 || !badJson.errors?.email || !badJson.errors?.name) {
    throw new Error(`Expected 400 with field errors, got ${badRes.status}: ${JSON.stringify(badJson)}`);
  }
  console.log("API_BAD_INPUT_400: ok");

  // 3. Honeypot test (bot fills hidden website field -> silent 200)
  const botRes = await fetch(`${BASE_URL}/api/consult`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.2" },
    body: JSON.stringify({
      locationId: "chicago",
      name: "Spam Bot",
      email: "bot@example.com",
      countryCode: "+1",
      phone: "3125550100",
      streetAddress: "123 Main St",
      city: "Chicago",
      state: "IL",
      postalCode: "60611",
      doctor: "Dr. Shuaib Malik",
      website: "https://spam.invalid",
    }),
  });
  if (botRes.status !== 200) {
    throw new Error(`Expected silent 200 for honeypot, got ${botRes.status}`);
  }
  console.log("API_HONEYPOT_SILENT_200: ok");

  // 4. Missing Resend key test (valid input without RESEND_API_KEY -> 503)
  const validRes = await fetch(`${BASE_URL}/api/consult`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.3" },
    body: JSON.stringify({
      locationId: "chicago",
      name: "Jane Doe",
      email: "jane@example.com",
      countryCode: "+1",
      phone: "3125550100",
      streetAddress: "123 N Michigan Ave",
      city: "Chicago",
      state: "IL",
      postalCode: "60611",
      doctor: "Dr. Shuaib Malik",
      message: "Consultation inquiry",
    }),
  });
  if (validRes.status !== 503) {
    throw new Error(`Expected 503 without RESEND_API_KEY, got ${validRes.status}`);
  }
  console.log("API_MISSING_ENV_503: ok");

  // 5. Rate limit test (6th request from same IP -> 429)
  let got429 = false;
  for (let i = 0; i < 6; i++) {
    const r = await fetch(`${BASE_URL}/api/consult`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.99" },
      body: JSON.stringify({ name: "A" }),
    });
    if (r.status === 429) got429 = true;
  }
  if (!got429) throw new Error("Expected 429 on 6th request from same IP");
  console.log("API_RATE_LIMIT_429: ok");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
