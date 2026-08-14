# GitHub + Cloudflare Pages deployment

## 1. Publish the repository to GitHub

Create a new empty GitHub repository, such as `neva-laurente-auto`. Do not add a README or license during creation because this project already contains files.

From this project folder, connect and push the existing repository:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/neva-laurente-auto.git
git add index.html assets _headers scripts package.json package-lock.json README.md tests CLOUDFLARE_DEPLOYMENT.md
git commit -m "Prepare Neva Laurente website for Cloudflare Pages"
git push -u origin main
```

Review `git status` before committing so only intended files are included.

## 2. Connect GitHub to Cloudflare Pages

1. Open the Cloudflare dashboard and go to **Workers & Pages**.
2. Choose **Create application → Pages → Connect to Git**.
3. Authorize GitHub and select the repository.
4. Use these build settings:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | leave blank |

5. Select **Save and Deploy**.

Each future push to `main` will create a new production deployment. Other branches can create preview deployments.

## 3. Add a custom domain later

In the Pages project, open **Custom domains**, add the chosen domain, and follow Cloudflare's DNS instructions. Keep the generated `pages.dev` address as a fallback.

## Important

The current contact form is a front-end demonstration. Hosting it does not make submissions reach an inbox. Add the planned Cloudflare Worker lead API, spam protection, consent recording, and email delivery before treating it as a live lead form.
