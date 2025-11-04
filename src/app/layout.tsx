// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrediMe - Build Your Credit Profile",
  description: "Get verified in minutes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` bg-white antialiased`}>
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </body>
    </html>
  );
}
