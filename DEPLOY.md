# Deployment Notes

This project uses GitHub as the deployment source:

- static files live under `public/`
- `wrangler.json` points `assets.directory` at `./public`
- pushes to `main` trigger `.github/workflows/deploy-cloudflare.yml`
- GitHub Actions runs `npx wrangler@4.105.0 deploy`

## Required GitHub Secrets

Set these in GitHub repo settings:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

`CLOUDFLARE_API_TOKEN` needs permission to deploy Workers scripts/static assets and manage the custom domain route for `shackleton-endurance.thinkbit.cc`.

## Trigger Deploy

Deploy happens automatically on push to `main`.

Manual trigger:

```bash
gh workflow run deploy-cloudflare.yml
```

## Local Emergency Deploy

This bypasses GitHub and deploys from the local checkout, so it is not the normal path:

```bash
cd /Users/yanhao/Library/CloudStorage/Dropbox/3_MyYears/0_2026/AIwork-2026/shackleton-endurance
npx wrangler deploy
```
