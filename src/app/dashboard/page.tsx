// ==========================================
// FILE: src/app/dashboard/page.tsx (FIXED)
// ==========================================
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  // Get isLoaded to know when user object is ready
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Wait for Clerk to be loaded before checking sign-in state
    if (isLoaded && !isSignedIn) {
      router.push("/");
      return;
    }

    if (isLoaded && isSignedIn) {
      const hasCompletedOnboarding = user?.publicMetadata?.onboardingCompleted;
      if (!hasCompletedOnboarding) {
        router.push("/step1");
      }
    }
  }, [isLoaded, isSignedIn, user, router]); // Add isLoaded

  // --- ADD THIS LOADING CHECK ---
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }
  // --- END OF FIX ---

  if (!user?.publicMetadata?.onboardingCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting to onboarding...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome,{" "}
              {/* --- FIX: Safely access the email --- */}
              {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Credit Score Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Credit Score
            </h3>
            <p className="text-4xl font-bold text-green-600">750</p>
            <p className="text-sm text-gray-600 mt-2">Excellent</p>
          </div>

          {/* Available Loans Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Available Loans
            </h3>
            <p className="text-4xl font-bold text-primary">₦200K</p>
            <p className="text-sm text-gray-600 mt-2">Based on your profile</p>
          </div>

          {/* Profile Completion Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Profile Status
            </h3>
            <p className="text-4xl font-bold text-green-600">100%</p>
            <p className="text-sm text-gray-600 mt-2">Fully verified</p>
          </div>
        </div>
      </main>
    </div>
  );
}