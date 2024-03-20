"use client";

import { useState } from "react";
import Popover from "@/components/shared/Popover";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Trash2, Type } from "lucide-react";
import { Tables } from "@/types/supabase";
import { deleteStudyboardById } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/shared/use-toast";

export default function TileOptions({studyboard}: {studyboard: Tables<"Studyboards">}) {
  const [openPopover, setOpenPopover] = useState(false);
  const router = useRouter();

  return (
    <div className="absolute top-2 right-1">
      <Popover
        content={
          <div className="flex flex-col w-full rounded-md bg-white p-2 sm:w-32">
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 cursor-pointer text-left text-sm transition-all duration-75 hover:bg-gray-100"
              disabled
            >
              <Type className="h-4 w-4" />
              <p className="text-sm">Rename</p>
            </button>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 cursor-pointer text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => {
                deleteStudyboardById(studyboard.id).then(() => {
                  toast({
                    description: (
                      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white">
                        Successfully deleted &quot;{studyboard.title}&quot;
                      </pre>
                    ),
                  })
                })
                router.refresh();
              }}
            >
              <Trash2 className="h-4 w-4" />
              <p className="text-sm">Delete</p>
            </button>
          </div>
        }
        align="center"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
        >
          <Icon 
              icon="mi:options-vertical" 
              width={22} 
              height={22} 
              className="hover:bg-gray-200 cursor-pointer rounded-md"
              style={{ color: 'rgb(107 114 128)' }} />
        </button>
      </Popover>
    </div>
  )
}
