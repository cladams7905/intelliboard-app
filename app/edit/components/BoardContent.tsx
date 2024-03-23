"use client";

import { useEffect, useState } from "react";
import { TablesInsert } from "@/types/supabase";
import { updateStudyboardById } from "../../dashboard/actions";
import { useRouter } from "next/navigation";

export default function BoardContent({ studyboard }: { studyboard: TablesInsert<"Studyboards"> }) {
    
    const router = useRouter();
    const [content, setContent] = useState(JSON.parse(JSON.stringify(studyboard?.content))?.contentBody);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateStudyboardById(studyboard.id as number, {content: { contentBody: content }})
            router.refresh();
            //console.log("content: " + content)
        }, 500)
    
        return () => clearTimeout(timer)
      }, [content, studyboard.id, router])
    
    return (
        <div className="flex items-center justify-center h-full w-full">
            <textarea
                id="target-textarea"
                className="h-full w-full break-words text-xl text-left leading-[7rem] tracking-wider lg:px-28 placeholder-gray-300 resize-none"
                placeholder={"Type your own studyboard here!"}
                value={content}
                onChange={(e) => {setContent(e.target.value)}}
            />
        </div>
    );
}