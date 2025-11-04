// src/components/forms/OTPInput.tsx
"use client";

import { useRef, useState } from "react";

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export default function OTPInput({ length = 6, onComplete }: OTPInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Trigger complete when all filled
    if (newCode.every((d) => d)) {
      onComplete(newCode.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, length);
    if (/^\d+$/.test(pasted)) {
      const newCode = pasted
        .split("")
        .concat(Array(length - pasted.length).fill(""));
      setCode(newCode);
      onComplete(newCode.join(""));
      inputs.current[Math.min(pasted.length - 1, length - 1)]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {code.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el; // ← No return! Just assign
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:border-primary focus:outline-none transition text-gray-900"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
