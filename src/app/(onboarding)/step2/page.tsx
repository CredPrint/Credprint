"use client";

import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout";
import StepHeader from "@/src/components/onboarding/StepHeader";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";
export default function Step2() {
  const { goNext } = useOnboarding();

  return (
    <OnboardingLayout currentStep={2}>
      <StepHeader
        title="Get verified in 3 minutes"
        subtitle="No paperwork, no branch visit"
      />
      <div className="space-y-4">
        {["Bank Statement", "ID Verification", "Phone OTP"].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
          >
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
              {i + 1}
            </div>
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
      <Button onClick={goNext} size="lg">
        Continue
      </Button>
    </OnboardingLayout>
  );
}
