// app/(onboarding)/layout.tsx
"use client";

import ProgressBar from "@/src/components/onboarding/ProgressBar";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { currentStep, totalSteps } = useOnboarding();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <ProgressBar current={currentStep} total={totalSteps} />
        {children}
      </div>
    </div>
  );
}
