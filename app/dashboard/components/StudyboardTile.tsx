"use client";

import { Tables } from "@/types/supabase";
import TileOptions from "./TileOptions";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useCallback, useState, useTransition } from "react";
import { getLocalStudyboardById, updateStudyboardById } from "../actions";
import { createBrowserClient } from "@supabase/ssr";
import LoadingDots from "@/components/shared/LoadingDots";
import { useRouter } from "next/navigation";

export default function StudyboardTile({studyboard}: {studyboard: Tables<"Studyboards">}) {

  const renameTitleRef = useRef<HTMLInputElement>(null);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>("");
  const [lastOpened, setLastOpened] = useState<string | null>("");
  const [title, setTitle] = useState<string | null>(studyboard.title)
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchLocalData = useCallback(async () => {
    getLocalStudyboardById(studyboard.created_by, studyboard.id).then((data) => {
      if (data) {
        setSnapshotUrl((prevUrl) => {
          if (prevUrl !== data.snapshot_url) {
            return data.snapshot_url;
          } else {
            return prevUrl;
          }
        });
        setLastOpened((prevOpened) => {
          if (prevOpened !== data.last_opened) {
            return data.last_opened;
          } else {
            return prevOpened;
          }
        });
      }
    });
  }, [studyboard.created_by, studyboard.id])

  
  const submitTitle = useCallback(() => {
    if (renameTitleRef.current?.value !== "" && renameTitleRef.current?.value !== studyboard.title) {
      updateStudyboardById(studyboard.id, { title: renameTitleRef.current?.value })
    }
    renameTitleRef.current?.classList.add("hidden");
    if (renameTitleRef.current?.value) {
      setTitle(renameTitleRef?.current.value)
    }
  }, [studyboard.id, studyboard.title]);
  

  useEffect(() => {
    const channel = supabase.channel('studyboard changes').on(
      'postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'Studyboards',
        filter: `id=eq.${studyboard.id}`, 
      }, (payload) => {
        console.log(payload)
        startTransition(() => {
          fetchLocalData()
        });
      }
    ).subscribe();

    return () => {
      channel.unsubscribe();
    }
  }, [fetchLocalData, submitTitle, router, studyboard.id, studyboard.title, supabase]);

  useEffect(() => {
    const handleOutsideAndEnterClick = (e: MouseEvent | KeyboardEvent) => {
      if (
        !renameTitleRef.current?.contains(e.target as Node) &&
        (e.type === "mousedown" || (e as KeyboardEvent).key === "Enter")
      ) {
        submitTitle();
      }
    };

    fetchLocalData();

    window.addEventListener("mousedown", handleOutsideAndEnterClick);
    window.addEventListener("keydown", handleOutsideAndEnterClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideAndEnterClick);
      window.removeEventListener("keydown", handleOutsideAndEnterClick);
    };
  }, [studyboard.created_by, studyboard.id, submitTitle, fetchLocalData]);

  return (
    <div className="flex items-start h-fit justify-center relative bg-gray-100 border border-gray-300 rounded-sm hover:scale-105 hover:cursor-pointer transition-all"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px' }}>
      <TileOptions studyboard={studyboard} renameTitle={renameTitleRef} />
      <div className="flex-col items-start max-w-48 overflow-hidden">
        <input type="text"
          className="absolute hidden text-md break-words mt-[135px] ml-[7px] bg-gray-200 focus:ring-1 focus:ring-gray-400 rounded-sm text-center"
          ref={renameTitleRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submitTitle();
            }
          }} />
        <Link href="/edit/[studyboardId]" as={`/edit/${studyboard.id}`}>
          {!snapshotUrl || isPending ? (
            <div className="flex items-center justify-center w-48 h-32 bg-white rounded-sm border-b border-gray-300 hover:bg-gray-50">
              <LoadingDots color="hsl(var(--secondary))" />
            </div>
          ) : (
            <Image
              className="p-2 bg-white rounded-sm border-b border-gray-300 object-cover min-h-[128px] max-h-[128px] max-w-none"
              alt="snapshot_url"
              src={snapshotUrl}
              width={192}
              height={128} />
          )}
          <div className="flex flex-col flex-wrap gap-2 items-center justify-center p-2">
            {title ? (
              <div className="text-md break-words">{title}</div>
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

function convertDateTime(timestampz: string): string {
  const currentDate = new Date();
  currentDate.setHours(24, 0, 0, 0) //Set current date to midnight
  const inputDate = new Date(timestampz);
  const diffTime = Math.abs(currentDate.getTime() - inputDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

  const day = inputDate.getDate().toString().padStart(2, '0');
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  let isPM = false;
  let hours = inputDate.getHours();
  if (hours > 12) {
    hours -= 12;
    isPM = true;
  }
  hours.toString().padStart(2, '0');
  const minutes = inputDate.getMinutes().toString().padStart(2, '0');

  const time = `${hours}:${minutes}${isPM ? 'PM' : 'AM'}`
  
  if (diffDays === 0) {
    return `Today ${time}`;
  } else if (diffDays === 1) {
    return `Yesterday ${time}`;
  } else {
    return `${month}/${day} ${time}`;
  }
}

