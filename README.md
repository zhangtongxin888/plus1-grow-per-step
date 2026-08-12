# +1 Grow Per Step Wiki

A beginner-first, unofficial guide for the Roblox experience **+1 Grow Per Step**.

The site keeps researched game facts separate from route advice and links every factual claim back to the official Roblox listing or official Roblox APIs on the Sources page.

## Pages

- `/` — first-session route and core loop
- `/beginner-guide` — detailed quick-start walkthrough
- `/progression` — upgrade, wall, area, crystal, and rebirth planning
- `/mistakes` — common progression mistakes and recoveries
- `/faq` — verified answers and clearly marked unknowns
- `/sources` — source ledger and fact policy

## Local checks

Requires Node.js 22.13 or newer.

```bash
npm install
npm run lint
npm test
npm run build:vercel
```

`npm run build:vercel` creates the static production package in `vercel-dist/`.
