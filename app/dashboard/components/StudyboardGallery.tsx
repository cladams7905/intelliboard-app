"use client";

import { localStudyboard } from "@/types/customTypes";
import StudyboardTile from "./StudyboardTile";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { getLocalStudyboardData } from "../actions";
import { useRouter } from "next/navigation";

const StudyboardGallery = ({
  studyboards,
  sessionUserId,
} : {
  studyboards : localStudyboard[],
  sessionUserId: string
}) => {

  const [currentStudyboards, setStudyboards] = useState<localStudyboard[]>(studyboards);
  const router = useRouter();

  useEffect(() => {
    getLocalStudyboardData(sessionUserId).then((updatedStudyboards) => {
      if (updatedStudyboards.length !== currentStudyboards.length) {
        setStudyboards(updatedStudyboards);
        router.refresh();
      }
    });
  }, [studyboards.length, currentStudyboards.length, router, sessionUserId]);
  

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {currentStudyboards.length == 0 ? (
        <div className="text-md text-gray-400 my-4">You currently do not have any studyboards, click &quot;<span className="font-extrabold">+</span>&quot; to start learning!</div>
      ) : (
        currentStudyboards.map((studyboard, i) => (
          <StudyboardTile studyboard={studyboard} key={studyboard.id} />
        ))
      )}
    </div>
  );
};

export default StudyboardGallery;
