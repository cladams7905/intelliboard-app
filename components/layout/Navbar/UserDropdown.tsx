"use client";

import { useState } from "react";
import { LogOut, Settings } from "lucide-react";
import { Session } from '@supabase/supabase-js';
import Popover from "@/components/shared/Popover";
import { Icon } from '@iconify-icon/react';
import { signOut } from "@/app/auth-server-action/actions";
import { toast } from "@/components/shared/use-toast";
import Image from "next/image";

export default function UserDropdown({ session }: { session: Session }) {
  const email = session?.user?.email;
  const username = email?.substring(0, email.indexOf("@"))
  const {avatar_url, name} = session?.user?.user_metadata || {};
  const [openPopover, setOpenPopover] = useState(false);
  
  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <div className="p-2">
              {session?.user && (
                <>
                <p className="truncate text-sm font-medium text-gray-900">
                  {name ? name : username}
                </p>
                <p className="truncate text-sm font-medium text-gray-400">
                  {email}
                </p>
                </>
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
              onClick={() => {
                signOut().then(() => {
                  toast({
                    description: (
                      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-green-400">
                          Successfully logged out.
                        </code>
                      </pre>
                    ),
                  });
                }).catch((err) => {
                  toast({
                    description: (
                      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-red-400">
                          {`Error: ` + err.message}
                        </code>
                      </pre>
                    ),
                  });
                });
              }}
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
          className="flex items-center justify-center overflow-hidden rounded-full"
        >
          <div className="transition-all duration-75 active:scale-95">
            {avatar_url ? (
              <Image  
                src={avatar_url}
                alt="user"
                width="30"
                height="30"
                className="mr-2 rounded-full"
                ></Image>) : ( 
              <Icon 
                icon="mingcute:user-4-fill" 
                width={30} 
                height={30} 
                style={{ color: 'hsl(var(--secondary))' }} />
            )}
          </div>
          {/* <div className="text-secondary text-sm font-semibold">{name ? name : username}</div> */}
        </button>
      </Popover>
    </div>
  );
}