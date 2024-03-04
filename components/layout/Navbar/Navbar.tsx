'use client';

import Link from 'next/link';
import useScroll from "lib/hooks/use-scroll";
import useSignInModal from "@/components/layout/SignInModal";
import UserDropdown from './UserDropdown';
import { Session } from '@supabase/supabase-js';

import s from './Navbar.module.css';

export default function Navbar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center z-30 transition-all
        ${ scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0" }
        `}
      >
         <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
              {/*<Logo/>*/}
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}