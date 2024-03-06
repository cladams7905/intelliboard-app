'use client';

import Link from 'next/link';
import useSignInModal from "@/components/layout/SignInModal";
import UserDropdown from './UserDropdown';
import { Session } from '@supabase/supabase-js';
import { Button } from "@/components/shared/button";

import s from './Navbar.module.css';

export default function Navbar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <div className='fixed top-0 w-full flex justify-center z-30 border-b border-gray-200 bg-white/50 backdrop-blur-xl'>
         <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
              {/*<Logo/>*/}
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <Button
                className="border border-black bg-black p-1.5 px-4 text-sm text-white transition-all"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}