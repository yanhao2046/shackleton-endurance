# Deployment Notes

This project mirrors the deployment shape of `travels-with-charley`:

- static files live under `public/`
- `wrangler.json` points `assets.directory` at `./public`
- deployment command is `npx wrangler deploy`

Cloudflare authentication must be valid before deploy. If `wrangler whoami` reports an expired token, run:

```bash
npx wrangler login
```

Then deploy:

```bash
cd /Users/yanhao/Library/CloudStorage/Dropbox/3_MyYears/0_2026/AIwork-2026/shackleton-endurance
npx wrangler deploy
```
