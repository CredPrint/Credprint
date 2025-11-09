// ==========================================
// FILE: src/app/(onboarding)/step8/page.tsx (NEW/FIXED)
// ==========================================
"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function Step8() {
  const { goNext } = useOnboarding();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateScore = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // This API call generates the score and badge
      const res = await fetch("/api/onboarding/generate-score", {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate score");
      }
      
      // On success, goNext() will push to the "/success" page
      goNext(); 

    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* You can change this image later, re-using step 1 image for now */}
      <div className="w-full max-w-xs mb-4">
        <Image
          src="/images/OnStep1.png" 
          alt="Review and Finish"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-gray-900 px-4">
          You're all set!
        </h1>
        <p className="text-gray-600 text-base px-6">
          Hi {user?.firstName || 'friend'}, we have everything we need to build your credit profile.
        </p>
      </div>

      <div className="w-full pt-4 space-y-3">
        <Button 
          onClick={handleGenerateScore} 
          disabled={isLoading} 
          size="lg" 
          className="w-full"
        >
          {isLoading ? "Generating Your Score..." : "Finish & View Profile"}
        </Button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}