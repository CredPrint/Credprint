// src/app/(onboarding)/step3/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout";
import FileUpload from "@/src/components/forms/FileUpload";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";

// -------------------------------------------------
// 1. Zod schema – validates the base64 string
// -------------------------------------------------
const schema = z.object({
  statement: z
    .string()
    .min(1, "Please upload your bank statement")
    .refine(
      (val) => /^data:(application\/pdf|image\/(jpeg|png));base64,/.test(val),
      "Only PDF, JPG or PNG files are allowed"
    ),
});

// -------------------------------------------------
// 2. Page component
// -------------------------------------------------
export const dynamic = "force-dynamic"; // ← disables static prerender

export default function Step3() {
  const { goNext } = useOnboarding();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { statement: undefined },
  });

  const file = watch("statement");

  const onSubmit = () => {
    if (file) goNext();
  };

  return (
    <OnboardingLayout currentStep={3}>
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Upload your bank statement
        </h1>
        <p className="text-gray-600">
          We’ll analyze your transactions to build your credit profile.
        </p>
      </div>

      {/* FileUpload uses proper MIME types internally */}
      <FileUpload
        name="statement"
        control={control}
        setValue={setValue}
        label="Upload PDF or Image"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      {/* Show Zod error if any */}
      {errors.statement && (
        <p className="text-sm text-red-600 text-center">
          {errors.statement.message}
        </p>
      )}

      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={!file}
        className="w-full"
        size="lg"
      >
        Continue
      </Button>
    </OnboardingLayout>
  );
}
