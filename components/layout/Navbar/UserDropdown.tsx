"use client";

import { useState } from "react";
import { LogOut, Settings } from "lucide-react";
import { Session } from '@supabase/supabase-js';
import Popover from "@/components/shared/Popover";
import { Icon } from '@iconify-icon/react';
import { signOut } from "@/app/auth-server-action/actions";

export default function UserDropdown({ session }: { session: Session }) {
  const email = session?.user?.email;
  const [openPopover, setOpenPopover] = useState(false);
  
  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <div className="p-2">
              {session?.user && (
                <p className="truncate text-sm font-medium text-gray-900">
                  {email}
                </p>
              )}
            </div>
            <button
              className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              disabled
            >
              <Settings className="h-4 w-4" />
              <p className="text-sm">Settings</p>
            </button>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut()}
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
          <Icon icon="ph:user-light" width={28} height={28} />
        </button>
      </Popover>
    </div>
  );
}