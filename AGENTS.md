# Workspace

- `hireloop-client/` — Next.js 16 app (App Router, React 19, Tailwind v4, shadcn/Base UI).
  Read `hireloop-client/AGENTS.md` before editing.
- `hireloop-server/` — small Express 5 API in plain ESM JavaScript, with no build step.
  Run it with `node index.js` (no npm scripts beyond a placeholder `test`). It listens on
  `process.env.port` (lowercase, default `5000`).
- `hireloop-resources/` — requirements, Figma file, and source images/logos. Inputs for
  design work, not part of the build.

Both apps load a gitignored `.env` from their own directory. Each needs `MONGODB_URL`;
the client also needs `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`. They use the same
`hireloopDB` database: BetterAuth owns its collections (e.g. `user`) and the Express API
reads them directly.
