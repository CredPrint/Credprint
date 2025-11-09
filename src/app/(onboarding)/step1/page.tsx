// ==========================================
// FILE: src/app/(onboarding)/step1/page.tsx (CLEANED UP)
// ==========================================
"use client";

// import StepHeader from "@/src/components/onboarding/StepHeader"; // <-- REMOVED UNUSED IMPORT
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import Image from "next/image";

export default function Step1() {
  const { goNext } = useOnboarding();

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Illustration */}
      <div className="w-full max-w-xs mb-4">
        <Image
          src="/images/OnStep1.png"
          alt="Build your digital credit identity"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </div>

      {/* Title and Subtitle */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-gray-900 px-4">
          Build your digital credit identity
        </h1>
        <p className="text-gray-600 text-base px-6">
          Answer a few questions to get started
        </p>
      </div>

      {/* CTA Button */}
      <div className="w-full pt-4">
        <Button onClick={goNext} size="lg" className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
}