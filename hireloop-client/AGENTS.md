<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-client

HireLoop job-portal frontend. Next.js App Router + React 19 + Tailwind CSS v4 + shadcn/ui.
The app is still the starter scaffold (`app/page.tsx`, one Button); product requirements
and design assets live in `../hireloop-resources/`.

## Commands

- `npm install` then `npm run dev` — Next 16 dev server; Turbopack is the default bundler.
  If a dev server is already running, `.next/dev/lock` holds its PID/URL — reuse it instead
  of starting another.
- `npm run lint` — ESLint CLI (flat config). `next lint` was removed in Next 16.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run format` — Prettier, but only `**/*.{ts,tsx}`; CSS/JSON/Markdown are not formatted.
- No test runner is configured. Do not invent test commands.
- Use npm; the repo is locked with `package-lock.json`.

## Next.js 16 notes

- `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` are async-only.
- The `middleware.ts` convention is now `proxy.ts` (Node runtime, no `edge`).
- `next dev` writes to `.next/dev` and can run alongside `next build`.
- Before using any API you remember from Next 13–15, check the matching file under
  `node_modules/next/dist/docs/01-app/` — the bundled docs match the installed version.

## Styling and components

- `components.json` uses the `base-nova` shadcn style with **Base UI**, not Radix. Add
  components with `npx shadcn@latest add <name>` rather than pasting Radix-based snippets.
- Generated UI imports `cn` from the `cn` package (`import { cn } from "cn"`);
  `@/lib/utils` re-exports the same helper.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`. Theme tokens, radius, and dark
  mode live in `app/globals.css` (`:root` / `.dark` oklch variables + `@theme inline`).
  Add or change design tokens there.
- Prettier: no semicolons, double quotes, 2-space indent, LF, Tailwind class sorting.

## Layout

- `app/` — routes, root layout, global CSS.
- `components/` — app components; `components/ui/` — shadcn-generated primitives.
- `hooks/`, `lib/` — shared hooks and helpers. `@/*` maps to the project root.
- `components/theme-provider.tsx` also wires the `d` key to toggle dark mode.

## Assets and scope

- Requirements: `../hireloop-resources/Project requirements.md`; design: `hireloop.fig`;
  images/logos: `../hireloop-resources/images/` and `../hireloop-resources/logos/`.
- Libraries the requirements/resources mention (Recharts, Framer Motion, Stripe, etc.) are
  not installed. Install them before importing; the Framer Motion guide's "already added"
  claim is stale.
