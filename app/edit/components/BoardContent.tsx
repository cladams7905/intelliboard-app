"use client"

import { TablesInsert } from "@/types/supabase";
import { updateStudyboardById } from "../../dashboard/actions";
import { useEffect, useState } from "react";

export default function BoardContent({studyboard} : {studyboard : TablesInsert<"Studyboards">}) {
    const [content, setContent] = useState(JSON.parse(JSON.stringify(studyboard?.content))?.contentBody);

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(content)
            updateStudyboardById(studyboard.id as number, {content: {contentBody: content}})
        }, 500)

        return () => clearTimeout(timer)
    }, [content, studyboard.id])
  
    return (
    <div className="flex items-center justify-center h-full w-full">
        <textarea 
            className="h-full w-full break-words text-xl text-left leading-[7rem] tracking-wider lg:px-28 placeholder-gray-300 resize-none" 
            placeholder={"Type your own studyboard here!"} 
            defaultValue={content}
            onChange={(e) => {setContent(e.currentTarget.value)}} />
    </div>
  )
}
