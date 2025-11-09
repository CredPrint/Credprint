// ==========================================
// src/components/homepage/TestimonialsSection.tsx
// ==========================================
"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import AnimatedContent from "@/src/components/Animations/AnimatedContent";

const testimonials = [
  {
    name: "Chioma Okonkwo",
    role: "Small Business Owner",
    image: "/images/testimonial-1.jpg",
    rating: 5,
    text: "CredPrint helped me get my first business loan in just 2 days. The process was so simple and transparent!",
  },
  {
    name: "Ibrahim Musa",
    role: "Freelancer",
    image: "/images/testimonial-2.jpg",
    rating: 5,
    text: "I never knew my credit score before. Now I can track it and improve it. This platform changed everything for me.",
  },
  {
    name: "Ada Nwankwo",
    role: "Teacher",
    image: "/images/testimonial-3.jpg",
    rating: 5,
    text: "Fast, secure, and reliable. I got approved for a loan the same day I signed up. Highly recommend!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
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
              What Our Customers Says
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users building their credit
              reputation.
            </p>
          </div>
        </AnimatedContent>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedContent
              key={testimonial.name}
              distance={80}
              direction="vertical"
              duration={0.7}
              delay={0.1 + index * 0.15}
              initialOpacity={0}
              animateOpacity
              threshold={0.1}
            >
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
