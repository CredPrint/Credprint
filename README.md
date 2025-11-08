MIT © CredPrint

## Onboarding flow (6 steps)
We recently simplified the onboarding flow to a 6-step sequence. The app keeps the old route files for backwards compatibility but two steps were removed from the active flow:
- Removed steps: `step2` (intro/info) and `step5` (separate ID upload)
- Active compact flow (user-facing, 6 steps):
	1. Step 1 — Get started / Intro
	2. Step 2 — Upload Bank Statement (originally `step3`)
	3. Step 3 — Select Wallet Provider (originally `step4`)
	4. Step 4 — Verify Phone (originally `step6`)
	5. Step 5 — Enter OTP (originally `step7`)
	6. Step 6 — Review & Finish (originally `step8`)

Behavioral notes:
- The `/step2` and `/step5` routes still exist but are client-side redirects that forward users to the next active step (`/step3` and `/step6` respectively). This preserves old URLs while enforcing the new flow.
- The frontend `ProgressBar` and `OnboardingLayout` have been updated to show "Step X of 6" and to map legacy page numbers to the compact flow.
- Validation (`src/lib/validation.ts`) was updated to remove the now-inactive ID upload step from the combined `fullOnboardingSchema`. If you still require an ID upload, see "Follow-ups" below.

Follow-ups:
- If the ID upload is still required by your product, decide where it should be collected (e.g., merge into the bank statement upload step) and update `fullOnboardingSchema` and server handlers to expect it there.
- If you prefer to remove the legacy routes entirely (no redirects), we can delete `src/app/(onboarding)/step2/page.tsx` and `src/app/(onboarding)/step5/page.tsx` and run a build to clean up route manifests.
<!-- Banner -->


# CredPrint

<p align="center">
	<img src="https://img.shields.io/badge/Next.js-%23100000.svg?style=flat&logo=next.js&logoColor=white" alt="Next.js" />
	<img src="https://img.shields.io/badge/Prisma-%2344CCF6.svg?style=flat&logo=prisma" alt="Prisma" />
	<img src="https://img.shields.io/badge/Supabase-%2336B37E.svg?style=flat&logo=supabase" alt="Supabase" />
	<img src="https://img.shields.io/badge/Clerk-%23007ACC.svg?style=flat&logo=clerk" alt="Clerk" />
	<img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT" />
</p>

> 🔒 CredPrint is an inclusive alternative credit identity system that helps users prove financial credibility using alternative data sources (SMS transaction alerts, mobile wallet exports, CSVs). This README focuses on developer and contributor workflows, architecture, and troubleshooting.

---

## Table of contents 📚

