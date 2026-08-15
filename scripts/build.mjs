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

const readJson = async (relativePath) => JSON.parse(
  await readFile(path.join(projectRoot, relativePath), "utf8"),
);

const [site, vehicles, services, advantages, testimonials] = await Promise.all([
  readJson("content/site.json"),
  readJson("content/vehicles.json"),
  readJson("content/services.json"),
  readJson("content/advantages.json"),
  readJson("content/testimonials.json"),
]);

const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const requireText = (value, field) => {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`CMS field "${field}" must not be empty.`);
  }
  return value.trim();
};

const safeImagePath = (value, field) => {
  const image = requireText(value, field);
  if (!/^\/assets\/images\/[a-zA-Z0-9._/-]+$/.test(image)) {
    throw new Error(`CMS field "${field}" must point to /assets/images/.`);
  }
  return image;
};

const formatPrice = (value, vehicleName) => {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`Vehicle price for "${vehicleName}" must be a positive whole number.`);
  }
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
};

const representative = site.representative ?? {};
const hero = site.hero ?? {};
const inventory = site.inventory ?? {};
const contact = site.contact ?? {};
const visibleVehicles = vehicles.filter((vehicle) => vehicle.available !== false);

if (!visibleVehicles.length) throw new Error("At least one vehicle must be visible on the website.");
if (!services.length || !advantages.length || !testimonials.length) {
  throw new Error("Services, advantages, and testimonials must each contain at least one item.");
}

const vehicleCards = visibleVehicles.map((vehicle) => {
  const name = requireText(vehicle.name, "vehicles.name");
  const specs = Array.isArray(vehicle.specs) ? vehicle.specs.filter(Boolean) : [];
  if (!specs.length) throw new Error(`Vehicle "${name}" needs at least one specification.`);
  return `<article class="vehicle-card">
            <div class="vehicle-image"><img src="${escapeHtml(safeImagePath(vehicle.image, `${name}.image`))}" alt="${escapeHtml(requireText(vehicle.image_alt, `${name}.image_alt`))}" width="1440" height="810" loading="lazy"><span>${escapeHtml(requireText(vehicle.badge, `${name}.badge`))}</span></div>
            <div class="vehicle-body"><p>${escapeHtml(requireText(vehicle.category, `${name}.category`))}</p><h3>${escapeHtml(name)}</h3><div class="spec-row">${specs.map((spec) => `<span>${escapeHtml(spec)}</span>`).join("")}</div><div class="vehicle-bottom"><strong>${escapeHtml(requireText(vehicle.price_prefix, `${name}.price_prefix`))} ${escapeHtml(formatPrice(vehicle.price, name))}</strong><a href="#contact" aria-label="Inquire about ${escapeHtml(name)}">Inquire <span>↗</span></a></div></div>
          </article>`;
}).join("\n          ");

const serviceCards = services.map((service, index) =>
  `<article><span>${String(index + 1).padStart(2, "0")}</span><div><h3>${escapeHtml(requireText(service.title, "services.title"))}</h3><p>${escapeHtml(requireText(service.description, "services.description"))}</p></div><b aria-hidden="true">↗</b></article>`,
).join("\n          ");

const panelClassNames = ["one", "two", "three"];
const advantagePanels = advantages.map((advantage, index) => {
  const photo = `<div class="feature-photo" role="img" aria-label="${escapeHtml(requireText(advantage.image_alt, "advantages.image_alt"))}" style="background-image: url('${escapeHtml(safeImagePath(advantage.image, "advantages.image"))}')"></div>`;
  const copy = `<div class="feature-copy"><p class="eyebrow light">${String(index + 1).padStart(2, "0")} / ${escapeHtml(requireText(advantage.label, "advantages.label"))}</p><h2>${escapeHtml(requireText(advantage.headline, "advantages.headline"))}</h2><p>${escapeHtml(requireText(advantage.description, "advantages.description"))}</p></div>`;
  const className = panelClassNames[index] ? ` feature-panel-${panelClassNames[index]}` : "";
  return `<div class="feature-panel${className}">${index % 2 === 0 ? photo + copy : copy + photo}</div>`;
}).join("\n      ");

const testimonialCards = testimonials.map((testimonial) =>
  `<blockquote><span class="quote-mark">“</span><p>${escapeHtml(requireText(testimonial.quote, "testimonials.quote"))}</p><footer><strong>${escapeHtml(requireText(testimonial.customer, "testimonials.customer"))}</strong><span>${escapeHtml(requireText(testimonial.vehicle, "testimonials.vehicle"))} • ${escapeHtml(requireText(testimonial.location, "testimonials.location"))}</span></footer></blockquote>`,
).join("\n          ");

