// components/forms/PhoneInput.tsx
import { Controller } from "react-hook-form";
import { Input } from "../ui/Input";

export default function PhoneInput({ control, name = "phone" }: any) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          label="Enter your phone number"
          placeholder="+234 800 000 0000"
          type="tel"
          error={error?.message}
        />
      )}
    />
  );
}
