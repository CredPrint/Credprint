"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HeroSection from "@/src/components/homepage/HeroSection";
import FeaturesSection from "@/src/components/homepage/FeaturesSection";
import HowItWorksSection from "@/src/components/homepage/HowItWorksSection";
import TestimonialsSection from "@/src/components/homepage/TestimonialsSection";
import PricingSection from "@/src/components/homepage/PricingSection";
import FAQSection from "@/src/components/homepage/FAQSection";
import CTASection from "@/src/components/homepage/CTASection";
import Footer from "@/src/components/homepage/Footer";
import Navbar from "@/src/components/homepage/Navbar";
import AboutVisionSection from "../components/homepage/AboutSection";
import ServicesSection from "../components/homepage/Service";

export default function Homepage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If user is signed in and hasn't completed onboarding, redirect to step1
    if (isSignedIn) {
      const hasCompletedOnboarding = user?.publicMetadata?.onboardingCompleted;

      if (!hasCompletedOnboarding) {
        router.push("/step1");
      } else {
        // If onboarding is completed, go to dashboard
        router.push("/dashboard");
      }
    }
  }, [isSignedIn, user, router]);

  // Show homepage only for non-authenticated users
  if (isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <HeroSection />
      <AboutVisionSection />
      <ServicesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
