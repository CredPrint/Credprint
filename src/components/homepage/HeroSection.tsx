"use client";

import { SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/src/components/ui/Button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimatedContent from "@/src/components/Animations/AnimatedContent";

export default function HeroSection() {
  const { isSignedIn } = useUser();

  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <AnimatedContent
              distance={60}
              direction="vertical"
              duration={0.8}
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
            >
              <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                ✨ Trusted by 10,000+ Nigerians
              </div>
            </AnimatedContent>

            <AnimatedContent
              distance={60}
              direction="vertical"
              duration={0.8}
              delay={0.1}
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Real Credit Reputation Built From Your Prints
              </h1>
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
              <p className="text-xl text-gray-600 leading-relaxed">
                Build your digital credit identity in minutes. Access loans, track
                your score, and unlock financial opportunities with Nigeria's most
                trusted credit platform.
              </p>
            </AnimatedContent>

            {/* Benefits List */}
            <div className="space-y-3">
              {[
                "No paperwork, 100% digital",
                "Get verified in 3 minutes",
                "Access instant loans up to ₦500,000",
              ].map((benefit, index) => (
                <AnimatedContent
                  key={benefit}
                  distance={40}
                  direction="horizontal"
                  duration={0.6}
                  delay={0.3 + index * 0.1}
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.1}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                </AnimatedContent>
              ))}
            </div>

            {/* CTA Buttons */}
            <AnimatedContent
              distance={60}
              direction="vertical"
              duration={0.8}
              delay={0.6}
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {isSignedIn ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="w-full sm:w-auto">
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <SignUpButton mode="modal">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </SignUpButton>
                )}
                <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>
            </AnimatedContent>

            {/* Trust Badges */}
            <AnimatedContent
              distance={60}
              direction="vertical"
              duration={0.8}
              delay={0.7}
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
            >
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">10K+</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">₦2B+</p>
                  <p className="text-sm text-gray-600">Loans Disbursed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                  <p className="text-sm text-gray-600">User Rating</p>
                </div>
              </div>
            </AnimatedContent>
          </div>

          {/* Right Image */}
          <AnimatedContent
            distance={80}
            direction="horizontal"
            duration={0.8}
            delay={0.3}
            reverse={true}
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
          >
            <div className="relative">
              <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px]">
                <Image
                  src="/images/CredaHero.png"
                  alt="Happy woman using CredPrint"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                />
              </div>
              
              {/* Floating Card */}
              <AnimatedContent
                distance={40}
                direction="vertical"
                duration={0.8}
                delay={0.9}
                initialOpacity={0}
                animateOpacity
                threshold={0.1}
              >
                <div className="absolute bottom-8 left-8 bg-white rounded-xl shadow-lg p-4 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Credit Score</p>
                      <p className="text-2xl font-bold text-green-600">750</p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}