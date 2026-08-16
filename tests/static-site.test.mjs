import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const output = new URL("../dist/", import.meta.url);

const readJson = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));
const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const [site, vehicles, advantages] = await Promise.all([
  readJson("content/site.json"),
  readJson("content/vehicles.json"),
  readJson("content/advantages.json"),
]);

const visibleVehicles = vehicles.filter((vehicle) => vehicle.available !== false);
const formatPrice = (price) => new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
}).format(price);

test("renders the current CMS content into the complete sales experience", async () => {
  const html = await readFile(new URL("index.html", output), "utf8");
  const representative = site.representative;
  const hero = site.hero;

  assert.ok(html.includes(`<title>${escapeHtml(representative.full_name)} | ${escapeHtml(representative.professional_title)}</title>`));
  assert.ok(html.includes(escapeHtml(representative.dealership_name)));
  assert.ok(html.includes(escapeHtml(representative.phone_display)));
  assert.ok(html.includes(escapeHtml(representative.email)));
  assert.ok(html.includes(escapeHtml(representative.viber_display)));
  assert.ok(html.includes(`<h1>${escapeHtml(hero.headline_primary)}<br><em>${escapeHtml(hero.headline_accent)}</em></h1>`));
  assert.ok(html.includes(escapeHtml(hero.description)));

  assert.equal((html.match(/class="contact-method(?: contact-method-viber)?"/g) ?? []).length, 3);
  assert.equal((html.match(/class="vehicle-card"/g) ?? []).length, visibleVehicles.length);

  for (const vehicle of visibleVehicles) {
    assert.ok(html.includes(`<h3>${escapeHtml(vehicle.name)}</h3>`), `Missing vehicle card for ${vehicle.name}`);
    assert.ok(html.includes(`<option>${escapeHtml(vehicle.name)}</option>`), `Missing inquiry option for ${vehicle.name}`);
    assert.ok(
      html.includes(`${escapeHtml(vehicle.price_prefix)} ${escapeHtml(formatPrice(vehicle.price))}`),
      `Missing formatted price for ${vehicle.name}`,
    );
  }

  assert.match(html, /id="vehicles"/);
  assert.match(html, /id="services"/);
  assert.match(html, /id="testimonials"/);
  assert.match(html, /id="lead-form"/);
  assert.match(html, /assets\/icons\/viber\.svg/);
  assert.match(html, /assets\/icons\/nav-logo-black\.svg/);
  assert.match(html, /assets\/css\/styles\.css(?:\?[^"\s]+)?/);
  assert.match(html, /assets\/js\/main\.js/);
  assert.doesNotMatch(html, /images\.unsplash\.com|chatgpt\.site|vinext|\{\{/i);
});

test("renders working navigation and menu controls", async () => {
  const html = await readFile(new URL("index.html", output), "utf8");

  assert.match(html, /<button class="menu-toggle"[^>]*aria-expanded="false"[^>]*aria-controls="primary-nav"/);
  assert.match(html, /<nav id="primary-nav"[^>]*aria-label="Primary navigation"/);
  for (const section of ["home", "about", "vehicles", "services", "testimonials", "contact"]) {
    assert.ok(html.includes(`href="#${section}"`), `Missing navigation link to #${section}`);
  }
});

test("all configured production images and required static assets exist", async () => {
  const configuredImages = [
    site.hero.image,
    site.representative.portrait_image,
    ...vehicles.map((vehicle) => vehicle.image),
    ...advantages.map((advantage) => advantage.image),
  ].filter(Boolean);

  const requiredAssets = [
    "assets/css/styles.css",
    "assets/js/main.js",
    "assets/icons/viber.svg",
    "assets/icons/nav-logo-black.svg",
    "assets/images/og-neva.png",
  ];

  const assetPaths = new Set([
    ...requiredAssets,
    ...configuredImages.map((image) => image.replace(/^\//, "")),
  ]);

  await Promise.all([...assetPaths].map((assetPath) =>
    access(new URL(assetPath, output)).catch(() => {
      throw new Error(`Configured asset does not exist in the production build: ${assetPath}`);
    }),
  ));
});

test("all CMS vehicle prices are positive whole numbers", () => {
  assert.ok(vehicles.length > 0, "At least one CMS vehicle is required");

  for (const vehicle of vehicles) {
    assert.ok(
      Number.isInteger(vehicle.price) && vehicle.price > 0,
      `Price for ${vehicle.name || "unnamed vehicle"} must be a positive whole number`,
    );
  }
});

test("static code has responsive and accessible behavior", async () => {
  const [css, js] = await Promise.all([
    readFile(new URL("assets/css/styles.css", root), "utf8"),
    readFile(new URL("assets/js/main.js", root), "utf8"),
  ]);

  assert.match(css, /@media \(max-width: 620px\)/);
  assert.match(css, /\.hero-image \{[^}]*--hero-image/);
  assert.match(css, /\.brand-mark-logo \{[^}]*overflow: hidden/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
  assert.match(js, /aria-expanded/);
  assert.match(js, /event\.key === "Escape"/);
});

test("includes Cloudflare Pages build and security configuration", async () => {
  const [packageJson, headers, workflow] = await Promise.all([
    readFile(new URL("package.json", root), "utf8"),
    readFile(new URL("_headers", root), "utf8"),
    readFile(new URL(".github/workflows/deploy-cloudflare-pages.yml", root), "utf8"),
  ]);

  assert.match(packageJson, /"build": "node scripts\/build\.mjs"/);
  assert.match(headers, /Content-Security-Policy:/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(workflow, /pages deploy dist --project-name=neva-laurente-auto --branch=main/);
  assert.match(workflow, /CLOUDFLARE_API_TOKEN/);
  assert.match(workflow, /CLOUDFLARE_ACCOUNT_ID/);
});

test("includes Pages CMS content models and build-time rendering", async () => {
  const [cmsConfig, buildScript] = await Promise.all([
    readFile(new URL(".pages.yml", root), "utf8"),
    readFile(new URL("scripts/build.mjs", root), "utf8"),
  ]);

  assert.match(cmsConfig, /label: Vehicles and prices/);
  assert.match(cmsConfig, /path: content\/vehicles\.json/);
  assert.match(cmsConfig, /input: assets\/images/);
  assert.match(buildScript, /const requireText/);
  assert.match(buildScript, /const safeImagePath/);
  assert.match(buildScript, /const formatPrice/);
  assert.match(buildScript, /Number\.isInteger\(value\) \|\| value < 1/);
});