const heroImage = safeImagePath(hero.image, "hero.image");
const portrait = representative.portrait_image
  ? `<div class="portrait portrait-image" role="img" aria-label="Professional portrait of ${escapeHtml(representative.full_name)}"><img src="${escapeHtml(safeImagePath(representative.portrait_image, "representative.portrait_image"))}" alt="Professional portrait of ${escapeHtml(representative.full_name)}" loading="lazy"></div>`
  : `<div class="portrait" role="img" aria-label="Professional portrait placeholder for ${escapeHtml(representative.full_name)}"><span>PHOTO<br>PLACEHOLDER</span></div>`;

const pageTitle = `${requireText(representative.full_name, "representative.full_name")} | ${requireText(representative.professional_title, "representative.professional_title")}`;
const replacements = {
  META_DESCRIPTION: `Connect with ${representative.full_name}, ${representative.professional_title} at ${representative.dealership_name}, for personal assistance with new Mitsubishi vehicles in ${representative.dealership_location}.`,
  OG_TITLE: `${representative.full_name} | ${hero.headline_primary}, ${hero.headline_accent}.`,
  OG_DESCRIPTION: `${representative.professional_title} at ${representative.dealership_name} in ${representative.dealership_location}.`,
  PAGE_TITLE: pageTitle,
  FULL_NAME: representative.full_name,
  FIRST_NAME: representative.first_name,
  PROFESSIONAL_TITLE: representative.professional_title,
  YEARS_EXPERIENCE: representative.years_experience,
  DEALERSHIP_NAME: representative.dealership_name,
  DEALERSHIP_LOCATION: representative.dealership_location,
  PHONE_DISPLAY: representative.phone_display,
  PHONE_LINK: representative.phone_link,
  EMAIL: representative.email,
  VIBER_DISPLAY: representative.viber_display,
  VIBER_LINK_ENCODED: encodeURIComponent(representative.viber_link),
  BIO_PRIMARY: representative.bio_primary,
  BIO_SECONDARY: representative.bio_secondary,
  HERO_IMAGE: heroImage,
  HERO_IMAGE_ALT: hero.image_alt,
  HERO_EYEBROW: hero.eyebrow,
  HERO_HEADLINE_PRIMARY: hero.headline_primary,
  HERO_HEADLINE_ACCENT: hero.headline_accent,
  HERO_DESCRIPTION: hero.description,
  HERO_PRICE_LABEL: hero.price_label,
  HERO_PRICE: hero.price,
  HERO_PRICE_NOTE: hero.price_note,
  PORTRAIT: portrait,
  INVENTORY_EYEBROW: inventory.eyebrow,
  INVENTORY_HEADLINE: inventory.headline,
  INVENTORY_DESCRIPTION: inventory.description,
  INVENTORY_DISCLAIMER: inventory.disclaimer,
  VEHICLE_CARDS: vehicleCards,
  VEHICLE_OPTIONS: visibleVehicles.map((vehicle) => `<option>${escapeHtml(vehicle.name)}</option>`).join(""),
  SERVICE_CARDS: serviceCards,
  ADVANTAGE_PANELS: advantagePanels,
  TESTIMONIAL_CARDS: testimonialCards,
  CONTACT_HEADLINE: contact.headline,
  CONTACT_DESCRIPTION: contact.description,
  BUSINESS_HOURS: escapeHtml(contact.business_hours).replaceAll("\n", "<br>"),
  SUNDAY_HOURS: contact.sunday_hours,
};

let html = await readFile(path.join(projectRoot, "index.html"), "utf8");
for (const [token, rawValue] of Object.entries(replacements)) {
  const renderedValue = ["PORTRAIT", "VEHICLE_CARDS", "VEHICLE_OPTIONS", "SERVICE_CARDS", "ADVANTAGE_PANELS", "TESTIMONIAL_CARDS", "BUSINESS_HOURS"].includes(token)
    ? String(rawValue)
    : escapeHtml(requireText(String(rawValue), token));
  html = html.replaceAll(`{{${token}}}`, renderedValue);
}

const unresolvedTokens = html.match(/\{\{[A-Z0-9_]+\}\}/g);
if (unresolvedTokens) throw new Error(`Unresolved template tokens: ${[...new Set(unresolvedTokens)].join(", ")}`);

await writeFile(path.join(outputDir, "index.html"), html);

console.log("Cloudflare Pages build created in dist/");
