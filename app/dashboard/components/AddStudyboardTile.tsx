"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { createStudyboard } from "../actions";
import { TablesInsert } from "@/types/supabase";
import { toast } from "@/components/shared/use-toast";
import { useRouter } from "next/navigation";

export default function AddStudyboardTile() {
    const router = useRouter();
    const studyboard : TablesInsert<'Studyboards'> = {};

    return(
        <div className="flex items-center justify-center w-48 h-32 bg-white rounded-sm border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all"
        style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px'}}
        onClick={() => {
            onAddStudyboardTileSubmit(studyboard).then((result) => {
                router.push(`/edit/${result.id}`);
            })
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
    const result = JSON.parse(await createStudyboard(studyboard));
    console.log(result)
    const { error } = result;
    if (error) {
        toast({
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-red-400">
                    Error: {error.message}
                </pre>
            ),
        })
        return null;
    }
    return result.data;
}