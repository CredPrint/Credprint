// ==========================================
// FILE: src/app/(onboarding)/step4/page.tsx (FIXED)
// ==========================================
"use client";

import { useForm } from "react-hook-form";
// import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout"; // <-- REMOVED
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { cn } from "@/src/lib/utils";

export const dynamic = "force-dynamic";

export default function Step4() {
  const { goNext } = useOnboarding();
  const { register, watch, handleSubmit } = useForm();
  const selected = watch("provider");

  const providers = ["Opay", "PalmPay", "Kuda", "Moniepoint"];

  const onSubmit = () => {
    if (selected) goNext();
  };

  return (
    // <OnboardingLayout currentStep={4}> {/* <-- REMOVED WRAPPER */}
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">
            Select Your Wallet Provider
          </h1>
          <p className="text-gray-600 text-base">
            We'll fetch your transaction data securely
          </p>
        </div>

        {/* Wallet Options */}
        <div className="space-y-3">
          {providers.map((p) => (
            <label
              key={p}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all",
                selected === p
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💳</span>
                </div>
                <span className="font-semibold text-gray-900">{p}</span>
              </div>
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  selected === p
                    ? "border-green-600 bg-green-600"
                    : "border-gray-300"
                )}
              >
                {selected === p && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <input
                type="radio"
                value={p}
                {...register("provider")}
                className="sr-only"
              />
            </label>
          ))}
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={!selected}
          size="lg"
          className="w-full"
        >
          Continue
        </Button>
      </div>
    // </OnboardingLayout> {/* <-- REMOVED WRAPPER */}
  );
}