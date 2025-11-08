// components/ui/ProgressBar.tsx
export default function ProgressBar({
  current,
  total = 6,
}: {
  current: number;
  total?: number;
}) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>
          Step {current} of {total}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
