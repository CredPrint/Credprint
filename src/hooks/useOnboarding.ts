import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

// src/hooks/useOnboarding.ts
const steps = [
  "step1",
  // "step2", // Removed
  "step3", // Now "Upload Data"
  "step4", // "Select Provider"
  // "step5", // Removed
  "step6", // "Verify Phone"
  "step7", // "Enter OTP"
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
