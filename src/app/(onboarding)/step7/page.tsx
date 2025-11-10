"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Step 7 was removed from the compact onboarding flow. Keep the route but
// immediately redirect clients to the next live step (step8).
export default function Step7() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/step8");
  }, [router]);
  return null;
}
