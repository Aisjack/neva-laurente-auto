# Pages CMS setup

Pages CMS provides the client-facing editing dashboard. It commits approved content changes to this GitHub repository, and the existing GitHub Actions workflow rebuilds and deploys the website to Cloudflare Pages.

## One-time setup

1. Commit and push this implementation to the repository's `main` branch.
2. Open [Pages CMS](https://app.pagescms.org/) and sign in with the GitHub account that owns or can access `Aisjack/neva-laurente-auto`.
3. Install the Pages CMS GitHub App and grant it access to `neva-laurente-auto` only.
4. Open the repository and select the `main` branch. Pages CMS will automatically read `.pages.yml`.
5. Give the client access through GitHub or the Pages CMS collaborator feature, using the minimum repository access required by your publishing policy.

## Client publishing workflow

1. Open the **Vehicles and prices** section.
2. Select a vehicle and update its whole-peso price, badge, specifications, image, or visibility.
3. Save the entry. Pages CMS commits the JSON change to GitHub.
4. GitHub Actions runs the tests, builds `dist/`, and deploys it to Cloudflare Pages.
5. Allow approximately one to three minutes for the new deployment to appear.

Site profile, hero content, contact details, services, advantages, testimonials, and images are also editable from the dashboard.

## Safety behavior

- Prices are stored as positive whole Philippine pesos and formatted during the build.
- Vehicles with **Show on website** disabled are omitted from the inventory and inquiry form.
- Uploaded images are restricted to JPG, PNG, and WebP files under `assets/images/`.
- Invalid or incomplete CMS data stops the deployment instead of publishing a broken page.
- Git history provides an audit trail and allows a previous content version to be restored.

## Important limitation

Pages CMS changes are deployment-based, not instant database updates. Each save creates a GitHub change and triggers a new Cloudflare Pages deployment. The public contact form remains a demonstration until a secure form endpoint is implemented.
