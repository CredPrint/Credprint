// src/components/ui/ProgressCircle.tsx
"use client";

import { useEffect, useState } from "react";

export default function ProgressCircle({ progress }: { progress: number }) {
  const [offset, setOffset] = useState(0);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const newOffset = circumference - (progress / 100) * circumference;
    setOffset(newOffset);
  }, [progress, circumference]);

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#1A5F3A"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-primary">{progress}%</span>
      </div>
    </div>
  );
}
