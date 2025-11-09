// ==========================================
// FILE: src/app/(auth)/sign-up/[[...sign-up]]/page.tsx (FIXED)
// ==========================================
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <SignUp
        fallbackRedirectUrl="/step1" // FIX: Replaces 'afterSignUpUrl'
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