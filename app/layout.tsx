import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";
import { Toaster } from "@/components/shared/toaster";
import type { Metadata } from "next";
import NavbarWapper from "@/components/layout/Navbar/NavbarWrapper";
import "./globals.css";
import { inter, righteous, atma } from "@/public/fonts";
import cx from "classnames";

export const metadata: Metadata = {
  title: "Studybird",
  description: "AI-generated teaching materials tailored to individual student's needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${cx(inter.variable, righteous.variable, atma.variable)}`}>
        <div className="fixed h-screen w-full" />
          <Suspense fallback="...">
            <NavbarWapper/>
          </Suspense>
          <main className="flex w-full flex-col items-center justify-center">
            {children} <Toaster />
            <Footer/>
          </main>
          <Analytics/>
      </body>
    </html>
  );
}
