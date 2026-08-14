# GitHub Deployment Plan

## Decision

Deploy the website as a static site through **GitHub Pages**, using **GitHub Actions** as the publishing source. This keeps the source and deployment history in GitHub and removes any runtime dependency on ChatGPT Sites.

The current project uses Vinext and produces a Cloudflare Worker-compatible server build. GitHub Pages only serves static files, so the site must first be converted to a static HTML/CSS/JavaScript build. The page itself is a good fit for static hosting: it has no database, authentication, or required server-side application logic.

## Phase 1 — Remove Sites-specific coupling

1. Preserve the current design and content in a migration branch.
2. Convert the rendered page into:
   - `index.html`
   - `assets/css/styles.css`
   - `assets/js/main.js`
   - `assets/images/`
3. Move the mobile menu, smooth scrolling, and form confirmation behavior into vanilla JavaScript.
4. Remove Vinext, Wrangler, Cloudflare Worker, D1, R2, Drizzle, and `.openai` deployment files after the static version passes QA.
5. Download approved vehicle imagery into `assets/images/` instead of relying on hotlinked images.
6. Replace all fictional identity, inventory, testimonial, affiliation, price, social-link, and contact information before public launch.

## Phase 2 — Make the site production-ready

1. Use only relative asset paths so the site works at `https://USERNAME.github.io/REPOSITORY/`.
2. Add a real favicon, canonical URL, Open Graph metadata, social preview image, and privacy notice.
3. Choose a static-compatible form destination:
   - recommended: Formspree or an equivalent form endpoint;
   - alternative: a mail link if lead storage is not required.
4. Keep form endpoint identifiers configurable and commit no API keys or private credentials.
5. Add a custom `404.html` that directs visitors back to the homepage.
6. Add `.nojekyll` if the final build output contains folders GitHub Pages might otherwise treat as Jekyll content.

## Phase 3 — Quality gates

The following must pass before the first GitHub deployment:

- Desktop, tablet, and mobile layout checks.
- Keyboard navigation and visible focus states.
- Heading order, form labels, alternative text, and color contrast checks.
- Mobile menu and anchor navigation tests.
- Test-drive, quote, phone, email, and WhatsApp link validation.
- Form submission test using non-sensitive sample data.
- No broken local assets or mixed-content requests.
- No ChatGPT Sites URLs, IDs, credentials, or deployment metadata in the publishable output.
- Performance review with compressed images and no oversized production assets.

## Phase 4 — Create the GitHub repository

1. Create a new repository, suggested name: `automotive-sales-portfolio`.
2. Keep it private during content review; make it public only if required by the selected GitHub plan or when ready to launch.
3. Add the GitHub repository as `origin` only after confirming the owner and repository name.
4. Push the reviewed static migration to `main`.
5. Optionally protect `main` and require the deployment check to pass before merging future changes.

No GitHub remote is currently configured in the local repository.

## Phase 5 — Configure GitHub Pages

1. Open the repository's **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Add `.github/workflows/deploy-pages.yml` using GitHub's official Pages actions.
4. Give the deployment job only the required permissions:
   - repository contents: read;
   - Pages: write;
   - identity token: write.
5. The workflow should:
   - check out the exact commit;
   - run any static build or validation step;
   - upload only the final static directory;
   - deploy that artifact to GitHub Pages.
6. Pin the official action versions current at implementation time.

GitHub supports publishing Pages from a branch or through a custom GitHub Actions workflow. Actions is recommended here because it provides an auditable build and validation gate:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Phase 6 — Launch and domain

1. Verify the default Pages URL: `https://USERNAME.github.io/automotive-sales-portfolio/`.
2. Test the production site in a signed-out browser and on a real phone.
3. If a branded domain is available, verify it with GitHub before changing DNS.
4. Configure the domain in **Settings → Pages**, add the required DNS records, and enable HTTPS.
5. Update the canonical and Open Graph URLs to the final domain.

Custom-domain guidance:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Phase 7 — Ongoing releases and rollback

- Every merge to `main` triggers the Pages workflow.
- Failed builds do not replace the last successful deployment.
- Roll back by reverting the faulty commit and allowing the workflow to redeploy.
- Review dependency and action updates periodically.
- Re-test the lead form after any endpoint or domain change.

## Information needed before execution

- GitHub username or organization.
- Repository name and desired visibility.
- Final sales representative name, contact details, and approved photos.
- Preferred lead-form destination.
- Custom domain, if any.

## Definition of done

- The ChatGPT-hosted Site has been permanently deleted in Sites management.
- The repository contains no Sites deployment binding.
- The site is static and deploys successfully from GitHub Actions.
- The GitHub Pages URL works on desktop and mobile.
- All placeholder identity and contact information has been replaced or clearly marked as a demo.
- The lead form reaches the approved destination.
