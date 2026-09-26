/**
 * End-to-end interaction checks for the LUMI demo storefront.
 * Start the production server first, then run:  node scripts/e2e.mjs
 */
import puppeteer from "puppeteer";

const BASE = process.env.BASE ?? "http://localhost:3111";
const results = [];
let failures = 0;

function check(name, condition, detail = "") {
  const ok = Boolean(condition);
  if (!ok) failures += 1;
  const line = `${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` -> ${detail}` : ""}`;
  results.push(line);
  console.log(line);
}

const text = (page) => page.evaluate(() => document.body.innerText);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
/** CSS uppercases some labels, so text assertions are case-insensitive. */
const has = (haystack, needle) => haystack.toLowerCase().includes(needle.toLowerCase());

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });

async function clickByText(page, selector, needle) {
  const handle = await page.evaluateHandle(
    (sel, txt) => {
      const nodes = Array.from(document.querySelectorAll(sel));
      return (
        nodes.find((el) => el.textContent.trim() === txt) ??
        nodes.find((el) => el.textContent.trim().startsWith(txt)) ??
        null
      );
    },
    selector,
    needle
  );
  const el = handle.asElement();
  if (!el) throw new Error(`No ${selector} with text "${needle}"`);
  await el.click();
}

/** Navigate and wait until the client bundle has hydrated. */
async function open(page, path) {
  await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true", {
    timeout: 20000,
  });
  await wait(150);
}
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  // ---------- Cart ----------
  await open(page, `/product/vitamin-c-serum`);
  // The product page stepper chooses how many to add, so set it before adding.
  await page.click('button[aria-label="Increase quantity of LUMI Vitamin C Serum"]');
  await page.click('button[aria-label="Increase quantity of LUMI Vitamin C Serum"]');
  const qty = await page.$eval('[aria-label^="Quantity of LUMI Vitamin C Serum"]', (el) => el.textContent.trim());
  check("quantity stepper increments", qty === "3", `qty=${qty}`);

  await page.click('button[aria-label*="Add LUMI Vitamin C Serum to bag"]');
  await page.waitForSelector('[role="region"][aria-label="Notifications"]', { timeout: 5000 });
  check("toast appears after add to bag", true);

  const bagLabel = await page.$eval('a[aria-label^="Shopping bag"]', (el) => el.getAttribute("aria-label"));
  check("header bag count reflects quantity", bagLabel === "Shopping bag, 3 items", bagLabel);

  await open(page, `/cart`);
  let cartText = await text(page);
  check("cart shows the added product", has(cartText, "LUMI Vitamin C Serum"));
  check("cart subtotal correct (3 x $68 = $204)", has(cartText, "$204"));
  check("free shipping threshold reached", has(cartText, "unlocked free shipping"));
  check("shipping is free at the threshold", has(cartText, "Free"));
  check("checkout is labelled demo-safe", has(cartText, "no payment is taken"));

  await page.click('button[aria-label="Decrease quantity of LUMI Vitamin C Serum"]');
  await wait(500);
  cartText = await text(page);
  check("decreasing quantity recalculates subtotal", has(cartText, "$136"));

  await open(page, "/cart");
  cartText = await text(page);
  check("cart persists across reload", has(cartText, "LUMI Vitamin C Serum"));

  await clickByText(page, "button", "Remove");
  await wait(700);
  cartText = await text(page);
  check("removing the last line empties the bag", has(cartText, "Your bag is empty"));
  check("empty state offers recovery links", has(cartText, "Take the skin guide"));
  // ---------- Wishlist ----------
  await open(page, `/product/barrier-repair-cream`);
  await clickByText(page, "button", "Add to wishlist");
  await open(page, `/wishlist`);
  let wishText = await text(page);
  check("wishlist lists the saved product", has(wishText, "LUMI Barrier Repair Cream"));
  check("wishlist count is shown", has(wishText, "1 saved item"));

  // Un-saving from the card removes the item and empties the list.
  await page.click('button[aria-label^="Remove LUMI Barrier Repair Cream"]');
  await wait(600);
  wishText = await text(page);
  check("unsaving from the card empties the wishlist", has(wishText, "Nothing saved yet"));
  check("empty wishlist offers a path to the shop", has(wishText, "Browse the collection"));

  // Re-saving from a product card persists again.
  await open(page, `/shop`);
  await page.click('button[aria-label="Save LUMI Daily Glow Cleanser to wishlist"]');
  await open(page, `/wishlist`);
  check("wishlist re-saves from a product card", has(await text(page), "LUMI Daily Glow Cleanser"));
  await clickByText(page, "button", "Clear wishlist");
  await wait(500);
  check("clear wishlist empties the list", has(await text(page), "Nothing saved yet"));

  // ---------- Filters and sorting ----------
  await open(page, `/shop`);
  let shopText = await text(page);
  check("shop lists all 12 products", has(shopText, "Showing 12 of 12"));

  await clickByText(page, "aside button", "Serums");
  await wait(500);
  shopText = await text(page);
  check("category filter narrows to serums", has(shopText, "Showing 3 of 12"), shopText.match(/Showing \d+ of 12/)?.[0]);

  await clickByText(page, "aside button", "All products");
  await wait(300);
  await clickByText(page, "aside button", "Hydration");
  await wait(500);
  shopText = await text(page);
  const hydrationCount = shopText.match(/Showing (\d+) of 12/)?.[1];
  check(
    "skin-goal filter narrows results",
    Number(hydrationCount) > 0 && Number(hydrationCount) < 12,
    hydrationCount
  );

  const prices = async () =>
    page.$$eval("ul li p span.font-medium", (els) =>
      els.map((el) => Number(el.textContent.replace(/[^0-9.]/g, "")))
    );

  await page.select("#sort", "price-desc");
  await wait(500);
  const desc = await prices();
  check("price sort high to low is ordered", desc.every((p, i) => i === 0 || desc[i - 1] >= p), desc.slice(0, 4).join(","));

  await page.select("#sort", "price-asc");
  await wait(500);
  const asc = await prices();
  check("price sort low to high is ordered", asc.every((p, i) => i === 0 || asc[i - 1] <= p), asc.slice(0, 4).join(","));

  await clickByText(page, "aside button", "Clear filters");
  await wait(400);
  check("clear filters restores the full grid", has(await text(page), "Showing 12 of 12"));

  await open(page, `/shop?concern=brightening`);
  check("deep-linked concern filter works", has(await text(page), "Brightening"));

  await open(page, `/shop?category=Sets`);
  check("deep-linked category filter works", has(await text(page), "Showing 1 of 12"));

  // ---------- Search ----------
  await open(page, `/`);
  await page.click('button[aria-label="Search products"]');
  await page.waitForSelector('input[aria-label="Search products"]');
  await page.type('input[aria-label="Search products"]', "serum");
  await wait(500);
  check("search finds matching products", has(await text(page), "LUMI Vitamin C Serum"));

  await page.$eval('input[aria-label="Search products"]', (el) => {
    el.value = "";
  });
  await page.type('input[aria-label="Search products"]', "zzzz");
  await wait(400);
  check("search shows an empty state", has(await text(page), "Nothing matched"));

  await page.keyboard.press("Escape");
  await wait(500);
  check("search closes on Escape", (await page.$('input[aria-label="Search products"]')) === null);

  // ---------- Skin guide ----------
  await open(page, `/skin-guide`);
  check("skin guide states it is not medical advice", has(await text(page), "not medical"));
  await clickByText(page, "button", "Hydration");
  await wait(800);
  let guideText = await text(page);
  check("skin guide returns recommendations", has(guideText, "Recommended for hydration"));
  check("recommendation names a product", has(guideText, "LUMI Hydrating Essence"));
  await clickByText(page, "button", "Change goal");
  await wait(500);
  check("skin guide can be reset", has(await text(page), "Sensitive skin"));

  // ---------- Newsletter and contact validation ----------
  await open(page, `/`);
  await page.type('input[name="email"]', "not-an-email");
  await page.click('button[type="submit"]');
  await wait(400);
  check("newsletter rejects an invalid email", has(await text(page), "doesn't look quite right"));

  await page.$eval('input[name="email"]', (el) => {
    el.value = "";
  });
  await page.type('input[name="email"]', "hello@example.com");
  await page.click('button[type="submit"]');
  await wait(500);
  check("newsletter accepts a valid email", has(await text(page), "demo subscription is confirmed"));

  await open(page, `/contact`);
  await page.click('button[type="submit"]');
  await wait(400);
  let contactText = await text(page);
  check("contact form validates required fields", has(contactText, "Please tell us your name."));
  await page.type('input[autocomplete="name"]', "Test Person");
  await page.type('input[autocomplete="email"]', "test@example.com");
  await page.type("textarea", "This is a long enough test message.");
  await page.click('button[type="submit"]');
  await wait(600);
  contactText = await text(page);
  check("contact form shows a success state", has(contactText, "Thank you"));

  // ---------- FAQ ----------
  await open(page, `/faq`);
  await clickByText(page, "button", "Products");
  await wait(500);
  check("FAQ category switch works", has(await text(page), "fictional copy written for the demo"));
  // ---------- Mobile navigation and layout ----------
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await open(page, `/`);
  const primaryDisplay = await page.$eval('nav[aria-label="Primary"]', (el) => getComputedStyle(el).display);
  check("desktop nav hidden on mobile", primaryDisplay === "none", primaryDisplay);

  await page.click('button[aria-label="Open menu"]');
  await wait(600);
  check("mobile menu opens", has(await text(page), "Portfolio demo"));
  await page.click('nav[aria-label="Mobile"] a[href="/shop"]');
  await wait(1000);
  check("mobile menu navigates to shop", page.url().includes("/shop"), page.url());

  for (const route of ["/", "/shop", "/product/vitamin-c-serum", "/skin-guide", "/cart", "/faq"]) {
    await open(page, `${route}`);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    check(`no horizontal overflow on mobile ${route}`, overflow <= 1, `${overflow}px`);
  }

  await page.setViewport({ width: 1280, height: 900 });
  await open(page, `/shop`);
  const sidebarDisplay = await page.$eval("#shop-filters", (el) => getComputedStyle(el).display);
  check("filter sidebar visible on desktop", sidebarDisplay !== "none", sidebarDisplay);

  await open(page, `/product/complete-glow-set`);
  const pdpText = await text(page);
  check("product page shows how to use", has(pdpText, "How to use"));
  check("product page shows ingredients", has(pdpText, "Key ingredients"));
  check("product page shows reviews", has(pdpText, "Customer reviews"));
  check("product page shows related products", has(pdpText, "Pairs well with"));
  check("product page shows shipping perks", has(pdpText, "Free shipping over $75"));

  check("no console or page errors during the run", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));
} finally {
  await browser.close();
}

console.log(`\n${results.length - failures}/${results.length} checks passed`);
process.exit(failures === 0 ? 0 : 1);