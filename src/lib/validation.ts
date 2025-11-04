// lib/validation.ts
import { z } from "zod";

/**
 * Reusable phone number schema (Nigeria format)
 */
export const phoneSchema = z
  .string()
  .regex(/^\+234\d{10}$/, {
    message: "Phone number must be in +234 format (e.g., +2348012345678)",
  })
  .min(14, "Invalid phone number");

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
 * Wallet provider selection — CORRECT ENUM USAGE
 */
export const walletProviderSchema = z
  .enum(["Opay", "PalmPay", "Kuda", "Moniepoint"] as const)
  .refine((val) => val !== undefined && val !== null, {
    message: "Please select a wallet provider",
  });

/**
 * OTP Code (6 digits)
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

  // Step 2: Info → no form
  step2: z.object({}),

  // Step 3: Upload Bank Statement
  step3: z.object({
    statement: fileSchema.refine(
      (val) => {
        const typePart = val.split(";")[0]; // e.g., "data:application/pdf"
        return /\.(pdf|jpe?g|png)$/i.test(typePart);
      },
      { message: "Only PDF, JPG, or PNG allowed" }
    ),
  }),

  // Step 4: Select Wallet Provider
  step4: z.object({
    provider: walletProviderSchema,
  }),

  // Step 5: Upload ID
  step5: z.object({
    id: fileSchema.refine(
      (val) => {
        const typePart = val.split(";")[0];
        return /\.(pdf|jpe?g|png)$/i.test(typePart);
      },
      { message: "Only PDF, JPG, or PNG allowed" }
    ),
  }),

  // Step 6: Enter Phone Number
  step6: z.object({
    phone: phoneSchema,
  }),

  // Step 7: Enter OTP
  step7: z.object({
    otp: otpSchema,
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
  id: stepSchemas.step5.shape.id,
  phone: stepSchemas.step6.shape.phone,
  otp: stepSchemas.step7.shape.otp,
});

/**
 * Type inference helpers
 */
export type OnboardingFormData = z.infer<typeof fullOnboardingSchema>;
export type Step3Data = z.infer<typeof stepSchemas.step3>;
export type Step4Data = z.infer<typeof stepSchemas.step4>;
export type Step5Data = z.infer<typeof stepSchemas.step5>;
export type Step6Data = z.infer<typeof stepSchemas.step6>;
export type Step7Data = z.infer<typeof stepSchemas.step7>;

/**
 * Get schema for current step
 */
export const getStepSchema = (step: number) => {
  switch (step) {
    case 1:
      return stepSchemas.step1;
    case 2:
      return stepSchemas.step2;
    case 3:
      return stepSchemas.step3;
    case 4:
      return stepSchemas.step4;
    case 5:
      return stepSchemas.step5;
    case 6:
      return stepSchemas.step6;
    case 7:
      return stepSchemas.step7;
    case 8:
      return stepSchemas.step8;
    default:
      return z.object({});
  }
};
