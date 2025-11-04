"use client";

import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout";
import StepHeader from "@/src/components/onboarding/StepHeader";
import OTPInput from "@/src/components/forms/OTPInput";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";

export default function Step7() {
  const { goNext } = useOnboarding();

  const handleComplete = (code: string) => {
    console.log("OTP:", code);
    setTimeout(goNext, 1000);
  };

  return (
    <OnboardingLayout currentStep={7}>
      <StepHeader title="Enter Verification Code" subtitle="Check your SMS" />
      <OTPInput onComplete={handleComplete} />
      <Button variant="ghost" className="mt-4">
        Resend Code
      </Button>
    </OnboardingLayout>
  );
}
