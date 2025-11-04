// src/app/(onboarding)/success/page.tsx
"use client";

import ProgressCircle from "@/src/components/ui/ProgressCircle";
import { CheckCircle } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export default function Success() {
  const handleDashboard = () => {
    // Navigate to dashboard
    console.log("Going to dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="text-center space-y-8 max-w-md">
        {/* Progress Circle */}
        <div className="flex justify-center">
          <ProgressCircle progress={100} />
        </div>

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-600" strokeWidth={2} />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Your credit profile is ready!
          </h1>
          <p className="text-gray-600 text-base px-4">
            You can now access loans, track your score, and improve your credit.
          </p>
        </div>

        {/* CTA Button */}
        <Button onClick={handleDashboard} size="lg" className="w-full">
          Go to Dashboard
        </Button>

        {/* Additional Info */}
        <p className="text-sm text-gray-500">
          We've sent a confirmation email to your registered address
        </p>
      </div>
    </div>
  );
}
