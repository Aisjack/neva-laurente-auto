import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("contains the complete static sales experience", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  assert.match(html, /<title>Neva Laurente \| Marketing Professional<\/title>/);
  assert.match(html, /Mitsubishi Union Motor Inc/);
  assert.match(html, /0991 824 7900/);
  assert.match(html, /shifttofunny@gmail\.com/);
  assert.match(html, /0997 067 8858/);
  assert.equal((html.match(/class="contact-method(?: contact-method-viber)?"/g) ?? []).length, 3);
  assert.match(html, /<option>Mitsubishi Xforce<\/option>/);
  assert.match(html, /assets\/icons\/viber\.svg/);
  assert.match(html, /<h1>YOUR NEXT DRIVE/);
  assert.match(html, /id="vehicles"/);
  assert.match(html, /Mitsubishi Xforce/);
  assert.match(html, /rel="preload" as="image" href="assets\/images\/mitsubishi-xforce\.webp"/);
  assert.match(html, /Mitsubishi Montero Sport/);
  assert.match(html, /Mitsubishi Xpander Cross/);
  assert.match(html, /Mitsubishi Triton/);
  assert.match(html, /id="services"/);
  assert.match(html, /id="testimonials"/);
  assert.match(html, /id="lead-form"/);
  assert.match(html, /assets\/css\/styles\.css/);
  assert.match(html, /assets\/js\/main\.js/);
  assert.doesNotMatch(html, /images\.unsplash\.com|chatgpt\.site|vinext/i);
});

test("all local production assets exist", async () => {
  const paths = [
    "assets/css/styles.css",
    "assets/js/main.js",
    "assets/icons/viber.svg",
    "assets/images/mitsubishi-xforce.webp",
    "assets/images/mitsubishi-montero-sport.webp",
    "assets/images/mitsubishi-xpander-cross.webp",
    "assets/images/mitsubishi-triton.webp",
    "assets/images/og-neva.png",
  ];

  await Promise.all(paths.map((path) => access(new URL(path, root))));
});

test("static code has responsive and accessible behavior", async () => {
  const [css, js] = await Promise.all([
    readFile(new URL("assets/css/styles.css", root), "utf8"),
    readFile(new URL("assets/js/main.js", root), "utf8"),
  ]);

  assert.match(css, /@media \(max-width: 620px\)/);
  assert.match(css, /images\/mitsubishi-xforce\.webp/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
  assert.match(js, /aria-expanded/);
  assert.match(js, /event\.key === "Escape"/);
});

test("includes Cloudflare Pages build and security configuration", async () => {
  const [packageJson, headers] = await Promise.all([
    readFile(new URL("package.json", root), "utf8"),
    readFile(new URL("_headers", root), "utf8"),
  ]);

  assert.match(packageJson, /"build": "node scripts\/build\.mjs"/);
  assert.match(headers, /Content-Security-Policy:/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
});
