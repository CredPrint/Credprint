// ==========================================
// FILE: src/app/(onboarding)/success/page.tsx
// ==========================================
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ProgressCircle from "@/src/components/ui/ProgressCircle";
import { CheckCircle } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { useEffect } from "react";

export default function Success() {
  const { user, isLoaded } = useUser(); // Get isLoaded
  const router = useRouter();

  useEffect(() => {
    const updateMetadata = async () => {
      try {
        await user?.update({
          unsafeMetadata: {
            onboardingCompleted: true,
          },
        });
      } catch (err) {
        console.error("Failed to update user metadata:", err);
      }
    };

    // Only run when user is loaded
    if (isLoaded && user) updateMetadata();
  }, [isLoaded, user]); // Add isLoaded

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  // This check prevents the error
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
        <p>Loading success page...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <ProgressCircle progress={100} />
        </div>
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-600" strokeWidth={2} />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Your credit profile is ready!
          </h1>
          <p className="text-gray-600 text-base px-4">
            You can now access loans, track your score, and improve your credit.
          </p>
        </div>
        <Button onClick={handleDashboard} size="lg" className="w-full">
          Go to Dashboard
        </Button>
        <p className="text-sm text-gray-500">
          We've sent a confirmation email to{" "}
          {/* Safe access to prevent error */}
          {user?.emailAddresses[0]?.emailAddress ?? "your email"}
        </p>
      </div>
    </div>
  );
}
