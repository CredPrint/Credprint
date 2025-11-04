// hooks/useOnboarding.ts
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const steps = [
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
  "step6",
  "step7",
  "step8",
  "success",
];

export function useOnboarding() {
  const router = useRouter();
  const pathname = usePathname();

  const currentIndex = steps.findIndex((s) => pathname.includes(s));
  const currentStep = currentIndex >= 0 ? currentIndex + 1 : 1;
  const totalSteps = steps.length - 1;

  const goNext = () => {
    const next = steps[currentIndex + 1];
    if (next) {
      localStorage.setItem("onboardingStep", next);
      // Remove (onboarding) from URL - route groups are not part of URLs
      router.push(`/${next}`);
    }
  };

  const goBack = () => {
    const prev = steps[currentIndex - 1];
    if (prev) {
      localStorage.setItem("onboardingStep", prev);
      router.push(`/${prev}`);
    }
  };

  useEffect(() => {
    localStorage.setItem("onboardingStep", steps[currentIndex]);
  }, [currentIndex]);

  return { currentStep, totalSteps, goNext, goBack };
}
