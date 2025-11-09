// ==========================================
// src/components/homepage/PricingSection.tsx
// ==========================================
"use client";

import { SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/src/components/ui/Button";
import { Check } from "lucide-react";
import Link from "next/link";
import AnimatedContent from "@/src/components/Animations/AnimatedContent";

const plans = [
  {
    name: "Basic",
    price: "Free",
    period: "Forever",
    description: "Perfect for getting started",
    features: [
      "Credit score tracking",
      "Basic credit report",
      "Financial tips",
      "Loan up to ₦50,000",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "₦2,500",
    period: "per month",
    description: "Most popular for individuals",
    features: [
      "Everything in Basic",
      "Detailed credit analysis",
      "Credit score improvement plan",
      "Loan up to ₦200,000",
      "Priority support",
      "Monthly credit reports",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "₦10,000",
    period: "per month",
    description: "For business owners",
    features: [
      "Everything in Premium",
      "Business credit profile",
      "Multi-account management",
      "Loan up to ₦500,000",
      "Dedicated account manager",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingSection() {
  const { isSignedIn } = useUser();

  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-green-50 to-white"
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
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your needs. No hidden fees.
            </p>
          </div>
        </AnimatedContent>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedContent
              key={plan.name}
              distance={80}
              direction="vertical"
              duration={0.8}
              delay={0.1 + index * 0.15}
              initialOpacity={0}
              animateOpacity
              threshold={0.1}
            >
              <div
                className={`relative bg-white rounded-2xl p-8 ${
                  plan.popular
                    ? "ring-2 ring-primary shadow-xl scale-105"
                    : "shadow-sm"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period !== "Forever" && (
                      <span className="text-gray-600">/{plan.period}</span>
                    )}
                  </div>
                  {plan.period === "Forever" && (
                    <p className="text-sm text-gray-600">
                      No credit card required
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {isSignedIn ? (
                  <Link href="/dashboard">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "primary" : "secondary"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                ) : (
                  <SignUpButton mode="modal">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "primary" : "secondary"}
                    >
                      {plan.cta}
                    </Button>
                  </SignUpButton>
                )}
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
