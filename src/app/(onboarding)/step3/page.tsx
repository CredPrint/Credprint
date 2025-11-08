// src/app/(onboarding)/step3/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

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
    .min(1, "Please upload your transaction history")
    .refine(
      // Updated regex to include text/csv/plain for .txt and .csv files
      (val) => /^data:(application\/pdf|text\/(csv|plain)|image\/(jpeg|png));base64,/.test(val),
      "Only PDF, CSV, TXT, JPG or PNG files are allowed"
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
      <div className="flex flex-col items-center space-y-6">
        {/* Illustration */}
        <div className="w-full max-w-xs mb-4">
          <Image
            src="/images/Onstep3.png"
            alt="Upload your transaction history"
            width={300}
            height={300}
            className="w-full h-auto"
          />
        </div>

        {/* Title and Subtitle - UPDATED for PRD Alignment */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-gray-900 px-4">
            Upload Your Transaction History
          </h1>
          <p className="text-gray-600 text-base px-6">
            Export your data from Opay, PalmPay (as .csv/.pdf) or your SMS inbox (as .txt).
          </p>
        </div>

        {/* FileUpload uses proper MIME types internally */}
        <FileUpload
          name="statement"
          control={control}
          setValue={setValue}
          label="Upload .pdf, .csv, or .txt"
          accept=".pdf,.csv,.txt,.jpg,.jpeg,.png"
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
      </div>
    </OnboardingLayout>
  );
}