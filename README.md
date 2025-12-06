# verza

## Deploy to Netlify

- Netlify is configured via `netlify.toml` at the repo root.
- The app lives in `frontend/`; builds to `frontend/dist`.
- [Link](https://verzaapp.netlify.app/)

### What’s configured
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist` (relative to base)
- Node version: `20`
- SPA fallback: redirect `/*` to `/index.html`

### Deploy via Netlify UI
- Push your code to GitHub/GitLab/Bitbucket.
- In Netlify, choose “Add new site” → “Import from Git”.
- Select the repo; Netlify will read `netlify.toml` and use the above settings.
- First deploy will build and publish from `frontend/dist`.

### Deploy via Netlify CLI
- Install CLI: `npm i -g netlify-cli`
- Login: `netlify login`
- Initialize (if not already linked): `netlify init`
- Build locally: `npm run build` (in `frontend/`)
- Deploy production: `netlify deploy --prod --dir frontend/dist`

### Notes
- No extra Netlify UI configuration is needed; `netlify.toml` sets everything.
- If you use PNPM, Netlify auto-detects the lockfile and installs accordingly.