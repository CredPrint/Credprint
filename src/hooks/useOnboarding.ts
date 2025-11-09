import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

/// ... (imports)

// src/hooks/useOnboarding.ts
const steps = [
  "step1",
  "step3", // "Upload Data"
  "step4", // "Select Provider"
  "step6", // "Verify Email" (This now replaces old step6 AND step7)
  "step8", // "Review & Finish"
  "success",
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
  const totalSteps = steps.length - 1;

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
