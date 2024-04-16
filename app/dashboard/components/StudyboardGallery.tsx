"use client";

import { localStudyboard } from "@/types/customTypes";
import StudyboardTile from "./StudyboardTile";
import AddStudyboardTile from "./AddStudyboardTile";
import { useEffect, useState, useTransition } from "react";
import { getLocalStudyboardData } from "../actions";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/shared/LoadingDots";

const StudyboardGallery = ({
  studyboards,
  inModal,
  sessionUserId,
} : {
  studyboards : localStudyboard[],
  inModal?: boolean,
  sessionUserId: string
}) => {

  const [currentStudyboards, setStudyboards] = useState<localStudyboard[]>(studyboards);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getLocalStudyboardData(sessionUserId).then((updatedStudyboards) => {
      if (updatedStudyboards.length !== currentStudyboards.length) {
        startTransition(() => {
          setStudyboards(updatedStudyboards);
          router.refresh();
        })
      }
    });
  }, [studyboards.length, currentStudyboards.length, router, sessionUserId]);
  

  return (
    <>
      <div className="flex flex-row items-baseline">
        {inModal ? (
          <div className="font-heading text-2xl text-primary">Select a Studyboard</div>
        ) : (
          <div className="font-heading text-2xl text-primary">My Studyboards</div>
        )}
        <AddStudyboardTile variant="sm" studyboards={studyboards} />
          {isPending ? (
            <>
              <p className="text-secondary ml-12 font-heading">Refreshing </p>
              <LoadingDots color="hsl(var(--secondary))"/>
            </>
            ) : (
              ""
            )}
      </div>
      <div className="mt-2">
          <div className="flex flex-row flex-wrap gap-4">
            <div className="flex flex-row flex-wrap gap-6">
              {currentStudyboards.length == 0 ? (
                <div className="text-md text-gray-400 my-4">You currently do not have any studyboards, click &quot;<span className="font-extrabold">+</span>&quot; to start learning!</div>
              ) : (
                currentStudyboards.map((studyboard, i) => (
                  <StudyboardTile studyboard={studyboard} key={studyboard.id} />
                ))
              )}
            </div>
          </div>
      </div>
    </>
  );
};

export default StudyboardGallery;
