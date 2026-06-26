# Shackleton Endurance

Interactive map and reading companion for `熬：极地求生700天`.

## Contents

- `public/index.html` - v3 interactive Endurance route map with excerpts and character notes.
- `public/afterstory.html` - afterstory page covering Shackleton after 1916, expedition finance, and the later lives of the Endurance crew.

## Local Preview

```bash
cd /Users/yanhao/Library/CloudStorage/Dropbox/3_MyYears/0_2026/AIwork-2026/shackleton-endurance
python3 -m http.server 8766 --directory public
```

Open `http://127.0.0.1:8766/`.

## Deploy From GitHub

This project deploys from GitHub Actions to Cloudflare Workers Static Assets.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Every push to `main` runs `.github/workflows/deploy-cloudflare.yml`.

Manual rerun:

```bash
gh workflow run deploy-cloudflare.yml
```

Optional local deploy, for emergency use only:

```bash
npx wrangler deploy
```

Configured production domain:

```text
shackleton-endurance.thinkbit.cc
```
