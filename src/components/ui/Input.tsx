// components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/src/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary transition",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-primary",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
