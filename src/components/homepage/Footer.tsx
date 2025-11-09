// ==========================================
// src/components/homepage/Footer.tsx
// ==========================================
"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import AnimatedContent from "@/src/components/Animations/AnimatedContent";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <AnimatedContent
            distance={60}
            direction="vertical"
            duration={0.8}
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">CredPrint</h3>
              <p className="text-sm">
                Building Nigeria's most trusted credit reputation platform.
              </p>
            </div>
          </AnimatedContent>

          {/* Product */}
          <AnimatedContent
            distance={60}
            direction="vertical"
            duration={0.8}
            delay={0.1}
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
          >
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
          </AnimatedContent>

          {/* Company */}
          <AnimatedContent
            distance={60}
            direction="vertical"
            duration={0.8}
            delay={0.2}
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
          >
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </AnimatedContent>

          {/* Legal */}
          <AnimatedContent
            distance={60}
            direction="vertical"
            duration={0.8}
            delay={0.3}
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
          >
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </AnimatedContent>
        </div>

        {/* Bottom Bar */}
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.8}
          delay={0.4}
          initialOpacity={0}
          animateOpacity
          threshold={0.2}
        >
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © 2024 CredPrint. All rights reserved. Licensed by CBN.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </footer>
  );
}
