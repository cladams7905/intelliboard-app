"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Tooltip from "@/components/shared/tooltip";
import { Tables } from "@/types/supabase";
import { updateStudyboardById } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BoardHeader({studyboard} : {studyboard: Tables<"Studyboards">}) {

    const router = useRouter();
    const [title, setTitle] = useState(studyboard?.title)

    useEffect(() => {
        const timer = setTimeout(() => {
            updateStudyboardById(studyboard.id, {title: title}).then(() => {
                router.refresh();
                // console.log("title: " + title)
            })
        }, 500)

        return () => clearTimeout(timer)
    }, [title, studyboard.id, router])

    return (
    <div className={`absolute flex flex-row justify-between items-center h-[100px] py-6 px-8 mx-10`}
    style={{width: 'calc(91.6667% - 150px)'}}>
        <Tooltip alignment="top" content="Save">
            <Icon 
                icon="mi:favorite" 
                width={22} 
                height={22} 
                className="hover:bg-gray-200 cursor-pointer rounded-md"
                style={{ color: 'rgb(107 114 128)' }} />
        </Tooltip>
        <div className="flex items-center justify-center flex-wrap break-words"
        style={{width: '45vw'}}>
            <input type="text"
                   className="text-3xl text-center text-secondary placeholder-gray-300 w-full" 
                   placeholder="Untitled Project"
                   defaultValue={title ? title : undefined}
                   onChangeCapture={(e) => {setTitle(e.currentTarget.value)}} />
        </div>
        <div className="flex flex-wrap gap-3">
            <Tooltip alignment="top" content="Text size">
                <Icon 
                    icon="majesticons:font-size-line" 
                    width={26} 
                    height={26} 
                    className="hover:bg-gray-200 cursor-pointer rounded-md"
                    style={{ color: 'rgb(107 114 128)' }} />
            </Tooltip>
            <Tooltip alignment="top" content="Read aloud">
                <Icon 
                    icon="akar-icons:sound-on" 
                    width={22} 
                    height={22} 
                    className="hover:bg-gray-200 cursor-pointer rounded-md"
                    style={{ color: 'rgb(107 114 128)' }} />
            </Tooltip>
            <Tooltip alignment="top" content="Learn mode">
                <Icon 
                    icon="mdi:search-expand" 
                    width={22} 
                    height={22} 
                    className="hover:bg-gray-200 cursor-pointer rounded-md"
                    style={{ color: 'rgb(107 114 128)' }} />
            </Tooltip>
            <Tooltip alignment="top" content="Studyboard settings">
                <Icon 
                    icon="mdi:settings" 
                    width={22} 
                    height={22} 
                    className="hover:bg-gray-200 cursor-pointer rounded-md"
                    style={{ color: 'rgb(107 114 128)' }} />
            </Tooltip>
        </div>
    </div>
    );
}