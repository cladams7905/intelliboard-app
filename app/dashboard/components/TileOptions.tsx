"use client";

import { useState, useTransition } from "react";
import Popover from "@/components/shared/Popover";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Trash2, Type } from "lucide-react";
import { deleteStudyboardById } from "../actions";
import { useRouter } from "next/navigation";
import { useUrl } from 'nextjs-current-url';
import { localStudyboard } from "@/types/customTypes";
import LoadingDots from "@/components/shared/LoadingDots";

export default function TileOptions({studyboard, renameTitle}: 
  {studyboard: localStudyboard, renameTitle: React.RefObject<HTMLInputElement>}) {
  
  const [openPopover, setOpenPopover] = useState(false);
  const { pathname } = useUrl() ?? {};
  const router = useRouter();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isRenamePending, startRenameTransition] = useTransition();

  const handleRename = () => {
    startRenameTransition(() => {
      renameTitle.current?.classList.remove("hidden")
      renameTitle.current?.focus()
      renameTitle.current?.select()
    })
  }
  
  const handleDelete = () => {
    if (pathname == `/edit/${studyboard.id}`) {
      router.push('/dashboard')
    }
    startDeleteTransition(() => {
      deleteStudyboardById(studyboard.id).then(() => {
        router.refresh();
      })
    })
  }

  return (
    <div className="absolute bottom-10 right-2">
      <Popover
        content={
          <div className="flex flex-col w-full rounded-md bg-white p-2 sm:w-32">
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 cursor-pointer text-left text-sm transition-all duration-75 hover:bg-gray-200"
              onClick={handleRename}
            >
              {isRenamePending ? (
                <LoadingDots />
              ) : (
                <>
                  <Type className="h-4 w-4" />
                  <p className="text-sm">Rename</p>
                </>
              )}
            </button>
            <button
                className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 cursor-pointer text-left text-sm transition-all duration-75 hover:bg-gray-100"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
                <p className="text-sm">Delete</p>
                {isDeletePending ? (
                  <LoadingDots />
                ) : (
                  ""
                )}
            </button>
          </div>
        }
        align="center"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => {
            setOpenPopover(!openPopover);
          }}
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
