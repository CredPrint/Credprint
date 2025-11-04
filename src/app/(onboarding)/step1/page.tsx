"use client";

import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout";
import StepHeader from "@/src/components/onboarding/StepHeader";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";

const OnboardingLayoutAny = OnboardingLayout as React.ComponentType<{
  children?: React.ReactNode;
  currentStep: number;
}>;

export default function Step1() {
  const { goNext } = useOnboarding();

  return (
    <OnboardingLayoutAny currentStep={1}>
      <StepHeader
        title="Build your digital credit blueprint"
        subtitle="Answer a few questions to get started"
      />
      <div className="bg-primary-light rounded-2xl p-6 text-center">
        <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl text-white">ID</span>
        </div>
        <p className="text-sm text-gray-700">
          We’ll create a secure credit profile in under 5 minutes
        </p>
      </div>
      <Button onClick={goNext} size="lg">
        Next
      </Button>
    </OnboardingLayoutAny>
  );
}
