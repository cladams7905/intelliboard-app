"use client";

import { localStudyboard } from "@/types/customTypes";
import StudyboardTile from "./StudyboardTile";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const StudyboardGallery = ({studyboards} : {studyboards: localStudyboard[]}) => {

  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  useEffect(() => {
    const channel = supabase.channel('studyboard changes').on(
      'postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'Studyboards'
      }, (payload) => {
        console.log("supabase detected changes!", payload)
        router.refresh();
      }
    ).subscribe();

    return () => {
      channel.unsubscribe();
    }
  }, [supabase, router]);

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {studyboards.length == 0 ? (
        <div className="text-md text-gray-400 my-4">You currently do not have any studyboards, click &quot;<span className="font-extrabold">+</span>&quot; to start learning!</div>
      ) : (
        studyboards.map((studyboard, i) => (
          <StudyboardTile studyboard={studyboard} key={i} />
        ))
      )}
    </div>
  );
};

export default StudyboardGallery;
