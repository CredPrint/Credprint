// components/onboarding/OnboardingLayout.tsx
import ProgressBar from "./ProgressBar";
import { ReactNode } from "react";

// Keep the same canonical onboarding step order used by the hook
const steps = [
  "step1",
  "step3",
  "step4",
  "step6",
  "step7",
  "step8",
  "success",
];

export default function OnboardingLayout({
  children,
  // pages sometimes pass the original step number (e.g. 3 => "step3").
  // Accept number or string and map it to the compact 6-step sequence.
  currentStep,
  totalSteps = steps.length - 1, // 6
}: {
  children: ReactNode;
  currentStep: number | string;
  totalSteps?: number;
}) {
  // Resolve currentStep into the compact sequence index (1-based)
  let resolvedCurrent = 1;

  if (typeof currentStep === "string") {
    const idx = steps.indexOf(currentStep);
    resolvedCurrent = idx >= 0 ? idx + 1 : 1;
  } else {
    // number passed is treated as the original route number (e.g. 3 => "step3")
    const routeName = `step${currentStep}`;
    const idx = steps.indexOf(routeName);
    resolvedCurrent = idx >= 0 ? idx + 1 : currentStep;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <ProgressBar current={resolvedCurrent} total={totalSteps} />
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}
