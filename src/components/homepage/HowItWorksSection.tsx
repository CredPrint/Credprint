// ==========================================
// FILE: src/components/homepage/HowItWorksSection.tsx (FIXED)
// ==========================================
"use client";

import { FileText, Upload, CreditCard, CheckCircle } from "lucide-react";
import AnimatedContent from "@/src/components/Animations/AnimatedContent";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Sign Up",
    description:
      "Create your account in seconds with just your email or phone number.",
  },
  {
    icon: Upload,
    number: "02",
    title: "Upload History",
    description:
      "Upload your transaction history (PDF, CSV, or TXT) from your bank or wallet app.",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Select Provider",
    description:
      "Select your wallet provider (like Opay or PalmPay) and verify your phone.",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Get Your Score",
    description:
      "Receive your credit score and start accessing financial opportunities.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-white to-green-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.8}
          initialOpacity={0}
          animateOpacity
          threshold={0.2}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get Your Score in 4 Easy Steps
            </h2>
            <p className="text-xl text-gray-600">
              No BVN or traditional credit history required. Just your
              transaction data.
            </p>
          </div>
        </AnimatedContent>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedContent
                  key={step.number}
                  distance={80}
                  direction="vertical"
                  duration={0.7}
                  delay={0.2 + index * 0.15}
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.1}
                >
                  <div className="relative">
                    {/* Step Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                      {/* Step Number */}
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                        <span className="text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-center">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimatedContent>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
