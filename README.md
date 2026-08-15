# Automotive Sales Portfolio

A responsive, static automotive sales representative website built with semantic HTML, modern CSS, and minimal vanilla JavaScript. Editable content is managed through Pages CMS and the production site is deployed to Cloudflare Pages.

## Preview locally

Build the generated website, then serve the `dist` directory with any static web server:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run build
& "C:\Program Files\nodejs\npx.cmd" serve dist
```

## Customize

Use Pages CMS for routine content updates. The editable source files are stored under `content/`, and uploaded images are stored under `assets/images/`. Do not edit generated files in `dist/`.

See `PAGES_CMS_SETUP.md` for the one-time client setup and publishing workflow.

The lead form in `assets/js/main.js` is still a demonstration and must be connected to an approved form service before launch.

## Structure

```text
index.html                 # build template
.pages.yml                # Pages CMS editing configuration
content/
  site.json
  vehicles.json
  services.json
  advantages.json
  testimonials.json
assets/
  css/styles.css
  js/main.js
  images/
tests/static-site.test.mjs
```

Run `npm test` to build and verify the static structure, CMS content, and required assets.