- [About](#about) ✨
- [Project status](#project-status) 🔭
- [Tech stack](#tech-stack) 🧰
- [Architecture overview](#architecture-overview) 🏗️
- [Project structure (important files)](#project-structure-important-files) 📂
- [Environment variables (required)](#environment-variables-required) 🔑
- [Local development (quick start)](#local-development-quick-start) ▶️
- [Database options and local dev with SQLite](#database-options-and-local-dev-with-sqlite) 🗄️
- [Authentication (Clerk)](#authentication-clerk) 🔐
- [Security & encryption](#security--encryption) 🛡️
- [Testing](#testing) ✅
- [Deployment](#deployment) 🚀
- [Contributing](#contributing) 🤝
- [Troubleshooting](#troubleshooting) 🩺
- [License](#license) 📄

---

## About ✨

CredPrint converts user-provided transaction data into an alternative credit score and a shareable CredBadge that users can present to landlords, lenders, or employers. The system emphasizes privacy, encryption at rest, and minimal onboarding friction for users without traditional banking credentials.

## Project status 🔭

- MVP: onboarding flow, upload route stubs, scoring core, CredBadge model and basic API hooks.
- Work remaining: full upload parsers (CSV/exports), production scoring logic, integration tests, CI for migrations, and production hardening.

## Tech stack 🧰

- Frontend: Next.js (App Router) + React
- Backend: Next.js server components & API routes (Node.js)
- Database: PostgreSQL (Supabase recommended)
- ORM: Prisma
- Auth: Clerk
- Styling: TailwindCSS
- Security: AES-256-GCM encryption (Node.js crypto)

---

## Architecture overview 🏗️

- Single Next.js codebase containing frontend pages and server route handlers.
- Prisma schema drives the DB models (`prisma/schema.prisma`).
- Clerk provides auth for client and server.
- Uploaded raw data is encrypted before persistence and stored as encrypted blobs.

---

## Project structure (important files) 📂

```
/ (repo root)
├─ prisma/                    # Prisma schema & migrations
├─ public/                    # Static assets (icons, images)
├─ src/
│  ├─ app/                    # Next.js App Router (pages & route handlers)
│  │  ├─ (auth)/              # Clerk sign-in / sign-up
│  │  ├─ (onboarding)/        # Upload, parse, score routes & pages
│  │  └─ dashboard/           # User dashboard
│  ├─ components/             # Reusable UI components
│  └─ lib/                    # Server utilities (db, scoring, parsing)
├─ .env                       # Local environment variables (gitignored)
└─ package.json               # Dependencies & scripts
```

---

## Environment variables (required) 🔑

Create a `.env` in the project root. DO NOT commit it.

Required variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk publishable key (client)
- `CLERK_SECRET_KEY` — Clerk server secret
- `DATABASE_URL` — Primary runtime Postgres connection (pooler)
- `DIRECT_URL` — Direct Postgres connection used for migrations
- `ENCRYPTION_KEY` — 64-character hex (32 bytes) for AES-256-GCM

Example:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXX
CLERK_SECRET_KEY=sk_test_YYYY
DATABASE_URL="postgresql://postgres:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:password@host:5432/postgres"
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

Security tips:

- URL-encode special characters in passwords (e.g., `@` → `%40`).
- Use secrets managers for production; never commit `.env` to git.

---

## Local development (quick start) ▶️

1. Install dependencies

```bash
npm install
```

2. Create `.env` and populate required variables.

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Create or apply migrations (confirm credentials first):

```bash
npx prisma migrate dev --name init
```

5. Start dev server

```bash
npm run dev
```

Open http://localhost:3000

---

## Database options and local dev with SQLite 🗄️

If you want to avoid remote Postgres for local development, switch the Prisma datasource to SQLite and set `DATABASE_URL="file:./dev.db"` in `.env`.

---

## Authentication (Clerk) 🔐

- Clerk is initialized in `src/app/layout.tsx` and used via `useUser`, `SignIn`, `SignUp` and server helpers.
- Missing Clerk keys can break builds (prerender). Provide test keys in CI or guard initialisation.

---

## Security & encryption 🛡️

- Raw uploads are encrypted with AES-256-GCM. The helpers live in `src/lib` and use `ENCRYPTION_KEY`.
- Plan key rotation; consider key IDs and re-encryption strategies.

---

## Testing ✅

- Recommended: unit tests for `scoring.service` and integration tests for `upload-data` and `generate-score` routes (use SQLite or a test DB).
- Suggested setup: Jest + Testing Library.

---

## Deployment 🚀

- Deploy like a standard Next.js App Router app (Vercel recommended).
- Ensure env vars (Clerk keys, DB credentials, ENCRYPTION_KEY) are set in production.
- Run migrations in CI/CD using `DIRECT_URL`:

```bash
npx prisma migrate deploy
```

---

## Contributing 🤝

PR checklist:

- [ ] Run TypeScript checks: `npx tsc --noEmit`
- [ ] Run linter: `npm run lint`
- [ ] Add tests for new behavior

---

## Troubleshooting 🩺

- P1013 invalid DB URL: remove stray `?` after password and URL-encode special characters.
- P1000 auth failed: verify DB credentials and network access.
- Clerk build errors: supply `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` or guard server components.

---

## License 📄

MIT © CredPrint

# CredPrint

🔒 CredPrint is an inclusive alternative credit identity system built to help users prove financial credibility using alternative data sources (SMS transaction alerts, mobile wallet exports, CSVs). This README documents the project structure, local development flow, and backend details so engineers can quickly get productive.

---

## Table of contents 📚
