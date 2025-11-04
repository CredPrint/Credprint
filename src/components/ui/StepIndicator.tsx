// components/ui/StepIndicator.tsx
export default function StepIndicator({
  current,
  total = 8,
}: {
  current: number;
  total?: number;
}) {
  function cn(arg0: string, arg1: string): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            i < current ? "bg-primary w-8" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
}
