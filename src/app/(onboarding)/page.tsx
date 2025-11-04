// src/app/(onboarding)/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingEntry() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to step1 after mount
    router.replace("/step1");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome to CrediMe</h1>
        <p>Redirecting to onboarding...</p>
      </div>
    </div>
  );
}
