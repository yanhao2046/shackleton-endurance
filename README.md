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

## Deploy

This project uses Cloudflare Workers Static Assets.

```bash
npx wrangler deploy
```

Configured production domain:

```text
shackleton-endurance.thinkbit.cc
```
