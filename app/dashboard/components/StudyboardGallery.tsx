"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import StudyboardTile from "./StudyboardTile";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/navigation";

export default function StudyboardGallery({userStudyboards} : {userStudyboards: Tables<"Studyboards">[]}) {

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const router = useRouter();

    useEffect(() => {
        const channel = supabase.channel('studyboard changes').on(
        'postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'Studyboards'
        }, (payload) => {
            console.log({payload})
            router.refresh();
        }
        ).subscribe();

        return () => {
            supabase.removeChannel(channel);
        }
    }, [supabase, router]);
  
  return (
    <div className="flex flex-row flex-wrap gap-6">
        {userStudyboards.map((studyboard, i) => (
            <StudyboardTile studyboard={studyboard} key={i} />
        ))}
    </div>
  )
}
