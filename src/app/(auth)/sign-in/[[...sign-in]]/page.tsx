// ==========================================
// FILE: src/app/(auth)/sign-in/[[...sign-in]]/page.tsx (FIXED)
// ==========================================
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <SignIn
        fallbackRedirectUrl="/step1" // FIX: Replaces 'afterSignInUrl'
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl",
          },
        }}
      />
    </div>
  );
}