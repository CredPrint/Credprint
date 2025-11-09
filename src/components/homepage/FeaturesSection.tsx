// ==========================================
// src/components/homepage/FeaturesSection.tsx
// ==========================================
"use client";

import { Shield, Zap, TrendingUp, Lock, Clock, Award } from "lucide-react";
import AnimatedContent from "@/src/components/Animations/AnimatedContent";

const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your data is encrypted and protected with industry-leading security standards.",
  },
  {
    icon: Zap,
    title: "Instant Verification",
    description:
      "Get verified in 3 minutes using your BVN, ID, and bank statement.",
  },
  {
    icon: TrendingUp,
    title: "Credit Score Tracking",
    description:
      "Monitor your credit score in real-time and get personalized improvement tips.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "We never share your data without permission. You're always in control.",
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description: "Check your credit profile anytime, anywhere from any device.",
  },
  {
    icon: Award,
    title: "Trusted Platform",
    description:
      "Licensed and regulated by the CBN. Trusted by thousands of Nigerians.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
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
              Why Choose CredPrint?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to build and manage your credit profile in one
              place.
            </p>
          </div>
        </AnimatedContent>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <AnimatedContent
                key={feature.title}
                distance={80}
                direction="vertical"
                duration={0.7}
                delay={0.1 + index * 0.1}
                initialOpacity={0}
                animateOpacity
                threshold={0.1}
              >
                <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
