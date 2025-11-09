// ==========================================
// AboutVisionSection.tsx
// ==========================================
"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import AnimatedContent from "@/src/components/Animations/AnimatedContent";

export default function AboutVisionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Image + Badge */}
          <AnimatedContent
            distance={80}
            direction="horizontal"
            duration={0.8}
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
          >
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/aboutCredPic.jpg"
                  alt="Woman working on laptop, building credit identity"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Floating Badge */}
                <AnimatedContent
                  distance={40}
                  direction="vertical"
                  duration={0.8}
                  delay={0.4}
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.1}
                >
                  <div className="absolute bottom-6 left-6 bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <div className="text-sm font-medium text-gray-900">
                      <span className="font-bold">500+ Lives Changed</span>
                      <br />
                      <span className="text-gray-600">
                        Trusted by individuals and families
                      </span>
                    </div>
                  </div>
                </AnimatedContent>
              </div>
            </div>
          </AnimatedContent>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <AnimatedContent
              distance={60}
              direction="vertical"
              duration={0.8}
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
            >
              <p className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider text-primary bg-primary-light rounded-full uppercase w-fit">
                Our Vision
              </p>
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
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
                Empowering Real Credit for Everyone, Everywhere.
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
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                At CredMate, we believe your reputation should open doors, not
                your bank history. We&apos;re redefining how creditworthiness is
                built, giving individuals the power to grow their real credit
                identity straight from their phones.
              </p>
            </AnimatedContent>

            <AnimatedContent
              distance={60}
              direction="vertical"
              duration={0.8}
              delay={0.3}
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
            >
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                to help everyday people, students, workers, and small business
                owners, access fair financial opportunities through verified
                digital trust.
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
              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
                >
                  Learn More About Our Story
                  <span>→</span>
                </a>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  );
}
