import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "dist");

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

await Promise.all([
  cp(path.join(projectRoot, "assets"), path.join(outputDir, "assets"), { recursive: true }),
  cp(path.join(projectRoot, "_headers"), path.join(outputDir, "_headers")),
]);

const html = await readFile(path.join(projectRoot, "index.html"), "utf8");
await writeFile(path.join(outputDir, "index.html"), html);

console.log("Cloudflare Pages build created in dist/");
