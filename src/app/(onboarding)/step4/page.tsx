// src/app/(onboarding)/step4/page.tsx
"use client";

import { useForm } from "react-hook-form";
import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout";
import StepHeader from "@/src/components/onboarding/StepHeader";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { cn } from "@/src/lib/utils";

// -------------------------------------------------
// ADD THIS LINE
// -------------------------------------------------
export const dynamic = "force-dynamic"; // ← THIS FIXES THE CRASH

export default function Step4() {
  const { goNext } = useOnboarding();
  const { register, watch, handleSubmit } = useForm();
  const selected = watch("provider");

  const providers = ["Opay", "PalmPay", "Kuda", "Moniepoint"];

  const onSubmit = () => {
    if (selected) goNext();
  };

  return (
    <OnboardingLayout currentStep={4}>
      <StepHeader
        title="Select Your Wallet Provider"
        subtitle="We’ll fetch your transaction data securely"
      />
      <div className="space-y-3">
        {providers.map((p) => (
          <label
            key={p}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition",
              selected === p
                ? "border-primary bg-primary-light"
                : "border-gray-200"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg" />
              <span className="font-medium">{p}</span>
            </div>
            <input
              type="radio"
              value={p}
              {...register("provider")}
              className="w-5 h-5 text-primary"
            />
          </label>
        ))}
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={!selected}
        size="lg"
        className="w-full mt-6"
      >
        Continue
      </Button>
    </OnboardingLayout>
  );
}
