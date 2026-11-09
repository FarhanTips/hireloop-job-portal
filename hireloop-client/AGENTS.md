<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-client

HireLoop job-portal frontend. Next.js 16 App Router + React 19 + Tailwind CSS v4 + shadcn/ui
on Base UI. Implemented so far: landing hero (`components/banner.tsx`), BetterAuth
email/password sign-in/up, and a mostly stubbed role dashboard.

## Commands

- `npm install` then `npm run dev` — Next 16 dev server; Turbopack is the default bundler.
  If a dev server is already running, `.next/dev/lock` holds its PID/URL — reuse it instead
  of starting another.
- `npm run lint` — ESLint CLI (flat config). `next lint` was removed in Next 16.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run format` — Prettier, but only `**/*.{ts,tsx}`; CSS/JSON/Markdown are not formatted.
- No test runner is configured. Do not invent test commands.
- Use npm; the repo is locked with `package-lock.json`.
- The tree currently has known baseline failures: `typecheck` errors on the empty
  `menuItemsByRole` arrays in `components/DashboardSidebar.tsx`, and `lint` errors on
  generated `hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`). Verify you did not add
  new failures instead of assuming a clean run.

## Next.js 16 notes

- `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` are async-only.
- The `middleware.ts` convention is now `proxy.ts` (Node runtime, no `edge`).
- `next dev` writes to `.next/dev` and can run alongside `next build`.
- Before using any API you remember from Next 13–15, check the matching file under
  `node_modules/next/dist/docs/01-app/` — the bundled docs match the installed version.

## Auth and data

- `lib/auth.ts` — server BetterAuth instance (MongoDB adapter, DB `hireloopDB`, email/password,
  `autoSignIn: false`). `lib/auth-client.ts` — browser client. API entrypoint:
  `app/api/auth/[...all]/route.ts`.
- Auth pages live in the `app/(auth)/` route group, so their URLs are `/sign-in` and
  `/sign-up` (not `/auth/...`). Sign-up deliberately redirects to `/sign-in`.
- `.env` is gitignored and must define `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and
  `MONGODB_URL`.
- The `user` collection is shared with `../hireloop-server`. Role UI reads
  `session.user.role`, but BetterAuth is not configured with an admin plugin or a `role`
  field yet, so `DashboardSidebar` falls back to `seeker`.
- Dashboard routes `app/dashboard/{seeker,recruiter,admin}/page.tsx` are placeholders; the
  shared shell is `app/dashboard/layout.tsx` + `components/DashboardSidebar.tsx`.

## Styling and components

- `components.json` uses the `base-nova` shadcn style with **Base UI**, not Radix. Add
  components with `npx shadcn@latest add <name>` rather than pasting Radix-based snippets.
- Base UI components use a `render` prop (`<SidebarMenuButton render={<a href="..." />} />`)
  instead of Radix's `asChild`.
- Generated primitives import `cn` from the `cn` package (`import { cn } from "cn"`);
  `@/lib/utils` re-exports the same helper. Match the surrounding file's import style.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`. Theme tokens, radius, and dark
  mode live in `app/globals.css` (`:root` / `.dark` oklch variables + `@theme inline`).
  Add or change design tokens there.
- Prettier: no semicolons, double quotes, 2-space indent, LF, Tailwind class sorting via
  `prettier-plugin-tailwindcss`.
- The root layout always renders `NavBar` and React Toastify's `ToastContainer`; use
  `toast` from `react-toastify` for notifications.

## Layout

- `app/` — routes, root layout, global CSS, local images.
- `components/` — app components; `components/ui/` — shadcn-generated primitives.
- `hooks/`, `lib/` — shared hooks and helpers. `@/*` maps to the project root.
- Local images live in `app/images/` and are imported statically (`@/app/images/...`).

## Assets and scope

- Requirements: `../hireloop-resources/Project requirements.md`; design: `hireloop.fig`;
  images/logos: `../hireloop-resources/images/` and `../hireloop-resources/logos/`.
- Libraries the requirements/resources mention (Recharts, Framer Motion, Stripe, etc.) are
  not installed. Install them before importing; the Framer Motion guide's "already added"
  claim is stale.
