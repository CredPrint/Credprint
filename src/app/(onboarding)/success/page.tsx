// src/app/(onboarding)/success/page.tsx
"use client"; // ← Add this (optional, but safe)

import ProgressCircle from "@/src/components/ui/ProgressCircle";
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        {/* ← FIXED: use `progress` not `current` */}
        <ProgressCircle progress={100} />

        <CheckCircle className="w-20 h-20 text-success mx-auto" />
        <h1 className="text-3xl font-bold">Your credit profile is ready!</h1>
        <p className="text-gray-600">
          You can now access loans, track your score, and improve your credit.
        </p>
        <button className="bg-primary text-white w-full py-4 rounded-xl font-semibold">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
