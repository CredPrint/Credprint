// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names conditionally and merges Tailwind classes intelligently.
 * Prevents duplicate/conflicting Tailwind utilities.
 *
 * @example
 * cn("p-4", condition && "bg-red-500", "hover:bg-blue-600")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
