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
    const fileDataUrl = getValues("statement");
    if (!fileDataUrl) return;

    try {
      setIsUploading(true);

      // 1. Convert Data URL to Blob
      const res1 = await fetch(fileDataUrl);
      const blob = await res1.blob();
      
      // 2. Prepare FormData
      const formData = new FormData();
      formData.append("file", blob, "statement");
      formData.append("source", "generic_upload");
      
      // 3. Send to API - NO manual Content-Type header!
      const res = await fetch("/api/onboarding/upload-data", {
        method: "POST",
        body: formData, 
      });

      if (!res.ok) {
        let errorMessage = `Upload failed with status: ${res.status}`;
        try {
            const data = await res.json();
            if (data.error) errorMessage = data.error;
        } catch (e) {}
        throw new Error(errorMessage);
      }
      
      goNext();
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(`Failed to upload: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <OnboardingLayout currentStep={3}>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-xs mb-4">
          <Image src="/images/Onstep3.png" alt="Upload" width={300} height={300} className="w-full h-auto" priority />
        </div>
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-gray-900 px-4">Upload Transaction History</h1>
          <p className="text-gray-600 text-base px-6">Export data from your wallet app or SMS inbox.</p>
        </div>
        <FileUpload name="statement" control={control} setValue={setValue} label="Upload PDF, CSV, or TXT" accept=".pdf,.csv,.txt" />
        {errors.statement && <p className="text-sm text-red-600">{errors.statement.message}</p>}
        <Button onClick={handleSubmit(onSubmit)} disabled={!file || isUploading} className="w-full" size="lg">
          {isUploading ? "Uploading..." : "Continue"}
        </Button>
      </div>
    </OnboardingLayout>
  );
}