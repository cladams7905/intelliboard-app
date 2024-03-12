import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";
import "./globals.css";
import { Toaster } from "@/components/shared/toaster";

import type { Metadata } from "next";
import NavbarWapper from "@/components/layout/Navbar/NavbarWrapper";

export const metadata: Metadata = {
  title: "Intelliboard",
  description: "GPT-powered language learning app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="fixed h-screen w-full bg-gray-50" />
          <Suspense fallback="...">
            <NavbarWapper/>
          </Suspense>
          <main className="flex w-full flex-col items-center justify-center py-24">
            {children} <Toaster />
            <Footer/>
          </main>
          <Analytics/>
      </body>
    </html>
  );
}
