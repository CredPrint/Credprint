"use client";

import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout";
import StepHeader from "@/src/components/onboarding/StepHeader";
import PhoneInput from "@/src/components/forms/PhoneInput";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  phone: z.string().regex(/^\+234\d{10}$/, "Enter valid Nigerian number"),
});

export default function Step6() {
  const { goNext } = useOnboarding();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <OnboardingLayout currentStep={6}>
      <StepHeader
        title="Verify Your Phone Number"
        subtitle="We’ll send a 6-digit code"
      />
      <PhoneInput control={control} />
      <Button onClick={handleSubmit(goNext)} size="lg">
        Send Code
      </Button>
    </OnboardingLayout>
  );
}
