// components/onboarding/OnboardingLayout.tsx
import ProgressBar from "./ProgressBar";
import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
  currentStep,
  totalSteps = 8,
}: {
  children: ReactNode;
  currentStep: number;
  totalSteps?: number;
}) {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <ProgressBar current={currentStep} total={totalSteps} />
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}
