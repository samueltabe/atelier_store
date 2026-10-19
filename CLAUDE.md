# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js 16 e-commerce app (App Router, TypeScript, Tailwind v4, Drizzle ORM against Neon Postgres, Better Auth). The storefront (homepage, `/shop` listing, `/shop/[slug]` detail) is backed by real `categories`/`products` tables — see Architecture below. No cart/order/payment/wishlist/review/warehouse/variant schemas exist yet, and no auth UI or flows beyond the route handler. Treat those as greenfield work, not something to "find" in the codebase.

## Commands

- `npm run dev` — start dev server (Turbopack, default port 3000)
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- `npx tsc --noEmit` — type-check only (no dedicated script)
- `node --test tests/drizzle-studio.test.mjs` — check Studio startup is blocked and schema export still works; uses synthetic credentials without a database
- `npm run db:generate` — generate SQL migrations from `src/db/schema.ts` via drizzle-kit
- `npm run db:push` — push schema directly to the database (no migration files)
- `npm run db:seed` — populate `categories`/`products` with the 16-product sample catalog (idempotent, uses `onConflictDoNothing`); requires `DATABASE_URL` in `.env.local`. Runs as `tsx --env-file=.env.local src/db/seed.ts` — the `--env-file` flag is load-bearing: a `dotenv.config()` call inside `seed.ts` would run too late, since static `import`s (including the one that pulls in `src/db/index.ts`, which throws if `DATABASE_URL` is unset) are hoisted above it.
- `npx @better-auth/cli generate` — scaffold the Better Auth tables (`user`, `session`, `account`, `verification`) into `src/db/schema.ts`; run this before `db:push`/`db:generate` will produce anything auth-related

The Studio security regression tests use Node's built-in test runner; there is no application test suite yet.

## Environment

Copy `.env.example` to `.env.local` and fill in:
- `DATABASE_URL` — Neon Postgres connection string
- `BETTER_AUTH_SECRET` — required, no default (generate with `openssl rand -base64 32`)
- `BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL` — app origin, server and client side respectively

`src/db/index.ts` and `drizzle.config.ts` both throw at import time if `DATABASE_URL` is unset — expect hard failures, not silent fallbacks, when env is missing.

## Architecture

- `src/db/index.ts` — Drizzle client over `@neondatabase/serverless` (HTTP driver, not a pooled TCP connection). Imports `*` from `src/db/schema.ts` as the schema object.
- `src/db/schema.ts` — `categories` and `products` tables plus a `stockStatusEnum`/`StockStatus` type (`"in-stock" | "low-stock" | "out-of-stock"`). `products.categoryId` references `categories.id` (`onDelete: "restrict"`). Both tables use a human-readable slug as the primary key (e.g. `"women"`, `"tulle-evening-dress"`) rather than a surrogate id — the slug *is* the id, matching the `/shop/[slug]` route param directly. Price is stored as `priceCents` (integer cents, not `numeric`/decimal — Drizzle's `numeric` columns deserialize as strings). `sortOrder` (not `createdAt`) drives the "Newest" sort, since a single seed transaction gives every row the same `createdAt`. This is also where Better Auth's generated tables would belong once added, in the same schema module, since `src/db/index.ts` passes one schema object to `drizzle()`.
- `src/db/queries.ts` — the only place that talks to the DB for storefront data (`getCategories`, `getProducts`, `getProductBySlug`, `getRelatedProducts`, `getProductSlugs`, `getCategoryById`). Has a module-level `"use cache"` directive — required because `cacheComponents: true` (below) treats a plain uncached `db.select()` as dynamic data access that fails static generation; this directive is what lets `/shop/[slug]`'s `generateStaticParams` and the homepage's `ProductGrid`/`FeaturedCollections` still prerender.
- `src/db/seed.ts` — standalone idempotent seed script (run via `npm run db:seed`), self-contained (doesn't import from app code) so it keeps working regardless of future refactors.
- `src/lib/format.ts` — `formatPrice(cents)`, the only place price formatting happens.
- `src/lib/site-content.ts` — `heroImage`/`editorialImage` constants; purely editorial imagery, intentionally not in the database.
- `drizzle.config.ts` — dialect `postgresql`, schema path `./src/db/schema.ts`, migrations output to `./drizzle/`.
- `src/lib/auth.ts` — server-side Better Auth instance (`drizzleAdapter(db, { provider: "pg" })`, email/password enabled). Add OAuth providers, hooks, etc. here.
- `src/lib/auth-client.ts` — `better-auth/react` client for use in Client Components.
- `src/app/api/auth/[...all]/route.ts` — catch-all route handler wiring Better Auth into the App Router via `toNextJsHandler`. All auth HTTP traffic goes through this one file.
- Path alias `@/*` → `./src/*` (see `tsconfig.json`).

Until `npx @better-auth/cli generate` + `db:push` have been run against a real database, any request to `/api/auth/*` will fail with a Better Auth `SCHEMA_MISMATCH` error (missing `user`/`session`/`account`/`verification` tables) — this is expected, not a bug, in the current state of the repo.

## Next.js 16 — read before assuming API behavior

This project is on Next.js 16, which has substantial breaking changes vs. Next 13–15 (what most training data reflects). Before writing App Router code, check `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` and the rest of `node_modules/next/dist/docs/` for version-matched behavior. Notable points already in effect in this repo:

- `next.config.ts` has `cacheComponents: true` and `partialPrefetching: true` enabled. This opts into the Cache Components model: dynamic/uncached data access outside a `<Suspense>` boundary (or without a `"use cache"` directive) will error at build time, not just warn. Plan data-fetching components with this in mind from the start.
- Turbopack is the default bundler for both `dev` and `build` — no `--turbopack` flag needed.
- `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` are async-only (no synchronous compat layer).
- `middleware.ts` is deprecated in favor of `proxy.ts` (function renamed to `proxy`); not present in this repo yet.
- `next lint` was removed; linting runs via the ESLint CLI directly (`npm run lint`).

## Gotchas

- Better Auth's Drizzle adapter is imported as `better-auth/adapters/drizzle`, but the package's on-disk folder is `drizzle-adapter` — don't "fix" the import path based on `node_modules` folder names.
- `package.json`/`package-lock.json` and `.git` were created by `create-next-app`; no commits have been made beyond the initial scaffold.
- `src/lib/nav-links.ts` hardcodes `/shop?category=women` etc. independently of the `categories` table — it also contains non-category entries ("New Arrivals", "Collections"), so it's intentionally not derived from the DB. Don't "fix" this into a DB-driven list without checking whether that's actually wanted.
- There is no `src/lib/sample-data.ts` anymore — it was deleted when the storefront moved to the real `categories`/`products` tables. If you see a reference to it (e.g. in an old diff or your own memory of an earlier version of this repo), it's stale.
- Studio is disabled in `drizzle.config.ts`, including manual `npx drizzle-kit studio` startup with this config. The locked `drizzle-kit@0.31.11` accepts unauthenticated SQL requests from arbitrary browser origins (CWE-942); removing the npm script alone did not block this exposure. Keep the config guard and do not launch Studio with an alternate config. Re-enable it only after verifying that a replacement authenticates requests and restricts origins before any database operation. Migration generation and schema push remain available.
