"use client";

import { useState } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useSupabase } from '@app/supabase/supabase-provider';
import { useRouter } from 'next/navigation';
import Popover from "@components/shared/Popover";
import Image from "next/image";
import { User } from "@customTypes/models"

export default function UserDropdown({ user }: { user: User | null }) {
  const [openPopover, setOpenPopover] = useState(false);
  const { supabase } = useSupabase();
  const router = useRouter();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (!user?.email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <div className="p-2">
              {user?.full_name && (
                <p className="truncate text-sm font-medium text-gray-900">
                  {user?.full_name}
                </p>
              )}
              <p className="truncate text-sm text-gray-500">
                {user?.email}
              </p>
            </div>
            <button
              className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              disabled
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </button>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => handleSignOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={user.email}
            src={user.avatar_url || `https://avatars.dicebear.com/api/micah/${user.email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}