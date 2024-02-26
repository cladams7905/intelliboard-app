import Link from 'next/link';
import { createServerSupabaseClient, getUserDetails } from '@app/supabase/supabase-server';
import useScroll from "@hooks/use-scroll";
import UserDropdown from './UserDropdown';
import { User } from '@customTypes/models';

import s from './Navbar.module.css';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {data: { user }} = await supabase.auth.getUser();
  const scrolled = useScroll(50);
  const userDetails = await getUserDetails();

  return (
    <>
      {/*<SignInModal />*/}
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
            {user ? (
              <UserDropdown user={userDetails} />
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