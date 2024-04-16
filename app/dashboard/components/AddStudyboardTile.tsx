"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { createStudyboard } from "../actions";
import { TablesInsert } from "@/types/supabase";
import { toast } from "@/components/shared/use-toast";
import { useRouter } from "next/navigation";
import Tooltip from "@/components/shared/tooltip";
import { Button } from "@/components/shared/button";
import { localStudyboard } from "@/types/customTypes";
import { useTransition } from "react";
import LoadingDots from "@/components/shared/LoadingDots";

interface TileProps {
    variant: 'sm' | 'lg';
    studyboards: localStudyboard[];
  }

const AddStudyboardTile: React.FC<TileProps> = ({ variant, studyboards }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const studyboard : TablesInsert<'Studyboards'> = {};

    if (variant == "sm") {
        return (
            <Button type="submit" variant={"accent"} className="hover:scale-105 transition-all ml-3 z-10 p-3"
                onClick={() => {
                    startTransition(() => {
                        onAddStudyboardTileSubmit(studyboard).then((result) => {
                            router.push(`/edit/${result.id}`);
                        })
                    })
                }}>
            {isPending ? (
                <LoadingDots />
            ) : (
                <>
                    <p className="mr-2">New</p>
                    <Icon 
                    icon="mingcute:add-fill" 
                    width={14} 
                    height={14} />
                </>
            )}
            </Button>
        );
    } else {
        return(
            <div className="flex items-center justify-center w-48 h-32 bg-white rounded-sm border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all"
                style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px'}}
                onClick={() => {
                    startTransition(() => {
                        onAddStudyboardTileSubmit(studyboard).then((result) => {
                            router.push(`/edit/${result.id}`);
                        })
                    })
                }}>
                {isPending ? (
                    <LoadingDots />
                ) : (
                    <Icon 
                    icon="mingcute:add-fill" 
                    width={32} 
                    height={32} 
                    style={{ color: 'hsl(var(--secondary))' }} />
                )}
            </div>
        );
    }


}

async function onAddStudyboardTileSubmit(studyboard : TablesInsert<'Studyboards'>) {
    const result = JSON.parse(await createStudyboard(studyboard));
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

export default AddStudyboardTile;