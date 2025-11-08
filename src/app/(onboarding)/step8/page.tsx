// src/app/(onboarding)/step8/page.tsx
"use client";

import { useState } from "react";
import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout";
import ProgressCircle from "@/src/components/ui/ProgressCircle";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { Check } from "lucide-react";

export const dynamic = "force-dynamic";

export default function Step8() {
  const { goNext } = useOnboarding();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      goNext();
    }, 2000);
  };

  const verificationItems = [
  "Transaction Data Uploaded",
  "Wallet Provider Selected",
  "Phone Confirmed",
];

  return (
    <OnboardingLayout currentStep={8}>
      <div className="flex flex-col items-center space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">
            Review Your Information
          </h1>
          <p className="text-gray-600 text-base">
            We're securely connecting your accounts
          </p>
        </div>

        {/* Progress Circle */}
        <div className="my-8">
          <ProgressCircle progress={isConnecting ? 90 : 75} />
        </div>

        {/* Verification Checklist */}
        <div className="w-full space-y-3 bg-gray-50 rounded-xl p-4">
          {verificationItems.map((item) => (
            <div key={item} className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-700">{item}</span>
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>

        {/* Connect Button */}
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          size="lg"
          className="w-full"
        >
          {isConnecting ? "Connecting..." : "Connect & Finish"}
        </Button>
      </div>
    </OnboardingLayout>
  );
}
