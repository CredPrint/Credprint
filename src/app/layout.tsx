// ==========================================
// FILE: src/app/layout.tsx (FIXED)
// ==========================================
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CredPrint - Build Your Credit Profile",
  description: "Get verified in minutes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-white antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}