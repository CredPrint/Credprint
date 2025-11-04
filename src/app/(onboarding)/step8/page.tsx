// src/app/(onboarding)/step8/page.tsx
"use client";

import { useState } from "react";
import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout";
import ProgressCircle from "@/src/components/ui/ProgressCircle";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { Check } from "lucide-react";

export const dynamic = "force-dynamic"; // ← CRITICAL

export default function Step8() {
  const { goNext } = useOnboarding();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      goNext(); // Simulate API call
    }, 2000);
  };

  return (
    <OnboardingLayout currentStep={8}>
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Review & Connect Your Data
        </h1>
        <p className="text-gray-600">We’re securely connecting your accounts</p>

        <ProgressCircle progress={isConnecting ? 90 : 75} />

        <div className="space-y-3 text-left bg-gray-50 rounded-xl p-4">
          {["Bank Statement", "ID Verified", "Phone Confirmed"].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-sm">{item}</span>
              <Check className="w-5 h-5 text-success" />
            </div>
          ))}
        </div>

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
