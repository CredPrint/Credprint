// ==========================================
// FILE: src/app/(onboarding)/step6/page.tsx (FIXED)
// ==========================================
"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import OTPInput from "@/src/components/forms/OTPInput";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";

export default function Step6() {
  const { goNext } = useOnboarding();
  const { user, isLoaded } = useUser();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // FIX: Use optional chaining on the array access `?.[0]`
  const email = user?.emailAddresses?.[0];

  const handleSendCode = async () => {
    if (!email) {
      setError("Error: No email address found.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // @ts-expect-error - This method exists on the email object at runtime.
      await email.prepareEmailAddressVerification({ strategy: "email_code" });
      
      setCodeSent(true);
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || "Failed to send code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    if (!email || !user) {
      setError("Error: User session lost. Please reload.");
      return;
    }

    setIsVerifying(true);
    setError(null);
    try {
      // @ts-expect-error - This method also exists on the email object at runtime.
      await email.attemptEmailAddressVerification({ code });
      
      await user.reload(); 
      
      alert("Email verified successfully!");
      goNext();
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || "Invalid code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="text-center p-4">
        <p>Loading user...</p>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="text-center p-4 space-y-3">
         <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600">No email address was found for your account.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-bold text-gray-900">
          Verify Your Email
        </h1>
        <p className="text-gray-600 text-base">
          We'll send a 6-digit code to:
        </p>
        <p className="font-semibold text-gray-900">{email.emailAddress}</p>
      </div>

      {/* Conditional UI */}
      <div className="flex flex-col items-center space-y-6">
        {!codeSent ? (
          <Button
            onClick={handleSendCode}
            disabled={isLoading}
            size="lg"
            className="w-full"
          >
            {isLoading ? "Sending..." : "Send Verification Code"}
          </Button>
        ) : (
          <>
            <OTPInput onComplete={handleVerify} />
            <Button
              onClick={handleSendCode}
              disabled={isLoading}
              variant="ghost"
              className="text-sm"
            >
              {isLoading ? "Resending..." : "Didn't receive code? Resend"}
            </Button>
          </>
        )}

        {isVerifying && (
          <p className="text-sm text-gray-600">Verifying...</p>
        )}
        
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}