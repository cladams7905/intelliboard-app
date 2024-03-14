import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";
import { Toaster } from "@/components/shared/toaster";
import type { Metadata } from "next";
import NavbarWapper from "@/components/layout/Navbar/NavbarWrapper";
import "./globals.css";
import { inter, righteous } from "@/public/fonts";
import cx from "classnames";

export const metadata: Metadata = {
  title: "Studibee",
  description: "AI text reader for learning foreign languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cx(inter.variable, righteous.variable)}`}>
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
