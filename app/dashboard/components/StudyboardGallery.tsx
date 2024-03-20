"use client";

import { useEffect, useTransition, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import StudyboardTile from "./StudyboardTile";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/shared/LoadingDots";
import { Tables } from "@/types/supabase";

const StudyboardGallery = ({studyboards} : {studyboards: Tables<"Studyboards">[]}) => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase.channel('studyboard changes').on(
      'postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'Studyboards'
      }, () => {
        startTransition(() => {
          router.refresh();
        });
      }
    ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase, router]);

  const studyboardTiles = useMemo(() => {
    if (isPending) {
      return <LoadingDots color="hsl(200 100 18%)" />;
    } else if (studyboards.length === 0) {
      return <div className="text-md text-gray-400 my-4">You currently do not have any studyboards, click &quot;<span className="font-extrabold">+</span>&quot; to start learning!</div>;
    } else {
      return studyboards.map((studyboard, i) => (
        <StudyboardTile studyboard={studyboard} key={i} />
      ));
    }
  }, [studyboards, isPending]);

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {studyboardTiles}
    </div>
  );
};

export default StudyboardGallery;
