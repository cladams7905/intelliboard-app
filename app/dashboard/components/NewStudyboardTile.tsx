"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { createNewStudyboard } from "../actions";
import { TablesInsert } from "@/types/supabase";
import { toast } from "@/components/shared/use-toast";

export default function NewStudyboardTile() {

    const studyboard : TablesInsert<'Studyboards'> = {
        title: "Test",
        language: "chinese",
        difficulty: "2+",
        tags: ["funny", "happy"],
        content: {
            "contentBody": "Hello hello"
        },
    }
    return(
        <div className="flex items-center justify-center w-48 h-32 bg-white rounded-sm border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all"
        style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px'}}
        onClick={() => {onNewStudyboardTileSubmit(studyboard)}}>
            <Icon 
            icon="mingcute:add-fill" 
            width={32} 
            height={32} 
            style={{ color: 'hsl(var(--secondary))' }} />
        </div>
    );
}

async function onNewStudyboardTileSubmit(studyboard : TablesInsert<'Studyboards'>) {
    const result = await createNewStudyboard(studyboard);
    const { error } = JSON.parse(result);
    if (!error) {
        toast({
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 text-white p-4">
                    New studyboard created!
                </pre>
            ),
        })
    } else {
        toast({
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-red-400">
                    Error: {error.message}
                </pre>
            ),
        })
    }
}