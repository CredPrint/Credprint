// components/onboarding/StepHeader.tsx
export default function StepHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
}
