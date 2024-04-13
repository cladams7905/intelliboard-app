"use client";

import TileOptions from "./TileOptions";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useCallback, useState, useTransition } from "react";
import { updateStudyboardById } from "../actions";
import LoadingDots from "@/components/shared/LoadingDots";
import { convertDateTime } from "@/lib/utils";
import { localStudyboard } from "@/types/customTypes";

export default function StudyboardTile({studyboard}: {studyboard: localStudyboard}) {

  const renameTitleRef = useRef<HTMLInputElement>(null);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(studyboard.snapshot_url);
  const [lastOpened, setLastOpened] = useState<string | null>(studyboard.last_opened);
  const [title, setTitle] = useState<string | null>(studyboard.title)
  const [isPending, startTransition] = useTransition();

  
  const submitTitle = useCallback(() => {
    if (renameTitleRef.current?.value !== "" && renameTitleRef.current?.value !== studyboard.title) {
      console.log("submitting new title...")
      updateStudyboardById(studyboard.id, { title: renameTitleRef.current?.value }).then((data) => {
        if (data?.title) {
          setTitle(data?.title)
        }
      })
    }
    renameTitleRef.current?.classList.add("hidden");
  }, [studyboard.id, studyboard.title]);

  useEffect(() => {
    const handleOutsideAndEnterClick = (e: MouseEvent | KeyboardEvent) => {
      if (
        !renameTitleRef.current?.contains(e.target as Node) &&
        (e.type === "mousedown" || (e as KeyboardEvent).key === "Enter")
      ) {
        submitTitle();
      }
    };

    window.addEventListener("mousedown", handleOutsideAndEnterClick);
    window.addEventListener("keydown", handleOutsideAndEnterClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideAndEnterClick);
      window.removeEventListener("keydown", handleOutsideAndEnterClick);
    };
  }, [submitTitle]);

  return (
    <div className="card relative w-64 overflow-hidden bg-gray-100 shadow-md flex items-start justify-center border border-gray-200 rounded-sm hover:scale-105 hover:cursor-pointer transition-all">
      <TileOptions studyboard={studyboard} renameTitle={renameTitleRef} />
      <div className="flex-col items-start max-w-64">
        <input type="text"
          className="absolute hidden text-md break-words mt-[158px] ml-[35px] bg-gray-200 focus:ring-1 focus:ring-gray-400 rounded-sm text-center"
          ref={renameTitleRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submitTitle();
            }
          }} />
        <Link href="/edit/[studyboardId]" as={`/edit/${studyboard.id}`}>
          {!snapshotUrl ? (
            <div className="flex items-center justify-center w-64 h-[150px] bg-white rounded-sm border-b border-gray-200 hover:bg-gray-50">
              {isPending ? (
                <LoadingDots color="hsl(var(--secondary))" />
              ) : (
                ""
              )}
            </div>
          ) : (
            <Image
              className="bg-white rounded-sm border-b border-gray-300 object-cover object-left-top max-w-none max-h-[150px]"
              alt="snapshot_url"
              src={snapshotUrl}
              width={355}
              height={128} />
          )}
          <div className="card-body h-[76px] flex flex-col flex-wrap gap-2 items-center justify-center p-2">
            {title ? (
              <div className="card-title text-[18px] break-words">{title}</div>
            ) : (
              <div className="text-md text-gray-400 break-words">Untitled Project</div>
            )}
            <div className="flex flex-row flex-wrap gap-2">
              {studyboard.tags?.map((tag, i) => (
                <div className="bg-red-200 p-2 rounded-xl text-xs" key={i}>
                  {tag}
                </div>
              ))}
            </div>
            {lastOpened ? (
              <div className="text-xs break-words text-gray-400">{convertDateTime(lastOpened)}</div>
            ) : (
              <div className="text-xs break-words text-gray-400"></div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}