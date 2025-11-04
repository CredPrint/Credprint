// components/ui/Card.tsx
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/src/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-white rounded-2xl shadow-sm p-6", className)}
      {...props}
    />
  )
);

Card.displayName = "Card";
export { Card };
