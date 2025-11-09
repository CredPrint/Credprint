// ==========================================
// ServicesSection.tsx
// ==========================================
"use client";

import { Zap, Smartphone, Users, Share2, Code2, BookOpen } from "lucide-react";
import AnimatedContent from "@/src/components/Animations/AnimatedContent";

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  dark?: boolean;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  dark = false,
}: ServiceCardProps) => (
  <div
    className={`
      p-6 rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
      ${
        dark
          ? "bg-primary text-white border-primary"
          : "bg-primary-light border-transparent"
      }
    `}
  >
    <Icon className={`w-8 h-8 mb-4 ${dark ? "text-white" : "text-primary"}`} />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p
      className={`text-sm leading-relaxed ${
        dark ? "text-white/90" : "text-gray-700"
      }`}
    >
      {description}
    </p>
    <a
      href="#"
      className={`
        mt-4 inline-flex items-center text-sm font-medium transition-colors
        ${
          dark
            ? "text-white hover:text-white/80"
            : "text-primary hover:text-primary/80"
        }
      `}
    >
      Learn More <span className="ml-1">→</span>
    </a>
  </div>
);

export default function ServicesSection() {
  const services: ServiceCardProps[] = [
    {
      icon: Zap,
      title: "Instant Verification",
      description:
        "Get your verified credit score in 3 minutes using alternative data sources. No BVN, no paperwork, no waiting.",
      dark: true,
    },
    {
      icon: Smartphone,
      title: "Mobile Credit App",
      description:
        "Download our app and manage your credit identity on the go. Track your score, share your badge, and unlock opportunities.",
    },
    {
      icon: Users,
      title: "Partner Network",
      description:
        "Access our growing network of 50+ verified lenders, landlords, and employers who trust CredMate badges.",
    },
    {
      icon: Share2,
      title: "Badge Sharing",
      description:
        "Share your verified credit badge instantly with lenders, landlords, and employers via link or QR code.",
    },
    {
      icon: Code2,
      title: "API Integration",
      description:
        "Integrate CredMate verification into your lending, rental, or hiring platform with our developer-friendly API.",
    },
    {
      icon: BookOpen,
      title: "Financial Literacy & Growth Programs",
      description:
        "Educate users to build and maintain strong financial habits.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <AnimatedContent
            distance={60}
            direction="vertical"
            duration={0.8}
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider text-primary bg-white border border-primary rounded-full uppercase">
              Our Services
            </span>
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
              Empowering Financial Trust for Everyone
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
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              From individuals building digital credit identities to businesses
              verifying trust, CredMate bridges the gap between informal
              activity and formal credibility.
            </p>
          </AnimatedContent>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedContent
              key={index}
              distance={80}
              direction="vertical"
              duration={0.7}
              delay={0.1 + index * 0.1}
              initialOpacity={0}
              animateOpacity
              threshold={0.1}
            >
              <ServiceCard {...service} />
            </AnimatedContent>
          ))}
        </div>

        {/* CTA */}
        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.8}
          delay={0.7}
          initialOpacity={0}
          animateOpacity
          threshold={0.2}
        >
          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
            >
              Partner with CredMate
              <span>→</span>
            </a>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
