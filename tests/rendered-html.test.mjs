import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://adrian-cruz-auto.example/", {
      headers: { accept: "text/html", host: "adrian-cruz-auto.example" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete sales site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Adrian Cruz \| Automotive Sales Consultant<\/title>/i);
  assert.match(html, /YOUR NEXT DRIVE/);
  assert.match(html, /Schedule a test drive/i);
  assert.match(html, /name="phone"/);
  assert.match(html, /name="vehicle"/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("keeps accessibility and responsive foundations in source", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(page, /role="status"/);
  assert.match(page, /<h1>/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media \(max-width: 620px\)/);
});
