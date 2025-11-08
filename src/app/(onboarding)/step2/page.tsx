"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Keep the route for compatibility but redirect to the next live step (step3)
export default function Step2() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/step3");
  }, [router]);
  return null;
}
