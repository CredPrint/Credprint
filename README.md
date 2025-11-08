# CredPrint

🔒 CredPrint is an inclusive alternative credit identity system built to help users prove financial credibility using alternative data sources (SMS transaction alerts, mobile wallet exports, CSVs). This README documents the project structure, local development flow, and backend details so engineers can quickly get productive.

---

## Table of contents

- About
- Project status
- Tech stack
- Architecture overview
- Project structure
- Environment variables
- Local development (quick start)
- Database & Prisma
- Authentication (Clerk)
- Security & encryption
- Testing
- Deployment
- Contributing
- License

---

## About

CredPrint converts user-provided transaction data into an alternative credit score and a shareable CredBadge that users can present to landlords, lenders, or employers. The system focuses on privacy, encryption at rest, and minimal onboarding friction.

## Project status

- MVP features implemented: onboarding flow, upload/parse routes (stubs), scoring core, CredBadge model and API hooks.
- Work remaining: full upload parsers (CSV/CSV exports), production-ready scoring algorithms, integration tests, and CI for migrations.

## Tech stack

- Frontend: Next.js (App Router) + React
- Backend: Next.js API routes (server code) + Node.js runtime
- Database: PostgreSQL (Supabase recommended for hosting)
- ORM: Prisma
- Auth: Clerk (authentication & session management)
- Styling: TailwindCSS
- Security: AES-256-GCM encryption for user-uploaded data (Node.js crypto)

---

## Architecture overview

- The app is a Next.js monorepo-style project. Frontend and server (API routes) share the same codebase.
- Prisma is the single source of truth for database models (see `prisma/schema.prisma`).
- Authentication is managed by Clerk — server and client components request user info via Clerk SDKs.
- Sensitive raw data (uploaded files) are encrypted before being persisted to the DB.

---

## Project structure (important files)

Root key folders/files (short descriptions):

```
/ (repository root)
├─ prisma/                     # Prisma schema & migrations
│  ├─ schema.prisma            # Database models
│  └─ migrations/              # SQL migration history
├─ src/
│  ├─ app/                     # Next.js App Router pages & route handlers
│  │  ├─ (auth)/               # Clerk sign-in/sign-up pages
│  │  ├─ (onboarding)/         # Multi-step onboarding (upload, score)
│  │  │  ├─ upload-data/       # POST route for uploads (route.ts)
│  │  │  └─ generate-score/    # POST route that triggers scoring
│  │  └─ dashboard/            # User dashboard pages
│  ├─ components/              # Reusable UI components
│  ├─ lib/                     # Server utilities (db, scoring, parsing)
│  │  ├─ db.ts                 # Prisma client singleton (exported `prisma`)
│  │  ├─ scoring.service.ts    # Scoring business logic
│  │  └─ validation.ts         # Zod / server-side validators
│  └─ middleware.ts            # Clerk middleware & auth helpers
├─ public/                     # Static assets (icons, images)
├─ .env                        # Local environment variables (gitignored)
├─ next.config.ts              # Next.js configuration
└─ package.json                # Dependencies & scripts
```

Note: Use backticks (`) when referencing filenames in code or docs.

---

## Environment variables (required)

Create a `.env` in the project root. DO NOT commit it.

Required variables:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY - Clerk publishable key for client-side auth
- CLERK_SECRET_KEY - Clerk server-side secret (used by server code)
- DATABASE_URL - Primary (pooler) Postgres connection used at runtime (pgbouncer)
- DIRECT_URL - Direct Postgres connection used for migrations (no pooler)
- ENCRYPTION_KEY - 64-character hex string (32 bytes) used for AES-256-GCM

Example (.env template):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXX
CLERK_SECRET_KEY=sk_test_YYYY
DATABASE_URL="postgresql://postgres:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:password@host:5432/postgres"
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

Security tips:
- If your password contains special characters, URL-encode them (e.g., `@` -> `%40`).
- Keep `.env` out of version control. Use environment-specific secrets managers for production.

---

## Local development (quick start)

1. Install dependencies

```bash
npm install
```

2. Prepare `.env` (see variables above).

3. Generate Prisma client (run after you create `.env` so `DATABASE_URL` is available):

```bash
npx prisma generate
```

4. Create local migrations / apply to DB (if using remote Postgres or Supabase confirm credentials first). For local development you can use SQLite — see the next section for a SQLite option.

```bash
npx prisma migrate dev --name init
```

5. Start dev server

```bash
npm run dev
```

Visit http://localhost:3000

---

## Database options and local dev with SQLite

If you prefer not to connect to a remote Postgres during development, change `prisma/schema.prisma` datasource to SQLite:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Then set in `.env`:

```
DATABASE_URL="file:./dev.db"
```

Run migrations locally and generate client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

This creates `dev.db` in the repo; add it to `.gitignore` if desired.

---

## Authentication (Clerk)

- Clerk is configured in `src/app/layout.tsx` and used across components with `useUser`, `SignIn`, and `SignUp` components.
- Build-time errors (prerender) may occur if Clerk environment variables are missing. For CI/builds without secrets, either provide test keys or guard Clerk initialisation to skip server-side operations when keys are not present.

---

## Security & encryption

- Uploaded raw data is encrypted at rest using AES-256-GCM. The encryption/decryption helpers are implemented in `src/lib` and use `ENCRYPTION_KEY` from the environment.
- Make sure `ENCRYPTION_KEY` is kept secret and rotated as necessary. For rotation you must re-encrypt stored data or support multiple keys with a key-id metadata field.

---

## Testing

- There are no automated tests in the repo by default. Recommended additions:
  - Unit tests for `scoring.service` (happy path + edge cases)
  - Integration tests for `upload-data` and `generate-score` routes using a test database (or SQLite-based fixtures)

Suggested test setup (Jest + Testing Library):

```bash
npm install -D jest @types/jest ts-jest @testing-library/react
```

---

## Deployment

- This app builds as a standard Next.js app. For production we recommend deploying to Vercel or any provider that supports Next.js App Router.
- Ensure production environment variables are configured in your hosting provider (Clerk keys, DATABASE_URL, DIRECT_URL, ENCRYPTION_KEY).
- Run migration step as part of your CI/CD pipeline (using DIRECT_URL for production migrations):

```bash
npx prisma migrate deploy --preview-feature
```

> Note: Be careful applying migrations to production databases. Always test migrations against a staging environment first.

---

## Contributing

Thanks for contributing! Please open issues for bugs or feature requests. Use clear commit messages and include tests for new functionality.

PR checklist:
- [ ] Ran TypeScript checks (`npx tsc --noEmit`)
- [ ] Ran `npm run lint` and fixed any issues
- [ ] Added/updated tests if applicable

---

## Troubleshooting

- P1013 invalid port or connection string: ensure your `DATABASE_URL` is a valid Postgres URL. Remove stray `?` after password and URL-encode special characters.
- P1000 authentication failed: verify DB username/password and network access (IP allowlists). Use `psql` to test connectivity.
- Clerk build errors: provide `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` or guard server components.

---

## License

MIT © CredPrint
