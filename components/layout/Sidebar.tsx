"use client";

import { Button } from "@/components/shared/button";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Tooltip from "@/components/shared/tooltip";
import useStudyboardModal from "@/app/dashboard/components/StudyboardModal";
import { Tables } from "@/types/supabase";
import Link from "next/link";

export default function Sidebar({studyboards} : {studyboards: Tables<"Studyboards">[]}) {
    const { StudyboardModal, setShowStudyboardModal } = useStudyboardModal(studyboards);

    return (
        <>
            <StudyboardModal/>
            <div className="h-screen-custom-65 w-[80px] bg-secondary px-3 py-10 border-r border-gray-200">
                <Link href={'/dashboard'}>
                    <Tooltip alignment="right" content="My dashboard">
                        <Button type="submit" variant={"ghost"} className="w-full mb-6 hover:scale-105 transition-all">
                            <Icon 
                                icon="iconamoon:home-bold" 
                                width={26} 
                                height={26} 
                                style={{ color: 'white' }} />
                        </Button>
                    </Tooltip>
                </Link>
                <Tooltip alignment="right" content="Select studyboard">
                    <Button type="submit" variant={"ghost"} className="w-full mb-6 hover:scale-105 transition-all"
                    onClick={() => setShowStudyboardModal(true)}>
                        <Icon 
                            icon="mdi:collections-bookmark-outline" 
                            width={26} 
                            height={26} 
                            style={{ color: 'white' }} />
                    </Button>
                </Tooltip>
                <Tooltip alignment="right" content="Browse all studyboards">
                    <Button type="submit" variant={"ghost"} className="w-full mb-6 hover:scale-105 transition-all">
                        <Icon 
                            icon="zondicons:search" 
                            width={23} 
                            height={23} 
                            style={{ color: 'white' }} />
                    </Button>
                </Tooltip>
            </div>
        </>
    );
}