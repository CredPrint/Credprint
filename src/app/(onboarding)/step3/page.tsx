"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useState } from "react";

import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout";
import FileUpload from "@/src/components/forms/FileUpload";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";

const schema = z.object({
  statement: z
    .string()
    .min(1, "Please upload your transaction history")
    .refine(
      (val) => /^data:(application\/pdf|text\/(csv|plain)|image\/(jpeg|png));base64,/.test(val),
      "Only PDF, CSV, TXT, JPG or PNG files are allowed"
    ),
});

export const dynamic = "force-dynamic";

export default function Step3() {
  const { goNext } = useOnboarding();
  const [isUploading, setIsUploading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { statement: undefined },
  });

  const file = watch("statement");

  const onSubmit = async () => {
    const fileContent = getValues("statement");
    if (!fileContent) return;

    try {
      setIsUploading(true);
      
      // Call the backend API
      const res = await fetch("/api/onboarding/upload-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileContent,
          source: "generic_upload",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Upload failed");
      }
      
      goNext();
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(`Failed to upload data: ${error.message}. Please try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <OnboardingLayout currentStep={3}>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-xs mb-4">
          <Image
            src="/images/Onstep3.png"
            alt="Upload your transaction history"
            width={300}
            height={300}
            className="w-full h-auto"
          />
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-gray-900 px-4">
            Upload Your Transaction History
          </h1>
          <p className="text-gray-600 text-base px-6">
            Export your data from Opay, PalmPay (as .csv/.pdf) or your SMS inbox (as .txt).
          </p>
        </div>

        <FileUpload
          name="statement"
          control={control}
          setValue={setValue}
          label="Upload .pdf, .csv, or .txt"
          accept=".pdf,.csv,.txt,.jpg,.jpeg,.png"
        />

        {errors.statement && (
          <p className="text-sm text-red-600 text-center">
            {errors.statement.message}
          </p>
        )}

        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={!file || isUploading}
          className="w-full"
          size="lg"
        >
          {isUploading ? "Uploading..." : "Continue"}
        </Button>
      </div>
    </OnboardingLayout>
  );
}