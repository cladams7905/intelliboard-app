"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { createStudyboard } from "../actions";
import { TablesInsert } from "@/types/supabase";
import { toast } from "@/components/shared/use-toast";
import { useRouter } from "next/navigation";

export default function AddStudyboardTile() {
    const router = useRouter();

    const studyboard : TablesInsert<'Studyboards'> = {
        title: "Broccoli",
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
        onClick={() => {
            onAddStudyboardTileSubmit(studyboard);
            router.refresh();
        }}>
            <Icon 
            icon="mingcute:add-fill" 
            width={32} 
            height={32} 
            style={{ color: 'hsl(var(--secondary))' }} />
        </div>
    );
}

async function onAddStudyboardTileSubmit(studyboard : TablesInsert<'Studyboards'>) {
    const result = await createStudyboard(studyboard);
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