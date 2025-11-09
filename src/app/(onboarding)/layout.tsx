// ==========================================
// FILE: src/app/(onboarding)/layout.tsx (FIXED)
// ==========================================
"use client";

import ProgressBar from "@/src/components/onboarding/ProgressBar";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  // This hook is now the single source of truth for step logic
  const { currentStep, totalSteps } = useOnboarding();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* 1. The Progress Bar */}
        <ProgressBar current={currentStep} total={totalSteps} />
        
        {/* 2. The White Card Wrapper */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}