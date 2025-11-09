// ==========================================
// src/components/homepage/FAQSection.tsx
// ==========================================
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import AnimatedContent from "@/src/components/Animations/AnimatedContent";

const faqs = [
  {
    question: "How does CredPrint work?",
    answer:
      "CredPrint analyzes your financial data from your bank accounts, wallets, and payment history to generate a comprehensive credit score. We use advanced algorithms to assess your creditworthiness based on your transaction patterns, payment history, and financial behavior.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. We use bank-level 256-bit encryption to protect your data. We're also licensed and regulated by the Central Bank of Nigeria. Your data is never shared with third parties without your explicit consent.",
  },
  {
    question: "How long does verification take?",
    answer:
      "The entire verification process takes just 3-5 minutes. Once you upload your BVN, ID, and bank statement, our system instantly verifies your information and generates your credit profile.",
  },
  {
    question: "What documents do I need?",
    answer:
      "You'll need your BVN (Bank Verification Number), a valid government-issued ID (NIN, Driver's License, or International Passport), and a recent bank statement (last 3 months). You can upload these documents directly through our platform.",
  },
  {
    question: "Can I improve my credit score?",
    answer:
      "Yes! We provide personalized recommendations to help you improve your credit score. This includes tips on payment behavior, debt management, and financial habits. Our Premium plan includes a detailed credit improvement plan.",
  },
  {
    question: "How do I qualify for a loan?",
    answer:
      "Loan qualification depends on your credit score and profile. Generally, you need a minimum credit score of 600, a verified identity, and a consistent transaction history. The better your score, the higher the loan amount you can access.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.8}
          initialOpacity={0}
          animateOpacity
          threshold={0.2}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about CredPrint
            </p>
          </div>
        </AnimatedContent>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedContent
              key={index}
              distance={60}
              direction="vertical"
              duration={0.6}
              delay={0.1 + index * 0.08}
              initialOpacity={0}
              animateOpacity
              threshold={0.1}
            >
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-gray-600 transition-transform flex-shrink-0",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
