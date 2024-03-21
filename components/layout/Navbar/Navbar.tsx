'use client';

import Link from 'next/link';
import useSignInModal from "@/components/layout/SignInModal";
import UserDropdown from './UserDropdown';
import { Session } from '@supabase/supabase-js';
import { Button } from "@/components/shared/button";
import { Logo } from "@/components/shared/icons/logo";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

import s from './Navbar.module.css';

export default function Navbar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <div className='fixed top-0 w-full flex justify-center z-30 bg-white'
         style={{boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}
        >
         <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
              <Logo/>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <Button
                className="bg-secondary p-1.5 px-4 text-sm text-white transition-all"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
      {<ProgressBar
          height="4px"
          color="hsl(var(--accent))"
          options={{ showSpinner: false }}
          delay={10}
          shallowRouting
        />}
    </>
  );
}