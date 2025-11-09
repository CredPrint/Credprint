// ==========================================
// FILE: src/lib/validation.ts (FIXED)
// ==========================================
import { z } from "zod";

/**
 * File upload schema (base64 string)
 */
export const fileSchema = z
  .string()
  .min(1, "Please upload a file")
  .refine((val) => val.startsWith("data:"), {
    message: "Invalid file format",
  });

/**
 * Wallet provider selection
 */
export const walletProviderSchema = z
  .enum(["Opay", "PalmPay", "Kuda", "Moniepoint"] as const)
  .refine((val) => val !== undefined && val !== null, {
    message: "Please select a wallet provider",
  });

/**
 * OTP Code (6 digits) - Kept for general use
 */
export const otpSchema = z
  .string()
  .length(6, { message: "Code must be 6 digits" })
  .regex(/^\d+$/, { message: "Only numbers allowed" });

/**
 * Step-specific schemas
 */
export const stepSchemas = {
  // Step 1: Just start → no validation
  step1: z.object({}),

  // Step 3: Upload Bank Statement
  step3: z.object({
    statement: fileSchema.refine(
      (val) => {
        const typePart = val.split(";")[0]; // e.g., "data:application/pdf"
        // Allow common document and image types
        return /data:(application\/(pdf)|text\/(csv|plain)|image\/(jpe?g|png))/i.test(
          typePart
        );
      },
      { message: "Only PDF, CSV, TXT, JPG, or PNG allowed" }
    ),
  }),

  // Step 4: Select Wallet Provider
  step4: z.object({
    provider: walletProviderSchema,
  }),

  // Step 8: Review → no input, just confirm
  step8: z.object({}),
};

/**
 * Full onboarding schema (combine all steps)
 * Useful for final submission or backend
 */
export const fullOnboardingSchema = z.object({
  statement: stepSchemas.step3.shape.statement,
  provider: stepSchemas.step4.shape.provider,
});

/**
 * Type inference helpers
 */
export type OnboardingFormData = z.infer<typeof fullOnboardingSchema>;
export type Step3Data = z.infer<typeof stepSchemas.step3>;
export type Step4Data = z.infer<typeof stepSchemas.step4>;

/**
 * Get schema for current step
 */
// Map compact onboarding step index (1..6) to the actual step schema
// This now matches the flow in `useOnboarding.ts`
export const getStepSchema = (step: number) => {
  switch (step) {
    case 1: // path: /step1
      return stepSchemas.step1;
    case 2: // path: /step3
      return stepSchemas.step3;
    case 3: // path: /step4
      return stepSchemas.step4;
    case 4: // path: /step6 (Email verify, no zod schema used)
      return z.object({});
    case 5: // path: /step8
      return stepSchemas.step8;
    case 6: // path: /success
      return z.object({});
    default:
      return z.object({});
  }
};