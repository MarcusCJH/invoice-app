/**
 * Seeds localStorage with demo data and captures app screenshots.
 * Usage: npm run dev (separate terminal) → npm run screenshots
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "screenshots");
const BASE_URL = process.env.SCREENSHOT_URL ?? "http://localhost:5173";

/** Minimal SVG logo as data URL for demo screenshots */
const DEMO_LOGO =
  "data:image/svg+xml," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <rect width="120" height="120" rx="24" fill="#4f46e5"/>
    <text x="60" y="72" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" font-weight="700" fill="white">M</text>
  </svg>`);

const DEMO_STATE = {
  profile: {
    name: "MarcusCJH Pte Ltd",
    address: "Singapore",
    phone: "+65 9123 4567",
    email: "hello@marcuscjh.com",
    uen: "202012345A",
    gstRegistrationNumber: "M12345678X",
    gstRegistered: true,
    bankName: "DBS Bank",
    bankAccount: "123-456789-0",
    paynow: "+6591234567",
    paynowUen: true,
    paynowMobile: true,
    cashOnDelivery: false,
    invoicePrefix: "INV",
    calculationMethod: "per_line",
    roundCashToFiveCents: false,
    logo: DEMO_LOGO,
  },
  invoice: {
    invoiceNumber: "INV-2026-0042",
    date: "2026-05-29",
    dueDate: "2026-06-12",
    paymentTerms: "Payment due within 14 days",
    notes: "Thank you for your business!",
    currency: "SGD",
    lineItems: [
      {
        id: "line-1",
        description: "Web app development — invoice tool (marcuscjh.com/invoice-app)",
        quantity: 1,
        unitPriceExGst: 2500,
      },
      {
        id: "line-2",
        description: "UI design and implementation",
        quantity: 1,
        unitPriceExGst: 1200,
      },
      {
        id: "line-3",
        description: "Support and revisions (2 hrs)",
        quantity: 2,
        unitPriceExGst: 150,
      },
    ],
    customer: {
      name: "HJCSucram Pte Ltd",
      address: "88 Robinson Road\n#15-01\nSingapore 068898",
      gstRegistered: true,
    },
    discountExGst: 0,
    isCreditNote: false,
    originalInvoiceNumber: "",
  },
  nextSequence: 43,
};

async function seedPage(page, theme = "light") {
  await page.goto(BASE_URL);
  await page.evaluate(
    ({ state, theme }) => {
      localStorage.setItem("sg-invoice-app-v1", JSON.stringify(state));
      localStorage.setItem("theme", theme);
      document.documentElement.dataset.theme = theme;
    },
    { state: DEMO_STATE, theme },
  );
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector("#preview-root .invoice-doc", { timeout: 15000 });
  await page.waitForTimeout(800);
}

async function capture() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await seedPage(page, "light");
  await page.screenshot({
    path: path.join(OUT_DIR, "app-light.png"),
    fullPage: false,
  });

  await seedPage(page, "dark");
  await page.screenshot({
    path: path.join(OUT_DIR, "app-dark.png"),
    fullPage: false,
  });

  await seedPage(page, "light");
  await page.locator(".preview-pane").screenshot({
    path: path.join(OUT_DIR, "invoice-preview.png"),
  });

  await page.locator("#preview-root .invoice-doc").screenshot({
    path: path.join(OUT_DIR, "invoice-document.png"),
  });

  await seedPage(page, "light");
  await page.locator('[data-tab="business"]').click();
  await page.screenshot({
    path: path.join(OUT_DIR, "business-tab.png"),
    fullPage: false,
  });

  await page.locator('[data-tab="items"]').click();
  await page.screenshot({
    path: path.join(OUT_DIR, "items-tab.png"),
    fullPage: false,
  });

  await browser.close();
  console.log(`Screenshots saved to ${OUT_DIR}`);
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
