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
        <div className="fixed h-screen w-full" />
          <Suspense fallback="...">
            <NavbarWapper/>
          </Suspense>
          <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
            {children} <Toaster />
            <Footer/>
          </main>
          <Analytics/>
      </body>
    </html>
  );
}
