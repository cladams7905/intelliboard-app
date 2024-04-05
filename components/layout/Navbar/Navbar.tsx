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
      <div className="navbar bg-base-100 lg:px-8"
      style={{boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 0px'}}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <Logo/>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        {session ? (
          <UserDropdown session={session} />
          ) : (
          <a className="btn bg-secondary border-secondary hover:bg-secondary-foreground hover:border-secondary-foreground z-30" onClick={() => setShowSignInModal(true)}>Get started!</a>
        )}
      </div>
      {<ProgressBar
        height="4px"
        color="hsl(var(--accent))"
        options={{ showSpinner: false }}
        delay={10}
        shallowRouting
      />}
    </div>
  </>
  );
}