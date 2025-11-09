// ==========================================
// src/components/homepage/CTASection.tsx
// ==========================================
"use client";

import { SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/src/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedContent from "@/src/components/Animations/AnimatedContent";

export default function CTASection() {
  const { isSignedIn } = useUser();

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-green-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.8}
          initialOpacity={0}
          animateOpacity
          threshold={0.2}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Your Credit Profile?
          </h2>
        </AnimatedContent>

        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.8}
          delay={0.2}
          initialOpacity={0}
          animateOpacity
          threshold={0.2}
        >
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerians who are taking control of their
            financial future. Get started in minutes.
          </p>
        </AnimatedContent>

        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.8}
          delay={0.4}
          initialOpacity={0}
          animateOpacity
          threshold={0.2}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </SignUpButton>
            )}
          </div>
        </AnimatedContent>

        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.8}
          delay={0.6}
          initialOpacity={0}
          animateOpacity
          threshold={0.2}
        >
          <p className="text-green-100 text-sm mt-6">
            No credit card required • Free forever • 3 minutes to get started
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
}
