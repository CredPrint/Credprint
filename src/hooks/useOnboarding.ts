// ==========================================
// FILE: src/hooks/useOnboarding.ts (FIXED)
// ==========================================
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

// FIX: This array now defines the *actual* flow, skipping redirect-only pages.
// This ensures the progress bar is accurate (Total 4 steps) and
// goNext() navigates correctly (e.g., from step4 to step8).
const steps = [
  "step1",   // Welcome
  "step3",   // Upload Data
  "step4",   // Select Provider
  "step8",   // Review & Finish
  "success", // Success page
];


export function useOnboarding() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  useEffect(() => {
    // Redirect to home if not signed in
    if (!isSignedIn && !pathname.includes("sign-")) {
      router.push("/");
    }
  }, [isSignedIn, pathname, router]);

  const currentIndex = steps.findIndex((s) => pathname.includes(s));
  const currentStep = currentIndex >= 0 ? currentIndex + 1 : 1;
  const totalSteps = steps.length - 1; // This will now correctly be 4

  const goNext = () => {
    const next = steps[currentIndex + 1];
    if (next) {
      router.push(`/${next}`);
    }
  };

  const goBack = () => {
    const prev = steps[currentIndex - 1];
    if (prev) {
      router.push(`/${prev}`);
    }
  };

  return { currentStep, totalSteps, goNext, goBack };
}