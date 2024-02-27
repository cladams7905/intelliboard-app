import { Analytics } from "@vercel/analytics/react";
import Navbar from "@components/layout/Navbar";
//import Footer from "@components/layout/Footer";
import SupabaseProvider from '@app/supabase/supabase-provider';
import { Suspense } from "react";

import type { Metadata } from "next";
import "@styles/globals.css";

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
        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
        <SupabaseProvider>
          <Suspense fallback="...">
            <Navbar />
          </Suspense>
          <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
            {children}
          </main>
          {/*<Footer />*/}
          <Analytics />
        </SupabaseProvider>
      </body>
    </html>
  );
}
