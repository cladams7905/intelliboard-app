"use client";

import StudyboardTile from "./StudyboardTile";
import { Tables } from "@/types/supabase";

const StudyboardGallery = ({studyboards} : {studyboards: Tables<"Studyboards">[]}) => {

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
