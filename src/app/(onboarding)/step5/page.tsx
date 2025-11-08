"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Step 5 was removed from the compact onboarding flow. Keep the route but
// immediately redirect clients to the next live step (step6).
export default function Step5() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/step6");
  }, [router]);
  return null;
}
