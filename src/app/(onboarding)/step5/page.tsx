// src/app/(onboarding)/step5/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import OnboardingLayout from "@/src/components/onboarding/OnboardingLayout";
import StepHeader from "@/src/components/onboarding/StepHeader";
import FileUpload from "@/src/components/forms/FileUpload";
import { Button } from "@/src/components/ui/Button";
import { useOnboarding } from "@/src/hooks/useOnboarding";

// -------------------------------------------------
// Zod schema – same validation as step3 (any image or PDF)
// -------------------------------------------------
const schema = z.object({
  id: z
    .string()
    .min(1, "Please upload your ID")
    .refine(
      (val) => /^data:(application\/pdf|image\/(jpeg|png));base64,/.test(val),
      "Only PDF, JPG or PNG files are allowed"
    ),
});

export const dynamic = "force-dynamic"; // ← disables static prerender

export default function Step5() {
  const { goNext } = useOnboarding();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { id: undefined },
  });

  const file = watch("id");

  const onSubmit = () => {
    if (file) goNext();
  };

  return (
    <OnboardingLayout currentStep={5}>
      <StepHeader
        title="Upload Your ID"
        subtitle="NIN, Driver’s License, or International Passport"
      />

      <FileUpload
        name="id"
        control={control}
        setValue={setValue}
        label="Take photo or upload"
        accept="image/*,.pdf"
      />

      {errors.id && (
        <p className="text-sm text-red-600 text-center">{errors.id.message}</p>
      )}

      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={!file}
        size="lg"
        className="w-full"
      >
        Continue
      </Button>
    </OnboardingLayout>
  );
}
