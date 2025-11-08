CredPrint 🚀CredPrint is Nigeria's most inclusive alternative credit identity system. We enable anyone — even without a traditional bank account — to prove their financial credibility through digital and behavioral data from sources like mobile wallets, SMS transaction alerts, and more.🌟 Features (MVP)Alternative Data Scoring: We build a credit score based on real-life financial behavior (inflow frequency, spending stability) parsed from user-uploaded transaction history (SMS, wallet exports).No BVN/NIN Barrier: Our initial onboarding is frictionless, using email/phone verification to include the unbanked.CredBadge: A shareable, verifiable digital badge that proves a user's creditworthiness to landlords, lenders, and employers.Secure & Private: All sensitive user data is encrypted at rest using AES-256-GCM. We are built with NDPC compliance in mind.🛠️ Tech StackFrontend: Next.js 15 (App Router), React 19, TailwindCSSAuth: ClerkBackend API: Next.js API Routes (Node.js runtime)Database: PostgreSQL (hosted on Supabase)ORM: PrismaSecurity: Node.js crypto for AES-256-GCM encryption🚀 Getting StartedPrerequisitesNode.js 18+npm or yarnA Supabase project (for the PostgreSQL database)A Clerk account (for authentication)InstallationClone the repository:git clone [https://github.com/your-username/credprint.git](https://github.com/your-username/credprint.git)
cd credprint
Install dependencies:npm install
Set up environment variables:Create a .env file in the root directory and add the following keys. DO NOT commit this file to Git.# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase Database Connection (Get these from your Supabase dashboard)
# Transaction Pooling URL (for the app)
DATABASE_URL="postgresql://postgres.[project]:[password]@[aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true](https://aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true)"
# Direct Connection URL (for migrations)
DIRECT_URL="postgresql://postgres.[project]:[password]@[aws-0-region.pooler.supabase.com:5432/postgres](https://aws-0-region.pooler.supabase.com:5432/postgres)"

# 32-byte Hex Encryption Key for User Data
# Generate with: node -e "console.log(crypto.randomBytes(32).toString('hex'))"
ENCRYPTION_KEY="your-64-char-hex-key-here"
Run Database Migrations:This will create the necessary tables in your Supabase database.npx prisma migrate dev --name init
Start the development server:npm run dev
Open http://localhost:3000 to view the app.📂 Project Structurecredprint/
├── prisma/
│   ├── schema.prisma      # Database schema definition
│   └── migrations/        # SQL migration files
├── public/                # Static assets (images, icons)
├── src/
│   ├── app/
│   │   ├── (auth)/        # Clerk sign-in/sign-up pages
│   │   ├── (onboarding)/  # Multi-step onboarding flow
│   │   ├── api/           # Backend API routes (upload, score, etc.)
│   │   └── dashboard/     # User dashboard
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks (e.g., useOnboarding)
│   ├── lib/               # Backend utilities (db, security, parsing)
│   └── middleware.ts      # Clerk auth middleware
├── .env                   # Local environment variables (gitignored)
├── next.config.ts         # Next.js configuration
└── package.json           # Project dependencies



## 🤝 Contributing

We welcome contributions\! Please see our [CONTRIBUTING.md](https://www.google.com/search?q=CONTRIBUTING.md) for details on how to submit pull requests, report issues, and our code of conduct.

## 📄 License

This project is licensed under the MIT License 

```
```